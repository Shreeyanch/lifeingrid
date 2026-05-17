'use client'

import { useState, useEffect } from 'react'
import { motion } from 'framer-motion'
import { DM_Sans, Space_Mono, Playfair_Display } from 'next/font/google'

const dmSans    = DM_Sans({ weight: ['400', '500'], subsets: ['latin'] })
const spaceMono = Space_Mono({ weight: '400', subsets: ['latin'] })
const playfair  = Playfair_Display({ weight: ['400', '700'], style: ['normal', 'italic'], subsets: ['latin'] })

function Illustration({ mobile }: { mobile: boolean }) {
  const [err, setErr] = useState(false)
  if (err) {
    return (
      <div style={{
        width: mobile ? '55%' : '75%', maxWidth: mobile ? 220 : 320,
        aspectRatio: '3/4',
        border: '2px dashed #1A1A1A',
        borderRadius: 8,
        display: 'flex', alignItems: 'center', justifyContent: 'center',
        fontSize: 11, color: '#1A1A1A', fontFamily: spaceMono.style.fontFamily,
        position: 'relative', zIndex: 2,
      }}>
        our-story-illustration.gif
      </div>
    )
  }
  return (
    <motion.img
      src="/assets/our-story-illustration.gif"
      alt="Shreeyanch and Shreejita"
      initial={{ opacity: 0, scale: 0.95 }}
      whileInView={{ opacity: 1, scale: 1 }}
      transition={{ duration: 0.8, delay: 0.3 }}
      viewport={{ once: true }}
      onError={() => setErr(true)}
      style={{
        width: mobile ? '55%' : '75%',
        maxWidth: mobile ? 220 : 320,
        position: 'relative', zIndex: 2,
        filter: 'drop-shadow(0px 4px 12px rgba(0,0,0,0.08))',
      }}
    />
  )
}

const GRID_BG = `
  linear-gradient(rgba(26,31,204,0.06) 1px, transparent 1px),
  linear-gradient(90deg, rgba(26,31,204,0.06) 1px, transparent 1px)
`

export default function OurStory() {
  const [mobile, setMobile] = useState(false)

  useEffect(() => {
    const check = () => setMobile(window.innerWidth < 810)
    check()
    window.addEventListener('resize', check)
    return () => window.removeEventListener('resize', check)
  }, [])

  return (
    <section style={{
      background: '#F5F1EC',
      width: '100%',
      marginTop: mobile ? -220 : 0,
      padding: mobile ? '16px 24px 80px' : '80px 40px 120px',
      display: 'flex',
      flexDirection: 'column',
      alignItems: 'center',
      position: 'relative',
      zIndex: 1,
    }}>

      {/* Scroll label */}
      <div style={{
        fontSize: 10,
        letterSpacing: 3,
        textTransform: 'uppercase',
        color: '#1A1A1A',
        fontFamily: spaceMono.style.fontFamily,
        marginBottom: 32,
      }}>
        OUR STORY
      </div>

      {/* Book */}
      <motion.div
        initial={{ opacity: 0, y: 40 }}
        whileInView={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.9, ease: 'easeOut' }}
        viewport={{ once: true }}
        style={{
          width: '100%',
          maxWidth: mobile ? 'none' : 1100,
          margin: mobile ? '0 20px' : undefined,
          minHeight: 600,
          display: 'grid',
          gridTemplateColumns: mobile ? '1fr' : '1fr 1fr',
          borderRadius: 8,
          overflow: 'hidden',
          position: 'relative',
          border: mobile ? '1.5px solid #E8E0D0' : undefined,
          boxShadow: mobile
            ? '0 4px 24px rgba(0,0,0,0.08)'
            : `
              0 1px 1px rgba(0,0,0,0.15),
              0 2px 2px rgba(0,0,0,0.12),
              0 4px 4px rgba(0,0,0,0.10),
              0 8px 8px rgba(0,0,0,0.08),
              0 16px 32px rgba(0,0,0,0.06),
              -4px 0 8px rgba(0,0,0,0.04)
            `,
        }}
      >
        {/* Book spine */}
        {!mobile && (
          <div style={{
            position: 'absolute',
            left: '50%',
            top: 0, bottom: 0,
            width: 12,
            transform: 'translateX(-50%)',
            background: 'linear-gradient(90deg, rgba(0,0,0,0.08) 0%, rgba(0,0,0,0.02) 40%, rgba(0,0,0,0.06) 60%, rgba(0,0,0,0.12) 100%)',
            zIndex: 10,
          }} />
        )}

        {/* ── LEFT PAGE ─────────────────────────────────────────────────── */}
        <div style={{
          background: '#FAF8F4',
          backgroundImage: GRID_BG,
          backgroundSize: '28px 28px',
          padding: mobile ? '32px 24px' : '60px 48px',
          display: 'flex',
          flexDirection: 'column',
          justifyContent: 'center',
          gap: 28,
          position: 'relative',
          borderTop: mobile ? 'none' : '3px solid #E8E0D0',
          borderBottom: mobile ? '1.5px solid #E8E0D0' : '3px solid #E8E0D0',
          borderLeft: mobile ? 'none' : '3px solid #C9A96E',
        }}>
          <div style={{
            fontSize: 11,
            letterSpacing: 2,
            color: '#1A1A1A',
            fontFamily: spaceMono.style.fontFamily,
            textTransform: 'uppercase',
          }}>
            — est. Kathmandu, 2026
          </div>

          <h2 style={{
            fontFamily: playfair.style.fontFamily,
            fontSize: 'clamp(32px, 3.5vw, 52px)',
            fontWeight: 400,
            fontStyle: 'italic',
            color: '#1A1A1A',
            lineHeight: 1.25,
            margin: 0,
          }}>
            <span style={{ fontStyle: 'italic', fontWeight: 400 }}>Siblings who argue about</span>
            <br />
            <span style={{ fontStyle: 'normal', fontWeight: 700 }}>everything — except this.</span>
          </h2>

          <p style={{
            fontFamily: spaceMono.style.fontFamily,
            fontSize: 'clamp(11px, 1.1vw, 13px)',
            lineHeight: 2,
            color: '#6B6B6B',
            maxWidth: 380,
            margin: 0,
          }}>
            Life in Grid started the way most good things do —
            between siblings, with a bad idea that turned into
            a great one. We wanted people to walk away from
            moments with something real. Not a file. Not a
            story. A receipt. A print. A memory you can hold.
          </p>

          <div style={{
            borderTop: '1px dashed #1A1A1A',
            paddingTop: 20,
            display: 'flex',
            flexDirection: 'column',
            gap: 6,
          }}>
            <div style={{ fontSize: 9, fontFamily: spaceMono.style.fontFamily, color: '#1A1A1A', letterSpacing: 3, textTransform: 'uppercase' }}>
              Founded by
            </div>
            <div style={{ fontSize: 18, fontFamily: playfair.style.fontFamily, fontStyle: 'italic', color: '#1A1A1A' }}>
              Shreeyanch & Shreejita
            </div>
            <div style={{ fontSize: 9, fontFamily: spaceMono.style.fontFamily, color: '#bbb', letterSpacing: 2 }}>
              Kathmandu, Nepal — 2026
            </div>
          </div>

        </div>

        {/* ── RIGHT PAGE ────────────────────────────────────────────────── */}
        <div style={{
          background: '#FAF8F4',
          backgroundImage: GRID_BG,
          backgroundSize: '28px 28px',
          padding: mobile ? '24px' : '40px',
          position: 'relative',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          minHeight: mobile ? 380 : 600,
          borderTop: mobile ? 'none' : '3px solid #E8E0D0',
          borderBottom: mobile ? 'none' : '3px solid #E8E0D0',
          borderRight: mobile ? 'none' : '3px solid #C9A96E',
        }}>
          <Illustration mobile={mobile} />

          <motion.img
            src="/assets/madeinnepal.png"
            alt="Made in Nepal"
            initial={{ opacity: 0, rotate: 0, scale: 0.9 }}
            whileInView={{ opacity: 1, rotate: 0, scale: 1 }}
            transition={{ duration: 0.6, delay: 0.9 }}
            viewport={{ once: true }}
            style={{
              position: 'absolute',
              top: 20,
              right: 20,
              width: mobile ? 90 : 160,
              zIndex: 5,
            }}
          />

          {/* SHREEYANCH — above boy's head, left side */}
          <motion.div
            style={{ position: 'absolute', top: mobile ? 80 : 240, left: mobile ? 20 : 80, zIndex: 5, display: 'flex', flexDirection: 'column', alignItems: 'center', gap: 4 }}
            animate={{ y: [0, -4, 0] }}
            transition={{ duration: 3, repeat: Infinity, ease: 'easeInOut' }}
          >
            <div style={{ display: 'flex', alignItems: 'center', gap: 8, background: '#1A1A1A', borderRadius: 40, padding: '5px 16px 5px 5px' }}>
              <img src="/assets/shreeyanch.png" alt="Shreeyanch"
                style={{ width: 38, height: 38, borderRadius: '50%', objectFit: 'cover', border: '2px solid rgba(255,255,255,0.3)' }} />
              <span style={{ color: 'white', fontSize: 13, fontFamily: spaceMono.style.fontFamily, whiteSpace: 'nowrap' }}>Shreeyanch</span>
            </div>
            <img src="/assets/cursor.avif" alt="" aria-hidden="true" style={{ width: 44, transform: 'rotate(135deg)', marginTop: 2, filter: 'brightness(0)' }} />
          </motion.div>

          {/* SHREEJITA — above girl's head, right side */}
          <motion.div
            style={{ position: 'absolute', top: mobile ? 100 : 270, right: mobile ? 20 : 100, zIndex: 5, display: 'flex', flexDirection: 'column', alignItems: 'center', gap: 4 }}
            animate={{ y: [0, -4, 0] }}
            transition={{ duration: 3.5, repeat: Infinity, ease: 'easeInOut', delay: 0.5 }}
          >
            <div style={{ display: 'flex', alignItems: 'center', gap: 8, background: '#1A1A1A', borderRadius: 40, padding: '5px 16px 5px 5px' }}>
              <img src="/assets/shreejita.png" alt="Shreejita"
                style={{ width: 38, height: 38, borderRadius: '50%', objectFit: 'cover', border: '2px solid rgba(255,255,255,0.3)' }} />
              <span style={{ color: 'white', fontSize: 13, fontFamily: spaceMono.style.fontFamily, whiteSpace: 'nowrap' }}>Shreejita</span>
            </div>
            <img src="/assets/cursor.avif" alt="" aria-hidden="true" style={{ width: 44, transform: 'rotate(180deg)', marginTop: 2, filter: 'brightness(0)' }} />
          </motion.div>

          {/* Paper note 1 — lined, top left */}
          <motion.div
            initial={{ opacity: 0, rotate: -6, y: 10 }}
            whileInView={{ opacity: 1, rotate: -6, y: 0 }}
            transition={{ duration: 0.6, delay: 0.5 }}
            viewport={{ once: true }}
            style={{
              position: 'absolute',
              top: mobile ? 16 : 30, left: mobile ? 10 : 20,
              width: mobile ? 110 : 140,
              background: '#FFFDF7',
              border: '0.5px solid #e0d9c8',
              borderRadius: 4,
              padding: '16px 14px',
              zIndex: 3,
              boxShadow: '0 4px 16px rgba(0,0,0,0.08)',
              backgroundImage: 'repeating-linear-gradient(transparent, transparent 22px, rgba(26,31,204,0.12) 22px, rgba(26,31,204,0.12) 23px)',
            }}
          >
            <div style={{
              fontFamily: playfair.style.fontFamily,
              fontStyle: 'italic',
              fontSize: 16,
              color: '#1A1A1A',
              lineHeight: 1.5,
            }}>
              print your<br />moment.
            </div>
          </motion.div>

          {/* Paper note 2 — grid, bottom right */}
          <motion.div
            initial={{ opacity: 0, rotate: 8, y: 10 }}
            whileInView={{ opacity: 1, rotate: 8, y: 0 }}
            transition={{ duration: 0.6, delay: 0.65 }}
            viewport={{ once: true }}
            style={{
              position: 'absolute',
              bottom: mobile ? 20 : 40, right: mobile ? 10 : 20,
              width: mobile ? 100 : 130,
              background: '#F0F0F0',
              border: '0.5px solid #ddd',
              borderRadius: 4,
              padding: '14px 12px',
              zIndex: 3,
              boxShadow: '0 4px 16px rgba(0,0,0,0.08)',
              backgroundImage: `
                linear-gradient(rgba(0,0,0,0.06) 1px, transparent 1px),
                linear-gradient(90deg, rgba(0,0,0,0.06) 1px, transparent 1px)
              `,
              backgroundSize: '14px 14px',
            }}
          >
            <div style={{
              fontFamily: spaceMono.style.fontFamily,
              fontSize: 11,
              color: '#1A1A1A',
              lineHeight: 1.7,
            }}>
              step in.<br />smile.<br />keep it.
            </div>
          </motion.div>

          {/* Paper note 3 — receipt strip, bottom left */}
          <motion.div
            initial={{ opacity: 0, rotate: -4, y: 10 }}
            whileInView={{ opacity: 1, rotate: -4, y: 0 }}
            transition={{ duration: 0.6, delay: 0.8 }}
            viewport={{ once: true }}
            style={{
              position: 'absolute',
              bottom: mobile ? 20 : 50, left: mobile ? 10 : 30,
              width: mobile ? 90 : 110,
              background: 'white',
              borderRadius: 3,
              padding: '12px 10px',
              zIndex: 3,
              boxShadow: '0 4px 16px rgba(0,0,0,0.08)',
            }}
          >
            <div style={{ fontFamily: spaceMono.style.fontFamily, fontSize: 8, color: '#1A1A1A', letterSpacing: 2, marginBottom: 8, textTransform: 'uppercase' }}>
              LIFE IN GRID
            </div>
            <div style={{ width: '100%', height: 1, background: '#eee', marginBottom: 8 }} />
            <div style={{ fontFamily: spaceMono.style.fontFamily, fontSize: 8, color: '#999', lineHeight: 1.9 }}>
              1x memory made<br />
              1x story told<br />
              ————————<br />
              thank you ♥
            </div>
          </motion.div>
        </div>
      </motion.div>
    </section>
  )
}
