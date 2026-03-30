'use client'

import { motion } from 'framer-motion'

export default function ArchitecturalLines({
  position = 'top-right',
  color = 'currentColor',
}: {
  position?: 'top-right' | 'bottom-left' | 'top-left' | 'bottom-right'
  color?: string
}) {
  const positionClasses = {
    'top-right': 'top-0 right-0',
    'bottom-left': 'bottom-0 left-0',
    'top-left': 'top-0 left-0',
    'bottom-right': 'bottom-0 right-0',
  }

  const rotation = {
    'top-right': 0,
    'bottom-left': 180,
    'top-left': 90,
    'bottom-right': 270,
  }

  return (
    <motion.div
      className={`absolute ${positionClasses[position]} pointer-events-none`}
      style={{ width: 'clamp(120px, 15vw, 240px)', height: 'clamp(120px, 15vw, 240px)' }}
      initial={{ opacity: 0 }}
      whileInView={{ opacity: 1 }}
      viewport={{ once: true }}
      transition={{ duration: 1.2, delay: 0.3 }}
    >
      <svg
        viewBox="0 0 200 200"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
        style={{ transform: `rotate(${rotation[position]}deg)`, opacity: 0.06 }}
      >
        <line x1="200" y1="0" x2="200" y2="80" stroke={color} strokeWidth="0.5" />
        <line x1="200" y1="0" x2="120" y2="0" stroke={color} strokeWidth="0.5" />
        <line x1="180" y1="0" x2="180" y2="40" stroke={color} strokeWidth="0.3" />
        <line x1="160" y1="0" x2="160" y2="25" stroke={color} strokeWidth="0.3" />
        <line x1="200" y1="20" x2="165" y2="20" stroke={color} strokeWidth="0.3" />
        <line x1="200" y1="45" x2="175" y2="45" stroke={color} strokeWidth="0.3" />
        <circle cx="180" cy="20" r="2" stroke={color} strokeWidth="0.4" fill="none" />
      </svg>
    </motion.div>
  )
}
