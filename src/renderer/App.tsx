import React, { useState, useEffect } from 'react'
import ImportScreen from './components/ImportScreen'
import ThumbnailGrid from './components/ThumbnailGrid'
import MetadataPanel from './components/MetadataPanel'
import BackupModal from './components/BackupModal'
import ProgressModal from './components/ProgressModal'
import SplashScreen from './components/SplashScreen'
import { usePhotos } from './hooks/usePhotos'
import { useSelection } from './hooks/useSelection'
import type { PhotoMetadata, WriteProgress, Settings } from './types'

export default function App() {
  const { photos, loading, error, loadFiles, clearPhotos } = usePhotos()
  const { selectedIndices, handleClick, selectAll, clearSelection } = useSelection(photos.length)
  
  const [showBackupModal, setShowBackupModal] = useState(false)
  const [backupPreferenceSet, setBackupPreferenceSet] = useState(false)
  const [writeProgress, setWriteProgress] = useState<WriteProgress | null>(null)
  const [pendingWrite, setPendingWrite] = useState<{
    metadata: PhotoMetadata;
    createBackup: boolean;
  } | null>(null)
  const [isInitializing, setIsInitializing] = useState(true)

  useEffect(() => {
    // Simulate initialization time (ExifTool startup)
    // Show splash for minimum 1.5 seconds to avoid flash
    const initTimer = setTimeout(() => {
      setIsInitializing(false)
    }, 1500)

    // Check if backup preference has been set
    window.electron.getSettings().then(result => {
      if (result.success && result.settings) {
        // If settings exist, preference has been set
        setBackupPreferenceSet(true)
      }
    })

    // Setup progress listener
    window.electron.onWriteProgress((progress: WriteProgress) => {
      setWriteProgress(progress)
    })

    return () => {
      clearTimeout(initTimer)
      window.electron.removeWriteProgressListener()
    }
  }, [])

  const handleFilesLoaded = async (filePaths: string[]) => {
    console.log('App: handleFilesLoaded called with', filePaths.length, 'files')
    try {
      await loadFiles(filePaths)
      console.log('App: loadFiles completed successfully')
    } catch (err) {
      console.error('App: Error in handleFilesLoaded:', err)
    }
  }

  const handleBackupChoice = async (alwaysBackup: boolean) => {
    await window.electron.saveSettings({ defaultBackup: alwaysBackup })
    setBackupPreferenceSet(true)
    setShowBackupModal(false)

    // If there was a pending write, execute it now
    if (pendingWrite) {
      await executeWrite(pendingWrite.metadata, pendingWrite.createBackup)
      setPendingWrite(null)
    }
  }

  const executeWrite = async (metadata: PhotoMetadata, createBackup: boolean) => {
    const selectedPhotos = photos.filter((_, index) => selectedIndices.has(index))
    const filePaths = selectedPhotos.map(photo => photo.filePath)

    if (filePaths.length === 0) return

    setWriteProgress({ current: 0, total: filePaths.length, currentFile: '' })

    try {
      // Save recent film stock and camera to settings
      const updates: Partial<Settings> = {}
      
      if (metadata.filmStock) {
        const result = await window.electron.getSettings()
        if (result.success) {
          const recent = result.settings.lastUsedFilmStocks || []
          updates.lastUsedFilmStocks = [
            metadata.filmStock,
            ...recent.filter(s => s !== metadata.filmStock)
          ].slice(0, 10)
        }
      }

      if (metadata.camera) {
        const result = await window.electron.getSettings()
        if (result.success) {
          const recent = result.settings.lastUsedCameras || []
          updates.lastUsedCameras = [
            metadata.camera,
            ...recent.filter(c => c !== metadata.camera)
          ].slice(0, 10)
        }
      }

      if (Object.keys(updates).length > 0) {
        await window.electron.saveSettings(updates)
      }

      const result = await window.electron.writeMetadata({
        filePaths,
        metadata,
        createBackup
      })

      // Keep the progress modal visible for a moment so users can see the completion
      await new Promise(resolve => setTimeout(resolve, 800))
      
      setWriteProgress(null)

      if (result.success) {
        alert(`Successfully updated ${filePaths.length} file(s)!`)
        clearSelection()
      } else {
        alert(`Error: ${result.error}`)
      }
    } catch (err: any) {
      setWriteProgress(null)
      alert(`Error: ${err.message}`)
    }
  }

  const handleWrite = async (metadata: PhotoMetadata, createBackup: boolean) => {
    // Check if this is the first write and backup preference hasn't been set
    if (!backupPreferenceSet) {
      setPendingWrite({ metadata, createBackup })
      setShowBackupModal(true)
      return
    }

    await executeWrite(metadata, createBackup)
  }

  const handleNewSession = () => {
    clearPhotos()
    clearSelection()
  }

  // Show splash screen while initializing
  if (isInitializing) {
    return <SplashScreen />
  }

  // Show import screen if no photos loaded
  if (photos.length === 0) {
    return <ImportScreen onFilesLoaded={handleFilesLoaded} error={error} />
  }

  return (
    <div className="app">
      <div className="toolbar">
        <div className="toolbar-left">
          <div className="app-title">M2 Film</div>
          {selectedIndices.size > 0 && (
            <span className="selected-count">
              {selectedIndices.size} selected
            </span>
          )}
        </div>
        <div className="toolbar-right">
          <button className="button button-secondary" onClick={selectAll}>
            Select All
          </button>
          <button 
            className="button" 
            onClick={handleNewSession}
            style={{ backgroundColor: 'var(--color-gray)', color: 'white' }}
          >
            New Session
          </button>
        </div>
      </div>

      <div className="workspace">
        <div className="workspace-left">
          <ThumbnailGrid
            photos={photos}
            selectedIndices={selectedIndices}
            onPhotoClick={handleClick}
          />
        </div>

        <MetadataPanel
          selectedCount={selectedIndices.size}
          onWrite={handleWrite}
          disabled={loading || writeProgress !== null}
        />
      </div>

      {showBackupModal && (
        <BackupModal onChoice={handleBackupChoice} />
      )}

      {writeProgress && (
        <ProgressModal progress={writeProgress} />
      )}
    </div>
  )
}

