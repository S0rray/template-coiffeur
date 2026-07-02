'use client'

import { useState } from 'react'
import Image from 'next/image'

interface SiteImageProps {
  src: string
  alt: string
  fallback: React.ReactNode
  fill?: boolean
  className?: string
  priority?: boolean
  sizes?: string
}

export function SiteImage({ src, alt, fallback, fill, className, priority, sizes }: SiteImageProps) {
  const [failed, setFailed] = useState(false)
  if (failed) return <>{fallback}</>
  return (
    <Image
      src={src}
      alt={alt}
      fill={fill}
      className={className}
      priority={priority}
      sizes={sizes}
      onError={() => setFailed(true)}
    />
  )
}
