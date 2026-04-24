"use client";

import { useState } from "react";

interface ComparisonRow {
  category: string;
  icon: string;
  values: string[];
}

interface ComparisonResult {
  destinations: string[];
  rows: ComparisonRow[];
  verdict: string;
}

const CATEGORY_MAP: Record<string, { label: string; icon: string }> = {
  cost: { label: "Cost", icon: "payments" },
  best_time: { label: "Best Time", icon: "calendar_month" },
  activities: { label: "Activities", icon: "hiking" },
  weather: { label: "Weather", icon: "wb_sunny" },
  safety: { label: "Safety", icon: "verified_user" },
  stay_cost: { label: "Stay / Night", icon: "bed" },
  food: { label: "Food Scene", icon: "restaurant" },
  best_for: { label: "Best For", icon: "person" },
};

function parseResponse(raw: string, destinations: string[]): ComparisonResult {
  const rows: ComparisonRow[] = [];

  for (const [key, meta] of Object.entries(CATEGORY_MAP)) {
    // Try multiple patterns: KEY: val | val, KEY : val | val
    const patterns = [
      new RegExp(`${key}\\s*:\\s*(.+)`, "i"),
      new RegExp(`${key.replace("_", "[_ ]")}\\s*:\\s*(.+)`, "i"),
      new RegExp(`${meta.label}\\s*:\\s*(.+)`, "i"),
    ];

    for (const pat of patterns) {
      const match = raw.match(pat);
      if (match) {
        const values = match[1]
          .split("|")
          .map((v) => v.trim())
          .filter((v) => v.length > 0);
        if (values.length >= 2) {
          while (values.length < destinations.length) values.push("—");
          rows.push({
            category: meta.label,
            icon: meta.icon,
            values: values.slice(0, destinations.length),
          });
          break;
        }
      }
    }
  }

  let verdict = "";
  const verdictMatch = raw.match(/VERDICT\s*:\s*(.+)/i);
  if (verdictMatch) {
    verdict = verdictMatch[1].trim();
  }

  return { destinations, rows, verdict };
}

export default function CompareEngine() {
  const [inputs, setInputs] = useState(["", "", ""]);
  const [result, setResult] = useState<ComparisonResult | null>(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  function updateInput(idx: number, val: string) {
    setInputs((prev) => prev.map((v, i) => (i === idx ? val : v)));
  }

  const filledInputs = inputs.filter((v) => v.trim());

  async function handleCompare() {
    if (filledInputs.length < 2) return;
    setLoading(true);
    setResult(null);
    setError("");

    try {
      const res = await fetch("/api/compare", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ destinations: filledInputs }),
      });
      const data = await res.json();

      if (!res.ok || data.error) {
        setError(data.error || "Something went wrong.");
        return;
      }

      const parsed = parseResponse(data.raw || "", filledInputs);
      if (parsed.rows.length === 0) {
        setError("Could not parse comparison data. Try different destinations.");
        return;
      }
      setResult(parsed);
    } catch {
      setError("Network error. Please try again.");
    } finally {
      setLoading(false);
    }
  }

  return (
    <>
      {/* Input Section */}
      <div className="bg-surface-container-lowest rounded-2xl p-8 shadow-sm border border-surface-variant/30 mb-12">
        <h2 className="font-headline text-xl text-primary font-bold mb-6">Pick your destinations</h2>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-6">
          {inputs.map((val, idx) => (
            <div key={idx}>
              <label className="block text-xs font-medium text-secondary mb-2 uppercase tracking-widest">
                Destination {idx + 1} {idx >= 2 && "(optional)"}
              </label>
              <input
                type="text"
                value={val}
                onChange={(e) => updateInput(idx, e.target.value)}
                onKeyDown={(e) => { if (e.key === "Enter") handleCompare(); }}
                className="w-full bg-surface-container border-none rounded-xl px-5 py-3.5 text-on-surface placeholder:text-outline focus:ring-2 focus:ring-primary/20 outline-none"
                placeholder={idx === 0 ? "e.g. Tokyo" : idx === 1 ? "e.g. Barcelona" : "e.g. Cape Town"}
              />
            </div>
          ))}
        </div>
        <button
          onClick={handleCompare}
          disabled={loading || filledInputs.length < 2}
          className="px-8 py-3.5 bg-primary text-white rounded-full font-bold text-sm flex items-center gap-2 hover:shadow-lg transition-all disabled:opacity-50"
        >
          {loading ? (
            <>
              <span className="material-symbols-outlined animate-spin text-base">progress_activity</span>
              Comparing...
            </>
          ) : (
            <>
              <span className="material-symbols-outlined text-base">compare_arrows</span>
              Compare Destinations
            </>
          )}
        </button>
      </div>

      {/* Error */}
      {error && (
        <div className="bg-red-50 text-red-700 p-4 rounded-xl mb-8 text-sm">{error}</div>
      )}

      {/* Results */}
      {result && (
        <>
          {/* Verdict */}
          {result.verdict && (
            <div className="bg-primary-container text-white p-10 md:p-12 rounded-xl mb-12 relative overflow-hidden">
              <div className="absolute -right-20 -bottom-20 w-64 h-64 bg-primary rounded-full blur-3xl opacity-40"></div>
              <div className="relative z-10">
                <div className="flex items-center gap-3 mb-4">
                  <span className="material-symbols-outlined text-primary-fixed">auto_awesome</span>
                  <span className="font-label text-primary-fixed text-sm uppercase tracking-widest font-bold">AI Analysis</span>
                </div>
                <p className="text-lg md:text-xl font-body leading-relaxed">{result.verdict}</p>
              </div>
            </div>
          )}

          {/* Table */}
          <div className="overflow-x-auto pb-8">
            <table className="w-full border-separate border-spacing-x-3 border-spacing-y-0">
              <thead>
                <tr>
                  <th className="p-5 text-left w-44"></th>
                  {result.destinations.map((dest, idx) => (
                    <th
                      key={idx}
                      className={`p-6 ${idx % 2 === 0 ? "bg-surface-container" : "bg-surface-container-high"} rounded-t-xl min-w-[200px]`}
                    >
                      <span className="text-xl font-headline font-black block">{dest}</span>
                    </th>
                  ))}
                </tr>
              </thead>
              <tbody className="text-on-surface font-body">
                {result.rows.map((row, rIdx) => (
                  <tr key={rIdx}>
                    <td className="p-4 border-b border-surface-container-highest">
                      <div className="flex items-center gap-3">
                        <span className="material-symbols-outlined text-secondary text-lg">{row.icon}</span>
                        <span className="font-bold text-sm">{row.category}</span>
                      </div>
                    </td>
                    {row.values.map((val, vIdx) => (
                      <td
                        key={vIdx}
                        className={`p-4 ${vIdx % 2 === 0 ? "bg-surface-container/40" : "bg-surface-container-high/40"} border-b border-surface-container-highest text-center text-sm leading-relaxed`}
                      >
                        {val}
                      </td>
                    ))}
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </>
      )}

      {/* Empty state */}
      {!result && !loading && !error && (
        <div className="text-center py-16">
          <span className="material-symbols-outlined text-6xl text-outline/25 mb-4 block">compare_arrows</span>
          <p className="text-secondary text-lg">Enter at least two destinations above to compare them.</p>
          <p className="text-on-surface-variant text-sm mt-2">Data from your knowledge base will be used when available.</p>
        </div>
      )}
    </>
  );
}
