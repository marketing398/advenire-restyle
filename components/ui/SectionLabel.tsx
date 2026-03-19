interface SectionLabelProps {
  children: React.ReactNode
  className?: string
}

export default function SectionLabel({ children, className }: SectionLabelProps) {
  return (
    <span
      className={`font-label text-xs uppercase tracking-[0.2em] text-muted ${className ?? ''}`}
    >
      {children}
    </span>
  )
}
