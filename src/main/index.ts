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

app.whenReady().then(() => {
  // Create window FIRST so user sees something immediately
  createWindow()
  
  // Setup IPC handlers once (guards against duplicate registration)
  if (mainWindow) {
    setupIpcHandlers(mainWindow)
  }
  
  // Initialize ExifTool in background (non-blocking)
  console.log('App ready, initializing ExifTool in background...')
  initializeExifTool()
    .then(() => {
      console.log('ExifTool ready')
      // Notify renderer that ExifTool is ready
      if (mainWindow && !mainWindow.isDestroyed()) {
        mainWindow.webContents.send('exiftool-ready')
      }
    })
    .catch((error) => {
      console.error('Failed to initialize ExifTool on startup:', error)
      // Continue anyway - will retry on first use
    })

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

