'use client'

import { useState, useEffect } from 'react'
import Link from 'next/link'

import { navLinks } from '@/lib/data'

export function Navbar() {
  const [open, setOpen] = useState(false)
  const [scrolled, setScrolled] = useState(false)

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 30)
    window.addEventListener('scroll', onScroll, { passive: true })
    return () => window.removeEventListener('scroll', onScroll)
  }, [])

  return (
    <header
      className={`fixed top-0 inset-x-0 z-50 transition-all duration-300 ${
        scrolled ? 'bg-dark/95 backdrop-blur-md shadow-lg shadow-black/20' : 'bg-dark'
      }`}
    >
      <div className="max-w-360 mx-auto px-6 md:px-10 lg:px-16 flex items-center justify-between h-20 border-b border-white/5">
        {/* Logo */}
        <Link href="/" className="flex flex-col leading-none shrink-0">
          <span className="font-serif text-xl tracking-wider text-gold">ÉLÉGANCE</span>
          <span className="text-[9px] font-semibold tracking-[0.22em] text-sub mt-0.5">
            SALON DE COIFFURE
          </span>
        </Link>

        {/* Nav desktop */}
        <nav className="hidden md:flex items-center gap-6 lg:gap-8 ml-auto">
          {navLinks.map((link) => (
            <Link
              key={link.href}
              href={link.href}
              className="text-[13px] text-nav hover:text-gold transition-colors duration-200"
            >
              {link.label}
            </Link>
          ))}
        </nav>

        {/* Bouton burger mobile */}
        <button
          onClick={() => setOpen(!open)}
          className="md:hidden text-gold p-2 -mr-2"
          aria-label={open ? 'Fermer le menu' : 'Ouvrir le menu'}
        >
          <div className="flex flex-col justify-center gap-1.5 w-6">
            <span className={`block h-0.5 bg-gold rounded-full transition-all duration-300 origin-center ${open ? 'translate-y-2 rotate-45' : ''}`} />
            <span className={`block h-0.5 bg-gold rounded-full transition-all duration-300 ${open ? 'opacity-0 scale-x-0' : ''}`} />
            <span className={`block h-0.5 bg-gold rounded-full transition-all duration-300 origin-center ${open ? '-translate-y-2 -rotate-45' : ''}`} />
          </div>
        </button>
      </div>

      {/* Menu mobile */}
      <div
        className={`md:hidden overflow-hidden transition-all duration-300 bg-dark border-b border-white/10 ${
          open ? 'max-h-96' : 'max-h-0'
        }`}
      >
        <nav className="flex flex-col px-6 py-4 gap-1">
          {navLinks.map((link) => (
            <Link
              key={link.href}
              href={link.href}
              onClick={() => setOpen(false)}
              className="text-sm text-nav hover:text-gold py-3 border-b border-white/5 last:border-0 transition-colors duration-200"
            >
              {link.label}
            </Link>
          ))}
        </nav>
      </div>
    </header>
  )
}
