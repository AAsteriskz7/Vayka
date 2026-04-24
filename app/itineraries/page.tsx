'use client'

import { useState, useMemo } from 'react'
import Link from 'next/link'
import { itineraries, TripStatus } from '@/lib/mockData'
import SummaryCard from '@/components/dashboard/SummaryCard'
import ItineraryCard from '@/components/dashboard/ItineraryCard'

type SortKey = 'recent' | 'duration' | 'budget-high' | 'budget-low'

interface FilterOption {
  key: TripStatus | 'all'
  label: string
}

const STATUS_FILTERS: FilterOption[] = [
  { key: 'all', label: 'All Trips' },
  { key: 'upcoming', label: 'Upcoming' },
  { key: 'planning', label: 'In Planning' },
  { key: 'completed', label: 'Completed' },
  { key: 'draft', label: 'Drafts' },
]

export default function ItinerariesDashboard() {
  const [search, setSearch] = useState('')
  const [activeFilter, setActiveFilter] = useState<TripStatus | 'all'>('all')
  const [sort, setSort] = useState<SortKey>('recent')

  const stats = useMemo(() => ({
    total: itineraries.length,
    upcoming: itineraries.filter(i => i.status === 'upcoming').length,
    planning: itineraries.filter(i => i.status === 'planning').length,
    completed: itineraries.filter(i => i.status === 'completed').length,
  }), [])

  const filtered = useMemo(() => {
    let result = [...itineraries]

    if (search.trim()) {
      const q = search.toLowerCase()
      result = result.filter(
        i =>
          i.title.toLowerCase().includes(q) ||
          i.destination.toLowerCase().includes(q) ||
          i.country.toLowerCase().includes(q) ||
          i.tags.some(t => t.toLowerCase().includes(q))
      )
    }

    if (activeFilter !== 'all') {
      result = result.filter(i => i.status === activeFilter)
    }

    switch (sort) {
      case 'recent':
        result.sort((a, b) => Number(b.id) - Number(a.id))
        break
      case 'duration':
        result.sort((a, b) => b.duration - a.duration)
        break
      case 'budget-high':
        result.sort((a, b) => b.budget.total - a.budget.total)
        break
      case 'budget-low':
        result.sort((a, b) => a.budget.total - b.budget.total)
        break
    }

    return result
  }, [search, activeFilter, sort])

  return (
    <main className="pt-28 pb-20 min-h-screen">
      <div className="max-w-screen-2xl mx-auto px-6 lg:px-12 space-y-10">

        {/* ── Page Header ── */}
        <header className="flex flex-col sm:flex-row sm:items-end justify-between gap-6">
          <div>
            <p className="text-secondary text-xs font-black uppercase tracking-widest mb-2">
              Your Journeys
            </p>
            <h1 className="font-headline text-5xl lg:text-6xl font-black text-primary tracking-tight leading-none">
              My Itineraries
            </h1>
            <p className="text-on-surface-variant mt-3 text-lg max-w-md">
              Track, plan, and refine every journey — powered by Vayka AI.
            </p>
          </div>
          <Link
            href="/chat"
            className="bg-primary text-white px-6 py-3.5 rounded-xl font-bold flex items-center gap-2 hover:bg-primary-container transition-colors shadow-lg shadow-primary/20 shrink-0 self-start sm:self-auto"
          >
            <span className="material-symbols-outlined">add</span>
            Plan New Trip
          </Link>
        </header>

        {/* ── Summary Cards ── */}
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
          <SummaryCard
            icon="luggage"
            label="Total Trips"
            value={stats.total}
            sub="All time"
            accent="primary"
          />
          <SummaryCard
            icon="flight_takeoff"
            label="Upcoming"
            value={stats.upcoming}
            sub="Next 6 months"
            accent="tertiary"
          />
          <SummaryCard
            icon="edit_note"
            label="In Planning"
            value={stats.planning}
            sub="Being refined"
            accent="secondary"
          />
          <SummaryCard
            icon="check_circle"
            label="Completed"
            value={stats.completed}
            sub="Trips taken"
            accent="surface"
          />
        </div>

        {/* ── Search + Filter + Sort Bar ── */}
        <div className="flex flex-col md:flex-row gap-4 items-start md:items-center">

          {/* Search input */}
          <div className="relative w-full max-w-xs shrink-0">
            <span className="material-symbols-outlined absolute left-4 top-1/2 -translate-y-1/2 text-outline text-[20px] pointer-events-none">
              search
            </span>
            <input
              type="text"
              value={search}
              onChange={e => setSearch(e.target.value)}
              placeholder="Search destinations, tags…"
              className="w-full bg-surface-container-lowest border border-outline-variant/20 rounded-xl py-3.5 pl-11 pr-4 text-on-surface placeholder:text-outline font-body text-sm focus:outline-none focus:border-primary/30 focus:ring-2 focus:ring-primary/10 transition-all"
            />
          </div>

          {/* Status filter pills */}
          <div className="flex gap-2 flex-wrap flex-1">
            {STATUS_FILTERS.map(f => (
              <button
                key={f.key}
                onClick={() => setActiveFilter(f.key)}
                className={`px-4 py-2 rounded-full text-sm font-semibold transition-all duration-200 ${
                  activeFilter === f.key
                    ? 'bg-primary text-white shadow-sm'
                    : 'bg-surface-container text-on-surface-variant hover:bg-surface-container-high'
                }`}
              >
                {f.label}
              </button>
            ))}
          </div>

          {/* Sort dropdown */}
          <div className="shrink-0">
            <select
              value={sort}
              onChange={e => setSort(e.target.value as SortKey)}
              className="bg-surface-container-lowest border border-outline-variant/20 rounded-xl py-3.5 px-4 text-sm font-semibold text-on-surface font-body focus:outline-none focus:border-primary/30 cursor-pointer"
            >
              <option value="recent">Most Recent</option>
              <option value="duration">Longest First</option>
              <option value="budget-high">Budget: High → Low</option>
              <option value="budget-low">Budget: Low → High</option>
            </select>
          </div>
        </div>

        {/* ── Results count ── */}
        <div className="flex items-center justify-between">
          <p className="text-sm text-outline font-medium">
            {filtered.length} {filtered.length === 1 ? 'trip' : 'trips'} found
          </p>
          {search || activeFilter !== 'all' ? (
            <button
              onClick={() => { setSearch(''); setActiveFilter('all') }}
              className="text-sm text-primary font-semibold hover:underline flex items-center gap-1"
            >
              <span className="material-symbols-outlined text-[16px]">close</span>
              Clear filters
            </button>
          ) : null}
        </div>

        {/* ── Itinerary Grid ── */}
        {filtered.length > 0 ? (
          <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-3 gap-6">
            {filtered.map(itinerary => (
              <ItineraryCard key={itinerary.id} itinerary={itinerary} />
            ))}

            {/* "Plan new trip" card */}
            <Link
              href="/chat"
              className="group block"
            >
              <div className="rounded-2xl border-2 border-dashed border-outline-variant/30 hover:border-primary/30 h-full min-h-[360px] flex flex-col items-center justify-center gap-4 p-8 transition-all duration-300 hover:bg-surface-container-low">
                <div className="w-14 h-14 rounded-2xl bg-surface-container flex items-center justify-center group-hover:bg-primary group-hover:text-white transition-all">
                  <span className="material-symbols-outlined text-[28px] text-outline group-hover:text-white">add</span>
                </div>
                <div className="text-center">
                  <p className="font-bold text-on-surface">Plan a New Trip</p>
                  <p className="text-sm text-on-surface-variant mt-1 max-w-[180px]">
                    Let Vayka build your next itinerary from scratch
                  </p>
                </div>
              </div>
            </Link>
          </div>
        ) : (
          /* Empty state */
          <div className="flex flex-col items-center justify-center py-24 gap-5 text-center">
            <div className="w-20 h-20 rounded-full bg-surface-container flex items-center justify-center">
              <span className="material-symbols-outlined text-outline text-[40px]">
                travel_explore
              </span>
            </div>
            <div>
              <p className="font-headline text-2xl font-bold text-primary">No trips found</p>
              <p className="text-on-surface-variant mt-2 max-w-sm text-sm">
                Try adjusting your search or filters, or start planning a new adventure with Vayka.
              </p>
            </div>
            <div className="flex gap-3">
              <button
                onClick={() => { setSearch(''); setActiveFilter('all') }}
                className="px-5 py-2.5 rounded-xl border border-outline-variant text-on-surface-variant font-semibold text-sm hover:bg-surface-container transition-colors"
              >
                Clear filters
              </button>
              <Link
                href="/chat"
                className="bg-primary text-white px-5 py-2.5 rounded-xl font-bold text-sm hover:bg-primary-container transition-colors"
              >
                Plan with Vayka
              </Link>
            </div>
          </div>
        )}
      </div>
    </main>
  )
}
