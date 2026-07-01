interface SectionHeaderProps {
  label: string
  title: string
  description?: string
  light?: boolean
  center?: boolean
}

export function SectionHeader({
  label,
  title,
  description,
  light = false,
  center = false,
}: SectionHeaderProps) {
  const align = center ? 'items-center text-center' : 'items-start'
  const titleColor = light ? 'text-cream' : 'text-dark'
  const labelColor = light ? 'text-gold' : 'text-gold'
  const descColor = light ? 'text-nav' : 'text-sub'

  return (
    <div className={`flex flex-col ${align} mb-12 md:mb-16`}>
      <div className={`w-14 h-0.5 bg-gold mb-5 ${center ? 'mx-auto' : ''}`} />
      <p className={`text-[10px] font-semibold tracking-[0.2em] uppercase mb-3 ${labelColor}`}>
        {label}
      </p>
      <h2 className={`font-serif text-4xl md:text-5xl font-bold leading-tight ${titleColor}`}>
        {title}
      </h2>
      {description && (
        <p className={`mt-5 text-base md:text-lg leading-relaxed max-w-xl ${descColor}`}>
          {description}
        </p>
      )}
    </div>
  )
}
