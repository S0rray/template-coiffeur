'use client'

import { useState } from 'react'
import { ChevronDown, ChevronLeft, ChevronRight, CalendarDays, X, MapPin, Phone, Mail, Clock } from 'lucide-react'
import { SectionHeader } from '@/components/ui/SectionHeader'
import { services, timeSlots, salon } from '@/lib/data'

/* ── types ── */
type BookingSlot  = { date: string; slot: string; stylistId: string | null }
type LeaveRange   = { startDate: string; endDate: string }
type StylistAvail = { id: string; services: string[] }
type Avail        = { reservations: BookingSlot[]; leaves: LeaveRange[]; stylists: StylistAvail[] }

/* ── constants ── */
const MONTHS = [
  'Janvier', 'Février', 'Mars', 'Avril', 'Mai', 'Juin',
  'Juillet', 'Août', 'Septembre', 'Octobre', 'Novembre', 'Décembre',
]
const MONTHS_SHORT = ['jan', 'fév', 'mar', 'avr', 'mai', 'jun', 'jul', 'aoû', 'sep', 'oct', 'nov', 'déc']
const DAY_LABELS   = ['Lu', 'Ma', 'Me', 'Je', 'Ve', 'Sa', 'Di']
const DAY_LONG     = ['Dimanche', 'Lundi', 'Mardi', 'Mercredi', 'Jeudi', 'Vendredi', 'Samedi']

/* ── helpers ── */
function padDate(y: number, m: number, d: number) {
  return `${y}-${String(m + 1).padStart(2, '0')}-${String(d).padStart(2, '0')}`
}
function getTomorrow() {
  const d = new Date(); d.setDate(d.getDate() + 1)
  return padDate(d.getFullYear(), d.getMonth(), d.getDate())
}
function formatTrigger(date: string, slot: string) {
  const [y, m, d] = date.split('-').map(Number)
  return `${DAY_LONG[new Date(y, m - 1, d).getDay()]} ${d} ${MONTHS_SHORT[m - 1]} · ${slot}`
}
function formatPendingDate(date: string) {
  const [y, m, d] = date.split('-').map(Number)
  return `${DAY_LONG[new Date(y, m - 1, d).getDay()]} ${d} ${MONTHS_SHORT[m - 1]}`
}

/* ================================================================
   Booking
   ================================================================ */
export function Booking() {
  const [selectedService, setSelectedService] = useState('')
  const [pickedDate, setPickedDate]           = useState('')
  const [pickedSlot, setPickedSlot]           = useState('')
  const [submitting, setSubmitting]           = useState(false)
  const [submitted, setSubmitted]             = useState(false)
  const [formKey, setFormKey]                 = useState(0)

  function handleServiceChange(e: React.ChangeEvent<HTMLSelectElement>) {
    setSelectedService(e.target.value)
    setPickedDate('')
    setPickedSlot('')
  }

  function resetForm() {
    setSelectedService('')
    setPickedDate('')
    setPickedSlot('')
    setFormKey((k) => k + 1)
  }

  async function handleSubmit(e: React.SyntheticEvent<HTMLFormElement>) {
    e.preventDefault()
    if (!pickedSlot || !pickedDate) return
    setSubmitting(true)
    const data = new FormData(e.currentTarget)
    try {
      const res = await fetch('/api/reservations', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          name:    data.get('name'),
          phone:   data.get('phone'),
          email:   data.get('email'),
          service: selectedService,
          slot:    pickedSlot,
          date:    pickedDate,
        }),
      })
      if (res.ok) {
        setSubmitted(true)
        resetForm()
        setTimeout(() => setSubmitted(false), 6000)
      }
    } finally {
      setSubmitting(false)
    }
  }

  return (
    <section id="reservation" className="bg-dark py-24 px-6 md:px-10 lg:px-16">
      <div className="max-w-360 mx-auto">
        <SectionHeader label="Réservation" title="Prendre Rendez-vous" light center />

        <div className="flex flex-col lg:flex-row gap-12 lg:gap-16">
          {/* ── Infos contact ── */}
          <aside className="lg:w-64 shrink-0 flex flex-col gap-8">
            <InfoBlock icon={<MapPin size={16} className="text-gold shrink-0 mt-0.5" />} label="Adresse"   lines={[salon.address]} />
            <InfoBlock icon={<Phone  size={16} className="text-gold shrink-0 mt-0.5" />} label="Téléphone" lines={[salon.phone]} />
            <InfoBlock icon={<Mail   size={16} className="text-gold shrink-0 mt-0.5" />} label="Email"     lines={[salon.email]} />
            <InfoBlock icon={<Clock  size={16} className="text-gold shrink-0 mt-0.5" />} label="Horaires"  lines={salon.hours.map((h) => `${h.days} : ${h.time}`)} />
          </aside>

          {/* ── Formulaire ── */}
          <form
            key={formKey}
            className="flex-1 bg-dark-card rounded-sm p-7 md:p-9 flex flex-col gap-6"
            onSubmit={handleSubmit}
            suppressHydrationWarning
          >
            {submitted && (
              <div className="bg-emerald-400/10 border border-emerald-400/20 rounded-sm px-4 py-3 text-sm text-emerald-400">
                Votre demande de rendez-vous a bien été envoyée. Nous vous contacterons rapidement pour confirmer.
              </div>
            )}

            {/* Nom + Téléphone */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
              <Field name="name"  type="text" placeholder="Prénom & Nom *" required />
              <Field name="phone" type="tel"  placeholder="Téléphone" />
            </div>

            {/* Email + Service */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
              <Field name="email" type="email" placeholder="Email *" required />
              <div className="relative">
                <select
                  value={selectedService}
                  onChange={handleServiceChange}
                  required
                  className="w-full bg-dark-field border border-white/10 rounded-sm px-4 py-3.5 pr-10 text-sm text-nav focus:outline-none focus:border-gold/50 transition-colors appearance-none cursor-pointer"
                  suppressHydrationWarning
                >
                  <option value="">Service souhaité *</option>
                  {services.map((s) => (
                    <option key={s.id} value={s.id}>{s.title}</option>
                  ))}
                </select>
                <ChevronDown size={15} className="absolute right-4 top-1/2 -translate-y-1/2 text-gold pointer-events-none" />
              </div>
            </div>

            {/* DateSlotPicker — apparaît uniquement quand un service est sélectionné */}
            {selectedService && (
              <DateSlotPicker
                key={selectedService}
                service={selectedService}
                date={pickedDate}
                slot={pickedSlot}
                onSelect={(d, s) => { setPickedDate(d); setPickedSlot(s) }}
              />
            )}

            {/* Submit — aria-disabled au lieu de disabled (évite le mismatch SSR/CSR React 19) */}
            <button
              type="submit"
              aria-disabled={submitting || !pickedSlot || !pickedDate}
              className={`w-full bg-gold text-dark font-semibold py-4 rounded-sm transition-all duration-200 mt-2 ${
                submitting || !pickedSlot || !pickedDate
                  ? 'opacity-50 cursor-not-allowed'
                  : 'hover:bg-gold/90 active:scale-[0.99]'
              }`}
              suppressHydrationWarning
            >
              {submitting ? 'Envoi en cours…' : 'Confirmer ma réservation'}
            </button>
          </form>
        </div>
      </div>
    </section>
  )
}

/* ================================================================
   DateSlotPicker
   ================================================================ */
function DateSlotPicker({
  service,
  date,
  slot,
  onSelect,
}: {
  service: string
  date: string
  slot: string
  onSelect: (date: string, slot: string) => void
}) {
  const now = new Date()
  const [open, setOpen]               = useState(false)
  const [viewYear, setViewYear]       = useState(now.getFullYear())
  const [viewMonth, setViewMonth]     = useState(now.getMonth())
  const [pendingDate, setPendingDate] = useState(date)
  const [avail, setAvail]             = useState<Avail | null>(null)
  const [fetching, setFetching]       = useState(false)

  function openPicker() {
    setOpen(true)
    setFetching(true)
    setAvail(null)
    fetch('/api/availability')
      .then((r) => (r.ok ? r.json() : { reservations: [], leaves: [], stylists: [] }))
      .then((data: Avail) => { setAvail(data); setFetching(false) })
      .catch(() => { setAvail({ reservations: [], leaves: [], stylists: [] }); setFetching(false) })
  }

  function closePicker() {
    setOpen(false)
  }

  function prevMonth() {
    if (viewMonth === 0) { setViewYear((y) => y - 1); setViewMonth(11) }
    else setViewMonth((m) => m - 1)
  }
  function nextMonth() {
    if (viewMonth === 11) { setViewYear((y) => y + 1); setViewMonth(0) }
    else setViewMonth((m) => m + 1)
  }

  const canGoPrev = viewYear > now.getFullYear() || (viewYear === now.getFullYear() && viewMonth > now.getMonth())
  const tomorrow  = getTomorrow()
  const todayStr  = now.toISOString().split('T')[0]

  function isOnLeave(ds: string) {
    return (avail?.leaves ?? []).some((l) => ds >= l.startDate && ds <= l.endDate)
  }

  function slotAvailable(ds: string, slot: string): boolean {
    if (!avail) return false
    const atSlot = avail.reservations.filter((r) => r.date === ds && r.slot === slot)
    if (avail.stylists.length === 0) return atSlot.length === 0
    const qualified = avail.stylists.filter((s) => s.services.includes(service))
    if (qualified.length === 0) return false
    const busyIds   = new Set(atSlot.filter((r) => r.stylistId).map((r) => r.stylistId!))
    const unassigned = atSlot.filter((r) => !r.stylistId).length
    return qualified.filter((s) => !busyIds.has(s.id)).length > unassigned
  }

  function getAvailableSlots(ds: string): string[] {
    return (timeSlots[service] ?? timeSlots.default).filter((slot) => slotAvailable(ds, slot))
  }

  function isSelectable(ds: string, dow: number) {
    if (dow === 0) return false      // Dimanche fermé
    if (ds < tomorrow) return false  // Passé + aujourd'hui
    if (isOnLeave(ds)) return false  // Congés
    return !fetching && getAvailableSlots(ds).length > 0
  }

  // Grille du mois
  const firstDay    = (new Date(viewYear, viewMonth, 1).getDay() + 6) % 7
  const daysInMonth = new Date(viewYear, viewMonth + 1, 0).getDate()
  const cells: (number | null)[] = [
    ...Array(firstDay).fill(null),
    ...Array.from({ length: daysInMonth }, (_, i) => i + 1),
  ]
  while (cells.length % 7 !== 0) cells.push(null)

  const slotsForPending = pendingDate ? getAvailableSlots(pendingDate) : []
  const hasSelection    = date && slot

  return (
    <>
      {/* ── Trigger ── */}
      <button
        type="button"
        onClick={openPicker}
        className={`w-full flex items-center justify-between bg-dark-field border rounded-sm px-4 py-3.5 text-sm transition-colors hover:border-gold/40 focus:outline-none focus:border-gold/50 ${
          hasSelection ? 'border-gold/30' : 'border-white/10'
        }`}
      >
        <span className={hasSelection ? 'text-cream' : 'text-sub'}>
          {hasSelection ? formatTrigger(date, slot) : 'Date & créneau *'}
        </span>
        <CalendarDays size={15} className="text-gold shrink-0" />
      </button>

      {/* ── Modal ── */}
      {open && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
          {/* Backdrop */}
          <div className="absolute inset-0 bg-black/65 backdrop-blur-sm" onClick={closePicker} />

          {/* Panel */}
          <div
            className="relative bg-dark-card border border-white/10 rounded-sm w-full max-w-xs shadow-2xl max-h-[90dvh] flex flex-col"
            onClick={(e) => e.stopPropagation()}
          >
            {/* Header : mois + navigation */}
            <div className="flex items-center justify-between px-4 py-3 border-b border-white/5 shrink-0">
              <button
                type="button"
                onClick={prevMonth}
                disabled={!canGoPrev}
                className="p-1.5 text-sub hover:text-cream transition-colors disabled:opacity-20 disabled:cursor-not-allowed"
                aria-label="Mois précédent"
              >
                <ChevronLeft size={16} />
              </button>
              <span className="text-sm font-semibold text-cream">
                {MONTHS[viewMonth]} {viewYear}
              </span>
              <div className="flex items-center">
                <button
                  type="button"
                  onClick={nextMonth}
                  className="p-1.5 text-sub hover:text-cream transition-colors"
                  aria-label="Mois suivant"
                >
                  <ChevronRight size={16} />
                </button>
                <button
                  type="button"
                  onClick={closePicker}
                  className="p-1.5 text-sub hover:text-nav transition-colors ml-1"
                  aria-label="Fermer"
                >
                  <X size={15} />
                </button>
              </div>
            </div>

            {/* Corps scrollable */}
            <div className="overflow-y-auto flex-1">
              {fetching ? (
                <div className="flex items-center justify-center py-12">
                  <p className="text-xs text-sub">Chargement des disponibilités…</p>
                </div>
              ) : (
                <>
                  {/* Noms des jours */}
                  <div className="grid grid-cols-7 px-3 pt-4 pb-1">
                    {DAY_LABELS.map((d) => (
                      <div key={d} className="text-center text-[10px] font-semibold tracking-wider text-sub">
                        {d}
                      </div>
                    ))}
                  </div>

                  {/* Grille jours */}
                  <div className="grid grid-cols-7 gap-y-1 px-3 pb-4">
                    {cells.map((day, i) => {
                      if (day === null) return <div key={`pad-${i}`} />
                      const ds  = padDate(viewYear, viewMonth, day)
                      const dow = new Date(viewYear, viewMonth, day).getDay()
                      const ok  = isSelectable(ds, dow)
                      const isPending   = ds === pendingDate
                      const isConfirmed = ds === date && !!slot
                      const isToday     = ds === todayStr

                      return (
                        <button
                          key={ds}
                          type="button"
                          disabled={!ok}
                          onClick={() => setPendingDate(ds)}
                          title={
                            dow === 0 ? 'Fermé le dimanche'
                            : isOnLeave(ds) ? 'Congés'
                            : !ok ? 'Complet'
                            : undefined
                          }
                          className={[
                            'h-9 w-9 mx-auto flex items-center justify-center rounded-full text-sm font-medium transition-all',
                            isPending
                              ? 'bg-gold text-dark font-bold shadow-[0_0_10px_rgba(212,175,55,0.4)]'
                              : isConfirmed
                              ? 'ring-1 ring-gold text-gold'
                              : ok
                              ? 'text-cream hover:bg-gold/15 cursor-pointer'
                              : 'text-sub/20 cursor-not-allowed',
                            isToday && !isPending ? 'ring-1 ring-white/20' : '',
                          ].join(' ')}
                        >
                          {day}
                        </button>
                      )
                    })}
                  </div>

                  {/* ── Créneaux ── */}
                  {pendingDate && (
                    <div className="border-t border-white/5 px-4 py-4">
                      <p className="text-[10px] font-semibold tracking-widest text-gold uppercase mb-3">
                        {formatPendingDate(pendingDate)}
                      </p>

                      {slotsForPending.length === 0 ? (
                        <p className="text-xs text-sub/60 py-1">Aucun créneau disponible ce jour.</p>
                      ) : (
                        <div className="flex flex-wrap gap-2">
                          {slotsForPending.map((s) => {
                            const active = s === slot && pendingDate === date
                            return (
                              <button
                                key={s}
                                type="button"
                                onClick={() => {
                                  onSelect(pendingDate, s)
                                  closePicker()
                                }}
                                className={`px-3 py-2 text-sm rounded-sm border transition-all ${
                                  active
                                    ? 'bg-gold text-dark border-gold font-bold'
                                    : 'text-nav border-white/15 hover:border-gold/50 hover:text-cream hover:bg-gold/8'
                                }`}
                              >
                                {s}
                              </button>
                            )
                          })}
                        </div>
                      )}
                    </div>
                  )}
                </>
              )}
            </div>
          </div>
        </div>
      )}
    </>
  )
}

/* ── sous-composants ── */
function Field(props: React.InputHTMLAttributes<HTMLInputElement>) {
  return (
    <input
      {...props}
      className="w-full bg-dark-field border border-white/10 rounded-sm px-4 py-3.5 text-sm text-nav placeholder:text-sub focus:outline-none focus:border-gold/50 transition-colors"
      suppressHydrationWarning
    />
  )
}

function InfoBlock({ icon, label, lines }: { icon: React.ReactNode; label: string; lines: string[] }) {
  return (
    <div>
      <div className="flex items-center gap-2 mb-2">
        {icon}
        <span className="text-[10px] font-semibold tracking-widest text-gold uppercase">{label}</span>
      </div>
      {lines.map((line) => (
        <p key={line} className="text-sm text-nav leading-relaxed">{line}</p>
      ))}
    </div>
  )
}
