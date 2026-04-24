'use client'

import { useEffect, useState } from 'react'
import { useRouter } from 'next/navigation'
import Link from 'next/link'
import { useAuth } from '@/context/AuthContext'

export default function ProfilePage() {
  const { user, isLoading, logout } = useAuth()
  const router = useRouter()
  const [signingOut, setSigningOut] = useState(false)

  useEffect(() => {
    if (!isLoading && !user) router.push('/login')
  }, [user, isLoading, router])

  async function handleSignOut() {
    setSigningOut(true)
    await logout()
    router.push('/')
    router.refresh()
  }

  if (isLoading || !user) {
    return (
      <main className="min-h-screen flex items-center justify-center">
        <span className="material-symbols-outlined animate-spin text-secondary">progress_activity</span>
      </main>
    )
  }

  return (
    <main className="pt-28 pb-16 px-6 lg:px-12 max-w-2xl mx-auto min-h-screen">
      <div className="mb-8">
        <span className="text-secondary font-label text-[10px] uppercase tracking-widest font-bold">Account</span>
        <h1 className="font-headline text-4xl text-primary font-bold mt-1">Your Profile</h1>
      </div>

      <div className="bg-surface-container-lowest rounded-3xl p-8 shadow-sm border border-surface-variant/20 space-y-6">
        {/* Avatar + name */}
        <div className="flex items-center gap-5">
          <div className="w-16 h-16 rounded-full bg-primary flex items-center justify-center shrink-0 shadow">
            <span className="text-white font-headline font-bold text-xl">{user.avatarInitials}</span>
          </div>
          <div>
            <h2 className="font-headline text-2xl text-primary font-bold">{user.name}</h2>
            <p className="text-secondary text-sm">{user.email}</p>
            <span className={`inline-flex items-center gap-1 mt-1 px-2.5 py-0.5 rounded-full text-[10px] font-bold uppercase tracking-wider ${
              user.role === 'admin'
                ? 'bg-primary/10 text-primary'
                : 'bg-surface-container text-secondary'
            }`}>
              <span className="material-symbols-outlined text-[12px]">
                {user.role === 'admin' ? 'admin_panel_settings' : 'person'}
              </span>
              {user.role}
            </span>
          </div>
        </div>

        <div className="border-t border-surface-variant/30 pt-6 space-y-3">
          <Link
            href="/itineraries"
            className="flex items-center gap-3 px-5 py-3.5 bg-surface-container rounded-xl hover:bg-surface-container-high transition-colors"
          >
            <span className="material-symbols-outlined text-primary">map</span>
            <span className="font-medium text-on-surface">My Itineraries</span>
            <span className="material-symbols-outlined text-secondary ml-auto text-sm">arrow_forward</span>
          </Link>

          {user.role === 'admin' && (
            <Link
              href="/admin"
              className="flex items-center gap-3 px-5 py-3.5 bg-surface-container rounded-xl hover:bg-surface-container-high transition-colors"
            >
              <span className="material-symbols-outlined text-primary">dashboard</span>
              <span className="font-medium text-on-surface">Admin Dashboard</span>
              <span className="material-symbols-outlined text-secondary ml-auto text-sm">arrow_forward</span>
            </Link>
          )}
        </div>

        <div className="border-t border-surface-variant/30 pt-6">
          <button
            onClick={handleSignOut}
            disabled={signingOut}
            className="flex items-center gap-2 px-5 py-3 text-sm font-bold text-secondary hover:text-red-600 hover:bg-red-50 rounded-xl transition-colors disabled:opacity-50"
          >
            <span className="material-symbols-outlined text-base">logout</span>
            {signingOut ? 'Signing out…' : 'Sign Out'}
          </button>
        </div>
      </div>
    </main>
  )
}
