import { useState, useCallback } from 'react'

export function useSelection(totalItems: number) {
  const [selectedIndices, setSelectedIndices] = useState<Set<number>>(new Set())
  const [lastSelectedIndex, setLastSelectedIndex] = useState<number | null>(null)

  const handleClick = useCallback((index: number, shiftKey: boolean) => {
    setSelectedIndices(prev => {
      const newSelection = new Set(prev)

      if (shiftKey && lastSelectedIndex !== null) {
        // Range selection
        const start = Math.min(lastSelectedIndex, index)
        const end = Math.max(lastSelectedIndex, index)
        
        for (let i = start; i <= end; i++) {
          newSelection.add(i)
        }
      } else {
        // Single selection toggle
        if (newSelection.has(index)) {
          newSelection.delete(index)
        } else {
          newSelection.add(index)
        }
      }

      return newSelection
    })

    setLastSelectedIndex(index)
  }, [lastSelectedIndex])

  const selectAll = useCallback(() => {
    const allIndices = new Set<number>()
    for (let i = 0; i < totalItems; i++) {
      allIndices.add(i)
    }
    setSelectedIndices(allIndices)
  }, [totalItems])

  const clearSelection = useCallback(() => {
    setSelectedIndices(new Set())
    setLastSelectedIndex(null)
  }, [])

  return {
    selectedIndices,
    handleClick,
    selectAll,
    clearSelection
  }
}

