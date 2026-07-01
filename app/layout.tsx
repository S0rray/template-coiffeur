import type { Metadata } from 'next'
import { headers } from 'next/headers'
import './globals.css'
import { inter, playfair } from '@/lib/fonts'
import { Navbar } from '@/components/layout/Navbar'
import { Footer } from '@/components/layout/Footer'

export const metadata: Metadata = {
  title: {
    default: 'Élégance — Salon de Coiffure Paris',
    template: '%s | Élégance Salon',
  },
  description:
    'Salon de coiffure haut de gamme au cœur de Paris. Coupes, colorations, soins et coiffures mariage par des experts passionnés.',
  keywords: ['salon de coiffure', 'coiffeur Paris', 'coloration', 'coupe', 'mariage'],
  openGraph: {
    siteName: 'Élégance Salon',
    locale: 'fr_FR',
    type: 'website',
  },
}

export default async function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  const heads = await headers()
  const pathname = heads.get('x-pathname') ?? ''
  const isAdmin = pathname.startsWith('/admin')

  return (
    <html lang="fr" className={`${inter.variable} ${playfair.variable}`}>
      <body className={isAdmin ? 'bg-dark-deep' : 'flex flex-col min-h-screen'}>
        {!isAdmin && <Navbar />}
        {isAdmin ? children : <main className="flex-1">{children}</main>}
        {!isAdmin && <Footer />}
      </body>
    </html>
  )
}
