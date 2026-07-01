'use client'

import type { Metadata } from 'next'
import { useState, FormEvent } from 'react'
import { useRouter } from 'next/navigation'

export default function AdminLogin() {
  const [username, setUsername] = useState('')
  const [password, setPassword] = useState('')
  const [error, setError] = useState('')
  const [loading, setLoading] = useState(false)
  const router = useRouter()

  async function handleSubmit(e: FormEvent) {
    e.preventDefault()
    setError('')
    setLoading(true)
    try {
      const res = await fetch('/api/admin/login', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ username, password }),
      })
      if (res.ok) {
        router.push('/admin')
        router.refresh()
      } else {
        const data = await res.json()
        setError(data.error ?? 'Identifiants incorrects')
      }
    } catch {
      setError('Erreur réseau')
    } finally {
      setLoading(false)
    }
  }

  return (
    <div className="min-h-screen bg-dark-deep flex items-center justify-center px-4">
      <div className="w-full max-w-sm">
        <div className="text-center mb-10">
          <p className="font-serif text-2xl text-gold tracking-wider mb-1">ÉLÉGANCE</p>
          <p className="text-[10px] font-semibold tracking-[0.2em] text-sub uppercase">
            Panneau d'administration
          </p>
        </div>

        <div className="bg-dark-card rounded-sm p-8 border border-white/5">
          <div className="w-10 h-0.5 bg-gold mb-6" />
          <h1 className="font-serif text-xl text-cream mb-6">Connexion</h1>

          <form onSubmit={handleSubmit} className="flex flex-col gap-4">
            <input
              type="text"
              placeholder="Identifiant"
              value={username}
              onChange={(e) => setUsername(e.target.value)}
              required
              autoComplete="username"
              className="w-full bg-dark-field border border-white/10 rounded-sm px-4 py-3 text-sm text-nav placeholder:text-sub focus:outline-none focus:border-gold/50 transition-colors"
            />
            <input
              type="password"
              placeholder="Mot de passe"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
              autoComplete="current-password"
              className="w-full bg-dark-field border border-white/10 rounded-sm px-4 py-3 text-sm text-nav placeholder:text-sub focus:outline-none focus:border-gold/50 transition-colors"
            />

            {error && (
              <p className="text-sm text-red-400 bg-red-400/10 border border-red-400/20 rounded-sm px-3 py-2">
                {error}
              </p>
            )}

            <button
              type="submit"
              disabled={loading}
              className="w-full bg-gold text-dark font-semibold py-3 rounded-sm hover:bg-gold/90 transition-colors duration-200 disabled:opacity-50 disabled:cursor-not-allowed mt-2"
            >
              {loading ? 'Connexion...' : 'Se connecter'}
            </button>
          </form>
        </div>
      </div>
    </div>
  )
}
