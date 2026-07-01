'use client'

import { useState, useEffect, useCallback } from 'react'
import { Plus, X, Check, Pencil, Trash2 } from 'lucide-react'
import { services as ALL_SERVICES } from '@/lib/data'

type Stylist = {
  id: string
  name: string
  services: string[]
  createdAt: string
}

const SERVICE_LABELS: Record<string, string> = Object.fromEntries(
  ALL_SERVICES.map((s) => [s.id, s.title])
)

export default function CoiffeursPage() {
  const [stylists, setStylists] = useState<Stylist[]>([])
  const [loading, setLoading]   = useState(true)
  const [showAdd, setShowAdd]   = useState(false)
  const [editId, setEditId]     = useState<string | null>(null)

  // Form state — shared between add & edit
  const [formName, setFormName]         = useState('')
  const [formServices, setFormServices] = useState<string[]>([])
  const [saving, setSaving]             = useState(false)
  const [formError, setFormError]       = useState('')

  const load = useCallback(async () => {
    const res = await fetch('/api/admin/stylists')
    if (res.ok) setStylists(await res.json())
    setLoading(false)
  }, [])
  useEffect(() => { load() }, [load])

  function startAdd() {
    setEditId(null)
    setFormName('')
    setFormServices([])
    setFormError('')
    setShowAdd(true)
  }

  function startEdit(s: Stylist) {
    setShowAdd(false)
    setEditId(s.id)
    setFormName(s.name)
    setFormServices([...s.services])
    setFormError('')
  }

  function cancelForm() {
    setShowAdd(false)
    setEditId(null)
    setFormError('')
  }

  function toggleService(id: string) {
    setFormServices((prev) =>
      prev.includes(id) ? prev.filter((x) => x !== id) : [...prev, id]
    )
  }

  async function handleSave() {
    if (!formName.trim()) { setFormError('Le nom est requis.'); return }
    setSaving(true)
    setFormError('')

    const isEdit = Boolean(editId)
    const url    = isEdit ? `/api/admin/stylists/${editId}` : '/api/admin/stylists'
    const method = isEdit ? 'PATCH' : 'POST'

    const res = await fetch(url, {
      method,
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ name: formName.trim(), services: formServices }),
    })
    setSaving(false)
    if (res.ok) {
      cancelForm()
      load()
    } else {
      const data = await res.json().catch(() => ({}))
      setFormError(data.error ?? 'Erreur lors de l\'enregistrement.')
    }
  }

  async function handleDelete(id: string, name: string) {
    if (!confirm(`Supprimer le coiffeur "${name}" ?`)) return
    await fetch(`/api/admin/stylists/${id}`, { method: 'DELETE' })
    load()
  }

  return (
    <div className="flex-1 flex flex-col min-h-0">
      {/* Header */}
      <div className="px-4 py-4 md:px-8 md:py-6 border-b border-white/5 flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between shrink-0">
        <div>
          <h1 className="font-serif text-xl text-cream">Coiffeurs</h1>
          <p className="text-xs text-sub mt-0.5">{stylists.length} coiffeur{stylists.length > 1 ? 's' : ''} configuré{stylists.length > 1 ? 's' : ''}</p>
        </div>
        {!showAdd && !editId && (
          <button
            onClick={startAdd}
            className="self-start sm:self-auto flex items-center gap-2 bg-gold text-dark text-sm font-semibold px-4 py-2.5 rounded-sm hover:bg-gold/90 transition-colors"
          >
            <Plus size={15} />
            Ajouter un coiffeur
          </button>
        )}
      </div>

      <div className="flex-1 overflow-auto px-4 py-4 md:px-8 md:py-6 flex flex-col gap-4">
        {/* ── Notice si aucun coiffeur ── */}
        {!loading && stylists.length === 0 && !showAdd && (
          <div className="border border-gold/20 bg-gold/5 rounded-sm px-5 py-4 text-sm text-nav">
            <p className="font-semibold text-gold mb-1">Mode mono-coiffeur actif</p>
            <p className="text-sub">
              Sans coiffeur configuré, un seul rendez-vous par créneau est accepté tous services confondus.
              Ajoutez vos coiffeurs pour activer la gestion par stylist.
            </p>
          </div>
        )}

        {/* ── Formulaire d'ajout ── */}
        {showAdd && (
          <StylistForm
            title="Nouveau coiffeur"
            name={formName}
            selectedServices={formServices}
            error={formError}
            saving={saving}
            onNameChange={setFormName}
            onToggleService={toggleService}
            onSelectAll={() => setFormServices(ALL_SERVICES.map((s) => s.id))}
            onSelectNone={() => setFormServices([])}
            onSave={handleSave}
            onCancel={cancelForm}
          />
        )}

        {/* ── Liste des coiffeurs ── */}
        {loading ? (
          <p className="text-sm text-sub text-center py-12">Chargement…</p>
        ) : (
          stylists.map((s) =>
            editId === s.id ? (
              <StylistForm
                key={s.id}
                title={`Modifier — ${s.name}`}
                name={formName}
                selectedServices={formServices}
                error={formError}
                saving={saving}
                onNameChange={setFormName}
                onToggleService={toggleService}
                onSelectAll={() => setFormServices(ALL_SERVICES.map((x) => x.id))}
                onSelectNone={() => setFormServices([])}
                onSave={handleSave}
                onCancel={cancelForm}
              />
            ) : (
              <StylistCard
                key={s.id}
                stylist={s}
                onEdit={() => startEdit(s)}
                onDelete={() => handleDelete(s.id, s.name)}
                disabled={Boolean(editId || showAdd)}
              />
            )
          )
        )}
      </div>
    </div>
  )
}

/* ── Card ── */
function StylistCard({
  stylist, onEdit, onDelete, disabled,
}: {
  stylist: Stylist; onEdit: () => void; onDelete: () => void; disabled: boolean
}) {
  const hasAll = stylist.services.length === ALL_SERVICES.length
  return (
    <div className="bg-dark-card border border-white/8 rounded-sm px-5 py-4 flex flex-col sm:flex-row sm:items-center gap-4">
      <div className="flex-1 min-w-0">
        <p className="font-semibold text-cream">{stylist.name}</p>
        {stylist.services.length === 0 ? (
          <p className="text-xs text-sub/50 mt-1 italic">Aucune prestation assignée</p>
        ) : (
          <div className="flex flex-wrap gap-1.5 mt-2">
            {hasAll ? (
              <span className="text-[11px] px-2 py-0.5 rounded-sm bg-gold/15 text-gold border border-gold/20 font-medium">
                Toutes les prestations
              </span>
            ) : (
              stylist.services.map((sid) => (
                <span key={sid} className="text-[11px] px-2 py-0.5 rounded-sm bg-white/5 text-nav border border-white/8">
                  {SERVICE_LABELS[sid] ?? sid}
                </span>
              ))
            )}
          </div>
        )}
      </div>
      <div className="flex items-center gap-2 shrink-0">
        <button
          onClick={onEdit}
          disabled={disabled}
          className="flex items-center gap-1.5 px-3 py-1.5 text-xs text-sub border border-white/10 rounded-sm hover:text-cream hover:border-white/25 transition-colors disabled:opacity-30 disabled:cursor-not-allowed"
        >
          <Pencil size={12} />
          Modifier
        </button>
        <button
          onClick={onDelete}
          disabled={disabled}
          className="p-1.5 text-sub hover:text-red-400 hover:bg-red-400/10 rounded-sm transition-colors disabled:opacity-30 disabled:cursor-not-allowed"
          title="Supprimer"
        >
          <Trash2 size={14} />
        </button>
      </div>
    </div>
  )
}

/* ── Formulaire ── */
function StylistForm({
  title, name, selectedServices, error, saving,
  onNameChange, onToggleService, onSelectAll, onSelectNone, onSave, onCancel,
}: {
  title: string
  name: string
  selectedServices: string[]
  error: string
  saving: boolean
  onNameChange: (v: string) => void
  onToggleService: (id: string) => void
  onSelectAll: () => void
  onSelectNone: () => void
  onSave: () => void
  onCancel: () => void
}) {
  return (
    <div className="bg-dark-card border border-gold/20 rounded-sm px-5 py-5 flex flex-col gap-4">
      <div className="flex items-center justify-between">
        <p className="text-sm font-semibold text-nav">{title}</p>
        <button onClick={onCancel} className="text-sub hover:text-nav transition-colors">
          <X size={16} />
        </button>
      </div>

      {/* Nom */}
      <div>
        <label className="text-[10px] font-semibold tracking-widest text-sub uppercase block mb-1.5">Nom *</label>
        <input
          type="text"
          placeholder="ex : Sophie Martin"
          value={name}
          onChange={(e) => onNameChange(e.target.value)}
          className="w-full sm:max-w-xs bg-dark-field border border-white/10 rounded-sm px-3 py-2.5 text-sm text-nav placeholder:text-sub focus:outline-none focus:border-gold/50"
        />
      </div>

      {/* Services */}
      <div>
        <div className="flex items-center gap-3 mb-2">
          <label className="text-[10px] font-semibold tracking-widest text-sub uppercase">Prestations</label>
          <button type="button" onClick={onSelectAll} className="text-[10px] text-gold hover:text-gold/80 transition-colors">Toutes</button>
          <button type="button" onClick={onSelectNone} className="text-[10px] text-sub hover:text-nav transition-colors">Aucune</button>
        </div>
        <div className="flex flex-wrap gap-2">
          {ALL_SERVICES.map((s) => {
            const checked = selectedServices.includes(s.id)
            return (
              <button
                key={s.id}
                type="button"
                onClick={() => onToggleService(s.id)}
                className={`flex items-center gap-1.5 px-3 py-1.5 rounded-sm border text-sm transition-all ${
                  checked
                    ? 'bg-gold/15 border-gold/40 text-gold'
                    : 'bg-transparent border-white/10 text-sub hover:border-white/25 hover:text-nav'
                }`}
              >
                {checked && <Check size={12} />}
                {s.title}
              </button>
            )
          })}
        </div>
      </div>

      {/* Error */}
      {error && (
        <p className="text-sm text-red-400 bg-red-400/10 border border-red-400/20 rounded-sm px-3 py-2">{error}</p>
      )}

      {/* Actions */}
      <div className="flex items-center gap-3 pt-1">
        <button
          type="button"
          onClick={onSave}
          disabled={saving}
          className="flex items-center gap-1.5 px-4 py-2 bg-gold text-dark text-sm font-semibold rounded-sm hover:bg-gold/90 transition-colors disabled:opacity-50"
        >
          <Check size={14} />
          {saving ? 'Enregistrement…' : 'Enregistrer'}
        </button>
        <button type="button" onClick={onCancel} className="text-sm text-sub hover:text-nav transition-colors">
          Annuler
        </button>
      </div>
    </div>
  )
}
