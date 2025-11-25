import React, { useState } from 'react'
import type { LocationData, GeocodingResult } from '../types'

interface LocationSearchProps {
  value: LocationData | undefined;
  onChange: (location: LocationData | undefined) => void;
}

export default function LocationSearch({ value, onChange }: LocationSearchProps) {
  const [searchQuery, setSearchQuery] = useState('')
  const [results, setResults] = useState<GeocodingResult[]>([])
  const [searching, setSearching] = useState(false)
  const [showResults, setShowResults] = useState(false)

  const handleSearch = async () => {
    if (!searchQuery.trim()) return

    setSearching(true)
    try {
      const result = await window.electron.searchLocation(searchQuery)
      
      if (result.success && result.results) {
        setResults(result.results)
        setShowResults(true)
      }
    } catch (error) {
      console.error('Geocoding failed:', error)
    } finally {
      setSearching(false)
    }
  }

  const handleResultClick = (result: GeocodingResult) => {
    onChange({
      name: result.display_name,
      latitude: parseFloat(result.lat),
      longitude: parseFloat(result.lon)
    })
    setShowResults(false)
    setSearchQuery('')
    setResults([])
  }

  const handleClear = () => {
    onChange(undefined)
    setSearchQuery('')
    setResults([])
    setShowResults(false)
  }

  const handleKeyPress = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter') {
      handleSearch()
    }
  }

  return (
    <div className="form-group">
      <label className="form-label">Location</label>
      
      {value ? (
        <div>
          <div style={{ 
            padding: '10px', 
            backgroundColor: 'rgba(90, 200, 200, 0.2)', 
            borderRadius: '4px',
            marginBottom: '8px',
            fontSize: '13px'
          }}>
            <div style={{ fontWeight: 600, marginBottom: '4px' }}>
              {value.name}
            </div>
            <div style={{ fontSize: '12px', color: 'var(--color-gray)' }}>
              {value.latitude.toFixed(6)}, {value.longitude.toFixed(6)}
            </div>
          </div>
          <button
            type="button"
            className="button button-secondary"
            onClick={handleClear}
            style={{ width: '100%' }}
          >
            Clear Location
          </button>
        </div>
      ) : (
        <>
          <div style={{ display: 'flex', gap: '8px' }}>
            <input
              type="text"
              className="form-input"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              onKeyPress={handleKeyPress}
              placeholder="Search for a location..."
              style={{ flex: 1 }}
            />
            <button
              type="button"
              className="button button-primary"
              onClick={handleSearch}
              disabled={searching || !searchQuery.trim()}
            >
              {searching ? 'Searching...' : 'Search'}
            </button>
          </div>

          {showResults && results.length > 0 && (
            <div className="location-results">
              {results.map((result, index) => (
                <div
                  key={index}
                  className="location-result-item"
                  onClick={() => handleResultClick(result)}
                >
                  {result.display_name}
                </div>
              ))}
            </div>
          )}

          {showResults && results.length === 0 && (
            <div style={{ 
              padding: '10px', 
              fontSize: '13px', 
              color: 'var(--color-gray)',
              marginTop: '8px'
            }}>
              No results found
            </div>
          )}
        </>
      )}
    </div>
  )
}

