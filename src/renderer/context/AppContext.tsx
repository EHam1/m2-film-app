/**
 * App Context
 * 
 * Global application state including Pro feature access.
 */

import React, { createContext, useContext, useState, useEffect, ReactNode } from 'react'

interface AppContextType {
  isProEnabled: boolean
  setIsProEnabled: (enabled: boolean) => void
  checkProStatus: () => Promise<void>
}

const AppContext = createContext<AppContextType | undefined>(undefined)

export function AppProvider({ children }: { children: ReactNode }) {
  // Pro features are currently disabled by default
  // TODO: Check license status on app start via licenseManager
  const [isProEnabled, setIsProEnabled] = useState(false)

  const checkProStatus = async () => {
    // TODO: Integrate with license manager
    // const { licenseManager } = await import('../../license/licenseManager')
    // const enabled = await licenseManager.isProEnabled()
    // setIsProEnabled(enabled)
    
    // For now, always false
    setIsProEnabled(false)
  }

  useEffect(() => {
    // Check Pro status on mount
    checkProStatus()
  }, [])

  return (
    <AppContext.Provider value={{ 
      isProEnabled, 
      setIsProEnabled,
      checkProStatus
    }}>
      {children}
    </AppContext.Provider>
  )
}

export function useAppContext() {
  const context = useContext(AppContext)
  if (context === undefined) {
    throw new Error('useAppContext must be used within an AppProvider')
  }
  return context
}

