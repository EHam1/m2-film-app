import { useState, useCallback } from 'react'
import type { Photo } from '../types'

declare global {
  interface Window {
    electron: {
      selectFiles: () => Promise<any>
      loadPhotoMetadata: (filePaths: string[]) => Promise<any>
      writeMetadata: (args: any) => Promise<any>
      getSettings: () => Promise<any>
      saveSettings: (settings: any) => Promise<any>
      searchLocation: (query: string) => Promise<any>
      onWriteProgress: (callback: (progress: any) => void) => void
      removeWriteProgressListener: () => void
    }
  }
}

export function usePhotos() {
  const [photos, setPhotos] = useState<Photo[]>([])
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState<string | null>(null)

  const loadFiles = useCallback(async (filePaths?: string[], retryCount = 0) => {
    console.log('loadFiles called with:', filePaths, 'retry:', retryCount)
    setLoading(true)
    setError(null)

    try {
      let files: string[] = []

      if (filePaths) {
        files = filePaths
        console.log('Using provided file paths:', files.length)
      } else {
        console.log('Opening file dialog...')
        const result = await window.electron.selectFiles()
        console.log('File dialog result:', result)
        
        if (!result.success) {
          const errorMsg = result.error || 'Failed to select files'
          console.error('File selection failed:', errorMsg)
          setError(errorMsg)
          setLoading(false)
          return
        }

        files = result.files || []
      }

      if (files.length === 0) {
        console.warn('No files to load')
        setLoading(false)
        return
      }

      console.log('Loading metadata for', files.length, 'files...')
      const result = await window.electron.loadPhotoMetadata(files)
      console.log('Metadata load result:', result)

      if (!result.success) {
        // If this is the first attempt and it failed, retry once after a short delay
        // This handles ExifTool initialization on first run
        if (retryCount === 0) {
          console.log('First attempt failed, retrying in 1 second...')
          await new Promise(resolve => setTimeout(resolve, 1000))
          return loadFiles(filePaths, 1) // Retry with same files
        }
        
        const errorMsg = result.error || 'Failed to load photos'
        console.error('Metadata loading failed:', errorMsg)
        setError(errorMsg)
        setLoading(false)
        return
      }

      const loadedPhotos = result.photos || []
      console.log('Successfully loaded', loadedPhotos.length, 'photos')
      setPhotos(loadedPhotos)
    } catch (err: any) {
      const errorMsg = err.message || 'An unexpected error occurred'
      console.error('Unexpected error in loadFiles:', err)
      setError(errorMsg)
    } finally {
      setLoading(false)
    }
  }, [])

  const clearPhotos = useCallback(() => {
    setPhotos([])
    setError(null)
  }, [])

  return {
    photos,
    loading,
    error,
    loadFiles,
    clearPhotos
  }
}

