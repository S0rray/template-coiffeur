import type { Metadata } from 'next'
import { salon } from '@/lib/data'

export const metadata: Metadata = {
  title: 'Maintenance — Élégance Salon',
  description: 'Site momentanément en maintenance. Nous revenons très bientôt.',
}

export default function Maintenance() {
  return (
    <section className="bg-dark min-h-screen flex flex-col items-center justify-center px-6 pt-20 pb-16 relative text-center">
      <div className="absolute left-0 top-0 bottom-0 w-1 bg-gold" />

      <div className="w-14 h-0.5 bg-gold mx-auto mb-6" />
      <p className="text-[10px] font-semibold tracking-[0.2em] uppercase text-sub mb-8">
        Maintenance
      </p>

      {/* Icône horloge */}
      <div className="w-20 h-20 rounded-full border border-gold/30 flex items-center justify-center mx-auto mb-8 text-gold">
        <svg
          width="36"
          height="36"
          viewBox="0 0 24 24"
          fill="none"
          stroke="currentColor"
          strokeWidth="1.5"
          strokeLinecap="round"
          strokeLinejoin="round"
          aria-hidden="true"
        >
          <circle cx="12" cy="12" r="10" />
          <polyline points="12 6 12 12 16 14" />
        </svg>
      </div>

      <h1 className="font-serif text-3xl md:text-4xl font-bold text-cream mb-5 max-w-lg">
        Site en cours de maintenance
      </h1>

      <p className="text-sub leading-relaxed max-w-md mb-3">
        Nous effectuons quelques améliorations pour mieux vous servir.
        Le site sera de retour très prochainement.
      </p>
      <p className="text-sm text-gold mb-12">Merci pour votre patience.</p>

      {/* Contact de secours */}
      <div className="border-t border-white/10 pt-8 mt-4 flex flex-col items-center gap-2">
        <p className="text-[10px] font-semibold tracking-widest uppercase text-sub mb-2">
          Nous contacter en attendant
        </p>
        <a
          href={`tel:${salon.phone.replace(/\s/g, '')}`}
          className="text-nav hover:text-gold transition-colors duration-200 text-sm"
        >
          {salon.phone}
        </a>
        <a
          href={`mailto:${salon.email}`}
          className="text-nav hover:text-gold transition-colors duration-200 text-sm"
        >
          {salon.email}
        </a>
      </div>
    </section>
  )
}
