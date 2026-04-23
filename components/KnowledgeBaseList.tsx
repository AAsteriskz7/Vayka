'use client'

import React, { useState } from 'react'
import ConfirmModal from './ConfirmModal'

export interface KnowledgeBaseSource {
  source: string;
  documentCount: number;
  lastUpdated: string;
}

export default function KnowledgeBaseList({ initialSources }: { initialSources: KnowledgeBaseSource[] }) {
  const [sources, setSources] = useState<KnowledgeBaseSource[]>(initialSources)
  const [isDeleting, setIsDeleting] = useState<string | null>(null)
  const [mounted, setMounted] = React.useState(false)
  const [deleteTarget, setDeleteTarget] = useState<string | null>(null)

  React.useEffect(() => {
    setMounted(true)
  }, [])

  const executeDelete = async () => {
    if (!deleteTarget) return
    const sourceUrl = deleteTarget
    setDeleteTarget(null)
    setIsDeleting(sourceUrl)
    try {
      const params = new URLSearchParams({ source: sourceUrl })
      const res = await fetch(`/api/knowledge-base?${params.toString()}`, { method: 'DELETE' })
      if (!res.ok) throw new Error('Failed to delete source')
      
      setSources(s => s.filter((x: KnowledgeBaseSource) => x.source !== sourceUrl))
    } catch (err) {
      console.error(err)
      alert("Error deleting source")
    } finally {
      setIsDeleting(null)
    }
  }

  function getTimeAgo(dateString: string) {
    try {
      const rtf = new Intl.RelativeTimeFormat('en', { numeric: 'auto' })
      const diffMs = new Date(dateString).getTime() - new Date().getTime()
      const diffDays = Math.round(diffMs / (1000 * 60 * 60 * 24))
      
      if (diffDays === 0) {
        const diffHours = Math.round(diffMs / (1000 * 60 * 60))
        if (diffHours === 0) return 'Just now'
        return rtf.format(diffHours, 'hour')
      }
      return rtf.format(diffDays, 'day')
    } catch {
      return 'Unknown'
    }
  }

  if (sources.length === 0) {
    return (
       <div className="px-6 py-5 mt-4 bg-surface-container-low border border-surface-variant rounded-2xl items-center text-secondary italic text-sm">
         No knowledge base sources indexed yet. Add one above!
       </div>
    )
  }

  return (
    <div className="overflow-x-auto pb-4 mt-6">
      <ConfirmModal
        open={deleteTarget !== null}
        title="Delete Source"
        message={`This will permanently delete "${deleteTarget}" and all its associated documents and embeddings. This action cannot be undone.`}
        confirmLabel="Delete Source"
        onConfirm={executeDelete}
        onCancel={() => setDeleteTarget(null)}
      />
      <div className="min-w-[800px] space-y-3">
        {/* Table Header */}
        <div className="grid grid-cols-12 px-6 py-4 text-xs font-label font-bold text-secondary uppercase tracking-[0.2em] opacity-80 border-b border-surface-variant">
          <div className="col-span-5">Source Name</div>
          <div className="col-span-2">Type</div>
          <div className="col-span-2">Last Updated</div>
          <div className="col-span-2">Status</div>
          <div className="col-span-1 text-right">Action</div>
        </div>

        {sources.map((s: KnowledgeBaseSource) => (
          <div key={s.source} className="grid grid-cols-12 px-6 py-5 bg-surface-container-low rounded-2xl items-center transition-all hover:bg-surface-container-high group border border-transparent hover:border-black/5 hover:shadow-sm">
            <div className="col-span-5 flex items-center gap-4">
              <div className="w-12 h-12 bg-secondary-container rounded-2xl flex shrink-0 items-center justify-center text-primary shadow-sm">
                <span className="material-symbols-outlined">description</span>
              </div>
              <div className="pr-4 overflow-hidden">
                <p className="font-bold text-primary truncate" title={s.source}>{s.source}</p>
                <p className="text-xs text-secondary font-medium mt-1">{s.documentCount} chunks indexed</p>
              </div>
            </div>
            <div className="col-span-2 text-sm text-secondary font-medium truncate">Document</div>
            <div className="col-span-2 text-sm text-secondary font-medium bg-surface px-3 py-1.5 rounded-full inline-block max-w-fit">{mounted ? getTimeAgo(s.lastUpdated) : '...'}</div>
            <div className="col-span-2">
              <span className="inline-flex items-center gap-2 px-4 py-1.5 bg-tertiary-container/10 text-tertiary-container rounded-full text-xs font-bold border border-tertiary-container/20">
                <span className="w-2 h-2 rounded-full bg-tertiary-container"></span>
                Synced
              </span>
            </div>
            <div className="col-span-1 text-right relative">
              <button 
                onClick={() => setDeleteTarget(s.source)} 
                disabled={isDeleting === s.source}
                title="Delete Source"
                className="opacity-0 group-hover:opacity-100 transition-opacity p-2 hover:bg-red-500/10 text-secondary hover:text-red-600 rounded-full outline-none disabled:opacity-50"
              >
                <span className="material-symbols-outlined">{isDeleting === s.source ? 'hourglass_empty' : 'delete'}</span>
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  )
}
