import { contextBridge, ipcRenderer, webUtils } from 'electron'
import type { Photo, WriteMetadataArgs, Settings, GeocodingResult } from '../renderer/types'

const api = {
  // File operations
  selectFiles: () => ipcRenderer.invoke('select-files'),
  getFilePathFromFile: (file: File) => webUtils.getPathForFile(file),
  loadPhotoMetadata: (filePaths: string[]) => 
    ipcRenderer.invoke('load-photo-metadata', filePaths),
  
  // Metadata operations
  writeMetadata: (args: WriteMetadataArgs) => 
    ipcRenderer.invoke('write-metadata', args),
  
  // Settings
  getSettings: () => ipcRenderer.invoke('get-settings'),
  saveSettings: (settings: Partial<Settings>) => 
    ipcRenderer.invoke('save-settings', settings),
  
  // Geocoding
  searchLocation: (query: string) => 
    ipcRenderer.invoke('search-location', query),
  
  // Progress updates
  onWriteProgress: (callback: (progress: any) => void) => {
    ipcRenderer.on('write-progress', (_event, progress) => callback(progress))
  },
  
  removeWriteProgressListener: () => {
    ipcRenderer.removeAllListeners('write-progress')
  }
}

contextBridge.exposeInMainWorld('electron', api)

export type ElectronAPI = typeof api

