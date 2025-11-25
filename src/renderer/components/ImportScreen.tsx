import React, { useState } from 'react'

interface ImportScreenProps {
  onFilesLoaded: (filePaths: string[]) => void;
  error: string | null;
}

export default function ImportScreen({ onFilesLoaded, error }: ImportScreenProps) {
  const [isDragOver, setIsDragOver] = useState(false)

  const handleDrop = async (e: React.DragEvent) => {
    e.preventDefault()
    setIsDragOver(false)

    const files = Array.from(e.dataTransfer.files)
    
    // Use Electron's webUtils to get file paths
    const filePaths = files.map(file => window.electron.getFilePathFromFile(file))
    
    if (filePaths.length > 0) {
      onFilesLoaded(filePaths)
    }
  }

  const handleDragOver = (e: React.DragEvent) => {
    e.preventDefault()
    setIsDragOver(true)
  }

  const handleDragLeave = () => {
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
  )
}

