'use client'

import { useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'

interface AccordionItemProps {
  title: string
  children: React.ReactNode
  defaultOpen?: boolean
  light?: boolean
}

export default function AccordionItem({
  title,
  children,
  defaultOpen = false,
  light = false,
}: AccordionItemProps) {
  const [open, setOpen] = useState(defaultOpen)

  return (
    <div className={`border-b ${light ? 'border-background/12' : 'border-border'}`}>
      <button
        type="button"
        onClick={() => setOpen(!open)}
        className="flex w-full justify-between items-center py-5 cursor-pointer text-left gap-6 group"
        style={{ cursor: 'pointer' }}
      >
        <span
          className={`font-body font-light text-base leading-snug transition-colors duration-300 ${
            light
              ? 'text-background/80 group-hover:text-background'
              : 'text-foreground group-hover:text-primary'
          }`}
        >
          {title}
        </span>

        {/* Animated +/× indicator */}
        <span
          className={`relative w-5 h-5 flex-shrink-0 ${light ? 'text-background/40' : 'text-primary'}`}
          aria-hidden="true"
        >
          {/* Horizontal bar */}
          <span className="absolute inset-0 flex items-center justify-center">
            <span className={`block w-3 h-px transition-colors duration-300 ${light ? 'bg-background/40' : 'bg-primary'}`} />
          </span>
          {/* Vertical bar — rotates out when open */}
          <motion.span
            className="absolute inset-0 flex items-center justify-center"
            animate={{ rotate: open ? 90 : 0, opacity: open ? 0 : 1 }}
            transition={{ duration: 0.3, ease: [0.16, 1, 0.3, 1] }}
          >
            <span className={`block w-px h-3 ${light ? 'bg-background/40' : 'bg-primary'}`} />
          </motion.span>
        </span>
      </button>

      {/* Height animation wrapper */}
      <AnimatePresence initial={false}>
        {open && (
          <motion.div
            key="content"
            initial={{ height: 0 }}
            animate={{ height: 'auto' }}
            exit={{ height: 0 }}
            transition={{ duration: 0.45, ease: [0.16, 1, 0.3, 1] }}
            style={{ overflow: 'hidden' }}
          >
            {/* Content fades in after height starts expanding */}
            <motion.div
              initial={{ opacity: 0, y: 8 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.3, delay: 0.12, ease: [0.16, 1, 0.3, 1] }}
              className={`font-body font-light text-[13px] leading-relaxed pb-6 ${
                light ? 'text-background/50' : 'text-muted'
              }`}
            >
              {children}
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  )
}
