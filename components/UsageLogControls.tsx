'use client'

import { useState } from 'react'

export default function UsageLogControls() {
  const [loading, setLoading] = useState(false)
  const [status, setStatus] = useState<string | null>(null)

  async function handleClear() {
    const confirmed = window.confirm(
      'Clear persisted usage analytics? This will delete the saved request history in Supabase.'
    )

    if (!confirmed) return

    setLoading(true)
    setStatus(null)

    try {
      const response = await fetch('/api/usage-logs', {
        method: 'DELETE',
      })
      const data = await response.json()

      if (!response.ok || !data.success) {
        throw new Error(data.message || 'Failed to clear usage analytics.')
      }

      setStatus(`Cleared ${data.clearedLogs} persisted usage log rows.`)
      window.location.reload()
    } catch (error) {
      setStatus(error instanceof Error ? error.message : 'Failed to clear usage analytics.')
    } finally {
      setLoading(false)
    }
  }

  return (
    <div className="space-y-4">
      <button
        type="button"
        onClick={handleClear}
        disabled={loading}
        className="w-full px-6 py-3.5 bg-surface-container text-on-surface-variant rounded-full font-bold text-sm tracking-wide hover:bg-surface-container-high transition-colors flex items-center justify-center gap-2 disabled:opacity-60 disabled:cursor-not-allowed"
      >
        <span className="material-symbols-outlined text-base">delete_history</span>
        {loading ? 'Clearing Usage Logs...' : 'Clear Usage Logs'}
      </button>

      {status ? (
        <div className="rounded-3xl border border-surface-variant bg-surface p-4 text-sm text-secondary">
          {status}
        </div>
      ) : null}
    </div>
  )
}
