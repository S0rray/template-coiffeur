import { SectionHeader } from '@/components/ui/SectionHeader'
import { team } from '@/lib/data'

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
              {/* Photo placeholder */}
              <div className="aspect-3/4 rounded-sm overflow-hidden bg-cream-alt flex items-center justify-center mb-4">
                {/* Remplacer par <Image src={`/images/team/${member.slug}.jpg`} alt={member.name} fill className="object-cover" /> */}
                <div className="text-center text-sub/60 p-4">
                  <div className="w-14 h-14 rounded-full bg-sub/20 mx-auto mb-2 flex items-center justify-center">
                    <span className="font-serif text-2xl text-sub/50">
                      {member.name[0]}
                    </span>
                  </div>
                  <p className="text-xs">Photo</p>
                </div>
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
