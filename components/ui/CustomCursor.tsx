'use client'

import { useEffect, useState } from 'react'
import { motion, useMotionValue, useSpring } from 'framer-motion'

type CursorMode = 'interactive' | 'dark' | 'light'

function getCursorMode(el: Element | null): CursorMode {
  if (!el) return 'light'

  // Interactive elements → coral
  if (el.closest('a, button, [data-hover], input, textarea, select, label, [role="button"]')) {
    return 'interactive'
  }

  // Walk up DOM to find the first non-transparent background
  let current: Element | null = el
  while (current && current !== document.documentElement) {
    try {
      const bg = window.getComputedStyle(current).backgroundColor
      if (bg && bg !== 'rgba(0, 0, 0, 0)' && bg !== 'transparent') {
        const match = bg.match(/\d+/g)
        if (match && match.length >= 3) {
          const [r, g, b] = match.map(Number)
          // Perceived luminance
          const luminance = (0.299 * r + 0.587 * g + 0.114 * b) / 255
          return luminance < 0.28 ? 'dark' : 'light'
        }
      }
    } catch { /* ignore */ }
    current = current.parentElement
  }
  return 'light'
}

const RING_COLOR: Record<CursorMode, string> = {
  interactive: 'rgba(253,167,126,1)',
  dark:        'rgba(246,239,229,0.9)',
  light:       'rgba(5,56,13,0.55)',
}

const DOT_COLOR: Record<CursorMode, string> = {
  interactive: 'rgba(253,167,126,0)',
  dark:        'rgba(246,239,229,0.95)',
  light:       'rgba(5,56,13,0.9)',
}

const RING_SIZE: Record<CursorMode, number> = {
  interactive: 56,
  dark:        30,
  light:       30,
}

export default function CustomCursor() {
  const [mode, setMode] = useState<CursorMode>('light')
  const [visible, setVisible] = useState(false)
  const [isTouch, setIsTouch] = useState(true)

  const mouseX = useMotionValue(-100)
  const mouseY = useMotionValue(-100)

  const x = useSpring(mouseX, { damping: 32, stiffness: 380, mass: 0.35 })
  const y = useSpring(mouseY, { damping: 32, stiffness: 380, mass: 0.35 })

  useEffect(() => {
    const mq = window.matchMedia('(pointer: coarse)')
    setIsTouch(mq.matches)
    if (mq.matches) return

    const onMove = (e: MouseEvent) => {
      mouseX.set(e.clientX)
      mouseY.set(e.clientY)
      if (!visible) setVisible(true)
    }

    const onOver = (e: MouseEvent) => {
      setMode(getCursorMode(e.target as Element))
    }

    const onLeave = () => setVisible(false)
    const onEnter = () => setVisible(true)

    document.addEventListener('mousemove', onMove)
    document.addEventListener('mouseover', onOver)
    document.documentElement.addEventListener('mouseleave', onLeave)
    document.documentElement.addEventListener('mouseenter', onEnter)

    return () => {
      document.removeEventListener('mousemove', onMove)
      document.removeEventListener('mouseover', onOver)
      document.documentElement.removeEventListener('mouseleave', onLeave)
      document.documentElement.removeEventListener('mouseenter', onEnter)
    }
  }, [mouseX, mouseY, visible])

  if (isTouch) return null

  const ringSize = RING_SIZE[mode]

  return (
    <motion.div
      className="fixed top-0 left-0 pointer-events-none z-[9999]"
      style={{ x, y, translateX: '-50%', translateY: '-50%' }}
      animate={{ opacity: visible ? 1 : 0 }}
      transition={{ opacity: { duration: 0.25 } }}
    >
      {/* Outer ring */}
      <motion.div
        animate={{
          width: ringSize,
          height: ringSize,
          borderColor: RING_COLOR[mode],
          backgroundColor: mode === 'interactive' ? 'rgba(253,167,126,0.07)' : 'transparent',
        }}
        transition={{ duration: 0.3, ease: [0.16, 1, 0.3, 1] }}
        style={{ borderRadius: '50%', border: '1px solid' }}
      />
      {/* Center dot */}
      <motion.div
        animate={{
          opacity: mode === 'interactive' ? 0 : 1,
          scale: mode === 'interactive' ? 0 : 1,
          backgroundColor: DOT_COLOR[mode],
        }}
        transition={{ duration: 0.2 }}
        style={{
          position: 'absolute',
          top: '50%',
          left: '50%',
          transform: 'translate(-50%, -50%)',
          width: 4,
          height: 4,
          borderRadius: '50%',
        }}
      />
    </motion.div>
  )
}
