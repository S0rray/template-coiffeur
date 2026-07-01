interface LegalSection {
  heading: string
  body: string | React.ReactNode
}

interface LegalLayoutProps {
  title: string
  label: string
  sections: LegalSection[]
}

export function LegalLayout({ title, label, sections }: LegalLayoutProps) {
  return (
    <>
      {/* Hero page */}
      <section className="bg-dark pt-32 pb-16 px-6 md:px-10 lg:px-16 relative">
        <div className="absolute left-0 top-0 bottom-0 w-1 bg-gold" />
        <div className="max-w-4xl mx-auto">
          <div className="w-14 h-0.5 bg-gold mb-5" />
          <p className="text-[10px] font-semibold tracking-[0.2em] uppercase text-sub mb-3">
            {label}
          </p>
          <h1 className="font-serif text-4xl md:text-5xl font-bold text-cream">
            {title}
          </h1>
        </div>
      </section>

      {/* Contenu */}
      <section className="bg-white py-16 md:py-24 px-6 md:px-10 lg:px-16">
        <div className="max-w-4xl mx-auto space-y-14">
          {sections.map((section) => (
            <div key={section.heading}>
              <div className="flex items-center gap-4 mb-4">
                <div className="w-8 h-0.5 bg-gold shrink-0" />
                <h2 className="font-serif text-2xl font-bold text-dark">
                  {section.heading}
                </h2>
              </div>
              <div className="pl-12 text-sub leading-relaxed text-[15px] whitespace-pre-line">
                {section.body}
              </div>
            </div>
          ))}
        </div>
      </section>
    </>
  )
}
