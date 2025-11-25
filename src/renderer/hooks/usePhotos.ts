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

  const loadFiles = useCallback(async (filePaths?: string[]) => {
    setLoading(true)
    setError(null)

    try {
      let files: string[] = []

      if (filePaths) {
        files = filePaths
      } else {
        const result = await window.electron.selectFiles()
        
        if (!result.success) {
          setError(result.error || 'Failed to select files')
          setLoading(false)
          return
        }

        files = result.files || []
      }

      if (files.length === 0) {
        setLoading(false)
        return
      }

      const result = await window.electron.loadPhotoMetadata(files)

      if (!result.success) {
        setError(result.error || 'Failed to load photos')
        setLoading(false)
        return
      }

      setPhotos(result.photos || [])
    } catch (err: any) {
      setError(err.message || 'An unexpected error occurred')
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

