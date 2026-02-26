import React, { useEffect, useState } from 'react'

export default function CourtRoom({ onExit }) {
  // generate a sample win percentage when the courtroom loads
  const [percent, setPercent] = useState(0)
  const [target] = useState(() => {
    // deterministic-ish pseudo-random for demo: use time + small offset
    const base = (Date.now() % 61) + 20 // between 20 and 80
    return base
  })

  useEffect(() => {
    let cur = 0
    const step = Math.max(1, Math.floor(target / 60))
    const t = setInterval(() => {
      cur += step
      if (cur >= target) {
        setPercent(target)
        clearInterval(t)
      } else {
        setPercent(cur)
      }
    }, 12)
    return () => clearInterval(t)
  }, [target])

  return (
    <div className="courtroom-root">
      <div className="courtroom-stage">
        <div className="curtain left" />
        <div className="curtain right" />

        <div className="courtroom-content">
          <div className="court-header">
            <div className="judge-bench">Courtroom Session</div>
            <button onClick={onExit} className="back-btn">Back to Chat</button>
          </div>

          <div className="court-panel">
            <div className="case-info">
              <h2 className="case-title">Case: Sample Civil Dispute</h2>
              <p className="case-sub">Overview: This court mode simulates a high-level outcome probability using case data.</p>
            </div>

            <div className="verdict-panel">
              <div className="gauge">
                <div className="gauge-fill" style={{ width: `${percent}%` }} />
                <div className="gauge-center">
                  <div className="percent">{percent}%</div>
                  <div className="verdict-text">{percent >= 50 ? 'Likely Win' : 'Likely Loss'}</div>
                </div>
              </div>

              <div className="witnesses">
                <div className="witness" style={{ animationDelay: '0s' }}>
                  <div className="dot" />
                  <div className="label">Expert testimony</div>
                </div>
                <div className="witness" style={{ animationDelay: '0.15s' }}>
                  <div className="dot" />
                  <div className="label">Document strength</div>
                </div>
                <div className="witness" style={{ animationDelay: '0.3s' }}>
                  <div className="dot" />
                  <div className="label">Legal precedent</div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
