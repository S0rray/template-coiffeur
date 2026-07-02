import { SectionHeader } from '@/components/ui/SectionHeader'
import { team } from '@/lib/data'
import { SiteImage } from '@/components/ui/SiteImage'

export function Team() {
  return (
    <section id="equipe" className="bg-white py-24 px-6 md:px-10 lg:px-16">
      <div className="max-w-360 mx-auto">
        <SectionHeader
          label="Notre Équipe"
          title="Nos Experts"
          center
        />

        <div className="grid grid-cols-2 lg:grid-cols-4 gap-6">
          {team.map((member) => (
            <article key={member.name} className="flex flex-col">
              <div className="aspect-3/4 relative rounded-sm overflow-hidden bg-cream-alt flex items-center justify-center mb-4">
                <SiteImage
                  src={`/images/team-${member.slug}.jpg`}
                  alt={member.name}
                  fill
                  className="object-cover"
                  sizes="(max-width: 1024px) 50vw, 25vw"
                  fallback={
                    <div className="text-center text-sub/60 p-4">
                      <div className="w-14 h-14 rounded-full bg-sub/20 mx-auto mb-2 flex items-center justify-center">
                        <span className="font-serif text-2xl text-sub/50">{member.name[0]}</span>
                      </div>
                      <p className="font-mono text-xs">team-{member.slug}.jpg</p>
                    </div>
                  }
                />
              </div>
              <h3 className="font-serif text-lg font-bold text-dark">{member.name}</h3>
              <p className="text-sm text-sub mt-1">{member.role}</p>
            </article>
          ))}
        </div>
      </div>
    </section>
  )
}
