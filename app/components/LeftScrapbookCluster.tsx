"use client";

import { useRef, useState, useEffect } from "react";
import {
  motion,
  useMotionValue,
  useSpring,
  useTransform,
} from "framer-motion";

// ─── constants ───────────────────────────────────────────────────────────────

const SPRING = { damping: 40, stiffness: 120 };
const DROP   = "drop-shadow(0px 8px 16px rgba(0,0,0,0.12))";
const HOVER_T = { duration: 0.3, ease: "easeOut" } as const;

// ─── asset helpers ────────────────────────────────────────────────────────────

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

// ─── component ───────────────────────────────────────────────────────────────

export default function LeftScrapbookCluster() {
  const containerRef = useRef<HTMLDivElement>(null);
  const [lampGlowing, setLampGlowing] = useState(false);

  const rawX = useMotionValue(0);
  const rawY = useMotionValue(0);
  const smoothX = useSpring(rawX, SPRING);
  const smoothY = useSpring(rawY, SPRING);

  const bgX  = useTransform(smoothX, [-1, 1], [-2, 2]);
  const bgY  = useTransform(smoothY, [-1, 1], [-2, 2]);
  const midX = useTransform(smoothX, [-1, 1], [-4, 4]);
  const midY = useTransform(smoothY, [-1, 1], [-4, 4]);
  const fgX  = useTransform(smoothX, [-1, 1], [-6, 6]);
  const fgY  = useTransform(smoothY, [-1, 1], [-6, 6]);
  const f3X  = useTransform(smoothX, [-1, 1], [-3, 3]);
  const f3Y  = useTransform(smoothY, [-1, 1], [-3, 3]);

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
        left: 0,
        width: "60vw",
        height: "100vh",
        overflow: "hidden",
        pointerEvents: "none",
      }}
    >
      {/* ── Lamp glow (z:0) ─────────────────────────────────────────────── */}
      <div
        style={{
          position: "absolute",
          top: -130,
          left: -80,
          width: 420,
          height: 420,
          borderRadius: "50%",
          background:
            "radial-gradient(circle, rgba(255,200,50,0.90) 0%, rgba(255,215,90,0.50) 38%, rgba(255,225,130,0.18) 60%, transparent 75%)",
          zIndex: 0,
          opacity: lampGlowing ? 1 : 0,
          transition: "opacity 0.5s ease",
          pointerEvents: "none",
        }}
      />

      {/* ── 1. LAMP (z:1) ───────────────────────────────────────────────── */}
      <motion.div
        style={{
          position: "absolute",
          top: -60,
          left: -60,
          width: 300,
          zIndex: 1,
          x: bgX,
          y: bgY,
          pointerEvents: "auto",
        }}
        onHoverStart={() => setLampGlowing(true)}
        onHoverEnd={() => setLampGlowing(false)}
        whileHover={{ scale: 1.02, rotate: -1, transition: HOVER_T }}
      >
        <Asset
          src="/assets/lamp.avif"
          label="lamp.png"
          width={300}
          imgStyle={{ filter: DROP }}
        />
      </motion.div>

      {/* ── 2. PAPER CLIP NOTE (z:2) ────────────────────────────────────── */}
      <motion.div
        style={{
          position: "absolute",
          top: 100,
          left: -100,
          width: 170,
          zIndex: 2,
          rotate: -5,
          x: bgX,
          y: bgY,
          pointerEvents: "auto",
        }}
        whileHover={{ scale: 1.03, rotate: -8, transition: HOVER_T }}
      >
        <Asset
          src="/assets/paper-clip-note.avif.avif"
          label="paper-clip-note.avif"
          width={170}
          imgStyle={{ filter: DROP }}
        />
      </motion.div>

      {/* ── 3. TORN PAPER (z:3) ─────────────────────────────────────────── */}
      <motion.div
        style={{
          position: "absolute",
          top: 140,
          left: 160,
          width: 140,
          zIndex: 3,
          rotate: -8,
          x: bgX,
          y: bgY,
          pointerEvents: "auto",
        }}
        whileHover={{ scale: 1.02, rotate: -11, transition: HOVER_T }}
      >
        <Asset
          src="/assets/torn-paper.avif"
          label="torn-paper.avif"
          width={140}
          imgStyle={{ filter: DROP }}
        />
      </motion.div>

      {/* ── 4. NOTEBOOK GRID (z:4, main anchor) ────────────────────────── */}
      <motion.div
        style={{
          position: "absolute",
          top: 140,
          left: -140,
          width: 600,
          zIndex: 4,
          rotate: -22,
          x: midX,
          y: midY,
          pointerEvents: "auto",
        }}
        whileHover={{ scale: 1.01, rotate: -19, transition: HOVER_T }}
      >
        <Asset
          src="/assets/notebook-grid.avif"
          label="notebook-grid.png"
          width={600}
          imgStyle={{ filter: DROP }}
        />
      </motion.div>

      {/* ── 5. PEN (z:6, ambient float + parallax) ──────────────────────── */}
      {/* Outer: position + parallax + hover | Inner: float animation        */}
      <motion.div
        style={{
          position: "absolute",
          top: 200,
          left: 220,
          width: 190,
          zIndex: 6,
          rotate: 12,
          x: midX,
          y: midY,
          pointerEvents: "auto",
        }}
        whileHover={{ scale: 1.04, rotate: 16, transition: HOVER_T }}
      >
        <motion.div
          animate={{ y: [0, -2, 0] }}
          transition={{ duration: 6, ease: "easeInOut", repeat: Infinity }}
        >
          <Asset
            src="/assets/pen.avif"
            label="pen.png"
            width={190}
            imgStyle={{ filter: DROP }}
          />
        </motion.div>
      </motion.div>

      {/* ── 6. COFFEE RING (z:5) ────────────────────────────────────────── */}
      <motion.div
        style={{
          position: "absolute",
          top: 360,
          left: 10,
          width: 160,
          zIndex: 5,
          opacity: 0.85,
          x: midX,
          y: midY,
          pointerEvents: "auto",
        }}
        whileHover={{ scale: 1.02, rotate: 2, transition: HOVER_T }}
      >
        <Asset
          src="/assets/coffee-ring.avif"
          label="coffee-ring.png"
          width={160}
          imgStyle={{ filter: DROP }}
        />
      </motion.div>

      {/* ── 7. FILM ROLL (z:6, parallax 3px) ───────────────────────────── */}
      <motion.div
        style={{
          position: "absolute",
          bottom: 100,
          left: -20,
          width: 170,
          zIndex: 6,
          rotate: -25,
          x: f3X,
          y: f3Y,
          pointerEvents: "auto",
        }}
        whileHover={{ scale: 1.03, rotate: -12, transition: HOVER_T }}
      >
        <Asset
          src="/assets/film-roll.avif"
          label="film-roll.avif"
          width={170}
          imgStyle={{ filter: DROP }}
        />
      </motion.div>

      {/* ── 8. LIGHTER (z:7) ────────────────────────────────────────────── */}
      <motion.div
        style={{
          position: "absolute",
          top: 365,
          left: 195,
          width: 120,
          zIndex: 7,
          rotate: -60,
          x: fgX,
          y: fgY,
          pointerEvents: "auto",
        }}
        whileHover={{ scale: 1.04, rotate: -22, transition: HOVER_T }}
      >
        <Asset
          src="/assets/lighter.avif"
          label="lighter.avif"
          width={120}
          imgStyle={{ filter: DROP }}
        />
      </motion.div>

      {/* ── 9. BLUE TUBE (z:6, parallax 3px) ───────────────────────────── */}
      <motion.div
        style={{
          position: "absolute",
          bottom: 220,
          left: 155,
          width: 140,
          zIndex: 6,
          rotate: -12,
          x: f3X,
          y: f3Y,
          pointerEvents: "auto",
        }}
        whileHover={{ scale: 1.03, rotate: -16, transition: HOVER_T }}
      >
        <Asset
          src="/assets/blue-tube.avif"
          label="blue-tube.png"
          width={140}
          imgStyle={{ filter: DROP }}
        />
      </motion.div>

      {/* ── 10. RECEIPT PHOTO (z:9) — no filter, white border in asset ──── */}
      {/* Outer: position + parallax | Inner: base rotate + hover           */}
      <motion.div
        style={{
          position: "absolute",
          bottom: 160,
          left: 240,
          zIndex: 9,
          x: fgX,
          y: fgY,
          pointerEvents: "auto",
        }}
      >
        <motion.div
          initial={{ rotate: 5 }}
          whileHover={{ scale: 1.03, rotate: 7, transition: HOVER_T }}
          style={{ width: 150 }}
        >
          <Asset
            src="/assets/receiptphoto.png"
            label="receipt-photo.png"
            width={150}
          />
        </motion.div>
      </motion.div>
    </div>
  );
}
