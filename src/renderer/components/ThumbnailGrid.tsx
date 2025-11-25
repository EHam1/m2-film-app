import React from 'react'
import type { Photo } from '../types'

interface ThumbnailGridProps {
  photos: Photo[];
  selectedIndices: Set<number>;
  onPhotoClick: (index: number, shiftKey: boolean) => void;
}

export default function ThumbnailGrid({ 
  photos, 
  selectedIndices, 
  onPhotoClick 
}: ThumbnailGridProps) {
  return (
    <div className="thumbnail-container">
      <div className="thumbnail-grid">
        {photos.map((photo, index) => (
          <div
            key={photo.filePath}
            className={`thumbnail-item ${selectedIndices.has(index) ? 'selected' : ''}`}
            onClick={(e) => onPhotoClick(index, e.shiftKey)}
          >
            <img
              src={photo.thumbnail}
              alt={photo.fileName}
              className="thumbnail-image"
            />
            <div className="thumbnail-filename">
              {photo.fileName}
            </div>
          </div>
        ))}
      </div>
    </div>
  )
}

