'use client';

import { useState, useEffect } from 'react';

export default function SettingsTab() {
  const [threshold, setThreshold] = useState(0.7);
  const [isSaved, setIsSaved] = useState(false);

  useEffect(() => {
    // Load from localStorage
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
            <label className="text-sm font-medium text-secondary">Gemini Chat Model</label>
            <div className="w-full rounded-2xl border border-surface-variant bg-surface-container-low px-4 py-3 text-secondary font-mono text-sm">
              gemini-3.1-flash-lite
            </div>
            <p className="text-xs text-secondary/60">This model is configured via your environment variables.</p>
          </div>

          <div className="flex flex-col gap-2">
            <label className="text-sm font-medium text-secondary flex justify-between">
              <span>Retrieval Similarity Threshold</span>
              <span className="text-primary font-bold">{threshold.toFixed(2)}</span>
            </label>
            <input 
              type="range" 
              min="0.5" max="0.95" step="0.05"
              value={threshold}
              onChange={(e) => setThreshold(parseFloat(e.target.value))}
              className="w-full accent-primary"
            />
            <p className="text-xs text-secondary/60">Minimum cosine similarity score required for a document chunk to be retrieved.</p>
          </div>
        </div>
      </div>
    </section>
  );
}
