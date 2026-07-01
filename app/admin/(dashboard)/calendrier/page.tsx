'use client'

import { useState, useEffect, useCallback, useRef } from 'react'
import { ChevronLeft, ChevronRight, X } from 'lucide-react'
import { services } from '@/lib/data'

type Reservation = {
  id: string; name: string; phone: string; email: string
  service: string; slot: string; date: string; notes: string; status: string
}

const SERVICE_LABELS: Record<string, string> = Object.fromEntries(
  services.map((s) => [s.id, s.title])
)

// Approximate display duration (minutes) per service
const SERVICE_DURATION: Record<string, number> = {
  coupe: 60, coloration: 120, soins: 90, mariage: 180,
}

const OPEN_HOUR  = 9
const CLOSE_HOUR = 19
const ROW_H = 64 // px per hour
const TOTAL_H = (CLOSE_HOUR - OPEN_HOUR) * ROW_H // 640 px

// Hour lines: 9 → 19 (inclusive, for the closing line)
const HOUR_LINES = Array.from({ length: CLOSE_HOUR - OPEN_HOUR + 1 }, (_, i) => OPEN_HOUR + i)

const DAY_SHORT  = ['Lun', 'Mar', 'Mer', 'Jeu', 'Ven', 'Sam', 'Dim']
const MONTH_SHORT = ['jan', 'fév', 'mar', 'avr', 'mai', 'jun', 'jul', 'aoû', 'sep', 'oct', 'nov', 'déc']

const STATUS_CFG = {
  pending:   { label: 'En attente', bg: 'bg-gold/20 border-gold/40 text-gold' },
  confirmed: { label: 'Confirmé',   bg: 'bg-emerald-400/20 border-emerald-400/40 text-emerald-400' },
  cancelled: { label: 'Annulé',     bg: 'bg-red-400/15 border-red-400/30 text-red-400 opacity-60' },
}

/* ---- helpers ---- */
function weekStart(d: Date): Date {
  const r = new Date(d)
  r.setDate(r.getDate() - ((r.getDay() + 6) % 7))
  r.setHours(0, 0, 0, 0)
  return r
}
function addDays(d: Date, n: number): Date {
  const r = new Date(d); r.setDate(r.getDate() + n); return r
}
function isoDate(d: Date): string {
  return `${d.getFullYear()}-${String(d.getMonth() + 1).padStart(2, '0')}-${String(d.getDate()).padStart(2, '0')}`
}
function slotTop(slot: string): number {
  const [h, m] = slot.split(':').map(Number)
  return ((h - OPEN_HOUR) + m / 60) * ROW_H
}
function slotH(service: string): number {
  return ((SERVICE_DURATION[service] ?? 60) / 60) * ROW_H - 4
}

/* ================================================================ */
export default function CalendrierPage() {
  const [reservations, setReservations] = useState<Reservation[]>([])
  const [loading, setLoading]   = useState(true)
  const [ws, setWs]             = useState(() => weekStart(new Date()))
  const [selected, setSelected] = useState<Reservation | null>(null)
  const bodyRef = useRef<HTMLDivElement>(null)
  const now = new Date()

  const load = useCallback(async () => {
    const res = await fetch('/api/admin/reservations')
    if (res.ok) setReservations(await res.json())
    setLoading(false)
  }, [])
  useEffect(() => { load() }, [load])

  // Auto-scroll to opening hour (or current time) on first load
  useEffect(() => {
    if (loading || !bodyRef.current) return
    const h = now.getHours()
    const scrollTo = h >= OPEN_HOUR && h <= CLOSE_HOUR
      ? (h - OPEN_HOUR - 0.5) * ROW_H
      : 0
    bodyRef.current.scrollTop = Math.max(0, scrollTo)
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [loading])

  const weekDays = Array.from({ length: 7 }, (_, i) => addDays(ws, i))
  const todayStr = isoDate(now)
  const isThisWeek = isoDate(ws) <= todayStr && todayStr <= isoDate(addDays(ws, 6))

  // Group reservations by date
  const byDate: Record<string, Reservation[]> = {}
  for (const r of reservations) {
    if (!byDate[r.date]) byDate[r.date] = []
    byDate[r.date].push(r)
  }

  // Week range label
  const we = addDays(ws, 6)
  const sameMonth = ws.getMonth() === we.getMonth()
  const weekLabel = sameMonth
    ? `${ws.getDate()} – ${we.getDate()} ${MONTH_SHORT[we.getMonth()]} ${we.getFullYear()}`
    : `${ws.getDate()} ${MONTH_SHORT[ws.getMonth()]} – ${we.getDate()} ${MONTH_SHORT[we.getMonth()]} ${we.getFullYear()}`

  // Current time indicator
  const nowMins = now.getHours() * 60 + now.getMinutes()
  const nowTop  = nowMins >= OPEN_HOUR * 60 && nowMins <= CLOSE_HOUR * 60
    ? ((nowMins - OPEN_HOUR * 60) / 60) * ROW_H
    : null
  const todayColIdx = (now.getDay() + 6) % 7 // Mon=0

  /* ---- render ---- */
  return (
    <div className="flex-1 flex flex-col min-h-0 overflow-hidden">

      {/* ── Top bar ── */}
      <div className="px-4 py-4 md:px-8 md:py-5 border-b border-white/5 flex items-center justify-between shrink-0">
        <div>
          <h1 className="font-serif text-xl text-cream">Calendrier</h1>
          <p className="text-xs text-sub mt-0.5">{weekLabel}</p>
        </div>
        <div className="flex items-center gap-2">
          <button
            onClick={() => { setWs((w) => addDays(w, -7)); setSelected(null) }}
            className="p-1.5 text-sub hover:text-cream hover:bg-white/5 rounded-sm transition-colors"
            aria-label="Semaine précédente"
          >
            <ChevronLeft size={18} />
          </button>
          <button
            onClick={() => { setWs(weekStart(new Date())); setSelected(null) }}
            className="px-3 py-1 text-xs text-sub hover:text-cream border border-white/10 hover:border-white/25 rounded-sm transition-colors"
          >
            Aujourd'hui
          </button>
          <button
            onClick={() => { setWs((w) => addDays(w, 7)); setSelected(null) }}
            className="p-1.5 text-sub hover:text-cream hover:bg-white/5 rounded-sm transition-colors"
            aria-label="Semaine suivante"
          >
            <ChevronRight size={18} />
          </button>
        </div>
      </div>

      {loading ? (
        <p className="text-sm text-sub text-center py-16">Chargement…</p>
      ) : (
        /* ── Calendar ── */
        <div className="flex-1 min-h-0 overflow-auto" ref={bodyRef}>
          <div className="flex flex-col" style={{ minWidth: '620px' }}>

            {/* Day headers — sticky on vertical scroll */}
            <div className="sticky top-0 z-20 flex border-b border-white/5 bg-dark shrink-0">
              {/* Gutter placeholder */}
              <div className="w-12 shrink-0 border-r border-white/5" />
              {weekDays.map((d, i) => {
                const ds       = isoDate(d)
                const isToday  = ds === todayStr
                const isClosed = d.getDay() === 0
                return (
                  <div
                    key={ds}
                    className={`flex-1 min-w-0 py-2 text-center border-r border-white/5 last:border-r-0 ${isClosed ? 'opacity-35' : ''}`}
                  >
                    <p className={`text-[10px] font-semibold tracking-widest uppercase ${isToday ? 'text-gold' : 'text-sub'}`}>
                      {DAY_SHORT[i]}
                    </p>
                    <p className={`text-sm font-bold mt-0.5 ${isToday ? 'text-gold' : 'text-cream'}`}>
                      {d.getDate()}
                    </p>
                  </div>
                )
              })}
            </div>

            {/* Grid body */}
            <div className="flex" style={{ height: TOTAL_H }}>

              {/* ── Time gutter ── */}
              <div className="relative w-12 shrink-0 border-r border-white/5">
                {HOUR_LINES.map((h) => (
                  <div
                    key={h}
                    className="absolute right-2 flex items-center"
                    style={{ top: (h - OPEN_HOUR) * ROW_H - 7 }}
                  >
                    <span className="text-[10px] text-sub leading-none tabular-nums">
                      {String(h).padStart(2, '0')}:00
                    </span>
                  </div>
                ))}
              </div>

              {/* ── Day columns ── */}
              {weekDays.map((d, di) => {
                const ds       = isoDate(d)
                const isToday  = ds === todayStr
                const isClosed = d.getDay() === 0
                const dayRvs   = byDate[ds] ?? []

                return (
                  <div
                    key={ds}
                    className={`relative flex-1 min-w-0 border-r border-white/5 last:border-r-0 ${isToday ? 'bg-gold/5' : ''}`}
                    style={{ height: TOTAL_H }}
                  >
                    {/* Hour lines */}
                    {HOUR_LINES.map((h) => (
                      <div
                        key={h}
                        className="absolute inset-x-0 border-t border-white/5"
                        style={{ top: (h - OPEN_HOUR) * ROW_H }}
                      />
                    ))}

                    {/* Half-hour dashes */}
                    {HOUR_LINES.slice(0, -1).map((h) => (
                      <div
                        key={`${h}h`}
                        className="absolute inset-x-0 border-t border-white/5 border-dashed"
                        style={{ top: (h - OPEN_HOUR) * ROW_H + ROW_H / 2 }}
                      />
                    ))}

                    {/* Closed Sunday overlay */}
                    {isClosed && (
                      <div className="absolute inset-0 bg-dark-deep/50 flex items-center justify-center">
                        <span className="text-[9px] font-semibold tracking-widest text-sub/30 uppercase"
                              style={{ writingMode: 'vertical-rl' }}>
                          Fermé
                        </span>
                      </div>
                    )}

                    {/* Current time line */}
                    {isThisWeek && di === todayColIdx && nowTop !== null && (
                      <div
                        className="absolute inset-x-0 z-10 pointer-events-none"
                        style={{ top: nowTop }}
                      >
                        <div className="flex items-center">
                          <span className="w-2 h-2 rounded-full bg-red-400 shrink-0 -ml-1 shadow-[0_0_4px_rgba(248,113,113,0.6)]" />
                          <div className="flex-1 h-px bg-red-400 opacity-70" />
                        </div>
                      </div>
                    )}

                    {/* Reservation blocks */}
                    {!isClosed && dayRvs.map((r) => {
                      const top    = slotTop(r.slot)
                      const height = Math.max(slotH(r.service), 26)
                      if (top < 0 || top >= TOTAL_H) return null
                      const sc = STATUS_CFG[r.status as keyof typeof STATUS_CFG] ?? STATUS_CFG.pending
                      const isActive = selected?.id === r.id
                      return (
                        <div
                          key={r.id}
                          onClick={() => setSelected(isActive ? null : r)}
                          className={`absolute inset-x-1 rounded-sm border px-1.5 py-1 cursor-pointer overflow-hidden transition-all
                            ${sc.bg}
                            ${isActive ? 'ring-1 ring-white/30 brightness-110' : 'hover:brightness-110'}`}
                          style={{ top: top + 1, height }}
                        >
                          <p className="text-[10px] font-semibold leading-tight truncate">
                            {r.name.split(' ')[0]}
                          </p>
                          {height >= 40 && (
                            <p className="text-[9px] leading-tight opacity-80 tabular-nums mt-0.5">
                              {r.slot}
                            </p>
                          )}
                        </div>
                      )
                    })}
                  </div>
                )
              })}
            </div>
          </div>
        </div>
      )}

      {/* ── Selected reservation detail ── */}
      {selected && (() => {
        const sc = STATUS_CFG[selected.status as keyof typeof STATUS_CFG] ?? STATUS_CFG.pending
        const [y, m, dd] = selected.date.split('-')
        return (
          <div className="shrink-0 border-t border-white/8 bg-dark-card px-4 py-3 md:px-6 flex items-start gap-4 shadow-[0_-4px_20px_rgba(0,0,0,0.5)]">
            <div className="flex-1 min-w-0">
              <div className="flex items-center flex-wrap gap-2">
                <p className="text-sm font-semibold text-cream">{selected.name}</p>
                <span className={`text-[10px] px-2 py-0.5 rounded-sm border ${sc.bg}`}>
                  {sc.label}
                </span>
              </div>
              <p className="text-xs text-sub mt-1">
                {SERVICE_LABELS[selected.service] ?? selected.service}
                {' · '}
                <span className="tabular-nums">{selected.slot}</span>
                {' · '}
                {dd}/{m}/{y}
              </p>
              {(selected.phone || selected.email) && (
                <p className="text-xs text-sub/60 mt-0.5">
                  {[selected.phone, selected.email].filter(Boolean).join(' · ')}
                </p>
              )}
              {selected.notes && (
                <p className="text-xs text-sub/50 italic mt-0.5 truncate">{selected.notes}</p>
              )}
            </div>
            <button
              onClick={() => setSelected(null)}
              className="p-1 text-sub hover:text-nav transition-colors shrink-0"
            >
              <X size={16} />
            </button>
          </div>
        )
      })()}
    </div>
  )
}
