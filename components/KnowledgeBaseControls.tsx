'use client'

import { useEffect, useState } from 'react'
import ConfirmModal from './ConfirmModal'

interface KnowledgeBaseSummary {
  documentCount: number
  embeddingCount: number
  sourceCount: number
}

const EMPTY_SUMMARY: KnowledgeBaseSummary = {
  documentCount: 0,
  embeddingCount: 0,
  sourceCount: 0,
}

export default function KnowledgeBaseControls() {
  const [summary, setSummary] = useState<KnowledgeBaseSummary>(EMPTY_SUMMARY)
  const [status, setStatus] = useState<string | null>(null)
  const [loadingAction, setLoadingAction] = useState<'clear' | 'reload' | null>(null)
  const [showClearModal, setShowClearModal] = useState(false)

  async function refreshSummary() {
    const response = await fetch('/api/knowledge-base')
    const data = await response.json()

    if (!response.ok || !data.success) {
      throw new Error(data.message || 'Failed to load knowledge base summary.')
    }

    setSummary(data.summary)
  }

  useEffect(() => {
    refreshSummary().catch((error) => {
      setStatus(error instanceof Error ? error.message : 'Failed to load knowledge base summary.')
    })
  }, [])

  async function executeClear() {
    setShowClearModal(false)
    setLoadingAction('clear')
    setStatus(null)

    try {
      const response = await fetch('/api/knowledge-base', {
        method: 'DELETE',
      })
      const data = await response.json()

      if (!response.ok || !data.success) {
        throw new Error(data.message || 'Failed to clear knowledge base.')
      }

      setStatus(
        `Cleared ${data.clearedDocuments} documents and ${data.clearedEmbeddings} embeddings.`
      )
      await refreshSummary()
    } catch (error) {
      setStatus(error instanceof Error ? error.message : 'Failed to clear knowledge base.')
    } finally {
      setLoadingAction(null)
    }
  }

  async function handleReload() {
    setLoadingAction('reload')
    setStatus(null)

    try {
      const response = await fetch('/api/knowledge-base', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ action: 'reload' }),
      })
      const data = await response.json()

      if (!response.ok || !data.success) {
        throw new Error(data.message || 'Failed to reload knowledge base.')
      }

      setStatus(
        `Reloaded ${data.reloadedDocuments} documents and rebuilt ${data.rebuiltEmbeddings} embeddings.`
      )
      await refreshSummary()
    } catch (error) {
      setStatus(error instanceof Error ? error.message : 'Failed to reload knowledge base.')
    } finally {
      setLoadingAction(null)
    }
  }

  return (
    <div className="space-y-6">
      <ConfirmModal
        open={showClearModal}
        title="Clear Knowledge Base"
        message={`This will permanently delete all ${summary.documentCount} documents and ${summary.embeddingCount} embeddings. This action cannot be undone.`}
        confirmLabel="Clear Everything"
        onConfirm={executeClear}
        onCancel={() => setShowClearModal(false)}
      />

      <div className="flex flex-col lg:flex-row justify-between items-start lg:items-center gap-6">
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 w-full lg:w-auto">
          <div className="rounded-2xl bg-surface-container-low p-4 min-w-[150px]">
            <p className="text-xs uppercase tracking-widest text-secondary font-label">Sources</p>
            <p className="text-2xl font-headline text-primary font-bold mt-2">{summary.sourceCount}</p>
          </div>
          <div className="rounded-2xl bg-surface-container-low p-4 min-w-[150px]">
            <p className="text-xs uppercase tracking-widest text-secondary font-label">Documents</p>
            <p className="text-2xl font-headline text-primary font-bold mt-2">{summary.documentCount}</p>
          </div>
          <div className="rounded-2xl bg-surface-container-low p-4 min-w-[150px]">
            <p className="text-xs uppercase tracking-widest text-secondary font-label">Embeddings</p>
            <p className="text-2xl font-headline text-primary font-bold mt-2">{summary.embeddingCount}</p>
          </div>
        </div>

        <div className="flex flex-wrap gap-4 w-full lg:w-auto">
          <button
            type="button"
            onClick={() => setShowClearModal(true)}
            disabled={loadingAction !== null}
            className="flex-1 lg:flex-none px-6 lg:px-8 py-3.5 bg-surface-container text-on-surface-variant rounded-full font-bold text-sm tracking-wide hover:bg-surface-container-high transition-colors flex items-center justify-center gap-2 disabled:opacity-60 disabled:cursor-not-allowed"
          >
            <span className="material-symbols-outlined text-base">delete_sweep</span>
            {loadingAction === 'clear' ? 'Clearing...' : 'Clear Index'}
          </button>
          <button
            type="button"
            onClick={handleReload}
            disabled={loadingAction !== null}
            className="flex-1 lg:flex-none px-6 lg:px-8 py-3.5 bg-gradient-to-br from-primary to-primary-container text-white rounded-full font-bold text-sm tracking-wide shadow-md shadow-primary/20 hover:shadow-lg hover:scale-105 active:scale-95 transition-all flex items-center justify-center gap-2 disabled:opacity-60 disabled:cursor-not-allowed"
          >
            <span className="material-symbols-outlined text-base">refresh</span>
            {loadingAction === 'reload' ? 'Reloading...' : 'Reload Index'}
          </button>
        </div>
      </div>

      {status ? (
        <div className="rounded-3xl border border-surface-variant bg-surface p-4 text-sm text-secondary">
          {status}
        </div>
      ) : null}
    </div>
  )
}
