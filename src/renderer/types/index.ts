export interface Photo {
  filePath: string;
  fileName: string;
  thumbnail: string;
  metadata?: PhotoMetadata;
}

export interface PhotoMetadata {
  timestamp?: string;
  location?: LocationData;
  eventName?: string;
  filmStock?: string;
  camera?: string;
}

export interface LocationData {
  name: string;
  latitude: number;
  longitude: number;
}

export interface GeocodingResult {
  display_name: string;
  lat: string;
  lon: string;
}

export interface Settings {
  defaultBackup: boolean;
  geocodingService: string;
  lastUsedFilmStocks: string[];
  lastUsedCameras: string[];
}

export interface WriteMetadataArgs {
  filePaths: string[];
  metadata: PhotoMetadata;
  createBackup: boolean;
}

export interface WriteProgress {
  current: number;
  total: number;
  currentFile: string;
}

