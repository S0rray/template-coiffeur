import { Button } from '@/components/ui/Button'
import { SectionHeader } from '@/components/ui/SectionHeader'

export function About() {
  return (
    <section id="propos" className="bg-white py-24 px-6 md:px-10 lg:px-16">
      <div className="max-w-360 mx-auto flex flex-col lg:flex-row items-center gap-14 lg:gap-20">
        {/* Image */}
        <div className="w-full lg:w-[46%] aspect-4/5 max-h-145 shrink-0 relative rounded-sm overflow-hidden bg-cream-alt flex items-center justify-center">
          {/* Remplacer par <Image src="/images/about.jpg" alt="Notre équipe" fill className="object-cover" /> */}
          <div className="text-center text-sub px-8">
            <div className="w-12 h-12 rounded-full border border-sub/30 flex items-center justify-center mx-auto mb-3">
              <span className="text-xl">📷</span>
            </div>
            <p className="text-sm">Photo équipe / salon</p>
            <p className="text-xs text-sub/60 mt-1">à remplacer</p>
          </div>
          {/* Point décoratif */}
          <div className="absolute -bottom-5 -right-5 w-20 h-20 rounded-full bg-cream-alt" />
        </div>

        {/* Texte */}
        <div className="flex-1">
          <SectionHeader
            label="Notre Histoire"
            title={`Un salon au cœur\nde votre quartier`}
          />
          <p className="text-sub leading-relaxed mb-4">
            Depuis 2010, notre salon accueille une clientèle fidèle dans un
            cadre chaleureux et élégant. Notre équipe passionnée met tout son
            savoir-faire au service de votre beauté.
          </p>
          <p className="text-sub leading-relaxed mb-10">
            Nous travaillons exclusivement avec des produits premium respectueux
            de l'environnement et de la santé capillaire.
          </p>
          <Button href="#services">Découvrir nos services →</Button>
        </div>
      </div>
    </section>
  )
}
