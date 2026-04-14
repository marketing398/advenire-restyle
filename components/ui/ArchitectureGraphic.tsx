// ─── Geometry ─────────────────────────────────────────────────────────────
const W = 400, H = 500
const GROUND = 440
const BX = 80,  BR = 320
const BT = 78
const BW = BR - BX
const BH = GROUND - BT
const FLOORS = 9
const FH = BH / FLOORS
const COLS = 6
const CW = BW / COLS

const PT_T = 50, PT_L = 120, PT_R = 280
const PT_H = BT - PT_T
const PT_W = PT_R - PT_L

const WW = 18, WH = 22
const WMX = (CW - WW) / 2
const WMY = (FH - WH) / 2

const GRID = 20
const hLines = Array.from({ length: Math.ceil(H / GRID) + 1 }, (_, i) => i * GRID)
const vLines = Array.from({ length: Math.ceil(W / GRID) + 1 }, (_, i) => i * GRID)

const floorY = (i: number) => BT + i * FH
const colX   = (j: number) => BX + j * CW
const wins: { x: number; y: number }[] = []
for (let f = 0; f < FLOORS; f++) {
  for (let c = 0; c < COLS; c++) {
    wins.push({ x: colX(c) + WMX, y: floorY(f) + WMY })
  }
}

export default function ArchitectureGraphic() {
  return (
    <div
      style={{ width: '100%', aspectRatio: `${W}/${H}`, position: 'relative' }}
      aria-hidden="true"
    >
      <svg
        viewBox={`0 0 ${W} ${H}`}
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
        style={{ width: '100%', height: '100%', display: 'block' }}
      >
        {/* Grid */}
        <g>
          {hLines.map(y => (
            <line key={`h${y}`} x1={-20} y1={y} x2={W + 20} y2={y}
              stroke="rgba(245,240,232,0.055)" strokeWidth="0.5" />
          ))}
          {vLines.map(x => (
            <line key={`v${x}`} x1={x} y1={-20} x2={x} y2={H + 20}
              stroke="rgba(245,240,232,0.055)" strokeWidth="0.5" />
          ))}
        </g>

        {/* Building structure */}
        <g>
          {Array.from({ length: 16 }, (_, i) => (
            <line key={`hatch${i}`}
              x1={30 + i * 23} y1={GROUND}
              x2={16 + i * 23} y2={GROUND + 14}
              stroke="rgba(245,240,232,0.12)" strokeWidth="0.75" />
          ))}

          <line x1={20} y1={GROUND} x2={W - 20} y2={GROUND}
            stroke="rgba(245,240,232,0.45)" strokeWidth="1" />

          <rect x={PT_L} y={PT_T} width={PT_W} height={PT_H}
            stroke="rgba(245,240,232,0.28)" strokeWidth="0.75" />

          <line x1={PT_L} y1={PT_T + PT_H} x2={BX} y2={BT}
            stroke="rgba(245,240,232,0.15)" strokeWidth="0.5" />
          <line x1={PT_R} y1={PT_T + PT_H} x2={BR} y2={BT}
            stroke="rgba(245,240,232,0.15)" strokeWidth="0.5" />

          <rect x={BX} y={BT} width={BW} height={BH}
            stroke="rgba(245,240,232,0.38)" strokeWidth="1" />

          {Array.from({ length: FLOORS - 1 }, (_, i) => (
            <line key={`fl${i}`}
              x1={BX} y1={floorY(i + 1)}
              x2={BR} y2={floorY(i + 1)}
              stroke="rgba(245,240,232,0.12)" strokeWidth="0.5" />
          ))}

          {Array.from({ length: COLS - 1 }, (_, j) => (
            <line key={`cl${j}`}
              x1={colX(j + 1)} y1={BT}
              x2={colX(j + 1)} y2={GROUND}
              stroke="rgba(245,240,232,0.08)" strokeWidth="0.5" />
          ))}

          {wins.map((w, i) => (
            <rect key={`w${i}`}
              x={w.x} y={w.y} width={WW} height={WH}
              stroke="rgba(245,240,232,0.18)" strokeWidth="0.5"
              fill="rgba(245,240,232,0.025)" />
          ))}
        </g>

        {/* Annotations */}
        <g fontFamily="'Space Mono', 'Courier New', monospace">
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

          <text x={W / 2} y={26}
            textAnchor="middle"
            fontSize="6.5"
            fill="rgba(245,240,232,0.18)"
            letterSpacing="2.5"
          >
            ELEVATION — NORTH FACADE
          </text>

          <text x={BX} y={H - 14}
            fontSize="6"
            fill="rgba(245,240,232,0.18)"
            letterSpacing="1.5"
          >
            SCALE 1:200
          </text>

          <text x={(PT_L + PT_R) / 2} y={PT_T - 6}
            textAnchor="middle"
            fontSize="6"
            fill="rgba(245,240,232,0.2)"
            letterSpacing="1.5"
          >
            ROOF LEVEL
          </text>
        </g>
      </svg>
    </div>
  )
}
