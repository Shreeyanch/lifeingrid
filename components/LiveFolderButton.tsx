'use client'

import Link from 'next/link'
import { motion } from 'framer-motion'
import { Space_Mono } from 'next/font/google'

const spaceMono = Space_Mono({ subsets: ['latin'], weight: ['400', '700'] })

export default function LiveFolderButton() {
  return (
    <Link href="/memories" style={{ position: 'fixed', bottom: 28, right: 28, zIndex: 100, textDecoration: 'none' }}>
      <motion.div
        initial={{ rotate: -4 }}
        whileHover={{ scale: 1.08, rotate: 0 }}
        whileTap={{ scale: 0.95 }}
        transition={{ type: 'spring', stiffness: 280, damping: 20 }}
        style={{
          background: 'white',
          padding: '12px 12px 30px',
          borderRadius: 4,
          boxShadow: '0 4px 20px rgba(0,0,0,0.13), 0 1px 4px rgba(0,0,0,0.07)',
          width: 76,
          cursor: 'pointer',
          position: 'relative',
        }}
      >
        {/* Camera icon */}
        <div style={{ fontSize: 30, textAlign: 'center', lineHeight: 1, filter: 'grayscale(1)' }}>📷</div>

        {/* Pulsing live dot */}
        <motion.div
          animate={{ opacity: [1, 0.2, 1] }}
          transition={{ duration: 1.5, repeat: Infinity }}
          style={{
            position: 'absolute',
            top: 8,
            right: 8,
            width: 6,
            height: 6,
            borderRadius: '50%',
            background: '#22c55e',
          }}
        />

        {/* Polaroid label */}
        <div style={{
          position: 'absolute',
          bottom: 8,
          left: 0,
          right: 0,
          textAlign: 'center',
          fontSize: 8,
          fontFamily: spaceMono.style.fontFamily,
          fontWeight: 700,
          color: '#555',
          letterSpacing: 1.5,
          textTransform: 'uppercase',
        }}>
          Live
        </div>
      </motion.div>
    </Link>
  )
}
