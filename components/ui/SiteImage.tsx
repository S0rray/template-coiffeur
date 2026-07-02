'use client'

import { useState } from 'react'

interface SiteImageProps {
  src: string
  alt: string
  fallback: React.ReactNode
  // kept for API compatibility with next/image props — not used
  fill?: boolean
  className?: string
  sizes?: string
  priority?: boolean
}

export function SiteImage({ src, alt, fallback, priority }: SiteImageProps) {
  const [failed, setFailed] = useState(false)
  if (failed) return <>{fallback}</>
  return (
    // eslint-disable-next-line @next/next/no-img-element
    <img
      src={src}
      alt={alt}
      className="absolute inset-0 w-full h-full object-cover"
      loading={priority ? 'eager' : 'lazy'}
      decoding={priority ? 'sync' : 'async'}
      onError={() => setFailed(true)}
    />
  )
}
