import React from 'react'

interface BackupModalProps {
  onChoice: (alwaysBackup: boolean) => void;
}

export default function BackupModal({ onChoice }: BackupModalProps) {
  return (
    <div className="modal-overlay">
      <div className="modal-content">
        <div className="modal-header">
          <div className="modal-title">Backup Preference</div>
        </div>
        
        <div className="modal-body">
          <p style={{ marginBottom: '15px', lineHeight: '1.6' }}>
            Before writing metadata to your photos, would you like to create backups 
            of the original files?
          </p>
          <p style={{ fontSize: '14px', color: 'var(--color-gray)', lineHeight: '1.6' }}>
            Backups will be stored in a <code style={{ 
              backgroundColor: 'rgba(0,0,0,0.1)', 
              padding: '2px 6px', 
              borderRadius: '3px',
              fontFamily: 'monospace'
            }}>meta-meta-film-backups</code> folder 
            next to your photos. You can change this setting later.
          </p>
        </div>
        
        <div className="modal-footer">
          <button
            className="button"
            onClick={() => onChoice(false)}
            style={{ backgroundColor: 'var(--color-gray)', color: 'white' }}
          >
            Never Backup
          </button>
          <button
            className="button button-primary"
            onClick={() => onChoice(true)}
          >
            Always Backup (Recommended)
          </button>
        </div>
      </div>
    </div>
  )
}

