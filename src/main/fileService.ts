import { promises as fs } from 'fs'
import path from 'path'
import { dialog } from 'electron'

const SUPPORTED_EXTENSIONS = ['.jpg', '.jpeg', '.tif', '.tiff']
const MAX_FILES = 500

export interface FileValidationResult {
  valid: boolean;
  files?: string[];
  error?: string;
}

export async function selectFiles(): Promise<string[]> {
  const result = await dialog.showOpenDialog({
    properties: ['openFile', 'multiSelections'],
    filters: [
      { name: 'Images', extensions: ['jpg', 'jpeg', 'tif', 'tiff'] }
    ]
  })

  if (result.canceled || result.filePaths.length === 0) {
    return []
  }

  return result.filePaths
}

export function validateFiles(filePaths: string[]): FileValidationResult {
  if (filePaths.length === 0) {
    return { valid: false, error: 'No files selected' }
  }

  if (filePaths.length > MAX_FILES) {
    return { 
      valid: false, 
      error: `Too many files selected. Maximum is ${MAX_FILES} files per session.` 
    }
  }

  // Check all files are supported types
  const invalidFiles = filePaths.filter(file => {
    const ext = path.extname(file).toLowerCase()
    return !SUPPORTED_EXTENSIONS.includes(ext)
  })

  if (invalidFiles.length > 0) {
    return {
      valid: false,
      error: `Unsupported file types found. Only JPEG and TIFF files are supported.`
    }
  }

  // Check all files are from the same folder
  const folders = new Set(filePaths.map(file => path.dirname(file)))
  
  if (folders.size > 1) {
    return {
      valid: false,
      error: 'All selected files must be from the same folder. Please select files from a single folder only.'
    }
  }

  return { valid: true, files: filePaths }
}

export async function createBackupFolder(sourceFolder: string): Promise<string> {
  const timestamp = new Date().toISOString().replace(/[:.]/g, '-').split('T')[0]
  const backupFolder = path.join(sourceFolder, 'm2-film-backups', timestamp)
  
  await fs.mkdir(backupFolder, { recursive: true })
  
  return backupFolder
}

export async function backupFile(filePath: string, backupFolder: string): Promise<void> {
  const fileName = path.basename(filePath)
  const backupPath = path.join(backupFolder, fileName)
  
  await fs.copyFile(filePath, backupPath)
}

export async function generateThumbnail(filePath: string): Promise<string> {
  // For now, just return the file path as a data URL
  // In a production app, you might use sharp or another library to generate actual thumbnails
  const data = await fs.readFile(filePath)
  const ext = path.extname(filePath).toLowerCase()
  const mimeType = ext === '.tif' || ext === '.tiff' ? 'image/tiff' : 'image/jpeg'
  
  return `data:${mimeType};base64,${data.toString('base64')}`
}

export async function fileExists(filePath: string): Promise<boolean> {
  try {
    await fs.access(filePath)
    return true
  } catch {
    return false
  }
}

