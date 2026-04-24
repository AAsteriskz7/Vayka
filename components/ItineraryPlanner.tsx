"use client";

import { useState, useEffect } from "react";

interface ItineraryDay {
  day: number;
  title: string;
  activities: string[];
}

interface SavedItinerary {
  id: string;
  destination: string;
  duration: string;
  notes: string;
  days: ItineraryDay[];
  createdAt: string;
}

function loadSaved(): SavedItinerary[] {
  if (typeof window === "undefined") return [];
  try {
    return JSON.parse(localStorage.getItem("vayka_itineraries") || "[]");
  } catch { return []; }
}
function persist(items: SavedItinerary[]) {
  localStorage.setItem("vayka_itineraries", JSON.stringify(items));
}

function parseAIDays(text: string): ItineraryDay[] {
  const days: ItineraryDay[] = [];
  const pat = /Day\s+(\d+)[\s:.\-]+([^\n]*)/gi;
  let m;
  const hits: { day: number; title: string; idx: number }[] = [];
  while ((m = pat.exec(text)) !== null) hits.push({ day: +m[1], title: m[2].trim(), idx: m.index });
  for (let i = 0; i < hits.length; i++) {
    const section = text.slice(hits[i].idx, i + 1 < hits.length ? hits[i + 1].idx : undefined);
    const acts = section.split("\n").slice(1)
      .map(l => l.replace(/^\s*[-*•]\s*/, "").replace(/^\s*\d+[.)]\s*/, "").trim())
      .filter(l => l.length > 5 && l.length < 200);
    days.push({ day: hits[i].day, title: hits[i].title || `Day ${hits[i].day}`, activities: acts.length ? acts : ["Explore the area"] });
  }
  return days;
}

type View = "list" | "create" | "detail";
type CreateTab = "manual" | "ai";

export default function ItineraryPlanner() {
  const [saved, setSaved] = useState<SavedItinerary[]>([]);
  const [view, setView] = useState<View>("list");
  const [viewing, setViewing] = useState<SavedItinerary | null>(null);
  const [mounted, setMounted] = useState(false);

  // Create form state
  const [createTab, setCreateTab] = useState<CreateTab>("manual");
  const [dest, setDest] = useState("");
  const [dur, setDur] = useState("3");
  const [notes, setNotes] = useState("");
  const [days, setDays] = useState<ItineraryDay[]>([{ day: 1, title: "", activities: [""] }]);
  const [aiFocus, setAiFocus] = useState("");
  const [generating, setGenerating] = useState(false);

  // Editing state for detail view
  const [editingDayIdx, setEditingDayIdx] = useState<number | null>(null);
  const [newActivity, setNewActivity] = useState("");

  useEffect(() => { setSaved(loadSaved()); setMounted(true); }, []);

  function save(itinerary: SavedItinerary) {
    const updated = [itinerary, ...saved.filter(s => s.id !== itinerary.id)];
    setSaved(updated);
    persist(updated);
  }

  function handleDelete(id: string) {
    const updated = saved.filter(s => s.id !== id);
    setSaved(updated);
    persist(updated);
    if (viewing?.id === id) { setViewing(null); setView("list"); }
  }

  function resetCreate() {
    setDest(""); setDur("3"); setNotes(""); setAiFocus("");
    setDays([{ day: 1, title: "", activities: [""] }]);
    setCreateTab("manual");
  }

  // --- Manual day management ---
  function addDay() {
    setDays(prev => [...prev, { day: prev.length + 1, title: "", activities: [""] }]);
  }
  function removeDay(idx: number) {
    setDays(prev => prev.filter((_, i) => i !== idx).map((d, i) => ({ ...d, day: i + 1 })));
  }
  function updateDayTitle(idx: number, title: string) {
    setDays(prev => prev.map((d, i) => i === idx ? { ...d, title } : d));
  }
  function updateActivity(dayIdx: number, actIdx: number, value: string) {
    setDays(prev => prev.map((d, i) => i === dayIdx ? { ...d, activities: d.activities.map((a, j) => j === actIdx ? value : a) } : d));
  }
  function addActivity(dayIdx: number) {
    setDays(prev => prev.map((d, i) => i === dayIdx ? { ...d, activities: [...d.activities, ""] } : d));
  }
  function removeActivity(dayIdx: number, actIdx: number) {
    setDays(prev => prev.map((d, i) => i === dayIdx ? { ...d, activities: d.activities.filter((_, j) => j !== actIdx) } : d));
  }

  function handleManualSave() {
    if (!dest.trim()) return;
    const cleaned: ItineraryDay[] = days.map(d => ({
      ...d,
      title: d.title || `Day ${d.day}`,
      activities: d.activities.filter(a => a.trim()),
    })).filter(d => d.activities.length > 0);
    if (cleaned.length === 0) return;
    const it: SavedItinerary = {
      id: Date.now().toString(), destination: dest.trim(), duration: dur,
      notes, days: cleaned, createdAt: new Date().toISOString(),
    };
    save(it);
    resetCreate();
    setViewing(it);
    setView("detail");
  }

  async function handleAIGenerate() {
    if (!dest.trim()) return;
    setGenerating(true);
    const prompt = `Plan a ${dur}-day trip to ${dest}${aiFocus ? ` focused on ${aiFocus}` : ""}. Structure with "Day 1: Title", "Day 2: Title" headers and bullet activities.`;
    try {
      const res = await fetch("/api/chat", {
        method: "POST", headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ message: prompt, pageContext: "/itineraries" }),
      });
      const data = await res.json();
      const parsed = parseAIDays(data.response || "");
      if (parsed.length > 0) {
        const it: SavedItinerary = {
          id: Date.now().toString(), destination: dest.trim(), duration: dur,
          notes: aiFocus, days: parsed, createdAt: new Date().toISOString(),
        };
        save(it);
        resetCreate();
        setViewing(it);
        setView("detail");
      }
    } catch { /* silent */ } finally { setGenerating(false); }
  }

  // --- Detail view: add activity to a day ---
  function handleAddActivityToViewing(dayIdx: number) {
    if (!viewing || !newActivity.trim()) return;
    const updated = {
      ...viewing,
      days: viewing.days.map((d, i) => i === dayIdx ? { ...d, activities: [...d.activities, newActivity.trim()] } : d),
    };
    setViewing(updated);
    save(updated);
    setNewActivity("");
    setEditingDayIdx(null);
  }

  function handleRemoveFromViewing(dayIdx: number, actIdx: number) {
    if (!viewing) return;
    const updated = {
      ...viewing,
      days: viewing.days.map((d, i) => i === dayIdx ? { ...d, activities: d.activities.filter((_, j) => j !== actIdx) } : d),
    };
    setViewing(updated);
    save(updated);
  }

  if (!mounted) return <div className="flex items-center justify-center py-24 gap-3 text-secondary"><span className="material-symbols-outlined animate-spin">progress_activity</span>Loading...</div>;

  // ==================== DETAIL VIEW ====================
  if (view === "detail" && viewing) {
    return (
      <div className="max-w-4xl mx-auto">
        <button onClick={() => { setView("list"); setViewing(null); setEditingDayIdx(null); }} className="inline-flex items-center gap-1 text-secondary text-sm font-medium mb-6 hover:text-primary transition-colors">
          <span className="material-symbols-outlined text-base">arrow_back</span>Back to all itineraries
        </button>
        <div className="flex flex-col md:flex-row justify-between items-start md:items-end gap-4 mb-10">
          <div>
            <span className="text-secondary font-label text-[10px] uppercase tracking-widest font-bold">Itinerary</span>
            <h1 className="font-headline text-4xl md:text-5xl text-primary font-bold italic">{viewing.destination}</h1>
            <p className="text-secondary text-sm mt-1">{viewing.days.length} days · {viewing.duration} day plan · Created {new Date(viewing.createdAt).toLocaleDateString()}</p>
            {viewing.notes && <p className="text-on-surface-variant text-sm mt-2 italic">{viewing.notes}</p>}
          </div>
          <button onClick={() => handleDelete(viewing.id)} className="px-5 py-2.5 bg-surface-container text-secondary rounded-full text-sm font-bold hover:bg-red-50 hover:text-red-600 transition-colors flex items-center gap-2">
            <span className="material-symbols-outlined text-base">delete</span>Delete
          </button>
        </div>

        <div className="relative pl-12 space-y-8 before:content-[''] before:absolute before:left-[18px] before:top-4 before:bottom-4 before:w-[2px] before:bg-primary/15 before:rounded-full">
          {viewing.days.map((day, dIdx) => (
            <div key={dIdx} className="relative">
              <div className={`absolute -left-12 top-0 w-9 h-9 rounded-full flex items-center justify-center z-10 shadow-sm ${dIdx === 0 ? "bg-primary" : "bg-surface-container-lowest border-2 border-primary/30"}`}>
                <span className={`text-xs font-bold ${dIdx === 0 ? "text-white" : "text-primary"}`}>{String(day.day).padStart(2, "0")}</span>
              </div>
              <div className="bg-surface-container-lowest rounded-xl p-6 shadow-sm border border-surface-variant/20 hover:shadow-md transition-shadow">
                <h3 className="font-headline text-xl text-primary font-bold mb-4">{day.title}</h3>
                <ul className="space-y-2">
                  {day.activities.map((act, aIdx) => (
                    <li key={aIdx} className="flex items-start gap-3 text-on-surface-variant group/item">
                      <span className="w-5 h-5 rounded-full bg-primary/10 flex items-center justify-center shrink-0 mt-0.5"><span className="text-primary text-[8px]">●</span></span>
                      <span className="flex-1 text-sm leading-relaxed">{act}</span>
                      <button onClick={() => handleRemoveFromViewing(dIdx, aIdx)} className="opacity-0 group-hover/item:opacity-100 text-secondary hover:text-red-500 transition-all shrink-0 p-1" title="Remove">
                        <span className="material-symbols-outlined text-sm">close</span>
                      </button>
                    </li>
                  ))}
                </ul>
                {/* Add activity inline */}
                {editingDayIdx === dIdx ? (
                  <div className="flex gap-2 mt-3">
                    <input type="text" value={newActivity} onChange={e => setNewActivity(e.target.value)} onKeyDown={e => { if (e.key === "Enter") handleAddActivityToViewing(dIdx); }}
                      className="flex-1 bg-surface-container border-none rounded-lg px-4 py-2 text-sm text-on-surface placeholder:text-outline focus:ring-2 focus:ring-primary/20 outline-none" placeholder="New activity..." autoFocus />
                    <button onClick={() => handleAddActivityToViewing(dIdx)} className="px-4 py-2 bg-primary text-white rounded-lg text-sm font-bold hover:shadow transition-shadow">Add</button>
                    <button onClick={() => { setEditingDayIdx(null); setNewActivity(""); }} className="px-3 py-2 text-secondary text-sm hover:text-primary">Cancel</button>
                  </div>
                ) : (
                  <button onClick={() => setEditingDayIdx(dIdx)} className="mt-3 text-xs text-primary font-medium flex items-center gap-1 hover:underline">
                    <span className="material-symbols-outlined text-sm">add</span>Add activity
                  </button>
                )}
              </div>
            </div>
          ))}
        </div>
      </div>
    );
  }

  // ==================== CREATE VIEW ====================
  if (view === "create") {
    return (
      <div className="max-w-3xl mx-auto">
        <button onClick={() => { setView("list"); resetCreate(); }} className="inline-flex items-center gap-1 text-secondary text-sm font-medium mb-6 hover:text-primary transition-colors">
          <span className="material-symbols-outlined text-base">arrow_back</span>Back
        </button>
        <h1 className="font-headline text-4xl text-primary font-bold mb-2">New Itinerary</h1>
        <p className="text-on-surface-variant mb-8">Build it yourself or let the AI do the heavy lifting.</p>

        {/* Tabs */}
        <div className="flex gap-2 mb-8">
          <button onClick={() => setCreateTab("manual")} className={`px-5 py-2.5 rounded-full text-sm font-bold transition-colors ${createTab === "manual" ? "bg-primary text-white" : "bg-surface-container text-secondary hover:bg-surface-container-high"}`}>
            <span className="material-symbols-outlined text-sm align-middle mr-1">edit</span>Manual
          </button>
          <button onClick={() => setCreateTab("ai")} className={`px-5 py-2.5 rounded-full text-sm font-bold transition-colors ${createTab === "ai" ? "bg-primary text-white" : "bg-surface-container text-secondary hover:bg-surface-container-high"}`}>
            <span className="material-symbols-outlined text-sm align-middle mr-1" style={{ fontVariationSettings: "'FILL' 1" }}>auto_awesome</span>AI Generate
          </button>
        </div>

        {/* Shared fields */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-8">
          <div>
            <label className="block text-sm font-medium text-secondary mb-2">Destination *</label>
            <input type="text" value={dest} onChange={e => setDest(e.target.value)} className="w-full bg-surface-container-lowest border border-surface-variant rounded-xl px-5 py-3.5 text-on-surface placeholder:text-outline focus:ring-2 focus:ring-primary/20 outline-none" placeholder="e.g. Tokyo, Paris, Bali..." />
          </div>
          <div>
            <label className="block text-sm font-medium text-secondary mb-2">Duration</label>
            <select value={dur} onChange={e => setDur(e.target.value)} className="w-full bg-surface-container-lowest border border-surface-variant rounded-xl px-5 py-3.5 text-on-surface focus:ring-2 focus:ring-primary/20 outline-none">
              {[1, 2, 3, 4, 5, 7, 10, 14].map(d => <option key={d} value={d}>{d} {d === 1 ? "day" : "days"}</option>)}
            </select>
          </div>
        </div>

        {/* AI tab */}
        {createTab === "ai" && (
          <div className="space-y-6">
            <div>
              <label className="block text-sm font-medium text-secondary mb-2">Focus / Interests (optional)</label>
              <input type="text" value={aiFocus} onChange={e => setAiFocus(e.target.value)} className="w-full bg-surface-container-lowest border border-surface-variant rounded-xl px-5 py-3.5 text-on-surface placeholder:text-outline focus:ring-2 focus:ring-primary/20 outline-none" placeholder="e.g. food, temples, nightlife, budget-friendly..." />
            </div>
            <button onClick={handleAIGenerate} disabled={generating || !dest.trim()} className="px-8 py-3.5 bg-primary text-white rounded-full font-bold text-sm flex items-center gap-2 hover:shadow-lg transition-all disabled:opacity-50">
              {generating ? <><span className="material-symbols-outlined animate-spin text-base">progress_activity</span>Generating...</> : <><span className="material-symbols-outlined text-base" style={{ fontVariationSettings: "'FILL' 1" }}>auto_awesome</span>Generate Itinerary</>}
            </button>
          </div>
        )}

        {/* Manual tab */}
        {createTab === "manual" && (
          <div className="space-y-6">
            <div>
              <label className="block text-sm font-medium text-secondary mb-2">Notes (optional)</label>
              <textarea value={notes} onChange={e => setNotes(e.target.value)} rows={2} className="w-full bg-surface-container-lowest border border-surface-variant rounded-xl px-5 py-3.5 text-on-surface placeholder:text-outline focus:ring-2 focus:ring-primary/20 outline-none resize-none" placeholder="Any notes about this trip..." />
            </div>

            {/* Day builder */}
            <div className="space-y-6">
              <div className="flex items-center justify-between">
                <h3 className="font-headline text-lg text-primary font-bold">Days</h3>
                <button onClick={addDay} className="text-sm text-primary font-bold flex items-center gap-1 hover:underline">
                  <span className="material-symbols-outlined text-sm">add</span>Add Day
                </button>
              </div>

              {days.map((day, dIdx) => (
                <div key={dIdx} className="bg-surface-container-low rounded-xl p-5 border border-surface-variant/30">
                  <div className="flex items-center gap-3 mb-4">
                    <div className="w-8 h-8 rounded-full bg-primary/10 flex items-center justify-center shrink-0">
                      <span className="text-primary text-xs font-bold">{day.day}</span>
                    </div>
                    <input type="text" value={day.title} onChange={e => updateDayTitle(dIdx, e.target.value)} className="flex-1 bg-transparent border-none text-on-surface font-bold text-lg placeholder:text-outline/50 focus:ring-0 outline-none p-0" placeholder={`Day ${day.day} title (e.g. Arrival & Exploration)`} />
                    {days.length > 1 && (
                      <button onClick={() => removeDay(dIdx)} className="p-1 text-secondary hover:text-red-500 transition-colors" title="Remove day">
                        <span className="material-symbols-outlined text-sm">delete</span>
                      </button>
                    )}
                  </div>

                  <div className="space-y-2 pl-11">
                    {day.activities.map((act, aIdx) => (
                      <div key={aIdx} className="flex items-center gap-2">
                        <span className="text-primary text-[6px]">●</span>
                        <input type="text" value={act} onChange={e => updateActivity(dIdx, aIdx, e.target.value)} className="flex-1 bg-surface-container-lowest border border-surface-variant/30 rounded-lg px-4 py-2 text-sm text-on-surface placeholder:text-outline focus:ring-2 focus:ring-primary/20 outline-none" placeholder="Activity..." />
                        {day.activities.length > 1 && (
                          <button onClick={() => removeActivity(dIdx, aIdx)} className="p-1 text-secondary hover:text-red-500 transition-colors">
                            <span className="material-symbols-outlined text-sm">close</span>
                          </button>
                        )}
                      </div>
                    ))}
                    <button onClick={() => addActivity(dIdx)} className="text-xs text-primary font-medium flex items-center gap-1 hover:underline mt-1">
                      <span className="material-symbols-outlined text-sm">add</span>Add activity
                    </button>
                  </div>
                </div>
              ))}
            </div>

            <button onClick={handleManualSave} disabled={!dest.trim()} className="px-8 py-3.5 bg-primary text-white rounded-full font-bold text-sm flex items-center gap-2 hover:shadow-lg transition-all disabled:opacity-50">
              <span className="material-symbols-outlined text-base">save</span>Save Itinerary
            </button>
          </div>
        )}
      </div>
    );
  }

  // ==================== LIST VIEW ====================
  return (
    <div className="max-w-5xl mx-auto">
      <div className="flex flex-col md:flex-row justify-between items-start md:items-end gap-6 mb-10">
        <div>
          <h1 className="font-headline text-4xl md:text-5xl text-primary font-bold leading-tight">Your <span className="italic text-secondary">Itineraries</span></h1>
          <p className="text-on-surface-variant text-lg mt-2">AI-generated or hand-crafted trip plans, saved to your browser.</p>
        </div>
        <button onClick={() => { resetCreate(); setView("create"); }} className="px-6 py-3.5 bg-primary text-white rounded-full font-bold text-sm flex items-center gap-2 hover:shadow-lg hover:scale-105 active:scale-95 transition-all">
          <span className="material-symbols-outlined text-base">add</span>New Itinerary
        </button>
      </div>

      {saved.length === 0 ? (
        <div className="text-center py-24 bg-surface-container-low rounded-2xl">
          <span className="material-symbols-outlined text-6xl text-outline/25 mb-4 block">map</span>
          <p className="text-xl text-secondary mb-2">No itineraries yet</p>
          <p className="text-sm text-on-surface-variant max-w-md mx-auto mb-6">
            Create your first trip plan manually or let the AI build one for you.
          </p>
          <button onClick={() => { resetCreate(); setView("create"); }} className="px-8 py-3.5 bg-primary text-white rounded-full font-bold text-sm inline-flex items-center gap-2 hover:shadow-lg transition-all">
            <span className="material-symbols-outlined text-base">add</span>Create Your First Itinerary
          </button>
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {saved.map(s => (
            <div key={s.id} className="bg-surface-container-lowest rounded-2xl overflow-hidden shadow-sm border border-surface-variant/20 hover:shadow-lg transition-all group cursor-pointer" onClick={() => { setViewing(s); setView("detail"); }}>
              <div className="bg-primary p-6 relative overflow-hidden">
                <div className="absolute -right-6 -top-6 w-24 h-24 bg-white/10 rounded-full"></div>
                <h3 className="font-headline text-2xl text-white font-bold italic relative z-10">{s.destination}</h3>
                <p className="text-white/70 text-sm mt-1 relative z-10">{s.days.length} days</p>
              </div>
              <div className="p-5">
                <div className="space-y-2 mb-4">
                  {s.days.slice(0, 3).map(d => (
                    <div key={d.day} className="flex items-center gap-2">
                      <span className="w-5 h-5 rounded-full bg-primary/10 flex items-center justify-center shrink-0"><span className="text-primary text-[8px] font-bold">{d.day}</span></span>
                      <span className="text-sm text-on-surface-variant truncate">{d.title}</span>
                    </div>
                  ))}
                  {s.days.length > 3 && <p className="text-xs text-secondary pl-7">+{s.days.length - 3} more days</p>}
                </div>
                <div className="flex justify-between items-center pt-3 border-t border-surface-variant/30">
                  <span className="text-[10px] text-secondary uppercase tracking-widest">{new Date(s.createdAt).toLocaleDateString()}</span>
                  <div className="flex gap-1">
                    <button onClick={e => { e.stopPropagation(); handleDelete(s.id); }} className="p-1.5 hover:bg-red-50 text-secondary hover:text-red-500 rounded-full transition-colors" title="Delete">
                      <span className="material-symbols-outlined text-sm">delete</span>
                    </button>
                    <span className="material-symbols-outlined text-primary text-sm p-1.5 opacity-0 group-hover:opacity-100 transition-opacity">arrow_forward</span>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
