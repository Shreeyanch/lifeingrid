'use client'

import { DM_Sans, Space_Mono } from 'next/font/google'
import { Printer, Camera, Sparkles } from 'lucide-react'

const dmSans = DM_Sans({ weight: '500', subsets: ['latin'] })
const spaceMono = Space_Mono({ weight: '400', subsets: ['latin'] })

const DROP = 'drop-shadow(0px 8px 16px rgba(0,0,0,0.10))'

export default function HeroMobile() {
  return (
    <div style={{ position: 'relative', width: '100vw', height: '100vh', background: '#F5F1EC', overflow: 'hidden' }}>

      {/* ── LEFT COLUMN ───────────────────────────────────────────────────── */}
      <img src="/assets/lamp.avif" alt="" aria-hidden="true"
        style={{ position: 'absolute', top: -55,  left: -80, width: 260, transform: 'rotate(30deg)', zIndex: 3, filter: DROP }} />

      <img src="/assets/film-roll.avif" alt="" aria-hidden="true"
        style={{ position: 'absolute', top: 200, left: -55, width: 150, transform: 'rotate(-8deg)', zIndex: 3, filter: DROP }} />

      <img src="/assets/folder-icon.avif" alt="" aria-hidden="true"
        style={{ position: 'absolute', top: 380, left: -45, width: 120, transform: 'rotate(-6deg)', zIndex: 3, filter: DROP }} />

      <img src="/assets/blue-tube.avif" alt="" aria-hidden="true"
        style={{ position: 'absolute', top: 500, left: -15, width: 110, transform: 'rotate(-10deg)', zIndex: 3, filter: DROP }} />

      {/* ── RIGHT COLUMN ──────────────────────────────────────────────────── */}
      <img src="/assets/vinyl-record.avif" alt="" aria-hidden="true"
        style={{ position: 'absolute', top: 10,  right: -40, width: 180, transform: 'rotate(8deg)',   zIndex: 3, filter: DROP }} />

      <img src="/assets/cursor.avif" alt="" aria-hidden="true"
        style={{ position: 'absolute', top: 160, right: 10,  width: 45,  transform: 'rotate(-12deg)', zIndex: 3, filter: DROP }} />

      <img src="/assets/receipt-photobooth-nepal.png" alt="" aria-hidden="true"
        style={{ position: 'absolute', top: 260, right: -90, width: 215, transform: 'rotate(5deg)',   zIndex: 3, filter: DROP }} />

      <img src="/assets/receiptphoto.png" alt="" aria-hidden="true"
        style={{ position: 'absolute', top: 180, right: -15, width: 65, transform: 'rotate(3deg)', zIndex: 4, filter: 'drop-shadow(0px 12px 24px rgba(0,0,0,0.22))' }} />

      <img src="/assets/lighter.avif" alt="" aria-hidden="true"
        style={{ position: 'absolute', top: 560, right: -10, width: 70,  transform: 'rotate(-16deg)', zIndex: 3, filter: DROP }} />

      {/* ── CENTER — logo, text, icons ────────────────────────────────────── */}
      <div style={{
        position: 'absolute',
        top: 0, left: 0, right: 0, bottom: 0,
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent: 'center',
        marginTop: -80,
        zIndex: 10,
        padding: '0 100px',
        textAlign: 'center',
        pointerEvents: 'none',
      }}>
        <img src="/assets/logo.png" alt="Life in Grid"
          style={{ width: 170, marginBottom: 20 }} />

        <p className={dmSans.className} style={{
          fontSize: '7px',
          letterSpacing: '2px',
          fontWeight: 500,
          textTransform: 'uppercase',
          color: '#1E1E1E',
          marginBottom: 20,
          whiteSpace: 'nowrap',
        }}>
          RECEIPT STYLE PHOTOBOOTH IN NEPAL
        </p>

        <p className={spaceMono.className} style={{
          fontSize: '10px',
          lineHeight: 1.9,
          color: '#1E1E1E',
          marginBottom: 32,
        }}>
          Minimal. Nostalgic. Instant.<br />
          Receipt-style photo prints for<br />
          weddings, parties, cafés and events.
        </p>

        <div style={{ display: 'flex', gap: '24px', alignItems: 'flex-start' }}>
          {[
            { icon: <Printer  size={16} strokeWidth={1.5} />, label: 'Instant Prints' },
            { icon: <Camera   size={16} strokeWidth={1.5} />, label: 'Timeless Memories' },
            { icon: <Sparkles size={16} strokeWidth={1.5} />, label: 'Unforgettable Moments' },
          ].map(({ icon, label }) => (
            <div key={label} style={{ textAlign: 'center', color: '#1E1E1E' }}>
              <div style={{ display: 'flex', justifyContent: 'center' }}>{icon}</div>
              <p className={spaceMono.className} style={{ fontSize: '8px', marginTop: 6, color: '#1E1E1E' }}>
                {label}
              </p>
            </div>
          ))}
        </div>
      </div>

    </div>
  )
}
