'use client'

import { useState } from 'react'
import { useRouter } from 'next/navigation'
import Link from 'next/link'
import { supabase } from '@/lib/supabase'

export default function LoginPage() {
  const router = useRouter()
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [error, setError] = useState<string | null>(null)
  const [loading, setLoading] = useState(false)

  async function handleLogin(e: React.FormEvent) {
    e.preventDefault()
    if (!supabase) return setError('Authentication is not configured.')
    setError(null)
    setLoading(true)
    try {
      const { data, error: authError } = await supabase.auth.signInWithPassword({ email, password })
      if (authError) throw authError

      const { data: profile } = await supabase
        .from('profiles')
        .select('role, display_name')
        .eq('id', data.user.id)
        .single()

      const role: 'user' | 'admin' = profile?.role === 'admin' ? 'admin' : 'user'
      const displayName = profile?.display_name ?? data.user.user_metadata?.display_name ?? data.user.email?.split('@')[0] ?? 'Traveler'

      await fetch('/api/auth/session', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ userId: data.user.id, role, displayName, email: data.user.email ?? '' }),
      })

      router.push(role === 'admin' ? '/admin' : '/dashboard')
      router.refresh()
    } catch (err: unknown) {
      setError(err instanceof Error ? err.message : 'Sign in failed. Please check your credentials.')
    } finally {
      setLoading(false)
    }
  }

  return (
    <main className="min-h-screen flex items-center justify-center px-6 bg-surface">
      <div className="w-full max-w-md">
        <div className="text-center mb-10">
          <Link href="/" className="font-headline italic text-3xl font-bold text-primary">Vayka</Link>
          <h1 className="font-headline text-2xl font-bold text-on-surface mt-4">Welcome back</h1>
          <p className="text-secondary mt-1 text-sm">Sign in to access your itineraries</p>
        </div>

        <form
          onSubmit={handleLogin}
          className="space-y-5 bg-surface-container-lowest rounded-3xl p-8 shadow-sm border border-surface-variant/20"
        >
          {error && (
            <div className="bg-red-50 border border-red-200 text-red-700 rounded-xl px-4 py-3 text-sm">
              {error}
            </div>
          )}

          <div>
            <label className="block text-sm font-medium text-secondary mb-2">Email</label>
            <input
              type="email"
              value={email}
              onChange={e => setEmail(e.target.value)}
              required
              autoComplete="email"
              className="w-full bg-surface-container border border-surface-variant rounded-xl px-4 py-3 text-on-surface placeholder:text-outline/60 focus:ring-2 focus:ring-primary/20 outline-none"
              placeholder="you@example.com"
            />
          </div>

          <div>
            <div className="flex items-center justify-between mb-2">
              <label className="block text-sm font-medium text-secondary">Password</label>
              <Link href="/login/forgot-password" className="text-xs text-primary hover:underline">Forgot password?</Link>
            </div>
            <input
              type="password"
              value={password}
              onChange={e => setPassword(e.target.value)}
              required
              autoComplete="current-password"
              className="w-full bg-surface-container border border-surface-variant rounded-xl px-4 py-3 text-on-surface placeholder:text-outline/60 focus:ring-2 focus:ring-primary/20 outline-none"
            />
          </div>

          <button
            type="submit"
            disabled={loading}
            className="w-full py-3.5 bg-primary text-white rounded-full font-bold text-sm hover:shadow-lg transition-all disabled:opacity-50 flex items-center justify-center gap-2"
          >
            {loading && <span className="material-symbols-outlined text-base animate-spin">progress_activity</span>}
            {loading ? 'Signing in…' : 'Sign In'}
          </button>

          <p className="text-center text-sm text-secondary">
            Don&apos;t have an account?{' '}
            <Link href="/signup" className="text-primary font-medium hover:underline">Create one</Link>
          </p>
        </form>
      </div>
    </main>
  )
}
