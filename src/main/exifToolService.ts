import { exiftool, ExifTool } from 'exiftool-vendored'

export interface PhotoMetadata {
  timestamp?: string;
  location?: {
    name: string;
    latitude: number;
    longitude: number;
  };
  eventName?: string;
  filmStock?: string;
  camera?: string;
}

let exifToolInstance: ExifTool | null = null
let isInitialized = false
let initPromise: Promise<void> | null = null

// Initialize and warm up ExifTool
export async function initializeExifTool(): Promise<void> {
  if (isInitialized) return
  
  if (initPromise) {
    // Already initializing, wait for it
    await initPromise
    return
  }
  
  initPromise = (async () => {
    console.log('Initializing ExifTool...')
    try {
      exifToolInstance = exiftool
      
      // Don't call version() in packaged apps - it can hang
      // Just mark as initialized and let first read/write call initialize it
      console.log('ExifTool instance created')
      
      isInitialized = true
    } catch (error) {
      console.error('Failed to initialize ExifTool:', error)
      throw error
    }
  })()
  
  await initPromise
}

export function getExifTool(): ExifTool {
  if (!exifToolInstance) {
    exifToolInstance = exiftool
  }
  return exifToolInstance
}

export async function readMetadata(filePath: string): Promise<any> {
  // Ensure ExifTool is initialized before use
  await initializeExifTool()
  
  const tool = getExifTool()
  try {
    const metadata = await tool.read(filePath)
    return metadata
  } catch (error) {
    console.error(`Failed to read metadata from ${filePath}:`, error)
    return null
  }
}

export async function writeMetadata(
  filePath: string, 
  metadata: PhotoMetadata
): Promise<void> {
  // Ensure ExifTool is initialized before use
  await initializeExifTool()
  
  const tool = getExifTool()
  
  const tags: any = {}

  // Timestamp - convert from ISO format to EXIF format
  if (metadata.timestamp) {
    // Convert "2024-11-24T10:30" or "2024-11-24T10:30:45" to "2024:11:24 10:30:00" or "2024:11:24 10:30:45"
    let exifTimestamp = metadata.timestamp
      .replace('T', ' ')           // Replace T with space
      .replace(/-/g, ':')          // Replace dashes with colons in date part
    
    // Add seconds if not present (check if there's a second colon in the time part)
    const parts = exifTimestamp.split(' ')
    if (parts.length === 2 && parts[1].split(':').length === 2) {
      exifTimestamp += ':00'
    }
    
    tags.DateTimeOriginal = exifTimestamp
    tags.CreateDate = exifTimestamp
    tags.ModifyDate = exifTimestamp
  }

  // GPS Location - use composite GPS tag for reliable coordinate writing
  if (metadata.location) {
    // Format: "latitude, longitude" with proper signs
    tags.GPSPosition = `${metadata.location.latitude}, ${metadata.location.longitude}`
  }

  // Event/Roll Name
  if (metadata.eventName) {
    tags['XMP:Title'] = metadata.eventName
  }

  // Keywords for Film Stock and Camera
  const keywords: string[] = []
  if (metadata.filmStock) {
    keywords.push(`Film: ${metadata.filmStock}`)
  }
  if (metadata.camera) {
    keywords.push(`Camera: ${metadata.camera}`)
  }
  
  if (keywords.length > 0) {
    tags['XMP:Subject'] = keywords
  }

  try {
    // Use -m flag to ignore minor errors and warnings
    // Use -F flag for fast processing (skip some validation)
    await tool.write(filePath, tags, ['-overwrite_original', '-m', '-F'])
  } catch (error: any) {
    console.error(`Failed to write metadata to ${filePath}:`, error)
    
    // If it's a Photoshop IRB error, try stripping Photoshop data and writing again
    if (error.message && error.message.includes('Photoshop IRB')) {
      console.log('Attempting to strip Photoshop IRB data and retry...')
      try {
        // First, strip all Photoshop data using command-line args
        await tool.write(filePath, {}, ['-overwrite_original', '-m', '-Photoshop:all='])
        // Then write the actual metadata
        await tool.write(filePath, tags, ['-overwrite_original', '-m', '-F'])
        console.log('Successfully wrote metadata after stripping Photoshop data')
        return
      } catch (retryError) {
        console.error('Retry failed:', retryError)
        throw new Error(`This file has corrupted Adobe Photoshop metadata that cannot be automatically fixed. Please re-save the file in your image editor first.`)
      }
    }
    
    throw error
  }
}

export async function closeExifTool(): Promise<void> {
  if (exifToolInstance) {
    await exifToolInstance.end()
    exifToolInstance = null
  }
}

