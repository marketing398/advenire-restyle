import Link from 'next/link'

interface ButtonProps {
  variant?: 'outline' | 'solid' | 'ghost'
  size?: 'sm' | 'md' | 'lg'
  href?: string
  onClick?: () => void
  children: React.ReactNode
  className?: string
  type?: 'button' | 'submit' | 'reset'
}

const variantClasses = {
  outline:
    'border border-primary text-primary hover:bg-primary hover:text-background',
  solid:
    'bg-primary text-background hover:bg-primary-light',
  ghost:
    'text-primary hover:underline underline-offset-4',
}

const sizeClasses = {
  sm: 'px-5 py-2.5 text-[10px]',
  md: 'px-7 py-3.5 text-[10px]',
  lg: 'px-8 py-4 text-[11px]',
}

export default function Button({
  variant = 'solid',
  size = 'md',
  href,
  onClick,
  children,
  className,
  type = 'button',
}: ButtonProps) {
  const base =
    'inline-flex items-center font-label uppercase tracking-[0.18em] transition-all duration-300'
  const classes = `${base} ${variantClasses[variant]} ${sizeClasses[size]} ${className ?? ''}`

  if (href) {
    return (
      <Link href={href} className={classes} style={{ cursor: 'pointer' }}>
        {children}
      </Link>
    )
  }

  return (
    <button type={type} onClick={onClick} className={classes} style={{ cursor: 'pointer' }}>
      {children}
    </button>
  )
}
