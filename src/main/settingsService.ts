import { app } from 'electron'
import { promises as fs } from 'fs'
import path from 'path'

export interface Settings {
  defaultBackup: boolean;
  geocodingService: string;
  lastUsedFilmStocks: string[];
  lastUsedCameras: string[];
}

const defaultSettings: Settings = {
  defaultBackup: true,
  geocodingService: 'osm',
  lastUsedFilmStocks: [],
  lastUsedCameras: []
}

let settingsCache: Settings | null = null

function getSettingsPath(): string {
  const userDataPath = app.getPath('userData')
  return path.join(userDataPath, 'config.json')
}

export async function loadSettings(): Promise<Settings> {
  if (settingsCache) {
    return settingsCache
  }

  try {
    const settingsPath = getSettingsPath()
    const data = await fs.readFile(settingsPath, 'utf-8')
    settingsCache = { ...defaultSettings, ...JSON.parse(data) }
    return settingsCache
  } catch (error) {
    // File doesn't exist or is invalid, return defaults
    settingsCache = defaultSettings
    return defaultSettings
  }
}

export async function saveSettings(updates: Partial<Settings>): Promise<Settings> {
  const current = await loadSettings()
  const updated = { ...current, ...updates }
  
  try {
    const settingsPath = getSettingsPath()
    await fs.writeFile(settingsPath, JSON.stringify(updated, null, 2), 'utf-8')
    settingsCache = updated
    return updated
  } catch (error) {
    console.error('Failed to save settings:', error)
    throw error
  }
}

export async function getSettings(): Promise<Settings> {
  return loadSettings()
}

