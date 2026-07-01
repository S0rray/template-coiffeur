'use client'

import { useState } from 'react'
import Link from 'next/link'
import { usePathname } from 'next/navigation'
import { Calendar, CalendarDays, Scissors, UmbrellaOff, LogOut, Menu, X } from 'lucide-react'

const navItems = [
  { label: 'Réservations', href: '/admin/reservations', Icon: Calendar },
  { label: 'Calendrier',   href: '/admin/calendrier',   Icon: CalendarDays },
  { label: 'Coiffeurs',    href: '/admin/coiffeurs',    Icon: Scissors },
  { label: 'Congés',       href: '/admin/conges',       Icon: UmbrellaOff },
]

function SidebarContent({
  pathname,
  logout,
  onNavClick,
}: {
  pathname: string
  logout: () => Promise<void>
  onNavClick?: () => void
}) {
  return (
    <>
      {/* Logo */}
      <div className="px-6 py-5 border-b border-white/5 flex items-center justify-between">
        <div>
          <p className="font-serif text-base text-gold tracking-wider">ÉLÉGANCE</p>
          <p className="text-[9px] font-semibold tracking-[0.2em] text-sub mt-0.5 uppercase">
            Administration
          </p>
        </div>
        {onNavClick && (
          <button onClick={onNavClick} className="text-sub hover:text-nav transition-colors lg:hidden">
            <X size={18} />
          </button>
        )}
      </div>

      {/* Nav */}
      <nav className="flex-1 px-3 py-4 flex flex-col gap-1">
        {navItems.map(({ label, href, Icon }) => {
          const active = pathname.startsWith(href)
          return (
            <Link
              key={href}
              href={href}
              onClick={onNavClick}
              className={`flex items-center gap-3 px-3 py-2.5 rounded-sm text-sm transition-all duration-150 border-l-2 pl-2.5 ${
                active
                  ? 'text-gold bg-gold/8 border-gold'
                  : 'text-nav hover:text-cream hover:bg-white/5 border-transparent'
              }`}
            >
              <Icon size={15} />
              {label}
            </Link>
          )
        })}
      </nav>

      {/* Logout */}
      <div className="px-3 py-4 border-t border-white/5">
        <form action={logout}>
          <button
            type="submit"
            className="w-full flex items-center gap-3 px-3 py-2.5 pl-2.5 rounded-sm text-sm text-sub hover:text-red-400 hover:bg-white/5 transition-all duration-150"
          >
            <LogOut size={15} />
            Se déconnecter
          </button>
        </form>
      </div>
    </>
  )
}

export function AdminShell({
  children,
  logout,
}: {
  children: React.ReactNode
  logout: () => Promise<void>
}) {
  const [drawerOpen, setDrawerOpen] = useState(false)
  const pathname = usePathname()

  return (
    <div className="min-h-screen bg-dark-deep flex">
      {/* Sidebar — desktop uniquement */}
      <aside className="hidden lg:flex w-56 shrink-0 bg-dark border-r border-white/5 flex-col sticky top-0 h-screen">
        <SidebarContent pathname={pathname} logout={logout} />
      </aside>

      {/* Drawer mobile */}
      {drawerOpen && (
        <div className="fixed inset-0 z-50 lg:hidden">
          {/* Backdrop */}
          <div
            className="absolute inset-0 bg-black/60 backdrop-blur-sm"
            onClick={() => setDrawerOpen(false)}
          />
          {/* Panel */}
          <aside className="absolute left-0 top-0 bottom-0 w-64 bg-dark border-r border-white/5 flex flex-col shadow-2xl">
            <SidebarContent
              pathname={pathname}
              logout={logout}
              onNavClick={() => setDrawerOpen(false)}
            />
          </aside>
        </div>
      )}

      {/* Zone de contenu */}
      <div className="flex-1 flex flex-col min-w-0 overflow-hidden">
        {/* Top bar mobile */}
        <div className="lg:hidden sticky top-0 z-10 flex items-center justify-between px-4 py-3 bg-dark border-b border-white/5">
          <button
            onClick={() => setDrawerOpen(true)}
            className="p-1 text-gold"
            aria-label="Ouvrir le menu"
          >
            <Menu size={20} />
          </button>
          <p className="font-serif text-sm text-gold tracking-wider">ÉLÉGANCE ADMIN</p>
          <form action={logout}>
            <button
              type="submit"
              className="p-1 text-sub hover:text-red-400 transition-colors"
              aria-label="Se déconnecter"
            >
              <LogOut size={18} />
            </button>
          </form>
        </div>

        {children}
      </div>
    </div>
  )
}
