'use client'

import { useState } from 'react'

export default function KnowledgeBaseManager() {
  const [isOpen, setIsOpen] = useState(false)
  const [source, setSource] = useState('')
  const [sourceType, setSourceType] = useState('Text')
  const [description, setDescription] = useState('')
  const [content, setContent] = useState('')
  const [status, setStatus] = useState<string | null>(null)
  const [loading, setLoading] = useState(false)

  async function handleSubmit(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault()
    setStatus(null)

    if (!source.trim() || !content.trim()) {
      setStatus('Source name and content are required.')
      return
    }

    setLoading(true)

    try {
      const response = await fetch('/api/ingest', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          source: `${source.trim()} (${sourceType})`,
          content: content.trim(),
          metadata: {
            type: sourceType,
            description: description.trim() || undefined,
          },
        }),
      })

      const data = await response.json()

      if (!response.ok || !data.success) {
        throw new Error(data.message || 'Ingestion failed.')
      }

      setStatus(`Ingested ${data.chunkCount} chunks successfully.`)
      setSource('')
      setSourceType('Text')
      setDescription('')
      setContent('')
      setIsOpen(false)
    } catch (error) {
      setStatus(error instanceof Error ? error.message : 'Unknown error occurred.')
    } finally {
      setLoading(false)
    }
  }

  return (
    <div className="bg-surface-container-low rounded-3xl p-8 shadow-sm border border-surface-variant">
      <div className="flex flex-col lg:flex-row justify-between items-start lg:items-center gap-4 mb-8">
        <div>
          <h4 className="font-headline text-3xl text-primary font-bold">Add Dataset Source</h4>
          <p className="text-secondary mt-2 max-w-2xl">Ingest new text sources into the knowledge base for retrieval-augmented answers.</p>
        </div>
        <button
          type="button"
          onClick={() => setIsOpen((open) => !open)}
          className="px-6 py-3.5 bg-primary text-white rounded-full font-bold text-sm tracking-wide shadow-lg hover:shadow-xl hover:scale-105 active:scale-95 transition-all"
        >
          {isOpen ? 'Close form' : 'Add Source'}
        </button>
      </div>

      {isOpen ? (
        <form onSubmit={handleSubmit} className="space-y-6">
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-4">
            <label className="flex flex-col gap-2 text-sm font-medium text-secondary">
              Source Name
              <input
                value={source}
                onChange={(event) => setSource(event.target.value)}
                placeholder="Example: BrusselsTravelGuide"
                className="w-full rounded-2xl border border-surface-variant bg-surface px-4 py-3 text-on-surface outline-none focus:border-primary focus:ring-2 focus:ring-primary/10"
              />
            </label>
            <label className="flex flex-col gap-2 text-sm font-medium text-secondary">
              Source Type
              <select
                value={sourceType}
                onChange={(event) => setSourceType(event.target.value)}
                className="w-full rounded-2xl border border-surface-variant bg-surface px-4 py-3 text-on-surface outline-none focus:border-primary focus:ring-2 focus:ring-primary/10"
              >
                <option>Text</option>
                <option>PDF</option>
                <option>CSV</option>
                <option>API</option>
              </select>
            </label>
            <label className="flex flex-col gap-2 text-sm font-medium text-secondary">
              Short Description
              <input
                value={description}
                onChange={(event) => setDescription(event.target.value)}
                placeholder="Optional description or notes"
                className="w-full rounded-2xl border border-surface-variant bg-surface px-4 py-3 text-on-surface outline-none focus:border-primary focus:ring-2 focus:ring-primary/10"
              />
            </label>
          </div>

          <label className="flex flex-col gap-2 text-sm font-medium text-secondary">
            Source Content
            <textarea
              value={content}
              onChange={(event) => setContent(event.target.value)}
              rows={10}
              placeholder="Paste the text content you want the RAG system to ingest..."
              className="w-full rounded-3xl border border-surface-variant bg-surface p-4 text-on-surface outline-none focus:border-primary focus:ring-2 focus:ring-primary/10 min-h-[220px]"
            />
          </label>

          <div className="flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
            <p className="text-sm text-secondary">Your content will be chunked, embedded, and stored in Supabase.</p>
            <button
              type="submit"
              disabled={loading}
              className="inline-flex items-center justify-center px-7 py-3.5 bg-primary text-white rounded-full font-bold text-sm tracking-wide shadow-lg hover:shadow-xl active:scale-95 transition-all disabled:cursor-not-allowed disabled:bg-primary/50"
            >
              {loading ? 'Ingesting...' : 'Ingest Source'}
            </button>
          </div>

          {status ? (
            <div className="rounded-3xl border border-surface-variant bg-surface p-4 text-sm text-secondary">{status}</div>
          ) : null}
        </form>
      ) : (
        <div className="rounded-3xl border border-surface-variant bg-surface p-6 text-sm text-secondary">
          Use this panel to ingest text sources for your RAG knowledge base. Add files later once the raw ingestion path is working.
        </div>
      )}
    </div>
  )
}
