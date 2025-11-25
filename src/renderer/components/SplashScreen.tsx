import React from 'react'

export default function SplashScreen() {
  return (
    <div className="splash-screen">
      <div className="splash-content">
        <pre className="ascii-art">
{`
   _____
  |     |
  | [O] |
  |_____|
   |   |
   -----
`}
        </pre>
        <h1 className="splash-title">M2 Film</h1>
        <div className="loading-dots">
          <span>.</span>
          <span>.</span>
          <span>.</span>
        </div>
        <p className="splash-text">Initializing</p>
      </div>
    </div>
  )
}

