'use client'

import { useEffect, useState, useSyncExternalStore } from 'react'
import { motion, useMotionValue, useSpring } from 'framer-motion'

const TOUCH_QUERY = '(pointer: coarse)'

function subscribeTouch(callback: () => void) {
  const mq = window.matchMedia(TOUCH_QUERY)
  mq.addEventListener('change', callback)
  return () => mq.removeEventListener('change', callback)
}

function getTouchSnapshot() {
  return window.matchMedia(TOUCH_QUERY).matches
}

function getTouchServerSnapshot() {
  return true
}

type CursorMode = 'interactive' | 'dark' | 'light'

// Lookup veloce: legge data-section-tone settato sulle <section> invece di
// fare DOM walk + getComputedStyle a ogni mouseover (operazione costosa che
// causa stutter su scroll). data-section-tone="dark|accent" → light cursor;
// "light" → dark cursor.
function getCursorMode(el: Element | null): CursorMode {
  if (!el) return 'light'
  if (el.closest('a, button, [data-hover], input, textarea, select, label, [role="button"]')) {
    return 'interactive'
  }
  const toned = el.closest('[data-section-tone]') as HTMLElement | null
  if (!toned) return 'light'
  const tone = toned.dataset.sectionTone
  return tone === 'dark' || tone === 'accent' ? 'dark' : 'light'
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
  const isTouch = useSyncExternalStore(subscribeTouch, getTouchSnapshot, getTouchServerSnapshot)

  const mouseX = useMotionValue(-100)
  const mouseY = useMotionValue(-100)

  const x = useSpring(mouseX, { damping: 32, stiffness: 380, mass: 0.35, restDelta: 0.5, restSpeed: 1 })
  const y = useSpring(mouseY, { damping: 32, stiffness: 380, mass: 0.35, restDelta: 0.5, restSpeed: 1 })

  useEffect(() => {
    if (isTouch) return

    const onMove = (e: MouseEvent) => {
      mouseX.set(e.clientX)
      mouseY.set(e.clientY)
      if (!visible) setVisible(true)
    }

    // Throttle mouseover via rAF: aggiorna il mode al massimo una volta per frame
    let pendingTarget: Element | null = null
    let rafId: number | null = null
    const onOver = (e: MouseEvent) => {
      pendingTarget = e.target as Element
      if (rafId !== null) return
      rafId = requestAnimationFrame(() => {
        rafId = null
        if (pendingTarget) setMode(getCursorMode(pendingTarget))
      })
    }

    const onLeave = () => setVisible(false)
    const onEnter = () => setVisible(true)

    document.addEventListener('mousemove', onMove, { passive: true })
    document.addEventListener('mouseover', onOver, { passive: true })
    document.documentElement.addEventListener('mouseleave', onLeave)
    document.documentElement.addEventListener('mouseenter', onEnter)

    return () => {
      if (rafId !== null) cancelAnimationFrame(rafId)
      document.removeEventListener('mousemove', onMove)
      document.removeEventListener('mouseover', onOver)
      document.documentElement.removeEventListener('mouseleave', onLeave)
      document.documentElement.removeEventListener('mouseenter', onEnter)
    }
  }, [mouseX, mouseY, visible, isTouch])

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
