import Link from 'next/link'

interface ButtonProps {
  href: string
  variant?: 'primary' | 'outline'
  children: React.ReactNode
  className?: string
}

export function Button({ href, variant = 'primary', children, className = '' }: ButtonProps) {
  const base = 'inline-flex items-center justify-center px-7 py-3.5 text-sm font-semibold rounded-sm transition-all duration-200'
  const variants = {
    primary: 'bg-gold text-dark hover:bg-gold/90 active:scale-95',
    outline: 'border border-gold text-gold hover:bg-gold/10 active:scale-95',
  }

  return (
    <Link href={href} className={`${base} ${variants[variant]} ${className}`}>
      {children}
    </Link>
  )
}
