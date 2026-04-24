'use client';

import { useState, useEffect } from 'react';

export default function SettingsTab() {
  const [threshold, setThreshold] = useState(0.4);
  const [isSaved, setIsSaved] = useState(false);

  useEffect(() => {
    const savedThreshold = localStorage.getItem('vayka_admin_threshold');
    if (savedThreshold) setThreshold(parseFloat(savedThreshold));
  }, []);

  const handleSave = () => {
    localStorage.setItem('vayka_admin_threshold', threshold.toString());
    setIsSaved(true);
    setTimeout(() => setIsSaved(false), 3000);
  };

  return (
    <section className="col-span-1 bg-surface-container-lowest rounded-3xl p-8 lg:p-10 shadow-sm border border-surface-variant/50">
      <div className="flex justify-between items-start mb-8">
        <div>
          <h3 className="font-headline text-3xl text-primary font-bold mb-2">Settings</h3>
          <p className="text-secondary">Configure your application preferences and RAG parameters.</p>
        </div>
        <button 
          onClick={handleSave}
          className="px-6 py-3 bg-primary text-white rounded-full font-bold text-sm tracking-wide shadow-lg hover:shadow-xl hover:scale-105 active:scale-95 transition-all flex items-center gap-2"
        >
          <span className="material-symbols-outlined text-sm">save</span>
          {isSaved ? 'Saved!' : 'Save Changes'}
        </button>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
        {/* Model Selection */}
        <div className="space-y-6">
          <h4 className="font-headline text-xl text-primary font-bold border-b border-surface-variant pb-2">AI Configuration</h4>
          
          <div className="flex flex-col gap-2">
            <label className="text-sm font-medium text-secondary">Primary Chat Model</label>
            <div className="w-full rounded-2xl border border-surface-variant bg-surface-container-low px-4 py-3 text-secondary font-mono text-sm flex items-center justify-between">
              <span>{process.env.NEXT_PUBLIC_GEMINI_CHAT_MODEL || 'gemini-3.1-flash-lite-preview'}</span>
              <span className="text-[10px] bg-primary/10 text-primary px-2 py-0.5 rounded-full font-bold">PRIMARY</span>
            </div>
            <p className="text-xs text-secondary/60">Configured via GEMINI_CHAT_MODEL environment variable.</p>
          </div>

          <div className="flex flex-col gap-2">
            <label className="text-sm font-medium text-secondary">Backup Chat Model</label>
            <div className="w-full rounded-2xl border border-surface-variant bg-surface-container-low px-4 py-3 text-secondary font-mono text-sm flex items-center justify-between">
              <span>{process.env.NEXT_PUBLIC_GEMINI_BACKUP_MODEL || 'gemini-3.0-flash'}</span>
              <span className="text-[10px] bg-tertiary-container/50 text-on-tertiary-container px-2 py-0.5 rounded-full font-bold">FALLBACK</span>
            </div>
            <p className="text-xs text-secondary/60">Used automatically when the primary model times out or returns an error.</p>
          </div>

          <div className="flex flex-col gap-2">
            <label className="text-sm font-medium text-secondary">Embedding Model</label>
            <div className="w-full rounded-2xl border border-surface-variant bg-surface-container-low px-4 py-3 text-secondary font-mono text-sm">
              gemini-embedding-2-preview
            </div>
            <p className="text-xs text-secondary/60">768-dimensional vectors for semantic search.</p>
          </div>
        </div>

        {/* RAG Settings */}
        <div className="space-y-6">
          <h4 className="font-headline text-xl text-primary font-bold border-b border-surface-variant pb-2">RAG Parameters</h4>

          <div className="flex flex-col gap-2">
            <label className="text-sm font-medium text-secondary flex justify-between">
              <span>Retrieval Similarity Threshold</span>
              <span className="text-primary font-bold">{threshold.toFixed(2)}</span>
            </label>
            <input 
              type="range" 
              min="0.2" max="0.95" step="0.05"
              value={threshold}
              onChange={(e) => setThreshold(parseFloat(e.target.value))}
              className="w-full accent-primary"
            />
            <p className="text-xs text-secondary/60">Minimum cosine similarity score required for a document chunk to be retrieved. Lower = more results, higher = more precise.</p>
          </div>

          <div className="flex flex-col gap-2">
            <label className="text-sm font-medium text-secondary">Max Output Tokens</label>
            <div className="w-full rounded-2xl border border-surface-variant bg-surface-container-low px-4 py-3 text-secondary font-mono text-sm">
              1024
            </div>
            <p className="text-xs text-secondary/60">Maximum tokens the model can generate per response.</p>
          </div>

          <div className="flex flex-col gap-2">
            <label className="text-sm font-medium text-secondary">Temperature</label>
            <div className="w-full rounded-2xl border border-surface-variant bg-surface-container-low px-4 py-3 text-secondary font-mono text-sm">
              0.4
            </div>
            <p className="text-xs text-secondary/60">Controls randomness. Lower = more deterministic, higher = more creative.</p>
          </div>
        </div>
      </div>
    </section>
  );
}
