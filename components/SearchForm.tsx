"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";

export default function SearchForm() {
  const router = useRouter();
  const [location, setLocation] = useState("");
  const [budget, setBudget] = useState("Med");
  const [travelType, setTravelType] = useState("Weekend");
  const [vibes, setVibes] = useState<string[]>(["Mountains"]);

  function toggleVibe(vibe: string) {
    setVibes((prev) =>
      prev.includes(vibe) ? prev.filter((v) => v !== vibe) : [...prev, vibe]
    );
  }

  function handleSubmit() {
    const parts: string[] = [];
    if (location.trim()) parts.push(location.trim());
    if (budget) parts.push(`${budget.toLowerCase()} budget`);
    if (travelType) parts.push(travelType.toLowerCase());
    if (vibes.length > 0) parts.push(vibes.join(", ").toLowerCase());

    const query = parts.length > 0 ? parts.join(" ") : "travel destinations";
    router.push(`/search/results?q=${encodeURIComponent(query)}`);
  }

  const budgetOptions = ["Low", "Med", "High"];
  const typeOptions = ["Weekend", "Extended"];
  const vibeOptions = [
    { label: "Beach", icon: "beach_access" },
    { label: "Mountains", icon: "landscape" },
    { label: "City", icon: "apartment" },
    { label: "Nature", icon: "forest" },
    { label: "Culinary", icon: "restaurant" },
    { label: "Culture", icon: "museum" },
  ];

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 gap-x-12 gap-y-10">
      {/* Location & Dates */}
      <div className="space-y-8">
        <div>
          <label className="block font-label text-secondary text-sm font-semibold mb-3 tracking-wide">
            STARTING FROM
          </label>
          <div className="flex items-center bg-surface-container-low px-6 py-4 rounded-full group focus-within:ring-2 ring-surface-tint/20 transition-all">
            <span className="material-symbols-outlined text-outline mr-3">my_location</span>
            <input
              className="bg-transparent border-none focus:ring-0 text-on-surface w-full font-medium placeholder:text-outline-variant outline-none"
              placeholder="Current Location"
              type="text"
              value={location}
              onChange={(e) => setLocation(e.target.value)}
            />
          </div>
        </div>
        <div>
          <label className="block font-label text-secondary text-sm font-semibold mb-3 tracking-wide">
            TRAVEL DATES
          </label>
          <div className="flex items-center bg-surface-container-low px-6 py-4 rounded-full focus-within:ring-2 ring-surface-tint/20 transition-all">
            <span className="material-symbols-outlined text-outline mr-3">calendar_today</span>
            <input
              className="bg-transparent border-none focus:ring-0 text-on-surface w-full font-medium placeholder:text-outline-variant outline-none"
              placeholder="Select dates..."
              type="text"
            />
          </div>
        </div>
      </div>

      {/* Budget & Duration */}
      <div className="space-y-8">
        <div>
          <label className="block font-label text-secondary text-sm font-semibold mb-3 tracking-wide">
            BUDGET RANGE
          </label>
          <div className="flex flex-wrap gap-3">
            {budgetOptions.map((opt) => (
              <button
                key={opt}
                type="button"
                onClick={() => setBudget(opt)}
                className={`px-6 py-2 rounded-full text-sm font-medium transition-all ${
                  budget === opt
                    ? "bg-tertiary-container text-on-tertiary-container ring-1 ring-tertiary-container font-bold shadow-sm"
                    : "border border-outline-variant text-on-surface-variant hover:bg-surface-container-high"
                }`}
              >
                {opt}
              </button>
            ))}
          </div>
        </div>
        <div>
          <label className="block font-label text-secondary text-sm font-semibold mb-3 tracking-wide">
            TRAVEL TYPE
          </label>
          <div className="flex flex-wrap gap-3">
            {typeOptions.map((opt) => (
              <button
                key={opt}
                type="button"
                onClick={() => setTravelType(opt)}
                className={`px-6 py-2 rounded-full text-sm font-medium transition-all ${
                  travelType === opt
                    ? "bg-surface-container-high text-primary font-bold"
                    : "border border-outline-variant text-on-surface-variant hover:bg-surface-container-high"
                }`}
              >
                {opt}
              </button>
            ))}
          </div>
        </div>
      </div>

      {/* Vibes */}
      <div className="md:col-span-2">
        <label className="block font-label text-secondary text-sm font-semibold mb-4 tracking-wide text-center">
          VIBE & PREFERENCES
        </label>
        <div className="flex flex-wrap justify-center gap-3">
          {vibeOptions.map((v) => (
            <button
              key={v.label}
              type="button"
              onClick={() => toggleVibe(v.label)}
              className={`flex items-center gap-2 px-5 py-2.5 rounded-full transition-all ${
                vibes.includes(v.label)
                  ? "bg-tertiary-container text-on-tertiary-container shadow-sm"
                  : "bg-surface-container text-on-surface-variant hover:bg-tertiary-fixed-dim hover:text-tertiary"
              }`}
            >
              <span
                className="material-symbols-outlined text-sm"
                style={vibes.includes(v.label) ? { fontVariationSettings: "'FILL' 1" } : {}}
              >
                {v.icon}
              </span>
              {v.label}
            </button>
          ))}
        </div>
      </div>

      {/* CTA */}
      <div className="md:col-span-2 flex justify-center pt-6">
        <button
          type="button"
          onClick={handleSubmit}
          className="px-12 py-5 rounded-full bg-gradient-to-br from-primary to-primary-container text-white text-lg font-bold shadow-lg shadow-primary/20 hover:scale-105 active:scale-95 transition-all flex items-center gap-3"
        >
          Find Destinations
          <span className="material-symbols-outlined">arrow_forward</span>
        </button>
      </div>
    </div>
  );
}
