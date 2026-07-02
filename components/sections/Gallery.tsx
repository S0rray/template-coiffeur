import { SectionHeader } from '@/components/ui/SectionHeader'
import { SiteImage } from '@/components/ui/SiteImage'

const photos = [
  { id: 1, label: 'Coupe femme' },
  { id: 2, label: 'Coloration' },
  { id: 3, label: 'Balayage' },
  { id: 4, label: 'Coiffure mariée' },
  { id: 5, label: 'Soin kératine' },
  { id: 6, label: 'Coupe homme' },
]

const shades = [
  'bg-[#C4BDB6]',
  'bg-[#D1C9C1]',
  'bg-[#B8B0A8]',
  'bg-[#C8C0B8]',
  'bg-[#BCBBB0]',
  'bg-[#CECAC4]',
]

export function Gallery() {
  return (
    <section id="galerie" className="bg-cream py-24 px-6 md:px-10 lg:px-16">
      <div className="max-w-360 mx-auto">
        <SectionHeader
          label="Nos Réalisations"
          title="Galerie"
          center
        />

        {/* Grille desktop mosaïque / mobile 2 colonnes */}
        <div className="grid grid-cols-2 lg:grid-cols-4 lg:grid-rows-2 gap-3 lg:h-130">
          {/* Grande image gauche */}
          <div className={`lg:row-span-2 relative rounded-sm overflow-hidden ${shades[0]} flex items-center justify-center aspect-square lg:aspect-auto`}>
            <SiteImage
              src="/images/gallery-1.jpg"
              alt={photos[0].label}
              fill
              className="object-cover"
              sizes="(max-width: 1024px) 50vw, 25vw"
              fallback={<PhotoPlaceholder label={photos[0].label} index={1} />}
            />
          </div>

          {/* Colonne milieu haut */}
          <div className={`relative rounded-sm overflow-hidden ${shades[1]} flex items-center justify-center aspect-square lg:aspect-auto`}>
            <SiteImage
              src="/images/gallery-2.jpg"
              alt={photos[1].label}
              fill
              className="object-cover"
              sizes="(max-width: 1024px) 50vw, 25vw"
              fallback={<PhotoPlaceholder label={photos[1].label} index={2} />}
            />
          </div>

          {/* Colonne milieu bas */}
          <div className={`relative rounded-sm overflow-hidden ${shades[2]} flex items-center justify-center aspect-square lg:aspect-auto`}>
            <SiteImage
              src="/images/gallery-3.jpg"
              alt={photos[2].label}
              fill
              className="object-cover"
              sizes="(max-width: 1024px) 50vw, 25vw"
              fallback={<PhotoPlaceholder label={photos[2].label} index={3} />}
            />
          </div>

          {/* Grande image droite */}
          <div className={`lg:row-span-2 relative rounded-sm overflow-hidden ${shades[3]} flex items-center justify-center aspect-square lg:aspect-auto`}>
            <SiteImage
              src="/images/gallery-4.jpg"
              alt={photos[3].label}
              fill
              className="object-cover"
              sizes="(max-width: 1024px) 50vw, 25vw"
              fallback={<PhotoPlaceholder label={photos[3].label} index={4} />}
            />
          </div>

          {/* Ligne 2 milieu */}
          <div className={`relative rounded-sm overflow-hidden ${shades[4]} flex items-center justify-center aspect-square lg:aspect-auto`}>
            <SiteImage
              src="/images/gallery-5.jpg"
              alt={photos[4].label}
              fill
              className="object-cover"
              sizes="(max-width: 1024px) 50vw, 25vw"
              fallback={<PhotoPlaceholder label={photos[4].label} index={5} />}
            />
          </div>
          <div className={`relative rounded-sm overflow-hidden ${shades[5]} flex items-center justify-center aspect-square lg:aspect-auto`}>
            <SiteImage
              src="/images/gallery-6.jpg"
              alt={photos[5].label}
              fill
              className="object-cover"
              sizes="(max-width: 1024px) 50vw, 25vw"
              fallback={<PhotoPlaceholder label={photos[5].label} index={6} />}
            />
          </div>
        </div>
      </div>
    </section>
  )
}

function PhotoPlaceholder({ label, index }: { label: string; index: number }) {
  return (
    <div className="text-center text-dark/40 p-4">
      <p className="text-xs font-medium">Photo {index}</p>
      <p className="text-xs mt-0.5">{label}</p>
    </div>
  )
}
