import React, { useState, useRef, useEffect } from 'react'

interface AutocompleteInputProps {
  value: string;
  onChange: (value: string) => void;
  suggestions: string[];
  placeholder?: string;
  label: string;
}

export default function AutocompleteInput({
  value,
  onChange,
  suggestions,
  placeholder,
  label
}: AutocompleteInputProps) {
  const [showDropdown, setShowDropdown] = useState(false)
  const [filteredSuggestions, setFilteredSuggestions] = useState<string[]>([])
  const [isFocused, setIsFocused] = useState(false)
  const wrapperRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    // Only update filtered suggestions and dropdown state if focused
    if (value.trim()) {
      const filtered = suggestions.filter(s =>
        s.toLowerCase().includes(value.toLowerCase())
      )
      setFilteredSuggestions(filtered)
      // ONLY show dropdown if this field is focused
      if (isFocused) {
        setShowDropdown(filtered.length > 0)
      }
    } else {
      setFilteredSuggestions(suggestions)
      if (!isFocused) {
        setShowDropdown(false)
      }
    }
  }, [value, suggestions, isFocused])

  useEffect(() => {
    function handleClickOutside(event: MouseEvent) {
      if (wrapperRef.current && !wrapperRef.current.contains(event.target as Node)) {
        setShowDropdown(false)
      }
    }

    document.addEventListener('mousedown', handleClickOutside)
    return () => document.removeEventListener('mousedown', handleClickOutside)
  }, [])

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    onChange(e.target.value)
  }
  
  const handleBlur = () => {
    setIsFocused(false)
    // Small delay to allow click to register before closing
    setTimeout(() => {
      setShowDropdown(false)
      setFilteredSuggestions([])
    }, 150)
  }

  const handleSuggestionClick = (suggestion: string) => {
    onChange(suggestion)
    // Immediately hide and clear
    setShowDropdown(false)
    setFilteredSuggestions([])
  }

  const handleFocus = () => {
    setIsFocused(true)
    if (suggestions.length > 0 && value.trim() === '') {
      setFilteredSuggestions(suggestions)
      setShowDropdown(true)
    } else if (value.trim()) {
      // Show filtered results if there's already a value
      const filtered = suggestions.filter(s =>
        s.toLowerCase().includes(value.toLowerCase())
      )
      setFilteredSuggestions(filtered)
      setShowDropdown(filtered.length > 0)
    }
  }

  return (
    <div className="form-group">
      <label className="form-label">{label}</label>
      <div className="autocomplete-wrapper" ref={wrapperRef}>
        <input
          type="text"
          className="form-input"
          value={value}
          onChange={handleInputChange}
          onFocus={handleFocus}
          onBlur={handleBlur}
          placeholder={placeholder}
        />
        {showDropdown && filteredSuggestions.length > 0 && (
          <div className="autocomplete-dropdown">
            {filteredSuggestions.map((suggestion, index) => (
              <div
                key={index}
                className="autocomplete-item"
                onMouseDown={(e) => {
                  e.preventDefault() // Prevent blur from firing
                  handleSuggestionClick(suggestion)
                }}
              >
                {suggestion}
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  )
}

