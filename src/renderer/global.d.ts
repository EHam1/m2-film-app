import type { Photo, WriteMetadataArgs, Settings, WriteProgress } from './types'

declare global {
  interface Window {
    electron: {
      selectFiles: () => Promise<{ success: boolean; files?: string[]; error?: string }>;
      getFilePathFromFile: (file: File) => string;
      loadPhotoMetadata: (filePaths: string[]) => Promise<{ success: boolean; photos?: Photo[]; error?: string }>;
      writeMetadata: (args: WriteMetadataArgs) => Promise<{ success: boolean; error?: string }>;
      getSettings: () => Promise<{ success: boolean; settings?: Settings }>;
      saveSettings: (settings: Partial<Settings>) => Promise<{ success: boolean }>;
      searchLocation: (query: string) => Promise<{ success: boolean; results?: any[]; error?: string }>;
      onWriteProgress: (callback: (progress: WriteProgress) => void) => void;
      removeWriteProgressListener: () => void;
    }
  }
}

export {}

