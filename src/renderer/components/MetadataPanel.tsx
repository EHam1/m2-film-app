import React, { useState, useEffect } from 'react'
import LocationSearch from './LocationSearch'
import AutocompleteInput from './AutocompleteInput'
import type { PhotoMetadata, Settings } from '../types'

interface MetadataPanelProps {
  selectedCount: number;
  onWrite: (metadata: PhotoMetadata, createBackup: boolean) => void;
  disabled: boolean;
}

const FILM_STOCK_PRESETS = [
  'Kodak Portra 400',
  'Kodak Portra 800',
  'Kodak Portra 160',
  'Kodak Tri-X 400',
  'Kodak Gold 200',
  'Kodak Ektar 100',
  'Ilford HP5 Plus',
  'Ilford Delta 3200',
  'Ilford FP4 Plus',
  'Fuji Pro 400H',
  'Fuji Superia 400',
  'Cinestill 800T',
  'Cinestill 50D',
  'Lomography Color Negative 400',
  'Lomography Color Negative 800'
]

const CAMERA_PRESETS = [
  'Leica M6',
  'Leica M3',
  'Canon AE-1',
  'Canon AE-1 Program',
  'Nikon FM2',
  'Nikon F3',
  'Pentax K1000',
  'Pentax 67',
  'Olympus OM-1',
  'Olympus Trip 35',
  'Contax T2',
  'Contax T3',
  'Yashica T4',
  'Minolta X-700',
  'Mamiya 645',
  'Hasselblad 500C/M'
]

export default function MetadataPanel({ 
  selectedCount, 
  onWrite, 
  disabled 
}: MetadataPanelProps) {
  const [timestamp, setTimestamp] = useState('')
  const [location, setLocation] = useState<PhotoMetadata['location']>(undefined)
  const [eventName, setEventName] = useState('')
  const [filmStock, setFilmStock] = useState('')
  const [camera, setCamera] = useState('')
  const [createBackup, setCreateBackup] = useState(true)
  const [settings, setSettings] = useState<Settings | null>(null)

  useEffect(() => {
    // Load settings on mount
    window.electron.getSettings().then(result => {
      if (result.success && result.settings) {
        setSettings(result.settings)
        setCreateBackup(result.settings.defaultBackup)
      }
    })
  }, [])

  const handleWrite = () => {
    const metadata: PhotoMetadata = {}

    if (timestamp) {
      metadata.timestamp = timestamp
    }
    if (location) {
      metadata.location = location
    }
    if (eventName) {
      metadata.eventName = eventName
    }
    if (filmStock) {
      metadata.filmStock = filmStock
    }
    if (camera) {
      metadata.camera = camera
    }

    onWrite(metadata, createBackup)
  }

  const hasAnyMetadata = timestamp || location || eventName || filmStock || camera

  const getFilmStockSuggestions = () => {
    const recent = settings?.lastUsedFilmStocks || []
    return [...new Set([...recent, ...FILM_STOCK_PRESETS])]
  }

  const getCameraSuggestions = () => {
    const recent = settings?.lastUsedCameras || []
    return [...new Set([...recent, ...CAMERA_PRESETS])]
  }

  return (
    <div className="workspace-right">
      <div style={{ marginBottom: '20px' }}>
        <div style={{ 
          fontSize: '18px', 
          fontWeight: 600, 
          marginBottom: '8px',
          textTransform: 'uppercase',
          letterSpacing: '1px'
        }}>
          Edit Metadata
        </div>
        {selectedCount > 0 && (
          <div style={{ fontSize: '14px', color: 'var(--color-gray)' }}>
            Editing {selectedCount} photo{selectedCount !== 1 ? 's' : ''}
          </div>
        )}
      </div>

      <div className="metadata-form">
        <div className="form-group">
          <label className="form-label">Timestamp</label>
          <input
            type="datetime-local"
            className="form-input"
            value={timestamp}
            onChange={(e) => setTimestamp(e.target.value)}
            disabled={disabled}
          />
        </div>

        <LocationSearch
          value={location}
          onChange={setLocation}
        />

        <div className="form-group">
          <label className="form-label">Event / Roll Name</label>
          <input
            type="text"
            className="form-input"
            value={eventName}
            onChange={(e) => setEventName(e.target.value)}
            placeholder="e.g., Japan Trip - Roll 3"
            disabled={disabled}
          />
        </div>

        <AutocompleteInput
          label="Film Stock"
          value={filmStock}
          onChange={setFilmStock}
          suggestions={getFilmStockSuggestions()}
          placeholder="e.g., Portra 400"
        />

        <AutocompleteInput
          label="Camera"
          value={camera}
          onChange={setCamera}
          suggestions={getCameraSuggestions()}
          placeholder="e.g., Leica M6"
        />

        <div className="checkbox-group">
          <input
            type="checkbox"
            id="backup-checkbox"
            checked={createBackup}
            onChange={(e) => setCreateBackup(e.target.checked)}
            disabled={disabled}
          />
          <label htmlFor="backup-checkbox">
            Backup originals before writing
          </label>
        </div>

        <button
          className="button button-primary"
          onClick={handleWrite}
          disabled={disabled || selectedCount === 0 || !hasAnyMetadata}
          style={{ width: '100%', marginTop: '10px' }}
        >
          {disabled ? 'Processing...' : 'Write Changes'}
        </button>
      </div>
    </div>
  )
}

