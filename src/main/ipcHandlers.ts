import { ipcMain, BrowserWindow } from 'electron'
import * as fileService from './fileService'
import * as exifToolService from './exifToolService'
import * as settingsService from './settingsService'
import path from 'path'

interface WriteMetadataArgs {
  filePaths: string[];
  metadata: any;
  createBackup: boolean;
}

let handlersRegistered = false

export function setupIpcHandlers(mainWindow: BrowserWindow) {
  // Prevent duplicate registration
  if (handlersRegistered) {
    console.log('IPC handlers already registered, skipping...')
    return
  }
  handlersRegistered = true
  // File selection
  ipcMain.handle('select-files', async () => {
    try {
      const files = await fileService.selectFiles()
      
      if (files.length === 0) {
        return { success: true, files: [] }
      }

      const validation = fileService.validateFiles(files)
      
      if (!validation.valid) {
        return { success: false, error: validation.error }
      }

      return { success: true, files: validation.files }
    } catch (error: any) {
      return { success: false, error: error.message }
    }
  })

  // Load photo metadata
  ipcMain.handle('load-photo-metadata', async (_event, filePaths: string[]) => {
    try {
      const validation = fileService.validateFiles(filePaths)
      
      if (!validation.valid) {
        return { success: false, error: validation.error }
      }

      const photos = await Promise.all(
        filePaths.map(async (filePath) => {
          const thumbnail = await fileService.generateThumbnail(filePath)
          const metadata = await exifToolService.readMetadata(filePath)
          
          return {
            filePath,
            fileName: path.basename(filePath),
            thumbnail,
            metadata
          }
        })
      )

      return { success: true, photos }
    } catch (error: any) {
      return { success: false, error: error.message }
    }
  })

  // Write metadata
  ipcMain.handle('write-metadata', async (_event, args: WriteMetadataArgs) => {
    const { filePaths, metadata, createBackup } = args

    try {
      let backupFolder: string | null = null

      // Create backup if requested
      if (createBackup && filePaths.length > 0) {
        const sourceFolder = path.dirname(filePaths[0])
        backupFolder = await fileService.createBackupFolder(sourceFolder)
        
        // Backup all files
        for (const filePath of filePaths) {
          await fileService.backupFile(filePath, backupFolder)
        }
      }

      // Write metadata to each file
      for (let i = 0; i < filePaths.length; i++) {
        const filePath = filePaths[i]
        
        // Send progress update
        mainWindow.webContents.send('write-progress', {
          current: i + 1,
          total: filePaths.length,
          currentFile: path.basename(filePath)
        })

        try {
          await exifToolService.writeMetadata(filePath, metadata)
        } catch (error) {
          console.error(`Failed to write metadata to ${filePath}:`, error)
          
          // If backup exists, could restore here
          if (backupFolder) {
            console.log(`Backup available at: ${backupFolder}`)
          }
          
          throw error
        }
      }

      return { 
        success: true, 
        message: `Successfully updated ${filePaths.length} file(s)`,
        backupFolder 
      }
    } catch (error: any) {
      return { success: false, error: error.message }
    }
  })

  // Settings
  ipcMain.handle('get-settings', async () => {
    try {
      const settings = await settingsService.getSettings()
      return { success: true, settings }
    } catch (error: any) {
      return { success: false, error: error.message }
    }
  })

  ipcMain.handle('save-settings', async (_event, updates: any) => {
    try {
      const settings = await settingsService.saveSettings(updates)
      return { success: true, settings }
    } catch (error: any) {
      return { success: false, error: error.message }
    }
  })

  // Geocoding
  ipcMain.handle('search-location', async (_event, query: string) => {
    try {
      // Use OpenStreetMap Nominatim API
      const url = `https://nominatim.openstreetmap.org/search?q=${encodeURIComponent(query)}&format=json&limit=5`
      
      const response = await fetch(url, {
        headers: {
          'User-Agent': 'MetaMetaFilm/1.0'
        }
      })

      if (!response.ok) {
        throw new Error('Geocoding request failed')
      }

      const results = await response.json()
      
      return { 
        success: true, 
        results: results.map((r: any) => ({
          display_name: r.display_name,
          lat: r.lat,
          lon: r.lon
        }))
      }
    } catch (error: any) {
      return { success: false, error: error.message }
    }
  })
}

