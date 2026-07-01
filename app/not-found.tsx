import type { Metadata } from 'next'
import Link from 'next/link'

export const metadata: Metadata = {
  title: '404 — Page introuvable · Élégance Salon',
}

export default function NotFound() {
  return (
    <section className="bg-dark min-h-screen flex flex-col items-center justify-center px-6 pt-20 pb-16 relative text-center">
      <div className="absolute left-0 top-0 bottom-0 w-1 bg-gold" />

      <div className="w-14 h-0.5 bg-gold mx-auto mb-6" />
      <p className="text-[10px] font-semibold tracking-[0.2em] uppercase text-sub mb-4">
        Erreur 404
      </p>

      <h1 className="font-serif text-[8rem] sm:text-[11rem] font-bold text-gold leading-none mb-3">
        404
      </h1>

      <p className="font-serif text-2xl md:text-3xl text-cream mb-5">
        Page introuvable
      </p>

      <p className="text-sub leading-relaxed max-w-md mb-10">
        La page que vous recherchez n'existe pas ou a été déplacée.
        Retournez à l'accueil pour continuer votre navigation.
      </p>

      <Link
        href="/"
        className="inline-block bg-gold text-dark font-semibold px-8 py-4 rounded-sm hover:bg-gold/90 active:scale-[0.99] transition-all duration-200"
      >
        Retour à l'accueil
      </Link>
    </section>
  )
}
