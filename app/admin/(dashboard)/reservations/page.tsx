'use client'

import { useState, useEffect, useCallback } from 'react'
import { Plus, Search, Check, X, Trash2, ChevronDown } from 'lucide-react'
import { services, timeSlots } from '@/lib/data'

type Reservation = {
  id: string
  name: string
  phone: string
  email: string
  service: string
  slot: string
  date: string
  notes: string
  status: string
  source: string
  createdAt: string
}

const SERVICE_LABELS: Record<string, string> = Object.fromEntries(
  services.map((s) => [s.id, s.title])
)

const STATUS_CONFIG = {
  pending:   { label: 'En attente', cls: 'bg-gold/10 text-gold border-gold/20' },
  confirmed: { label: 'Confirmé',   cls: 'bg-emerald-400/10 text-emerald-400 border-emerald-400/20' },
  cancelled: { label: 'Annulé',     cls: 'bg-red-400/10 text-red-400 border-red-400/20' },
}

function formatDate(d: string) {
  if (!d) return '—'
  const [y, m, day] = d.split('-')
  return `${day}/${m}/${y}`
}

function today() {
  return new Date().toISOString().split('T')[0]
}

const EMPTY_FORM = {
  name: '', phone: '', email: '', service: '', date: '', slot: '',
  notes: '', source: 'phone',
}

export default function ReservationsPage() {
  const [reservations, setReservations] = useState<Reservation[]>([])
  const [loading, setLoading]           = useState(true)
  const [search, setSearch]             = useState('')
  const [filterStatus, setFilterStatus] = useState('')
  const [filterService, setFilterService] = useState('')
  const [modalOpen, setModalOpen]       = useState(false)
  const [form, setForm]                 = useState(EMPTY_FORM)
  const [submitting, setSubmitting]     = useState(false)
  const [formError, setFormError]       = useState('')
  const [slotOpen, setSlotOpen]         = useState(false)

  const fetchReservations = useCallback(async () => {
    const res = await fetch('/api/admin/reservations')
    if (res.ok) setReservations(await res.json())
    setLoading(false)
  }, [])

  useEffect(() => { fetchReservations() }, [fetchReservations])

  async function updateStatus(id: string, status: string) {
    await fetch(`/api/admin/reservations/${id}`, {
      method: 'PATCH',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ status }),
    })
    fetchReservations()
  }

  async function deleteReservation(id: string) {
    if (!confirm('Supprimer ce rendez-vous ?')) return
    await fetch(`/api/admin/reservations/${id}`, { method: 'DELETE' })
    fetchReservations()
  }

  async function handleAdd(e: React.FormEvent) {
    e.preventDefault()
    setFormError('')
    setSubmitting(true)
    const res = await fetch('/api/admin/reservations', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(form),
    })
    setSubmitting(false)
    if (res.ok) {
      setModalOpen(false)
      setForm(EMPTY_FORM)
      setSlotOpen(false)
      fetchReservations()
    } else {
      setFormError("Erreur lors de l'ajout")
    }
  }

  const filtered = reservations.filter((r) => {
    if (filterStatus && r.status !== filterStatus) return false
    if (filterService && r.service !== filterService) return false
    const q = search.toLowerCase()
    return !q || r.name.toLowerCase().includes(q) || r.email.toLowerCase().includes(q) || r.phone.includes(q)
  })

  const todayStr = today()
  const stats = {
    total:      reservations.length,
    pending:    reservations.filter((r) => r.status === 'pending').length,
    todayCount: reservations.filter((r) => r.date === todayStr).length,
    confirmed:  reservations.filter((r) => r.status === 'confirmed').length,
  }

  const availableSlots = form.service ? (timeSlots[form.service] ?? timeSlots.default) : []

  return (
    <div className="flex-1 flex flex-col min-h-0">
      {/* Header */}
      <div className="px-4 py-4 md:px-8 md:py-6 border-b border-white/5 flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
        <div>
          <h1 className="font-serif text-xl text-cream">Réservations</h1>
          <p className="text-xs text-sub mt-0.5">{reservations.length} au total</p>
        </div>
        <button
          onClick={() => setModalOpen(true)}
          className="self-start sm:self-auto flex items-center gap-2 bg-gold text-dark text-sm font-semibold px-4 py-2.5 rounded-sm hover:bg-gold/90 transition-colors"
        >
          <Plus size={15} />
          Ajouter un RDV
        </button>
      </div>

      {/* Stats */}
      <div className="px-4 py-4 md:px-8 grid grid-cols-2 lg:grid-cols-4 gap-3 border-b border-white/5">
        {[
          { label: 'Total',       value: stats.total },
          { label: 'En attente',  value: stats.pending },
          { label: "Aujourd'hui", value: stats.todayCount },
          { label: 'Confirmés',   value: stats.confirmed },
        ].map(({ label, value }) => (
          <div key={label} className="bg-dark-card rounded-sm px-4 py-3 md:px-5 md:py-4 border border-white/5">
            <p className="text-xl md:text-2xl font-bold text-cream">{value}</p>
            <p className="text-xs text-sub mt-1">{label}</p>
          </div>
        ))}
      </div>

      {/* Filters */}
      <div className="px-4 py-3 md:px-8 md:py-4 flex flex-wrap items-center gap-2 border-b border-white/5">
        <div className="relative flex-1 min-w-36">
          <Search size={14} className="absolute left-3 top-1/2 -translate-y-1/2 text-sub" />
          <input
            type="text"
            placeholder="Rechercher..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            className="w-full bg-dark-card border border-white/8 rounded-sm pl-9 pr-4 py-2 text-sm text-nav placeholder:text-sub focus:outline-none focus:border-gold/40"
          />
        </div>
        <select
          value={filterStatus}
          onChange={(e) => setFilterStatus(e.target.value)}
          className="bg-dark-card border border-white/8 rounded-sm px-3 py-2 text-sm text-nav focus:outline-none focus:border-gold/40"
        >
          <option value="">Tous statuts</option>
          <option value="pending">En attente</option>
          <option value="confirmed">Confirmés</option>
          <option value="cancelled">Annulés</option>
        </select>
        <select
          value={filterService}
          onChange={(e) => setFilterService(e.target.value)}
          className="bg-dark-card border border-white/8 rounded-sm px-3 py-2 text-sm text-nav focus:outline-none focus:border-gold/40"
        >
          <option value="">Tous services</option>
          {services.map((s) => (
            <option key={s.id} value={s.id}>{s.title}</option>
          ))}
        </select>
      </div>

      {/* Table */}
      <div className="flex-1 overflow-auto px-4 py-4 md:px-8">
        {loading ? (
          <p className="text-sm text-sub text-center py-16">Chargement...</p>
        ) : filtered.length === 0 ? (
          <p className="text-sm text-sub text-center py-16">Aucun rendez-vous trouvé.</p>
        ) : (
          <div className="overflow-x-auto">
            <table className="w-full text-sm border-collapse min-w-150">
              <thead>
                <tr className="text-left border-b border-white/5">
                  <th className="pb-3 pr-4 text-[10px] font-semibold tracking-widest text-sub uppercase">Date</th>
                  <th className="pb-3 pr-4 text-[10px] font-semibold tracking-widest text-sub uppercase hidden sm:table-cell">Heure</th>
                  <th className="pb-3 pr-4 text-[10px] font-semibold tracking-widest text-sub uppercase">Client</th>
                  <th className="pb-3 pr-4 text-[10px] font-semibold tracking-widest text-sub uppercase hidden md:table-cell">Service</th>
                  <th className="pb-3 pr-4 text-[10px] font-semibold tracking-widest text-sub uppercase">Statut</th>
                  <th className="pb-3 pr-4 text-[10px] font-semibold tracking-widest text-sub uppercase hidden lg:table-cell">Source</th>
                  <th className="pb-3 text-[10px] font-semibold tracking-widest text-sub uppercase">Actions</th>
                </tr>
              </thead>
              <tbody>
                {filtered.map((r) => {
                  const sc = STATUS_CONFIG[r.status as keyof typeof STATUS_CONFIG] ?? STATUS_CONFIG.pending
                  return (
                    <tr key={r.id} className="border-b border-white/5 hover:bg-white/2 transition-colors">
                      <td className="py-3.5 pr-4 text-nav whitespace-nowrap">{formatDate(r.date)}</td>
                      <td className="py-3.5 pr-4 text-nav font-mono hidden sm:table-cell">{r.slot}</td>
                      <td className="py-3.5 pr-4">
                        <p className="text-cream whitespace-nowrap">{r.name}</p>
                        <p className="text-xs text-sub">{r.email}</p>
                      </td>
                      <td className="py-3.5 pr-4 text-nav hidden md:table-cell">{SERVICE_LABELS[r.service] ?? r.service}</td>
                      <td className="py-3.5 pr-4">
                        <span className={`inline-flex px-2.5 py-1 rounded-sm text-xs font-medium border whitespace-nowrap ${sc.cls}`}>
                          {sc.label}
                        </span>
                      </td>
                      <td className="py-3.5 pr-4 text-sub text-xs capitalize hidden lg:table-cell">{r.source}</td>
                      <td className="py-3.5">
                        <div className="flex items-center gap-1">
                          {r.status !== 'confirmed' && (
                            <button onClick={() => updateStatus(r.id, 'confirmed')} title="Confirmer"
                              className="p-1.5 text-emerald-400 hover:bg-emerald-400/10 rounded-sm transition-colors">
                              <Check size={14} />
                            </button>
                          )}
                          {r.status !== 'cancelled' && (
                            <button onClick={() => updateStatus(r.id, 'cancelled')} title="Annuler"
                              className="p-1.5 text-red-400 hover:bg-red-400/10 rounded-sm transition-colors">
                              <X size={14} />
                            </button>
                          )}
                          <button onClick={() => deleteReservation(r.id)} title="Supprimer"
                            className="p-1.5 text-sub hover:text-red-400 hover:bg-red-400/10 rounded-sm transition-colors">
                            <Trash2 size={14} />
                          </button>
                        </div>
                      </td>
                    </tr>
                  )
                })}
              </tbody>
            </table>
          </div>
        )}
      </div>

      {/* Modal */}
      {modalOpen && (
        <div className="fixed inset-0 bg-black/70 backdrop-blur-sm z-50 flex items-end sm:items-center justify-center p-0 sm:p-4">
          <div className="bg-dark-card border border-white/8 rounded-t-sm sm:rounded-sm w-full sm:max-w-lg shadow-2xl max-h-[92dvh] flex flex-col">
            {/* Modal header */}
            <div className="flex items-center justify-between px-5 py-4 border-b border-white/5 shrink-0">
              <h2 className="font-serif text-lg text-cream">Nouveau rendez-vous</h2>
              <button
                onClick={() => { setModalOpen(false); setForm(EMPTY_FORM); setSlotOpen(false) }}
                className="text-sub hover:text-nav"
              >
                <X size={18} />
              </button>
            </div>

            {/* Modal body */}
            <form onSubmit={handleAdd} className="px-5 py-4 flex flex-col gap-4 overflow-y-auto">
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                <AdminField placeholder="Prénom & Nom *" value={form.name}
                  onChange={(v) => setForm((f) => ({ ...f, name: v }))} required />
                <AdminField placeholder="Téléphone" value={form.phone}
                  onChange={(v) => setForm((f) => ({ ...f, phone: v }))} />
              </div>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                <AdminField type="email" placeholder="Email *" value={form.email}
                  onChange={(v) => setForm((f) => ({ ...f, email: v }))} required />
                <select value={form.source} onChange={(e) => setForm((f) => ({ ...f, source: e.target.value }))}
                  className="bg-dark-field border border-white/10 rounded-sm px-3 py-2.5 text-sm text-nav focus:outline-none focus:border-gold/50">
                  <option value="phone">Par téléphone</option>
                  <option value="online">En ligne</option>
                </select>
              </div>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                <select value={form.service}
                  onChange={(e) => { setForm((f) => ({ ...f, service: e.target.value, slot: '' })); setSlotOpen(false) }}
                  required className="bg-dark-field border border-white/10 rounded-sm px-3 py-2.5 text-sm text-nav focus:outline-none focus:border-gold/50">
                  <option value="">Service *</option>
                  {services.map((s) => <option key={s.id} value={s.id}>{s.title}</option>)}
                </select>
                <AdminField type="date" placeholder="" value={form.date}
                  onChange={(v) => setForm((f) => ({ ...f, date: v }))} required />
              </div>

              {/* Créneaux */}
              <div className="relative">
                <button type="button" disabled={!form.service}
                  onClick={() => form.service && setSlotOpen(!slotOpen)}
                  className={`w-full flex items-center justify-between border rounded-sm px-3 py-2.5 text-sm transition-colors ${
                    !form.service
                      ? 'bg-dark-field border-white/5 text-sub/40 cursor-not-allowed'
                      : 'bg-dark-field border-white/10 text-nav hover:border-gold/40 cursor-pointer focus:outline-none'
                  }`}>
                  <span className={form.slot ? 'text-cream' : ''}>
                    {!form.service ? 'Sélectionnez un service' : form.slot || 'Créneau horaire *'}
                  </span>
                  <ChevronDown size={14} className={`text-gold shrink-0 transition-transform duration-200 ${slotOpen ? 'rotate-180' : ''}`} />
                </button>
                {slotOpen && (
                  <div className="absolute top-full inset-x-0 bg-dark-card border border-white/10 border-t-0 rounded-b-sm z-10 max-h-44 overflow-y-auto shadow-xl">
                    {availableSlots.map((slot) => (
                      <button key={slot} type="button"
                        onClick={() => { setForm((f) => ({ ...f, slot })); setSlotOpen(false) }}
                        className={`w-full text-left px-3 py-2.5 text-sm hover:bg-white/5 transition-colors ${form.slot === slot ? 'text-gold font-semibold' : 'text-nav'}`}>
                        {slot}
                      </button>
                    ))}
                  </div>
                )}
              </div>

              <textarea placeholder="Notes (optionnel)" value={form.notes}
                onChange={(e) => setForm((f) => ({ ...f, notes: e.target.value }))}
                rows={2}
                className="w-full bg-dark-field border border-white/10 rounded-sm px-3 py-2.5 text-sm text-nav placeholder:text-sub focus:outline-none focus:border-gold/50 resize-none" />

              {formError && (
                <p className="text-sm text-red-400 bg-red-400/10 border border-red-400/20 rounded-sm px-3 py-2">
                  {formError}
                </p>
              )}

              <div className="flex justify-end gap-3 pt-1 pb-1">
                <button type="button"
                  onClick={() => { setModalOpen(false); setForm(EMPTY_FORM); setSlotOpen(false) }}
                  className="px-4 py-2.5 text-sm text-nav hover:text-cream transition-colors">
                  Annuler
                </button>
                <button type="submit" disabled={submitting || !form.slot}
                  className="px-5 py-2.5 bg-gold text-dark text-sm font-semibold rounded-sm hover:bg-gold/90 transition-colors disabled:opacity-50">
                  {submitting ? 'Ajout...' : 'Ajouter'}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  )
}

function AdminField({
  type = 'text', placeholder, value, onChange, required,
}: {
  type?: string; placeholder: string; value: string
  onChange: (v: string) => void; required?: boolean
}) {
  return (
    <input type={type} placeholder={placeholder} value={value}
      onChange={(e) => onChange(e.target.value)} required={required}
      className="w-full bg-dark-field border border-white/10 rounded-sm px-3 py-2.5 text-sm text-nav placeholder:text-sub focus:outline-none focus:border-gold/50 scheme-dark" />
  )
}
