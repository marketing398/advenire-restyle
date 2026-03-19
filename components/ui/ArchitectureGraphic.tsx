'use client'

import { useState, useRef } from 'react'
import { motion, useReducedMotion } from 'framer-motion'

// ─── Geometry ─────────────────────────────────────────────────────────────
const W = 400, H = 500
const GROUND = 440
const BX = 80,  BR = 320         // building left / right
const BT = 78                    // building top
const BW = BR - BX               // 240
const BH = GROUND - BT           // 362
const FLOORS = 9
const FH = BH / FLOORS           // ~40.2 per floor
const COLS = 6
const CW = BW / COLS             // 40 per col

// Penthouse setback
const PT_T = 50, PT_L = 120, PT_R = 280
const PT_H = BT - PT_T           // 28
const PT_W = PT_R - PT_L         // 160

// Windows
const WW = 18, WH = 22
const WMX = (CW - WW) / 2       // 11 — centered in col
const WMY = (FH - WH) / 2       // ~9 — centered in floor

// Grid
const GRID = 20
const hLines = Array.from({ length: Math.ceil(H / GRID) + 1 }, (_, i) => i * GRID)
const vLines = Array.from({ length: Math.ceil(W / GRID) + 1 }, (_, i) => i * GRID)

// Derived: floor y's, col x's, windows
const floorY = (i: number) => BT + i * FH
const colX   = (j: number) => BX + j * CW
const wins: { x: number; y: number; f: number; c: number }[] = []
for (let f = 0; f < FLOORS; f++) {
  for (let c = 0; c < COLS; c++) {
    wins.push({ x: colX(c) + WMX, y: floorY(f) + WMY, f, c })
  }
}

// ─── Component ────────────────────────────────────────────────────────────
export default function ArchitectureGraphic() {
  const containerRef = useRef<HTMLDivElement>(null)
  const shouldReduce = useReducedMotion()
  const [delta, setDelta] = useState({ dx: 0, dy: 0 })

  const handleMouseMove = (e: React.MouseEvent) => {
    if (!containerRef.current || shouldReduce) return
    const r = containerRef.current.getBoundingClientRect()
    setDelta({
      dx: (e.clientX - r.left) / r.width  - 0.5,
      dy: (e.clientY - r.top)  / r.height - 0.5,
    })
  }

  const handleMouseLeave = () => setDelta({ dx: 0, dy: 0 })

  // Spring config per layer
  const sp = (stiffness: number) => ({
    type: 'spring' as const,
    damping: 32,
    stiffness,
    mass: 0.5,
  })

  const [mxRaw, myRaw] = [delta.dx * 20, delta.dy * 16]

  // Parallax offsets per layer
  const l1 = { x: -mxRaw * 0.25, y: -myRaw * 0.25 }  // grid (slow)
  const l2 = { x: -mxRaw * 0.70, y: -myRaw * 0.70 }  // building (mid)
  const l3 = { x: -mxRaw * 1.30, y: -myRaw * 1.10 }  // annotations (fast)

  // Cross-hair (follows mouse raw coordinates in SVG space)
  const crossX = (0.5 + delta.dx) * W
  const crossY = (0.5 + delta.dy) * H

  return (
    <div
      ref={containerRef}
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
      style={{ width: '100%', aspectRatio: `${W}/${H}`, position: 'relative' }}
      aria-hidden="true"
    >
      <svg
        viewBox={`0 0 ${W} ${H}`}
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
        style={{ width: '100%', height: '100%', display: 'block' }}
      >
        {/* ── defs ──────────────────────────────────────────────────── */}
        <defs>
          <clipPath id="buildingClip">
            <rect x={BX} y={BT} width={BW} height={BH} />
          </clipPath>
          {/* Glow filter for scan line */}
          <filter id="glow" x="-50%" y="-50%" width="200%" height="200%">
            <feGaussianBlur stdDeviation="2" result="blur" />
            <feMerge>
              <feMergeNode in="blur" />
              <feMergeNode in="SourceGraphic" />
            </feMerge>
          </filter>
        </defs>

        {/* ── Layer 1: grid (slowest parallax) ──────────────────────── */}
        <motion.g
          animate={{ x: l1.x, y: l1.y }}
          transition={sp(220)}
        >
          {hLines.map(y => (
            <line key={`h${y}`} x1={-20} y1={y} x2={W + 20} y2={y}
              stroke="rgba(245,240,232,0.055)" strokeWidth="0.5" />
          ))}
          {vLines.map(x => (
            <line key={`v${x}`} x1={x} y1={-20} x2={x} y2={H + 20}
              stroke="rgba(245,240,232,0.055)" strokeWidth="0.5" />
          ))}
        </motion.g>

        {/* ── Layer 2: building structure (mid parallax) ─────────────── */}
        <motion.g
          animate={{ x: l2.x, y: l2.y }}
          transition={sp(175)}
        >
          {/* Ground hatch marks */}
          {Array.from({ length: 16 }, (_, i) => (
            <line key={`hatch${i}`}
              x1={30 + i * 23} y1={GROUND}
              x2={16 + i * 23} y2={GROUND + 14}
              stroke="rgba(245,240,232,0.12)" strokeWidth="0.75" />
          ))}

          {/* Ground line */}
          <line x1={20} y1={GROUND} x2={W - 20} y2={GROUND}
            stroke="rgba(245,240,232,0.45)" strokeWidth="1" />

          {/* Penthouse */}
          <rect x={PT_L} y={PT_T} width={PT_W} height={PT_H}
            stroke="rgba(245,240,232,0.28)" strokeWidth="0.75" />

          {/* Connector lines: penthouse corners → building top */}
          <line x1={PT_L} y1={PT_T + PT_H} x2={BX} y2={BT}
            stroke="rgba(245,240,232,0.15)" strokeWidth="0.5" />
          <line x1={PT_R} y1={PT_T + PT_H} x2={BR} y2={BT}
            stroke="rgba(245,240,232,0.15)" strokeWidth="0.5" />

          {/* Main building outline */}
          <rect x={BX} y={BT} width={BW} height={BH}
            stroke="rgba(245,240,232,0.38)" strokeWidth="1" />

          {/* Internal floor lines */}
          {Array.from({ length: FLOORS - 1 }, (_, i) => (
            <line key={`fl${i}`}
              x1={BX} y1={floorY(i + 1)}
              x2={BR} y2={floorY(i + 1)}
              stroke="rgba(245,240,232,0.12)" strokeWidth="0.5" />
          ))}

          {/* Internal column lines */}
          {Array.from({ length: COLS - 1 }, (_, j) => (
            <line key={`cl${j}`}
              x1={colX(j + 1)} y1={BT}
              x2={colX(j + 1)} y2={GROUND}
              stroke="rgba(245,240,232,0.08)" strokeWidth="0.5" />
          ))}

          {/* Windows */}
          {wins.map((w, i) => (
            <rect key={`w${i}`}
              x={w.x} y={w.y} width={WW} height={WH}
              stroke="rgba(245,240,232,0.18)" strokeWidth="0.5"
              fill="rgba(245,240,232,0.025)" />
          ))}

          {/* Scanning line (clipped to building) */}
          {!shouldReduce && (
            <motion.g
              clipPath="url(#buildingClip)"
              animate={{ y: [0, BH, 0] }}
              transition={{
                duration: 5,
                ease: 'easeInOut',
                repeat: Infinity,
                delay: 1.2,
              }}
            >
              {/* Glow */}
              <line x1={BX} y1={BT} x2={BR} y2={BT}
                stroke="rgba(253,167,126,0.18)" strokeWidth="5"
                filter="url(#glow)" />
              {/* Core line */}
              <line x1={BX} y1={BT} x2={BR} y2={BT}
                stroke="rgba(253,167,126,0.55)" strokeWidth="1" />
            </motion.g>
          )}
        </motion.g>

        {/* ── Layer 3: annotations (fastest parallax) ────────────────── */}
        <motion.g
          animate={{ x: l3.x, y: l3.y }}
          transition={sp(140)}
          fontFamily="'Space Mono', 'Courier New', monospace"
        >
          {/* Floor labels */}
          {Array.from({ length: FLOORS }, (_, i) => (
            <text key={`lbl${i}`}
              x={BX - 8}
              y={floorY(i) + FH / 2 + 3}
              textAnchor="end"
              fontSize="6.5"
              fill="rgba(245,240,232,0.28)"
              letterSpacing="0.5"
            >
              {`F${String(FLOORS - i).padStart(2, '0')}`}
            </text>
          ))}

          {/* Height dimension — coral */}
          <line x1={BR + 18} y1={BT} x2={BR + 18} y2={GROUND}
            stroke="rgba(253,167,126,0.4)" strokeWidth="0.6" />
          <line x1={BR + 14} y1={BT}     x2={BR + 22} y2={BT}
            stroke="rgba(253,167,126,0.4)" strokeWidth="0.6" />
          <line x1={BR + 14} y1={GROUND} x2={BR + 22} y2={GROUND}
            stroke="rgba(253,167,126,0.4)" strokeWidth="0.6" />
          <text x={BR + 26} y={(BT + GROUND) / 2 + 3}
            fontSize="7" fill="rgba(253,167,126,0.65)"
            letterSpacing="0.3"
          >
            38m
          </text>

          {/* Width dimension — coral */}
          <line x1={BX} y1={GROUND + 18} x2={BR} y2={GROUND + 18}
            stroke="rgba(253,167,126,0.4)" strokeWidth="0.6" />
          <line x1={BX} y1={GROUND + 14} x2={BX} y2={GROUND + 22}
            stroke="rgba(253,167,126,0.4)" strokeWidth="0.6" />
          <line x1={BR} y1={GROUND + 14} x2={BR} y2={GROUND + 22}
            stroke="rgba(253,167,126,0.4)" strokeWidth="0.6" />
          <text x={(BX + BR) / 2} y={GROUND + 32}
            textAnchor="middle"
            fontSize="7" fill="rgba(253,167,126,0.65)"
            letterSpacing="0.3"
          >
            24.0m
          </text>

          {/* Title */}
          <text x={W / 2} y={26}
            textAnchor="middle"
            fontSize="6.5"
            fill="rgba(245,240,232,0.18)"
            letterSpacing="2.5"
          >
            ELEVATION — NORTH FACADE
          </text>

          {/* Scale */}
          <text x={BX} y={H - 14}
            fontSize="6"
            fill="rgba(245,240,232,0.18)"
            letterSpacing="1.5"
          >
            SCALE 1:200
          </text>

          {/* Top penthouse label */}
          <text x={(PT_L + PT_R) / 2} y={PT_T - 6}
            textAnchor="middle"
            fontSize="6"
            fill="rgba(245,240,232,0.2)"
            letterSpacing="1.5"
          >
            ROOF LEVEL
          </text>
        </motion.g>

        {/* ── Crosshair (follows raw mouse position) ─────────────────── */}
        <motion.g
          animate={{ opacity: delta.dx === 0 && delta.dy === 0 ? 0 : 1 }}
          transition={{ duration: 0.3 }}
        >
          <line x1={crossX} y1={0} x2={crossX} y2={H}
            stroke="rgba(245,240,232,0.07)"
            strokeWidth="0.6"
            strokeDasharray="3 6" />
          <line x1={0} y1={crossY} x2={W} y2={crossY}
            stroke="rgba(245,240,232,0.07)"
            strokeWidth="0.6"
            strokeDasharray="3 6" />
          <circle cx={crossX} cy={crossY} r={2.5}
            fill="rgba(253,167,126,0.6)" />
        </motion.g>

        {/* ── Entrance fade-in groups ─────────────────────────────────── */}
        {/* (handled by the parent section motion.div in Hero) */}
      </svg>
    </div>
  )
}
