'use client'

import { useEffect, useState } from 'react'
import { motion, useScroll, useSpring } from 'framer-motion'

const BAR_COLOR: Record<string, string> = {
  dark: 'var(--color-accent)',
  light: 'var(--color-primary)',
  accent: 'var(--color-primary)',
}

export default function ScrollProgressBar() {
  const { scrollYProgress } = useScroll()
  const scaleX = useSpring(scrollYProgress, { stiffness: 200, damping: 30, restDelta: 0.001 })
  const [tone, setTone] = useState<'dark' | 'light' | 'accent'>('dark')

  useEffect(() => {
    const sections = document.querySelectorAll<HTMLElement>('[data-section-tone]')
    if (sections.length === 0) return

    const observer = new IntersectionObserver(
      (entries) => {
        const visible = entries
          .filter((e) => e.isIntersecting)
          .sort((a, b) => b.intersectionRatio - a.intersectionRatio)[0]
        if (visible) {
          const next = visible.target.getAttribute('data-section-tone') as typeof tone | null
          if (next) setTone(next)
        }
      },
      { rootMargin: '-10% 0px -85% 0px', threshold: [0, 0.25, 0.5, 0.75, 1] },
    )
    sections.forEach((s) => observer.observe(s))
    return () => observer.disconnect()
  }, [])

  return (
    <motion.div
      aria-hidden="true"
      style={{
        position: 'fixed',
        top: 0,
        left: 0,
        right: 0,
        height: '5px',
        background: BAR_COLOR[tone],
        transformOrigin: 'left',
        scaleX,
        zIndex: 9999,
        transition: 'background-color 0.3s ease',
      }}
    />
  )
}
