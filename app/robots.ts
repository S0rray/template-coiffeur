import type { MetadataRoute } from 'next'

// Site de démo — on bloque tous les crawlers
export default function robots(): MetadataRoute.Robots {
  return {
    rules: {
      userAgent: '*',
      disallow: '/',
    },
  }
}
