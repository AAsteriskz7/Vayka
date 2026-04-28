'use client'

import { useState } from 'react'
import Link from 'next/link'
import { supabase } from '@/lib/supabase'

export default function ForgotPasswordPage() {
  const [email, setEmail] = useState('')
  const [error, setError] = useState<string | null>(null)
  const [sent, setSent] = useState(false)
  const [loading, setLoading] = useState(false)

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault()
    if (!supabase) return setError('Authentication is not configured.')
    setError(null)
    setLoading(true)
    try {
      const { error } = await supabase.auth.resetPasswordForEmail(email, {
        redirectTo: `${window.location.origin}/login/reset-password`,
      })
      if (error) throw error
      setSent(true)
    } catch (err: unknown) {
      setError(err instanceof Error ? err.message : 'Failed to send reset email.')
    } finally {
      setLoading(false)
    }
  }

  return (
    <main className="min-h-screen flex items-center justify-center px-6 bg-surface">
      <div className="w-full max-w-md">
        <div className="text-center mb-10">
          <Link href="/" className="font-headline italic text-3xl font-bold text-primary">Vayka</Link>
          <h1 className="font-headline text-2xl font-bold text-on-surface mt-4">Reset your password</h1>
          <p className="text-secondary mt-1 text-sm">We&apos;ll send a reset link to your email</p>
        </div>

        <div className="bg-surface-container-lowest rounded-3xl p-8 shadow-sm border border-surface-variant/20">
          {sent ? (
            <div className="text-center space-y-4">
              <div className="text-5xl">📬</div>
              <p className="text-on-surface font-medium">Check your inbox</p>
              <p className="text-secondary text-sm">
                We sent a password reset link to <span className="font-medium text-on-surface">{email}</span>.
                Check your spam folder if you don&apos;t see it.
              </p>
              <Link href="/login" className="inline-block mt-4 text-primary text-sm font-medium hover:underline">
                Back to sign in
              </Link>
            </div>
          ) : (
            <form onSubmit={handleSubmit} className="space-y-5">
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

              <button
                type="submit"
                disabled={loading}
                className="w-full py-3.5 bg-primary text-white rounded-full font-bold text-sm hover:shadow-lg transition-all disabled:opacity-50 flex items-center justify-center gap-2"
              >
                {loading && <span className="material-symbols-outlined text-base animate-spin">progress_activity</span>}
                {loading ? 'Sending…' : 'Send Reset Link'}
              </button>

              <p className="text-center text-sm text-secondary">
                Remembered it?{' '}
                <Link href="/login" className="text-primary font-medium hover:underline">Sign in</Link>
              </p>
            </form>
          )}
        </div>
      </div>
    </main>
  )
}
