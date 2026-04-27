'use client'

import { useEffect, useState } from 'react'
import Link from 'next/link'
import { useAuth } from '@/context/AuthContext'
import { supabase } from '@/lib/supabase'

interface SupabaseItinerary {
  id: string
  destination: string
  duration: string
  notes: string
  days: { day: number; title: string; activities: string[] }[]
  created_at: string
}

export default function DashboardItineraryList() {
  const { user } = useAuth()
  const [itineraries, setItineraries] = useState<SupabaseItinerary[]>([])
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    if (!supabase || !user) { setLoading(false); return }
    supabase
      .from('itineraries')
      .select('*')
      .order('created_at', { ascending: false })
      .then(({ data }) => {
        setItineraries((data as SupabaseItinerary[]) ?? [])
        setLoading(false)
      })
  }, [user])

  return (
    <section className="mt-10">
      <div className="flex items-center justify-between mb-6">
        <div>
          <h2 className="font-headline text-3xl font-bold text-primary">My Itineraries</h2>
          <p className="text-on-surface-variant text-sm mt-0.5">
            {loading ? 'Loading…' : `${itineraries.length} trip${itineraries.length !== 1 ? 's' : ''} saved`}
          </p>
        </div>
        <Link
          href="/itineraries"
          className="flex items-center gap-2 bg-surface-container hover:bg-primary hover:text-white text-primary px-5 py-2.5 rounded-full font-bold text-sm transition-all"
        >
          <span className="material-symbols-outlined text-[18px]">add</span>
          Plan New Trip
        </Link>
      </div>

      {loading ? (
        <div className="flex items-center justify-center py-20 gap-3 text-secondary">
          <span className="material-symbols-outlined animate-spin">progress_activity</span>
          Loading itineraries…
        </div>
      ) : itineraries.length === 0 ? (
        <div className="text-center py-20 bg-surface-container-low rounded-2xl">
          <span className="material-symbols-outlined text-6xl text-outline/25 mb-4 block">map</span>
          <p className="text-xl text-secondary mb-2">No itineraries yet</p>
          <p className="text-sm text-on-surface-variant mb-6">
            Create your first trip plan manually or let the AI build one.
          </p>
          <Link
            href="/itineraries"
            className="px-8 py-3.5 bg-primary text-white rounded-full font-bold text-sm inline-flex items-center gap-2 hover:shadow-lg transition-all"
          >
            <span className="material-symbols-outlined text-base">add</span>
            Create Your First Itinerary
          </Link>
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-6">
          {itineraries.map(it => (
            <Link key={it.id} href="/itineraries" className="group block h-full">
              <article className="bg-surface-container-lowest rounded-2xl overflow-hidden shadow-sm border border-outline-variant/10 hover:shadow-xl hover:border-primary/10 hover:-translate-y-1 transition-all duration-300 h-full flex flex-col">
                <div className="bg-primary p-6 relative overflow-hidden">
                  <div className="absolute -right-6 -top-6 w-24 h-24 bg-white/10 rounded-full" />
                  <div className="absolute -left-4 -bottom-8 w-32 h-32 bg-white/5 rounded-full" />
                  <h3 className="font-headline text-2xl text-white font-bold italic relative z-10">
                    {it.destination}
                  </h3>
                  <p className="text-white/70 text-sm mt-1 relative z-10">
                    {it.days.length} day{it.days.length !== 1 ? 's' : ''} · {it.duration}-day plan
                  </p>
                </div>

                <div className="p-5 flex flex-col gap-3 flex-1">
                  {it.notes && (
                    <p className="text-sm text-on-surface-variant italic line-clamp-2">{it.notes}</p>
                  )}

                  <div className="space-y-1.5">
                    {it.days.slice(0, 3).map(d => (
                      <div key={d.day} className="flex items-center gap-2">
                        <span className="w-5 h-5 rounded-full bg-primary/10 flex items-center justify-center shrink-0">
                          <span className="text-primary text-[8px] font-bold">{d.day}</span>
                        </span>
                        <span className="text-sm text-on-surface-variant truncate">{d.title || `Day ${d.day}`}</span>
                      </div>
                    ))}
                    {it.days.length > 3 && (
                      <p className="text-xs text-secondary pl-7">+{it.days.length - 3} more days</p>
                    )}
                  </div>

                  <div className="mt-auto pt-3 border-t border-outline-variant/10 flex items-center justify-between">
                    <span className="text-[11px] text-outline">
                      {it.created_at ? new Date(it.created_at).toLocaleDateString() : ''}
                    </span>
                    <span className="text-primary text-sm font-bold flex items-center gap-1 group-hover:gap-2 transition-all duration-200">
                      View trip
                      <span className="material-symbols-outlined text-[16px]">arrow_forward</span>
                    </span>
                  </div>
                </div>
              </article>
            </Link>
          ))}
        </div>
      )}
    </section>
  )
}
