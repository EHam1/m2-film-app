/**
 * Pro Feature Placeholder Component
 * 
 * Shows upgrade prompt for Pro features
 */

import React from 'react'

interface ProFeaturePlaceholderProps {
  featureName: string
  description: string
}

export default function ProFeaturePlaceholder({ 
  featureName, 
  description 
}: ProFeaturePlaceholderProps) {
  const handleUpgrade = () => {
    // TODO: Open license activation modal or link to purchase page
    window.open('https://m2film.com/pro', '_blank')
  }

  return (
    <div style={{
      padding: '40px',
      textAlign: 'center',
      border: '4px solid var(--color-gray)',
      borderRadius: '8px',
      backgroundColor: 'rgba(255, 255, 255, 0.8)'
    }}>
      <h3 style={{ 
        fontSize: '24px', 
        marginBottom: '16px',
        color: 'var(--color-dark)'
      }}>
        🔒 {featureName}
      </h3>
      <p style={{ 
        fontSize: '16px', 
        marginBottom: '24px',
        color: 'var(--color-gray)'
      }}>
        {description}
      </p>
      <button 
        className="button button-primary"
        onClick={handleUpgrade}
      >
        Upgrade to Pro
      </button>
    </div>
  )
}

