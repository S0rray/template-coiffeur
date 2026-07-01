import Link from 'next/link'
import { salon, navLinks, legalLinks } from '@/lib/data'

function InstagramIcon({ size = 18 }: { size?: number }) {
  return (
    <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
      <rect x="2" y="2" width="20" height="20" rx="5" ry="5" />
      <circle cx="12" cy="12" r="4" />
      <circle cx="17.5" cy="6.5" r="0.5" fill="currentColor" stroke="none" />
    </svg>
  )
}

function FacebookIcon({ size = 18 }: { size?: number }) {
  return (
    <svg width={size} height={size} viewBox="0 0 24 24" fill="currentColor" aria-hidden="true">
      <path d="M18 2h-3a5 5 0 0 0-5 5v3H7v4h3v8h4v-8h3l1-4h-4V7a1 1 0 0 1 1-1h3z" />
    </svg>
  )
}

function TikTokIcon({ size = 18 }: { size?: number }) {
  return (
    <svg width={size} height={size} viewBox="0 0 24 24" fill="currentColor" aria-hidden="true">
      <path d="M19.59 6.69a4.83 4.83 0 0 1-3.77-4.25V2h-3.45v13.67a2.89 2.89 0 0 1-2.88 2.5 2.89 2.89 0 0 1-2.89-2.89 2.89 2.89 0 0 1 2.89-2.89c.28 0 .54.04.79.1V9.01a6.32 6.32 0 0 0-.79-.05 6.34 6.34 0 0 0-6.34 6.34 6.34 6.34 0 0 0 6.34 6.34 6.34 6.34 0 0 0 6.33-6.34V8.69a8.18 8.18 0 0 0 4.78 1.52V6.78a4.85 4.85 0 0 1-1.01-.09z" />
    </svg>
  )
}

export function Footer() {
  return (
    <footer className="bg-dark-deep text-nav">
      {/* Corps du footer */}
      <div className="max-w-360 mx-auto px-6 md:px-10 lg:px-16 py-14 flex flex-col md:flex-row gap-10 md:gap-16 justify-between">
        {/* Colonne logo */}
        <div className="shrink-0">
          <p className="font-serif text-lg text-gold tracking-wider">ÉLÉGANCE</p>
          <p className="text-xs text-sub mt-1 tracking-widest">{salon.tagline.toUpperCase()}</p>
          <p className="text-sm mt-6 text-sub leading-relaxed max-w-55">
            {salon.address}
          </p>
          <p className="text-sm mt-1 text-sub">{salon.phone}</p>
          <div className="flex gap-3 mt-6">
            <Link
              href={salon.social.instagram}
              target="_blank"
              rel="noopener noreferrer"
              aria-label="Instagram"
              className="w-9 h-9 rounded-lg bg-[#E1306C] flex items-center justify-center text-white hover:opacity-90 transition-opacity"
            >
              <InstagramIcon size={16} />
            </Link>
            <Link
              href={salon.social.facebook}
              target="_blank"
              rel="noopener noreferrer"
              aria-label="Facebook"
              className="w-9 h-9 rounded-lg bg-[#1877F2] flex items-center justify-center text-white hover:opacity-90 transition-opacity"
            >
              <FacebookIcon size={16} />
            </Link>
            <Link
              href={salon.social.tiktok}
              target="_blank"
              rel="noopener noreferrer"
              aria-label="TikTok"
              className="w-9 h-9 rounded-lg bg-[#010101] border border-white/10 flex items-center justify-center text-[#25F4EE] hover:opacity-90 transition-opacity"
            >
              <TikTokIcon size={16} />
            </Link>
          </div>
        </div>

        {/* Nav */}
        <div>
          <p className="text-[10px] font-semibold tracking-widest text-gold uppercase mb-4">
            Navigation
          </p>
          <ul className="flex flex-col gap-2.5">
            {navLinks.map((link) => (
              <li key={link.href}>
                <Link
                  href={link.href}
                  className="text-sm text-nav hover:text-gold transition-colors duration-200"
                >
                  {link.label}
                </Link>
              </li>
            ))}
          </ul>
        </div>

        {/* Horaires */}
        <div>
          <p className="text-[10px] font-semibold tracking-widest text-gold uppercase mb-4">
            Horaires
          </p>
          <ul className="flex flex-col gap-2">
            {salon.hours.map((h) => (
              <li key={h.days} className="flex justify-between gap-8 text-sm">
                <span className="text-sub">{h.days}</span>
                <span className="text-nav">{h.time}</span>
              </li>
            ))}
          </ul>
          <div className="mt-6">
            <p className="text-[10px] font-semibold tracking-widest text-gold uppercase mb-3">
              Contact
            </p>
            <p className="text-sm text-nav">{salon.email}</p>
          </div>
        </div>
      </div>

      {/* Bas de page — légaux */}
      <div className="border-t border-white/8 max-w-360 mx-auto px-6 md:px-10 lg:px-16 py-5 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
        <p className="text-xs text-sub">
          © {new Date().getFullYear()} Élégance Salon · Tous droits réservés.
        </p>
        <nav className="flex flex-wrap gap-x-5 gap-y-2">
          {legalLinks.map((link) => (
            <Link
              key={link.href}
              href={link.href}
              className="text-xs text-sub hover:text-nav transition-colors duration-200"
            >
              {link.label}
            </Link>
          ))}
        </nav>
      </div>
    </footer>
  )
}
