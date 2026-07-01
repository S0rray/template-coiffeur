'use client'

import { useState, useEffect, useCallback } from 'react'
import { Plus, Trash2, X } from 'lucide-react'

type Leave = {
  id: string
  startDate: string
  endDate: string
  note: string
  createdAt: string
}

function formatDate(d: string) {
  if (!d) return '—'
  const [y, m, day] = d.split('-')
  return `${day}/${m}/${y}`
}

export default function CongesPage() {
  const [leaves, setLeaves] = useState<Leave[]>([])
  const [loading, setLoading] = useState(true)
  const [showForm, setShowForm] = useState(false)
  const [form, setForm] = useState({ startDate: '', endDate: '', note: '' })
  const [submitting, setSubmitting] = useState(false)
  const [formError, setFormError] = useState('')

  const fetchLeaves = useCallback(async () => {
    const res = await fetch('/api/admin/conges')
    if (res.ok) setLeaves(await res.json())
    setLoading(false)
  }, [])

  useEffect(() => { fetchLeaves() }, [fetchLeaves])

  async function handleAdd(e: React.FormEvent) {
    e.preventDefault()
    setFormError('')
    if (form.endDate < form.startDate) {
      setFormError('La date de fin doit être après la date de début.')
      return
    }
    setSubmitting(true)
    const res = await fetch('/api/admin/conges', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(form),
    })
    setSubmitting(false)
    if (res.ok) {
      setShowForm(false)
      setForm({ startDate: '', endDate: '', note: '' })
      fetchLeaves()
    } else {
      setFormError("Erreur lors de l'ajout")
    }
  }

  async function handleDelete(id: string) {
    if (!confirm('Supprimer cette période de congés ?')) return
    await fetch(`/api/admin/conges/${id}`, { method: 'DELETE' })
    fetchLeaves()
  }

  const today = new Date().toISOString().split('T')[0]
  const upcoming = leaves.filter((l) => l.endDate >= today)
  const past = leaves.filter((l) => l.endDate < today)

  return (
    <div className="flex flex-col h-full">
      {/* Header */}
      <div className="px-4 py-4 md:px-8 md:py-6 border-b border-white/5 flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
        <div>
          <h1 className="font-serif text-xl text-cream">Congés & Fermetures</h1>
          <p className="text-xs text-sub mt-0.5">
            {upcoming.length} période{upcoming.length > 1 ? 's' : ''} à venir
          </p>
        </div>
        <button
          onClick={() => setShowForm(!showForm)}
          className="self-start sm:self-auto flex items-center gap-2 bg-gold text-dark text-sm font-semibold px-4 py-2.5 rounded-sm hover:bg-gold/90 transition-colors"
        >
          {showForm ? <X size={15} /> : <Plus size={15} />}
          {showForm ? 'Fermer' : 'Ajouter'}
        </button>
      </div>

      {/* Add form */}
      {showForm && (
        <div className="px-4 py-5 md:px-8 border-b border-white/5 bg-dark-card/50">
          <h2 className="text-sm font-semibold text-nav mb-4">Nouvelle période</h2>
          <form onSubmit={handleAdd} className="flex flex-col sm:flex-row flex-wrap items-start sm:items-end gap-3">
            <div className="flex flex-col gap-1.5 w-full sm:w-auto">
              <label className="text-[10px] font-semibold tracking-widest text-sub uppercase">Du *</label>
              <input
                type="date"
                value={form.startDate}
                onChange={(e) => setForm((f) => ({ ...f, startDate: e.target.value }))}
                required
                min={today}
                className="bg-dark-field border border-white/10 rounded-sm px-3 py-2.5 text-sm text-nav focus:outline-none focus:border-gold/50 scheme-dark"
              />
            </div>
            <div className="flex flex-col gap-1.5 w-full sm:w-auto">
              <label className="text-[10px] font-semibold tracking-widest text-sub uppercase">Au *</label>
              <input
                type="date"
                value={form.endDate}
                onChange={(e) => setForm((f) => ({ ...f, endDate: e.target.value }))}
                required
                min={form.startDate || today}
                className="bg-dark-field border border-white/10 rounded-sm px-3 py-2.5 text-sm text-nav focus:outline-none focus:border-gold/50 scheme-dark"
              />
            </div>
            <div className="flex flex-col gap-1.5 flex-1 min-w-full sm:min-w-48 w-full sm:w-auto">
              <label className="text-[10px] font-semibold tracking-widest text-sub uppercase">Note</label>
              <input
                type="text"
                placeholder="Ex : Congés d'été"
                value={form.note}
                onChange={(e) => setForm((f) => ({ ...f, note: e.target.value }))}
                className="bg-dark-field border border-white/10 rounded-sm px-3 py-2.5 text-sm text-nav placeholder:text-sub focus:outline-none focus:border-gold/50"
              />
            </div>
            <button
              type="submit"
              disabled={submitting}
              className="w-full sm:w-auto bg-gold text-dark text-sm font-semibold px-5 py-2.5 rounded-sm hover:bg-gold/90 transition-colors disabled:opacity-50"
            >
              {submitting ? 'Ajout...' : 'Ajouter'}
            </button>
          </form>
          {formError && (
            <p className="text-sm text-red-400 mt-3">{formError}</p>
          )}
        </div>
      )}

      {/* Content */}
      <div className="flex-1 overflow-auto px-4 py-4 md:px-8 md:py-6 flex flex-col gap-8">
        {loading ? (
          <p className="text-sm text-sub text-center py-16">Chargement...</p>
        ) : (
          <>
            <Section title="À venir" data={upcoming} onDelete={handleDelete} />
            {past.length > 0 && <Section title="Passés" data={past} onDelete={handleDelete} muted />}
            {leaves.length === 0 && (
              <p className="text-sm text-sub text-center py-16">Aucune période de congés enregistrée.</p>
            )}
          </>
        )}
      </div>
    </div>
  )
}

function Section({
  title,
  data,
  onDelete,
  muted = false,
}: {
  title: string
  data: Leave[]
  onDelete: (id: string) => void
  muted?: boolean
}) {
  if (data.length === 0) return null
  return (
    <div>
      <div className="flex items-center gap-3 mb-3">
        <div className="w-6 h-0.5 bg-gold" />
        <p className={`text-[10px] font-semibold tracking-widest uppercase ${muted ? 'text-sub' : 'text-gold'}`}>
          {title}
        </p>
      </div>
      <div className="overflow-x-auto">
        <table className="w-full text-sm border-collapse min-w-96">
          <thead>
            <tr className="border-b border-white/5 text-left">
              {['Du', 'Au', 'Durée', 'Note', ''].map((h) => (
                <th key={h} className="pb-3 pr-4 text-[10px] font-semibold tracking-widest text-sub uppercase">
                  {h}
                </th>
              ))}
            </tr>
          </thead>
          <tbody>
            {data.map((l) => {
              const start = new Date(l.startDate + 'T00:00:00')
              const end = new Date(l.endDate + 'T00:00:00')
              const days = Math.round((end.getTime() - start.getTime()) / 86400000) + 1
              return (
                <tr key={l.id} className="border-b border-white/5 hover:bg-white/2 transition-colors">
                  <td className={`py-3.5 pr-4 whitespace-nowrap ${muted ? 'text-sub' : 'text-nav'}`}>{formatDate(l.startDate)}</td>
                  <td className={`py-3.5 pr-4 whitespace-nowrap ${muted ? 'text-sub' : 'text-nav'}`}>{formatDate(l.endDate)}</td>
                  <td className="py-3.5 pr-4 text-sub text-xs whitespace-nowrap">{days} jour{days > 1 ? 's' : ''}</td>
                  <td className={`py-3.5 pr-4 ${muted ? 'text-sub/60' : 'text-nav'}`}>{l.note || '—'}</td>
                  <td className="py-3.5">
                    <button
                      onClick={() => onDelete(l.id)}
                      title="Supprimer"
                      className="p-1.5 text-sub hover:text-red-400 hover:bg-red-400/10 rounded-sm transition-colors"
                    >
                      <Trash2 size={14} />
                    </button>
                  </td>
                </tr>
              )
            })}
          </tbody>
        </table>
      </div>
    </div>
  )
}
