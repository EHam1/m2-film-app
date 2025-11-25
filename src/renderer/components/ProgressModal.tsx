import React from 'react'
import type { WriteProgress } from '../types'

interface ProgressModalProps {
  progress: WriteProgress;
}

export default function ProgressModal({ progress }: ProgressModalProps) {
  const percentage = (progress.current / progress.total) * 100

  return (
    <div className="modal-overlay">
      <div className="modal-content scan-line">
        <div className="modal-header">
          <div className="modal-title">Lab Processing...</div>
        </div>
        
        <div className="modal-body">
          <div className="progress-bar">
            <div 
              className="progress-bar-fill" 
              style={{ width: `${percentage}%` }}
            />
          </div>
          
          <div className="progress-text">
            Processing {progress.current} of {progress.total}
          </div>
          
          <div style={{ 
            textAlign: 'center', 
            fontSize: '13px', 
            color: 'var(--color-gray)',
            marginTop: '10px',
            fontFamily: 'Courier New, monospace'
          }}>
            {progress.currentFile}
          </div>
        </div>
      </div>
    </div>
  )
}

