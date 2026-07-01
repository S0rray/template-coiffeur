import type { Metadata } from 'next'
import Link from 'next/link'
import { navLinks, legalLinks } from '@/lib/data'

export const metadata: Metadata = {
  title: 'Plan du site',
  description: 'Toutes les pages du site Élégance Salon.',
}

const sitemapGroups = [
  {
    title: 'Page principale',
    subtitle: 'Accueil',
    links: navLinks.map((l) => ({ label: l.label, href: l.href })),
  },
  {
    title: 'Pages légales',
    subtitle: 'Informations légales',
    links: legalLinks,
  },
  {
    title: 'Contact & Réseaux',
    subtitle: 'Nous rejoindre',
    links: [
      { label: 'Formulaire de contact', href: '#reservation' },
      { label: 'Adresse & horaires', href: '#reservation' },
      { label: 'Instagram', href: 'https://instagram.com/elegance_salon' },
      { label: 'Facebook', href: 'https://facebook.com/elegancesalon' },
      { label: 'TikTok', href: 'https://tiktok.com/@elegancesalon' },
    ],
  },
]

export default function PlanDuSite() {
  return (
    <>
      {/* Hero */}
      <section className="bg-dark pt-32 pb-16 px-6 md:px-10 lg:px-16 relative">
        <div className="absolute left-0 top-0 bottom-0 w-1 bg-gold" />
        <div className="max-w-4xl mx-auto">
          <div className="w-14 h-0.5 bg-gold mb-5" />
          <p className="text-[10px] font-semibold tracking-[0.2em] uppercase text-sub mb-3">
            Toutes nos pages
          </p>
          <h1 className="font-serif text-4xl md:text-5xl font-bold text-cream">
            Plan du site
          </h1>
        </div>
      </section>

      {/* Contenu */}
      <section className="bg-white py-16 md:py-24 px-6 md:px-10 lg:px-16">
        <div className="max-w-5xl mx-auto grid grid-cols-1 md:grid-cols-3 gap-12">
          {sitemapGroups.map((group) => (
            <div key={group.title}>
              <div className="w-10 h-0.5 bg-gold mb-4" />
              <p className="text-[10px] font-semibold tracking-widest text-gold uppercase mb-1">
                {group.title}
              </p>
              <h2 className="font-serif text-2xl font-bold text-dark mb-6">
                {group.subtitle}
              </h2>
              <ul className="flex flex-col gap-3">
                {group.links.map((link) => (
                  <li key={link.label} className="flex items-center gap-2">
                    <span className="w-1 h-1 rounded-full bg-gold shrink-0" />
                    <Link
                      href={link.href}
                      className="text-sm text-sub hover:text-gold transition-colors duration-200"
                    >
                      {link.label}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>
      </section>
    </>
  )
}
