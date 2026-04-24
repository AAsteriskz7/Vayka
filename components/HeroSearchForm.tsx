"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";

export default function HeroSearchForm() {
  const [query, setQuery] = useState("");
  const router = useRouter();

  function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    const trimmed = query.trim();
    if (!trimmed) return;
    router.push(`/search/results?q=${encodeURIComponent(trimmed)}`);
  }

  return (
    <div className="relative group">
      <div className="absolute inset-0 bg-surface-tint/5 blur-2xl rounded-xl -z-10 group-focus-within:bg-surface-tint/10 transition-all"></div>
      <form onSubmit={handleSubmit} className="bg-surface-container-lowest p-6 rounded-xl shadow-xl shadow-on-surface/5 flex flex-col gap-4">
        <label className="text-secondary font-label text-sm font-semibold tracking-wide flex items-center gap-2">
          <span className="material-symbols-outlined text-primary text-lg">magic_button</span>
          Where does your curiosity lead?
        </label>
        <div className="relative">
          <textarea
            className="w-full bg-surface-container border-none rounded-lg p-5 text-on-surface placeholder:text-outline focus:ring-2 focus:ring-surface-tint/20 min-h-[120px] resize-none font-body outline-none"
            placeholder="Describe a feeling, a flavor, or a hidden coast..."
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            onKeyDown={(e) => {
              if (e.key === "Enter" && !e.shiftKey) {
                e.preventDefault();
                handleSubmit(e);
              }
            }}
          />
          <button
            type="submit"
            className="absolute bottom-4 right-4 bg-primary text-white p-3 rounded-full hover:scale-105 transition-transform inline-flex items-center justify-center"
          >
            <span className="material-symbols-outlined">arrow_forward</span>
          </button>
        </div>
      </form>
    </div>
  );
}
