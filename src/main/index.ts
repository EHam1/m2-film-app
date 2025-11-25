import { app, BrowserWindow } from 'electron'
import path from 'path'
import { setupIpcHandlers } from './ipcHandlers'
import { closeExifTool, initializeExifTool } from './exifToolService'

let mainWindow: BrowserWindow | null = null

function createWindow() {
  mainWindow = new BrowserWindow({
    width: 1400,
    height: 900,
    minWidth: 1000,
    minHeight: 700,
    webPreferences: {
      preload: path.join(__dirname, '../preload/index.js'),
      contextIsolation: true,
      nodeIntegration: false
    },
    titleBarStyle: 'hiddenInset',
    title: 'M2 Film'
  })

  // Setup IPC handlers
  setupIpcHandlers(mainWindow)

  // Load the app
  if (process.env.NODE_ENV === 'development') {
    mainWindow.loadURL('http://localhost:5173')
    mainWindow.webContents.openDevTools()
  } else {
    mainWindow.loadFile(path.join(__dirname, '../renderer/index.html'))
  }

  mainWindow.on('closed', () => {
    mainWindow = null
  })
}

app.whenReady().then(async () => {
  // Initialize ExifTool early to avoid delays on first file operation
  console.log('App ready, initializing ExifTool...')
  try {
    await initializeExifTool()
    console.log('ExifTool ready')
  } catch (error) {
    console.error('Failed to initialize ExifTool on startup:', error)
    // Continue anyway - will retry on first use
  }
  
  createWindow()

  app.on('activate', () => {
    if (BrowserWindow.getAllWindows().length === 0) {
      createWindow()
    }
  })
})

app.on('window-all-closed', () => {
  if (process.platform !== 'darwin') {
    app.quit()
  }
})

app.on('before-quit', async () => {
  await closeExifTool()
})

