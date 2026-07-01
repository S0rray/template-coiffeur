import { SectionHeader } from '@/components/ui/SectionHeader'
import { services } from '@/lib/data'

export function Services() {
  return (
    <section id="services" className="bg-cream py-24 px-6 md:px-10 lg:px-16">
      <div className="max-w-360 mx-auto">
        <SectionHeader
          label="Nos Prestations"
          title="Nos Services"
          description="Des soins capillaires sur-mesure pour révéler votre beauté naturelle."
          center
        />

        <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-4 gap-6">
          {services.map((service) => (
            <article
              key={service.id}
              className="bg-white rounded-sm overflow-hidden shadow-sm hover:shadow-md transition-shadow duration-300 flex flex-col"
            >
              {/* Accent or doré */}
              <div className="h-[3px] bg-gold" />

              <div className="p-7 flex flex-col flex-1">
                {/* Icône placeholder */}
                <div className="w-11 h-11 rounded-full bg-cream-alt flex items-center justify-center mb-6">
                  <div className="w-4 h-4 rounded-full bg-gold/40" />
                </div>

                <h3 className="font-serif text-xl font-bold text-dark mb-3">
                  {service.title}
                </h3>
                <p className="text-sm text-sub leading-relaxed flex-1">
                  {service.description}
                </p>

                {/* Badge prix */}
                <div className="mt-6 inline-flex items-center px-4 py-2 bg-cream-alt rounded-sm">
                  <span className="text-sm font-semibold text-gold-dim">
                    {service.price}
                  </span>
                </div>
              </div>
            </article>
          ))}
        </div>
      </div>
    </section>
  )
}
