'use client'

import { useEffect, useState, useRef } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { Space_Mono } from 'next/font/google'
import Link from 'next/link'

const spaceMono = Space_Mono({ subsets: ['latin'], weight: ['400', '700'] })

export default function PhotoWall() {
  const [photos, setPhotos] = useState<{ url: string; taken_at: string }[]>([])
  const [isLive, setIsLive] = useState(false)
  const [lastUpdated, setLastUpdated] = useState<Date | null>(null)
  const [selectedPhoto, setSelectedPhoto] = useState<{ url: string; taken_at: string } | null>(null)
  const [downloading, setDownloading] = useState(false)
  const seenUrls = useRef<Set<string>>(new Set())

  const handleDownload = async (url: string, takenAt: string) => {
    setDownloading(true)
    try {
      const res = await fetch(url)
      const blob = await res.blob()
      const blobUrl = URL.createObjectURL(blob)
      const a = document.createElement('a')
      a.href = blobUrl
      a.download = `life-in-grid-${new Date(takenAt).toISOString().slice(0, 10)}.jpg`
      a.click()
      URL.revokeObjectURL(blobUrl)
    } catch {
      window.open(url, '_blank')
    } finally {
      setDownloading(false)
    }
  }

  const fetchPhotos = async () => {
    try {
      const res = await fetch('https://photobooth-api-rust.vercel.app/api/photos')
      const data = await res.json()
      const latest = data.photos.slice(0, 20)
      const newPhotos = latest.filter((p: { url: string; taken_at: string }) => !seenUrls.current.has(p.url))
      if (newPhotos.length > 0) {
        newPhotos.forEach((p: { url: string; taken_at: string }) => seenUrls.current.add(p.url))
        setPhotos(prev => [...newPhotos, ...prev].slice(0, 20))
        setIsLive(true)
        setLastUpdated(new Date())
      }
    } catch (err) {
      console.error('Failed to fetch photos', err)
    }
  }

  useEffect(() => {
    fetchPhotos()
    const interval = setInterval(fetchPhotos, 10000)
    return () => clearInterval(interval)
  }, [])

  useEffect(() => {
    const handleKey = (e: KeyboardEvent) => { if (e.key === 'Escape') setSelectedPhoto(null) }
    window.addEventListener('keydown', handleKey)
    return () => window.removeEventListener('keydown', handleKey)
  }, [])

  return (
    <>
      <style>{`
        .photo-header { padding: 60px 40px 40px; }
        .header-logo { width: 200px; }
        .photo-grid {
          display: grid;
          grid-template-columns: repeat(auto-fill, minmax(220px, 1fr));
          gap: 32px;
          padding: 0 40px 80px;
          max-width: 1200px;
          margin: 0 auto;
        }
        .polaroid-card { padding: 12px 12px 40px; }
        @media (max-width: 640px) {
          .photo-header { padding: 32px 16px 20px; }
          .header-logo { width: 130px; }
          .photo-grid {
            grid-template-columns: repeat(2, 1fr);
            gap: 12px;
            padding: 0 12px 60px;
          }
          .polaroid-card { padding: 6px 6px 28px; }
        }
      `}</style>

      <div style={{ background: '#F5F1EC', minHeight: '100vh' }}>
        {/* Back button */}
        <Link
          href="/"
          style={{
            position: 'fixed',
            top: 20,
            left: 20,
            zIndex: 100,
            display: 'flex',
            alignItems: 'center',
            gap: 6,
            background: 'white',
            border: '1px solid #E8E0D0',
            borderRadius: 40,
            padding: '7px 14px',
            textDecoration: 'none',
            fontFamily: spaceMono.style.fontFamily,
            fontSize: 10,
            color: '#1A1A1A',
            letterSpacing: 1.5,
            textTransform: 'uppercase',
            boxShadow: '0 2px 8px rgba(0,0,0,0.07)',
          }}
        >
          ← Back
        </Link>

        {/* Header */}
        <div className="photo-header" style={{ textAlign: 'center' }}>
          <Link href="/" style={{ display: 'inline-block', marginBottom: 20 }}>
            <img src="/assets/logo.png" className="header-logo" style={{ display: 'block' }} alt="Life in Grid" />
          </Link>

          <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', gap: 8, marginBottom: 12 }}>
            <motion.div
              animate={{ opacity: [1, 0.3, 1] }}
              transition={{ duration: 1.5, repeat: Infinity }}
              style={{ width: 8, height: 8, borderRadius: '50%', background: isLive ? '#22c55e' : '#999' }}
            />
            <span style={{ fontSize: 11, fontFamily: spaceMono.style.fontFamily, letterSpacing: 2, color: '#1A1A1A', textTransform: 'uppercase' }}>
              {isLive ? 'Live — photos printing now' : 'Waiting for photos...'}
            </span>
          </div>

          {lastUpdated && (
            <div style={{ fontSize: 10, color: '#999', fontFamily: spaceMono.style.fontFamily }}>
              Last updated: {lastUpdated.toLocaleTimeString()}
            </div>
          )}
        </div>

        {/* Empty state */}
        {photos.length === 0 && (
          <div style={{ textAlign: 'center', padding: '80px 40px', fontFamily: spaceMono.style.fontFamily, color: '#999', fontSize: 13 }}>
            <motion.div
              animate={{ y: [0, -8, 0] }}
              transition={{ duration: 2, repeat: Infinity, ease: 'easeInOut' }}
              style={{ fontSize: 40, marginBottom: 20 }}
            >
              🧾
            </motion.div>
            <p>Photos will appear here as people use the booth.</p>
            <p style={{ fontSize: 10, marginTop: 8, letterSpacing: 2 }}>CHECKING EVERY 10 SECONDS</p>
          </div>
        )}

        {/* Photo grid */}
        <div className="photo-grid">
          <AnimatePresence>
            {photos.map((photo, i) => {
              const rotation = (i % 2 === 0 ? 1 : -1) * (Math.random() * 3 + 1)
              return (
                <motion.div
                  key={photo.url}
                  className="polaroid-card"
                  initial={{ opacity: 0, scale: 0.8, y: 20 }}
                  animate={{ opacity: 1, scale: 1, y: 0 }}
                  exit={{ opacity: 0, scale: 0.8 }}
                  transition={{ duration: 0.5, delay: i * 0.05 }}
                  whileHover={{ scale: 1.04, rotate: 0, zIndex: 10 }}
                  onClick={() => setSelectedPhoto(photo)}
                  style={{
                    background: 'white',
                    borderRadius: 4,
                    rotate: `${rotation}deg`,
                    boxShadow: '0 4px 20px rgba(0,0,0,0.10), 0 1px 4px rgba(0,0,0,0.06)',
                    cursor: 'pointer',
                    position: 'relative',
                  }}
                >
                  <img
                    src={photo.url}
                    alt="Life in Grid photobooth"
                    style={{ width: '100%', display: 'block', borderRadius: 2, filter: 'grayscale(1)' }}
                  />
                  <div style={{
                    position: 'absolute',
                    bottom: 8,
                    left: 0,
                    right: 0,
                    textAlign: 'center',
                    fontSize: 9,
                    fontFamily: spaceMono.style.fontFamily,
                    color: '#999',
                    letterSpacing: 1,
                  }}>
                    {new Date(photo.taken_at).toLocaleDateString('en-US', { month: 'short', day: 'numeric' })}
                  </div>
                </motion.div>
              )
            })}
          </AnimatePresence>
        </div>
      </div>

      {/* Lightbox */}
      <AnimatePresence>
        {selectedPhoto && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={() => setSelectedPhoto(null)}
            style={{
              position: 'fixed',
              inset: 0,
              background: 'rgba(0,0,0,0.88)',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              zIndex: 1000,
              padding: 24,
            }}
          >
            <motion.div
              initial={{ scale: 0.85, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.85, opacity: 0 }}
              transition={{ duration: 0.25 }}
              onClick={e => e.stopPropagation()}
              style={{
                background: 'white',
                padding: '14px 14px 52px',
                borderRadius: 4,
                maxWidth: '88vw',
                position: 'relative',
                boxShadow: '0 24px 64px rgba(0,0,0,0.5)',
              }}
            >
              <img
                src={selectedPhoto.url}
                alt="Life in Grid photobooth"
                style={{
                  display: 'block',
                  maxWidth: '80vw',
                  maxHeight: '72vh',
                  borderRadius: 2,
                  filter: 'grayscale(1) contrast(0.78) brightness(1.06)',
                }}
              />
              <div style={{
                position: 'absolute',
                bottom: 0,
                left: 0,
                right: 0,
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'space-between',
                padding: '0 14px',
                height: 52,
              }}>
                <span style={{
                  fontSize: 10,
                  fontFamily: spaceMono.style.fontFamily,
                  color: '#999',
                  letterSpacing: 2,
                }}>
                  {new Date(selectedPhoto.taken_at).toLocaleDateString('en-US', { month: 'long', day: 'numeric', year: 'numeric' })}
                </span>
                <button
                  onClick={() => handleDownload(selectedPhoto.url, selectedPhoto.taken_at)}
                  disabled={downloading}
                  style={{
                    background: '#1A1A1A',
                    color: 'white',
                    border: 'none',
                    borderRadius: 40,
                    padding: '5px 12px',
                    fontSize: 9,
                    fontFamily: spaceMono.style.fontFamily,
                    letterSpacing: 1.5,
                    textTransform: 'uppercase',
                    cursor: downloading ? 'wait' : 'pointer',
                    opacity: downloading ? 0.6 : 1,
                    display: 'flex',
                    alignItems: 'center',
                    gap: 4,
                  }}
                >
                  {downloading ? '...' : '↓ Save'}
                </button>
              </div>
              <button
                onClick={() => setSelectedPhoto(null)}
                style={{
                  position: 'absolute',
                  top: -14,
                  right: -14,
                  width: 30,
                  height: 30,
                  borderRadius: '50%',
                  background: '#1A1A1A',
                  color: 'white',
                  border: 'none',
                  cursor: 'pointer',
                  fontSize: 13,
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                }}
              >
                ✕
              </button>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  )
}
