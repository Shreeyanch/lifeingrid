'use client'

import { Great_Vibes, DM_Sans, Space_Mono } from 'next/font/google'
import { Printer, Camera, Sparkles } from 'lucide-react'

const greatVibes = Great_Vibes({ weight: '400', subsets: ['latin'] })
const dmSans = DM_Sans({ weight: '500', subsets: ['latin'] })
const spaceMono = Space_Mono({ weight: '400', subsets: ['latin'] })

export default function HeroCenterText() {
  return (
    <div className="absolute inset-0 flex flex-col items-center justify-center z-10 pointer-events-none" style={{ paddingBottom: '80px' }}>

      {/* Logo */}
      <img
        src="/assets/logo.png"
        alt="Life in Grid"
        style={{ width: 'clamp(200px, 22vw, 320px)' }}
      />

      {/* Subtitle */}
      <p
        className={dmSans.className}
        style={{
          marginTop: '36px',
          fontSize: 'clamp(9px, 1.2vw, 12px)',
          letterSpacing: '3px',
          fontWeight: 500,
          textTransform: 'uppercase',
          color: '#1E1E1E',
          textAlign: 'center',
        }}
      >
        RECEIPT STYLE PHOTOBOOTH IN NEPAL
      </p>

      {/* Description */}
      <p
        className={spaceMono.className}
        style={{
          marginTop: '36px',
          fontSize: 'clamp(11px, 1.1vw, 13px)',
          lineHeight: 1.9,
          letterSpacing: '0.2px',
          color: '#1E1E1E',
          textAlign: 'center',
          maxWidth: '340px',
        }}
      >
        Minimal. Nostalgic. Instant.<br />
        Receipt-style photo prints for<br />
        weddings, parties, cafés and events.
      </p>

      {/* Feature icons */}
      <div
        style={{
          marginTop: '56px',
          display: 'flex',
          gap: '70px',
          alignItems: 'center',
        }}
      >
        {[
          { icon: <Printer size={20} strokeWidth={1.5} />, label: 'Instant Prints' },
          { icon: <Camera size={20} strokeWidth={1.5} />, label: 'Timeless Memories' },
          { icon: <Sparkles size={20} strokeWidth={1.5} />, label: 'Unforgettable Moments' },
        ].map(({ icon, label }) => (
          <div key={label} style={{ textAlign: 'center' }}>
            <div style={{ display: 'flex', justifyContent: 'center', color: '#1E1E1E' }}>{icon}</div>
            <p
              className={spaceMono.className}
              style={{
                marginTop: '14px',
                fontSize: '10px',
                color: '#1E1E1E',
                letterSpacing: '0.5px',
              }}
            >
              {label}
            </p>
          </div>
        ))}
      </div>

    </div>
  )
}
