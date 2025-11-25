import React, { useState } from 'react'

interface ImportScreenProps {
  onFilesLoaded: (filePaths: string[]) => void;
  error: string | null;
}

export default function ImportScreen({ onFilesLoaded, error }: ImportScreenProps) {
  const [isDragOver, setIsDragOver] = useState(false)

  const handleDrop = async (e: React.DragEvent) => {
    e.preventDefault()
    e.stopPropagation()
    setIsDragOver(false)

    try {
      const files = Array.from(e.dataTransfer.files)
      
      if (files.length === 0) {
        console.warn('No files in drop event')
        return
      }
      
      // Use Electron's webUtils to get file paths
      const filePaths = files
        .map(file => {
          try {
            return window.electron.getFilePathFromFile(file)
          } catch (err) {
            console.error('Failed to get file path:', err)
            return null
          }
        })
        .filter((path): path is string => path !== null && path !== undefined)
      
      console.log('Dropped files:', filePaths)
      
      if (filePaths.length > 0) {
        onFilesLoaded(filePaths)
      } else {
        console.error('No valid file paths extracted from drop')
      }
    } catch (err) {
      console.error('Error handling drop:', err)
    }
  }

  const handleDragOver = (e: React.DragEvent) => {
    e.preventDefault()
    e.stopPropagation()
    setIsDragOver(true)
  }

  const handleDragLeave = (e: React.DragEvent) => {
    e.preventDefault()
    e.stopPropagation()
    setIsDragOver(false)
  }

  const handleSelectFiles = async () => {
    const result = await window.electron.selectFiles()
    
    if (result.success && result.files && result.files.length > 0) {
      onFilesLoaded(result.files)
    } else if (!result.success && result.error) {
      // Error will be displayed via the error prop
    }
  }

  return (
    <div className="app">
      <div className="toolbar">
        <div className="toolbar-left">
          <div className="app-title">M2 Film</div>
        </div>
      </div>
      
      <div className="import-screen">
        {error && (
          <div className="error-message">
            {error}
          </div>
        )}
        
        <div
          className={`import-dropzone ${isDragOver ? 'drag-over' : ''}`}
          onDrop={handleDrop}
          onDragOver={handleDragOver}
          onDragLeave={handleDragLeave}
          onClick={handleSelectFiles}
        >
          <div className="import-title">M2 Film</div>
          <div className="import-subtitle">Metadata Editor for Film Photographers</div>
          <div style={{ fontSize: '48px', margin: '20px 0' }}>📸</div>
          <div style={{ fontSize: '18px', fontWeight: 600, marginBottom: '10px' }}>
            Drag & Drop Photos Here
          </div>
          <div style={{ fontSize: '14px', color: 'var(--color-gray)' }}>
            or click to select files
          </div>
          <div className="import-instructions">
            Supports JPEG & TIFF • Up to 500 photos • Single folder only
          </div>
        </div>
      </div>
    </div>
  )
}

