'use client'

import { useEffect, useState } from 'react'
import { useRouter } from 'next/navigation'
import Link from 'next/link'
import { supabase } from '@/lib/supabase'

export default function AuthCallbackPage() {
  const router = useRouter()
  const [error, setError] = useState<string | null>(null)

  useEffect(() => {
    async function handleCallback() {
      if (!supabase) {
        setError('Authentication is not configured.')
        return
      }

      // Supabase automatically parses the access_token from the URL hash after email confirmation
      const { data, error: sessionError } = await supabase.auth.getSession()

      if (sessionError || !data.session) {
        setError('Could not verify your email. The link may have expired — please sign up again.')
        return
      }

      const user = data.session.user

      const { data: profile } = await supabase
        .from('profiles')
        .select('role, display_name')
        .eq('id', user.id)
        .single()

      const role: 'user' | 'admin' = profile?.role === 'admin' ? 'admin' : 'user'
      const displayName =
        profile?.display_name ??
        user.user_metadata?.display_name ??
        user.email?.split('@')[0] ??
        'Traveler'

      await fetch('/api/auth/session', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ userId: user.id, role, displayName, email: user.email ?? '' }),
      })

      router.push('/dashboard')
      router.refresh()
    }

    handleCallback()
  }, [router])

  if (error) {
    return (
      <main className="min-h-screen flex items-center justify-center px-6 bg-surface py-16">
        <div className="w-full max-w-md text-center">
          <Link href="/" className="font-headline italic text-3xl font-bold text-primary">Vayka</Link>
          <div className="mt-10 bg-surface-container-lowest rounded-3xl p-10 shadow-sm border border-surface-variant/20">
            <span className="material-symbols-outlined text-4xl text-red-500 mb-4 block">error</span>
            <h1 className="font-headline text-xl font-bold text-on-surface mb-2">Verification failed</h1>
            <p className="text-secondary text-sm leading-relaxed mb-6">{error}</p>
            <Link href="/signup" className="text-primary font-medium hover:underline text-sm">
              Try signing up again
            </Link>
          </div>
        </div>
      </main>
    )
  }

  return (
    <main className="min-h-screen flex items-center justify-center px-6 bg-surface">
      <div className="text-center">
        <span className="material-symbols-outlined animate-spin text-primary text-5xl">progress_activity</span>
        <p className="text-secondary mt-4 text-sm">Verifying your email…</p>
      </div>
    </main>
  )
}
