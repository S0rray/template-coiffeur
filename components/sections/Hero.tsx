import { Button } from '@/components/ui/Button'
import { salon } from '@/lib/data'
import { SiteImage } from '@/components/ui/SiteImage'

export function Hero() {
  return (
    <section id="accueil" className="relative bg-dark flex flex-col">
      {/* Accent gauche */}
      <div className="absolute left-0 top-0 bottom-0 w-1 bg-gold" />

      {/* Contenu principal */}
      <div className="flex-1 max-w-360 w-full mx-auto px-8 md:px-16 lg:px-20 pt-36 pb-20 flex flex-col lg:flex-row items-center gap-12 lg:gap-16">
        {/* Texte */}
        <div className="flex-1 max-w-xl">
          <div className="w-16 h-0.5 bg-gold mb-8" />
          <h1 className="font-serif text-5xl sm:text-6xl lg:text-7xl font-bold text-cream leading-tight mb-6">
            L'Art du<br />
            <span className="text-gold">Cheveu</span>
          </h1>
          <p className="text-base md:text-lg text-sub leading-relaxed mb-10 max-w-md">
            Sublimez votre beauté naturelle dans un cadre élégant et raffiné.
            Votre coiffeur de confiance depuis 2010.
          </p>
          <div className="flex flex-wrap gap-4">
            <Button href="#reservation">Prendre Rendez-vous</Button>
            <Button href="#services" variant="outline">Nos Services</Button>
          </div>
        </div>

        {/* Image */}
        <div className="w-full lg:w-[46%] aspect-4/5 max-h-155 rounded-sm overflow-hidden relative bg-dark-card flex items-center justify-center">
          <SiteImage
            src="/images/hero.jpg"
            alt="Salon Élégance"
            fill
            className="object-cover"
            priority
            sizes="(max-width: 1024px) 100vw, 46vw"
            fallback={
              <div className="text-center text-sub px-8">
                <div className="w-12 h-12 rounded-full border border-sub/30 flex items-center justify-center mx-auto mb-3">
                  <span className="text-xl">📷</span>
                </div>
                <p className="font-mono text-xs">hero.jpg</p>
                <p className="text-xs text-sub/60 mt-1">public/images/</p>
              </div>
            }
          />
          {/* Cadre décoratif */}
          <div className="absolute inset-4 border border-gold/20 rounded-sm pointer-events-none" />
        </div>
      </div>

      {/* Barre de stats */}
      <div className="bg-dark-deep border-t border-white/5">
        <div className="max-w-360 mx-auto px-8 md:px-16 lg:px-20 py-5 grid grid-cols-2 md:grid-cols-4 gap-6">
          {salon.stats.map((stat) => (
            <div key={stat.value} className="flex flex-col">
              <span className="font-serif text-2xl font-bold text-gold">{stat.value}</span>
              <span className="text-xs text-nav mt-1">{stat.label}</span>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
