'use client'

import { useEffect, useState } from 'react'
import { motion, useMotionValue, useSpring } from 'framer-motion'

export default function CustomCursor() {
  const [hovered, setHovered] = useState(false)
  const [visible, setVisible] = useState(false)
  const [isTouch, setIsTouch] = useState(true) // default true until we confirm fine pointer

  const mouseX = useMotionValue(-100)
  const mouseY = useMotionValue(-100)

  const x = useSpring(mouseX, { damping: 32, stiffness: 380, mass: 0.35 })
  const y = useSpring(mouseY, { damping: 32, stiffness: 380, mass: 0.35 })

  useEffect(() => {
    // Only show on fine pointer (mouse) devices
    const mq = window.matchMedia('(pointer: coarse)')
    setIsTouch(mq.matches)
    if (mq.matches) return

    const onMove = (e: MouseEvent) => {
      mouseX.set(e.clientX)
      mouseY.set(e.clientY)
      if (!visible) setVisible(true)
    }

    const onOver = (e: MouseEvent) => {
      const t = e.target as HTMLElement
      if (t.closest('a, button, [data-hover]')) setHovered(true)
    }

    const onOut = (e: MouseEvent) => {
      const t = e.target as HTMLElement
      if (t.closest('a, button, [data-hover]')) setHovered(false)
    }

    const onLeave = () => setVisible(false)
    const onEnter = () => setVisible(true)

    document.addEventListener('mousemove', onMove)
    document.addEventListener('mouseover', onOver)
    document.addEventListener('mouseout', onOut)
    document.documentElement.addEventListener('mouseleave', onLeave)
    document.documentElement.addEventListener('mouseenter', onEnter)

    return () => {
      document.removeEventListener('mousemove', onMove)
      document.removeEventListener('mouseover', onOver)
      document.removeEventListener('mouseout', onOut)
      document.documentElement.removeEventListener('mouseleave', onLeave)
      document.documentElement.removeEventListener('mouseenter', onEnter)
    }
  }, [mouseX, mouseY, visible])

  if (isTouch) return null

  return (
    <motion.div
      className="fixed top-0 left-0 pointer-events-none z-[9999]"
      style={{
        x,
        y,
        translateX: '-50%',
        translateY: '-50%',
      }}
      animate={{ opacity: visible ? 1 : 0 }}
      transition={{ opacity: { duration: 0.25 } }}
    >
      {/* Outer ring */}
      <motion.div
        animate={{
          width: hovered ? 64 : 32,
          height: hovered ? 64 : 32,
          borderColor: hovered ? 'rgba(253,167,126,0.9)' : 'rgba(5,56,13,0.5)',
          backgroundColor: hovered ? 'rgba(253,167,126,0.06)' : 'transparent',
        }}
        transition={{ duration: 0.3, ease: [0.16, 1, 0.3, 1] }}
        style={{ borderRadius: '50%', border: '1px solid' }}
      />
      {/* Center dot */}
      <motion.div
        animate={{
          opacity: hovered ? 0 : 1,
          scale: hovered ? 0 : 1,
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
          backgroundColor: 'var(--color-primary)',
        }}
      />
    </motion.div>
  )
}
