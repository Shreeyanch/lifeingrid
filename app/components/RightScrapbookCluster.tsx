"use client";

// ─── rendered objects ─────────────────────────────────────────────────────────
// 1. Vinyl music card   — built div, z:1,  top:40,  right:80
// 2. Vinyl record       — vinyl-record.avif, z:2, top:45, right:95
// 3. Cursor             — cursor.avif, z:3, top:90, right:290
// 4. Folder             — folder-icon.avif, z:4, top:260, right:240
//    └ hover icons: figma-icon.avif, framer-icon.avif, cursor-app-icon.avif
// 5. Toolbar            — toolbar-icons.avif, z:5, top:200, right:8
// 6. Airdrop card       — airdrop-card.png, z:6, top:420, right:80
// 7. Photobooth         — receipt-photobooth-nepal.png, z:7, top:370, right:270
// 8. Keyring            — keyring.png, z:8, top:580, right:70

import { useRef, useState, useEffect } from "react";
import {
  motion,
  useMotionValue,
  useSpring,
  useTransform,
} from "framer-motion";

// ─── constants ────────────────────────────────────────────────────────────────

const SPRING     = { damping: 40, stiffness: 120 };
const DROP       = "drop-shadow(0px 8px 16px rgba(0,0,0,0.10))";
const DROP_H     = "drop-shadow(0px 12px 24px rgba(0,0,0,0.18))";
const EASE_EXPO  = [0.22, 1, 0.36, 1] as [number, number, number, number];
const HOVER_FAST = { duration: 0.3, ease: "easeOut" } as const;

// ─── asset helpers ─────────────────────────────────────────────────────────────

function Placeholder({ label, width }: { label: string; width: number }) {
  return (
    <div
      style={{
        width,
        height: Math.round(width * 0.75),
        border: "2px dashed #999",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        fontSize: 10,
        color: "#999",
        textAlign: "center",
        padding: 4,
        boxSizing: "border-box",
      }}
    >
      {label}
    </div>
  );
}

function Asset({
  src,
  label,
  width,
  imgStyle,
}: {
  src: string;
  label: string;
  width: number;
  imgStyle?: React.CSSProperties;
}) {
  const [err, setErr] = useState(false);
  if (err) return <Placeholder label={label} width={width} />;
  return (
    <img
      src={src}
      alt=""
      aria-hidden="true"
      onError={() => {
        console.log("[Asset missing]", src);
        setErr(true);
      }}
      style={{ width, height: "auto", display: "block", ...imgStyle }}
    />
  );
}

// ─── component ────────────────────────────────────────────────────────────────

export default function RightScrapbookCluster() {
  const containerRef                     = useRef<HTMLDivElement>(null);
  const [folderHovered, setFolderHovered] = useState(false);
  const [vinylSpeed,    setVinylSpeed]    = useState(20);

  const rawX = useMotionValue(0);
  const rawY = useMotionValue(0);

  const smoothX = useSpring(rawX, SPRING);
  const smoothY = useSpring(rawY, SPRING);

  // Depth-layered parallax
  const bgX  = useTransform(smoothX, [-1, 1], [-2, 2]);   // z1–3
  const bgY  = useTransform(smoothY, [-1, 1], [-2, 2]);
  const midX = useTransform(smoothX, [-1, 1], [-4, 4]);   // z4–6
  const midY = useTransform(smoothY, [-1, 1], [-4, 4]);
  const fgX  = useTransform(smoothX, [-1, 1], [-6, 6]);   // z7–9
  const fgY  = useTransform(smoothY, [-1, 1], [-6, 6]);

  useEffect(() => {
    const onMove = (e: MouseEvent) => {
      const rect = containerRef.current?.getBoundingClientRect();
      if (!rect) return;
      rawX.set((e.clientX - (rect.left + rect.width  / 2)) / (rect.width  / 2));
      rawY.set((e.clientY - (rect.top  + rect.height / 2)) / (rect.height / 2));
    };
    window.addEventListener("mousemove", onMove);
    return () => window.removeEventListener("mousemove", onMove);
  }, [rawX, rawY]);

  return (
    <div
      ref={containerRef}
      style={{
        position: "absolute",
        top: 0,
        right: 0,
        width: "55vw",
        height: "100vh",
        overflow: "hidden",
        pointerEvents: "none",
      }}
    >
      {/* ── 1. VINYL MUSIC CARD (built div, z:1) ──────────────────────────── */}
      <div
        style={{
          position: "absolute",
          top: 20,
          right: 25,
          width: 220,
          height: 260,
          borderRadius: 24,
          background: "rgba(255,255,255,0.65)",
          border: "1px solid rgba(0,0,0,0.06)",
          backdropFilter: "blur(12px)",
          WebkitBackdropFilter: "blur(12px)",
          zIndex: 1,
          pointerEvents: "none",
        }}
      >
        <div style={{ position: 'absolute', bottom: 20, left: 0, right: 0, textAlign: 'center' }}>
          <div style={{ fontSize: 9, color: '#999', letterSpacing: 1, marginBottom: 4, fontFamily: 'monospace' }}>Souleance</div>
          <div style={{ fontSize: 12, color: '#222', fontFamily: 'monospace', marginBottom: 12 }}>Jazz et thé vert</div>
          <div style={{ width: '70%', height: 2, background: '#eee', margin: '0 auto', borderRadius: 2, position: 'relative' }}>
            <div style={{ width: '40%', height: 2, background: '#222', borderRadius: 2 }}></div>
          </div>
          <div style={{ fontSize: 9, color: '#aaa', marginTop: 8, fontFamily: 'monospace' }}>1:25 / 3:32</div>
        </div>
      </div>

      {/* ── 2. VINYL RECORD (z:2) — tilt on outer, spin on inner ─────────── */}
      <motion.div
        style={{
          position: "absolute",
          top: 15,
          right: 42,
          width: 185,
          zIndex: 2,
          rotate: 15,
          x: bgX,
          y: bgY,
          pointerEvents: "auto",
        }}
        onHoverStart={() => setVinylSpeed(8)}
        onHoverEnd={() => setVinylSpeed(20)}
        whileHover={{ scale: 1.02 }}
      >
        {/* Inner: continuous spin — separate from outer tilt & scale */}
        <motion.div
          animate={{ rotate: 360 }}
          transition={{
            duration: vinylSpeed,
            ease: "linear",
            repeat: Infinity,
            repeatType: "loop",
          }}
        >
          <Asset
            src="/assets/vinyl-record.avif"
            label="vinyl-record.avif"
            width={185}
            imgStyle={{ filter: DROP }}
          />
        </motion.div>
      </motion.div>

      {/* ── 3. CURSOR (z:3) — jitter on hover ────────────────────────────── */}
      {/* Outer: position + parallax | Inner: hover jitter (avoids x/y conflict) */}
      <motion.div
        style={{
          position: "absolute",
          top: 55,
          right: 290,
          width: 68,
          zIndex: 3,
          rotate: -12,
          x: bgX,
          y: bgY,
          pointerEvents: "auto",
        }}
      >
        <motion.div
          whileHover={{
            x: [0, 2, -2, 0],
            y: [0, -2, 2, 0],
            transition: { duration: 0.3, repeat: Infinity, ease: "linear" },
          }}
        >
          <Asset
            src="/assets/cursor.avif"
            label="cursor.avif"
            width={68}
            imgStyle={{ filter: DROP }}
          />
        </motion.div>
      </motion.div>

      {/* ── 4. FOLDER ICON (z:4) — float + hover lift + emerging icons ────── */}
      {/*
        Layer stack:
          Outer     → position + parallax (x/y motion values)
          Middle    → pointer events + hover detection + hover lift (y/filter)
          Float div → ambient translateY float animation
          Rel div   → coordinate origin for icon absolute positions
            Icons   → animate in/out based on folderHovered
            Folder  → the actual folder image
      */}
      <motion.div
        style={{
          position: "absolute",
          top: 240,
          right: 210,
          width: 125,
          zIndex: 4,
          rotate: -8,
          x: midX,
          y: midY,
        }}
      >
        <motion.div
          style={{ pointerEvents: "auto" }}
          onHoverStart={() => setFolderHovered(true)}
          onHoverEnd={() => setFolderHovered(false)}
          animate={{ filter: DROP }}
          whileHover={{ y: -5, filter: DROP_H, transition: HOVER_FAST }}
        >
          <motion.div
            animate={{ y: [0, -4, 0] }}
            transition={{ duration: 6, ease: "easeInOut", repeat: Infinity }}
          >
            <div style={{ position: "relative", width: 125 }}>
              {/* Icon A — Figma */}
              <motion.div
                animate={
                  folderHovered
                    ? { opacity: 1, scale: 1,   y: 0 }
                    : { opacity: 0, scale: 0.8, y: 8 }
                }
                transition={{ duration: 0.45, ease: EASE_EXPO, delay: 0 }}
                style={{
                  position: "absolute",
                  top: -85,
                  left: 70,
                  width: 44,
                  rotate: -8,
                  pointerEvents: "none",
                }}
              >
                <Asset
                  src="/assets/figma-icon.avif"
                  label="figma-icon.avif"
                  width={44}
                  imgStyle={{ filter: DROP }}
                />
              </motion.div>

              {/* Icon B — Framer */}
              <motion.div
                animate={
                  folderHovered
                    ? { opacity: 1, scale: 1,   y: 0 }
                    : { opacity: 0, scale: 0.8, y: 8 }
                }
                transition={{ duration: 0.45, ease: EASE_EXPO, delay: 0.08 }}
                style={{
                  position: "absolute",
                  top: -70,
                  right: -20,
                  width: 48,
                  rotate: 12,
                  pointerEvents: "none",
                }}
              >
                <Asset
                  src="/assets/framer-icon.avif"
                  label="framer-icon.avif"
                  width={48}
                  imgStyle={{ filter: DROP }}
                />
              </motion.div>

              {/* Icon C — Cursor App */}
              <motion.div
                animate={
                  folderHovered
                    ? { opacity: 1, scale: 1,   y: 0 }
                    : { opacity: 0, scale: 0.8, y: 8 }
                }
                transition={{ duration: 0.45, ease: EASE_EXPO, delay: 0.14 }}
                style={{
                  position: "absolute",
                  top: -55,
                  left: -40,
                  width: 46,
                  rotate: -14,
                  pointerEvents: "none",
                }}
              >
                <Asset
                  src="/assets/cursor-app-icon.avif"
                  label="cursor-app-icon.avif"
                  width={46}
                  imgStyle={{ filter: DROP }}
                />
              </motion.div>

              {/* Folder image */}
              <Asset
                src="/assets/folder-icon.avif"
                label="folder-icon.avif"
                width={125}
                imgStyle={{ filter: DROP }}
              />
            </div>
          </motion.div>
        </motion.div>
      </motion.div>

      {/* ── 5. TOOLBAR ICONS (z:5) — vertical strip at right edge ────────── */}
      <motion.div
        style={{
          position: "absolute",
          top: 160,
          right: 4,
          width: 65,
          zIndex: 5,
          x: bgX,
          y: bgY,
          pointerEvents: "auto",
        }}
        whileHover={{
          scale: 1.04,
          transition: { duration: 0.2, ease: "easeOut" },
        }}
      >
        <Asset
          src="/assets/toolbar-icons.avif"
          label="toolbar-icons.avif"
          width={65}
          imgStyle={{ filter: DROP }}
        />
      </motion.div>

      {/* ── 6. AIRDROP CARD (z:6) ────────────────────────────────────────── */}
      {/* Outer: parallax | Inner: base rotate + hover */}
      <motion.div
        style={{
          position: "absolute",
          top: 320,
          right: 30,
          width: 185,
          zIndex: 6,
          x: midX,
          y: midY,
          pointerEvents: "auto",
        }}
      >
        <motion.div
          initial={{ rotate: 6 }}
          animate={{ filter: DROP }}
          whileHover={{
            y: -5,
            rotate: 6,
            filter: DROP_H,
            transition: HOVER_FAST,
          }}
        >
          <Asset
            src="/assets/airdrop-card.png"
            label="airdrop-card.png"
            width={185}
          />
        </motion.div>
      </motion.div>

      {/* ── 7. RECEIPT PHOTOBOOTH MACHINE (z:7) ──────────────────────────── */}
      {/* Outer: parallax | Inner: base rotate + hover */}
      <motion.div
        style={{
          position: "absolute",
          top: 300,
          right: 190,
          width: 380,
          zIndex: 7,
          x: midX,
          y: midY,
          pointerEvents: "auto",
        }}
      >
        <motion.div
          initial={{ rotate: -5 }}
          animate={{ filter: DROP }}
          whileHover={{
            y: -5,
            rotate: -4,
            filter: DROP_H,
            transition: HOVER_FAST,
          }}
        >
          <Asset
            src="/assets/receipt-photobooth-nepal.png"
            label="receipt-photobooth-nepal.png"
            width={380}
          />
        </motion.div>
      </motion.div>

      {/* ── 8. KEYRING (z:8) ─────────────────────────────────────────────── */}
      {/* Outer: parallax | Inner: base rotate + hover */}
      <motion.div
        style={{
          position: "absolute",
          top: 580,
          right: -20,
          width: 360,
          zIndex: 8,
          x: fgX,
          y: fgY,
          pointerEvents: "auto",
        }}
      >
        <motion.div
          initial={{ rotate: -8 }}
          animate={{ filter: DROP }}
          whileHover={{
            y: -4,
            rotate: -5,
            filter: DROP_H,
            transition: HOVER_FAST,
          }}
        >
          <Asset
            src="/assets/keyring.png"
            label="keyring.png"
            width={360}
          />
        </motion.div>
      </motion.div>
    </div>
  );
}
