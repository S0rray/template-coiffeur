'use client'

import { useEffect } from 'react'

export default function Error({
  error,
  reset,
}: {
  error: Error & { digest?: string }
  reset: () => void
}) {
  useEffect(() => {
    console.error(error)
  }, [error])

  return (
    <section className="bg-dark min-h-screen flex flex-col items-center justify-center px-6 pt-20 pb-16 relative text-center">
      <div className="absolute left-0 top-0 bottom-0 w-1 bg-gold" />

      <div className="w-14 h-0.5 bg-gold mx-auto mb-6" />
      <p className="text-[10px] font-semibold tracking-[0.2em] uppercase text-sub mb-4">
        Erreur
      </p>

      <p className="font-serif text-2xl md:text-3xl text-cream mb-5">
        Une erreur est survenue
      </p>

      <p className="text-sub leading-relaxed max-w-md mb-10">
        Quelque chose s'est mal passé de notre côté. Réessayez, ou revenez à l'accueil.
      </p>

      <button
        onClick={reset}
        className="inline-block bg-gold text-dark font-semibold px-8 py-4 rounded-sm hover:bg-gold/90 active:scale-[0.99] transition-all duration-200"
      >
        Réessayer
      </button>
    </section>
  )
}
