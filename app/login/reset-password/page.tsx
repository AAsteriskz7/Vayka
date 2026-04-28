'use client'

import { useEffect, useState } from 'react'
import { useRouter } from 'next/navigation'
import Link from 'next/link'
import { supabase } from '@/lib/supabase'

export default function ResetPasswordPage() {
  const router = useRouter()
  const [password, setPassword] = useState('')
  const [confirm, setConfirm] = useState('')
  const [error, setError] = useState<string | null>(null)
  const [loading, setLoading] = useState(false)
  const [ready, setReady] = useState(false)
  const [done, setDone] = useState(false)

  useEffect(() => {
    if (!supabase) return

    // Supabase fires PASSWORD_RECOVERY when it detects the recovery token in the URL hash
    const { data: { subscription } } = supabase.auth.onAuthStateChange((event) => {
      if (event === 'PASSWORD_RECOVERY') {
        setReady(true)
      }
    })

    return () => subscription.unsubscribe()
  }, [])

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault()
    if (!supabase) return setError('Authentication is not configured.')
    if (password.length < 8) return setError('Password must be at least 8 characters.')
    if (password !== confirm) return setError('Passwords do not match.')
    setError(null)
    setLoading(true)
    try {
      const { error } = await supabase.auth.updateUser({ password })
      if (error) throw error
      setDone(true)
      setTimeout(() => router.push('/login'), 3000)
    } catch (err: unknown) {
      setError(err instanceof Error ? err.message : 'Failed to update password.')
    } finally {
      setLoading(false)
    }
  }

  return (
    <main className="min-h-screen flex items-center justify-center px-6 bg-surface">
      <div className="w-full max-w-md">
        <div className="text-center mb-10">
          <Link href="/" className="font-headline italic text-3xl font-bold text-primary">Vayka</Link>
          <h1 className="font-headline text-2xl font-bold text-on-surface mt-4">Set a new password</h1>
          <p className="text-secondary mt-1 text-sm">Choose a strong password for your account</p>
        </div>

        <div className="bg-surface-container-lowest rounded-3xl p-8 shadow-sm border border-surface-variant/20">
          {done ? (
            <div className="text-center space-y-4">
              <div className="text-5xl">✅</div>
              <p className="text-on-surface font-medium">Password updated!</p>
              <p className="text-secondary text-sm">Redirecting you to sign in…</p>
            </div>
          ) : !ready ? (
            <div className="text-center space-y-4">
              <p className="text-secondary text-sm">Verifying your reset link…</p>
              <p className="text-secondary text-xs">
                If nothing happens,{' '}
                <Link href="/login/forgot-password" className="text-primary hover:underline">
                  request a new link
                </Link>
                .
              </p>
            </div>
          ) : (
            <form onSubmit={handleSubmit} className="space-y-5">
              {error && (
                <div className="bg-red-50 border border-red-200 text-red-700 rounded-xl px-4 py-3 text-sm">
                  {error}
                </div>
              )}

              <div>
                <label className="block text-sm font-medium text-secondary mb-2">New password</label>
                <input
                  type="password"
                  value={password}
                  onChange={e => setPassword(e.target.value)}
                  required
                  autoComplete="new-password"
                  className="w-full bg-surface-container border border-surface-variant rounded-xl px-4 py-3 text-on-surface placeholder:text-outline/60 focus:ring-2 focus:ring-primary/20 outline-none"
                  placeholder="Min. 8 characters"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-secondary mb-2">Confirm password</label>
                <input
                  type="password"
                  value={confirm}
                  onChange={e => setConfirm(e.target.value)}
                  required
                  autoComplete="new-password"
                  className="w-full bg-surface-container border border-surface-variant rounded-xl px-4 py-3 text-on-surface placeholder:text-outline/60 focus:ring-2 focus:ring-primary/20 outline-none"
                  placeholder="Repeat your password"
                />
              </div>

              <button
                type="submit"
                disabled={loading}
                className="w-full py-3.5 bg-primary text-white rounded-full font-bold text-sm hover:shadow-lg transition-all disabled:opacity-50 flex items-center justify-center gap-2"
              >
                {loading && <span className="material-symbols-outlined text-base animate-spin">progress_activity</span>}
                {loading ? 'Updating…' : 'Update Password'}
              </button>
            </form>
          )}
        </div>
      </div>
    </main>
  )
}
