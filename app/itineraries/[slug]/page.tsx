'use client'

import { useParams } from 'next/navigation'
import Link from 'next/link'
import { itineraries } from '@/lib/mockData'
import StatusBadge from '@/components/dashboard/StatusBadge'
import TimelineEventCard from '@/components/dashboard/TimelineEventCard'
import ChatbotCTA from '@/components/dashboard/ChatbotCTA'

export default function ItineraryDetail() {
  const params = useParams()
  const slug = params?.slug as string
  const itinerary = itineraries.find(i => i.slug === slug)

  if (!itinerary) {
    return (
      <main className="pt-28 pb-20 min-h-screen flex items-center justify-center">
        <div className="text-center space-y-4">
          <span className="material-symbols-outlined text-[64px] text-outline">travel_explore</span>
          <p className="font-headline text-2xl text-primary font-bold">Itinerary not found</p>
          <Link href="/itineraries" className="text-primary font-semibold hover:underline">
            Back to My Itineraries
          </Link>
        </div>
      </main>
    )
  }

  const { budget } = itinerary
  const totalEvents = itinerary.days.reduce((acc, d) => acc + d.events.length, 0)
  const confirmedEvents = itinerary.days
    .flatMap(d => d.events)
    .filter(e => e.status === 'confirmed').length
  const totalCost = itinerary.days
    .flatMap(d => d.events)
    .reduce((acc, e) => acc + (e.cost ?? 0), 0)

  const lodgingPct = Math.round((budget.breakdown.lodging / budget.total) * 100)
  const foodPct = Math.round((budget.breakdown.food / budget.total) * 100)
  const transportPct = Math.round((budget.breakdown.transport / budget.total) * 100)
  const activitiesPct = Math.round((budget.breakdown.activities / budget.total) * 100)

  return (
    <main className="pt-24 pb-20 min-h-screen">
      <div className="max-w-[1600px] mx-auto px-6 lg:px-12">

        {/* ── Back nav ── */}
        <Link
          href="/itineraries"
          className="inline-flex items-center gap-2 text-secondary text-sm font-semibold hover:text-primary transition-colors mb-8"
        >
          <span className="material-symbols-outlined text-[18px]">arrow_back</span>
          My Itineraries
        </Link>

        {/* ── Hero Banner ── */}
        <div className="relative h-64 md:h-80 rounded-2xl overflow-hidden mb-10 shadow-xl">
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img
            src={itinerary.coverImage}
            alt={itinerary.destination}
            className="w-full h-full object-cover"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/20 to-transparent" />
          <div className="absolute bottom-6 left-8 right-8 flex items-end justify-between gap-4">
            <div>
              <div className="mb-2">
                <StatusBadge status={itinerary.status} />
              </div>
              <h1 className="font-headline text-3xl md:text-5xl font-black text-white leading-tight drop-shadow-lg">
                {itinerary.title}
              </h1>
              <p className="text-white/80 mt-1 flex items-center gap-1.5 text-sm">
                <span className="material-symbols-outlined text-[16px]">location_on</span>
                {itinerary.destination}
              </p>
            </div>
            <div className="hidden md:flex items-center gap-2 p-1.5 bg-white/15 backdrop-blur-sm rounded-full shrink-0">
              <button className="px-5 py-2 bg-white rounded-full text-sm font-bold text-primary shadow-sm">
                Timeline
              </button>
              <button className="px-5 py-2 text-sm font-medium text-white/80 hover:text-white transition-colors">
                Map View
              </button>
            </div>
          </div>
        </div>

        {/* ── Main Layout ── */}
        <div className="flex flex-col lg:flex-row gap-8 items-start">

          {/* ═══ LEFT SIDEBAR ═══ */}
          <aside className="w-full lg:w-[340px] xl:w-[380px] shrink-0 space-y-6 lg:sticky lg:top-24">

            {/* Trip Summary Card */}
            <div className="bg-surface-container-lowest rounded-2xl p-7 shadow-sm border border-outline-variant/10 relative overflow-hidden">
              <div className="absolute top-0 right-0 w-32 h-32 bg-secondary-container/20 rounded-full -mr-16 -mt-16 blur-3xl pointer-events-none" />

              <h2 className="font-headline text-xl font-bold text-primary mb-6">Trip Summary</h2>

              <div className="space-y-4">
                {[
                  { icon: 'location_on', label: 'Destination', value: itinerary.destination },
                  {
                    icon: 'calendar_today',
                    label: 'Dates',
                    value: `${itinerary.dates.start} — ${itinerary.dates.end}`,
                  },
                  {
                    icon: 'schedule',
                    label: 'Duration',
                    value: `${itinerary.duration} days`,
                  },
                  {
                    icon: 'group',
                    label: 'Travelers',
                    value: `${itinerary.travelers} ${itinerary.travelers === 1 ? 'person' : 'people'}`,
                  },
                  { icon: 'category', label: 'Travel Style', value: itinerary.travelType },
                ].map(row => (
                  <div key={row.label} className="flex items-center gap-3">
                    <div className="w-9 h-9 bg-surface-container rounded-full flex items-center justify-center shrink-0">
                      <span className="material-symbols-outlined text-primary text-[18px]">
                        {row.icon}
                      </span>
                    </div>
                    <div className="min-w-0">
                      <p className="text-[10px] font-black uppercase tracking-widest text-secondary">
                        {row.label}
                      </p>
                      <p className="text-on-surface font-semibold text-sm truncate">{row.value}</p>
                    </div>
                  </div>
                ))}
              </div>

              {/* Trip stats row */}
              <div className="mt-6 grid grid-cols-3 gap-3 pt-6 border-t border-outline-variant/10">
                <div className="text-center">
                  <p className="font-headline text-2xl font-bold text-primary">{totalEvents}</p>
                  <p className="text-[10px] text-outline font-semibold uppercase tracking-wide">Events</p>
                </div>
                <div className="text-center">
                  <p className="font-headline text-2xl font-bold text-primary">{confirmedEvents}</p>
                  <p className="text-[10px] text-outline font-semibold uppercase tracking-wide">Confirmed</p>
                </div>
                <div className="text-center">
                  <p className="font-headline text-2xl font-bold text-primary">{itinerary.days.length}</p>
                  <p className="text-[10px] text-outline font-semibold uppercase tracking-wide">Days</p>
                </div>
              </div>
            </div>

            {/* Budget Breakdown */}
            <div className="bg-surface-container-lowest rounded-2xl p-7 shadow-sm border border-outline-variant/10">
              <div className="flex items-center justify-between mb-5">
                <h3 className="font-bold text-primary text-lg">Budget</h3>
                <span className="font-headline text-2xl font-bold text-primary">
                  ${budget.total.toLocaleString()}
                </span>
              </div>

              {/* Stacked bar */}
              <div className="h-2 rounded-full flex overflow-hidden mb-4 gap-px">
                <div className="bg-primary h-full" style={{ width: `${lodgingPct}%` }} />
                <div className="bg-on-primary-container h-full" style={{ width: `${foodPct}%` }} />
                <div className="bg-secondary-fixed-dim h-full" style={{ width: `${transportPct}%` }} />
                <div className="bg-tertiary-fixed-dim h-full" style={{ width: `${activitiesPct}%` }} />
              </div>

              <div className="space-y-3">
                {[
                  { label: 'Lodging', value: budget.breakdown.lodging, color: 'bg-primary' },
                  { label: 'Food & Dining', value: budget.breakdown.food, color: 'bg-on-primary-container' },
                  { label: 'Transport', value: budget.breakdown.transport, color: 'bg-secondary-fixed-dim' },
                  { label: 'Activities', value: budget.breakdown.activities, color: 'bg-tertiary-fixed-dim' },
                ].map(row => (
                  <div key={row.label} className="flex items-center justify-between text-sm">
                    <span className="flex items-center gap-2 text-on-surface-variant">
                      <span className={`w-2 h-2 rounded-full ${row.color}`} />
                      {row.label}
                    </span>
                    <span className="font-bold text-on-surface">
                      ${row.value.toLocaleString()}
                    </span>
                  </div>
                ))}
                <div className="pt-3 border-t border-outline-variant/10 flex items-center justify-between text-sm">
                  <span className="text-on-surface-variant font-medium">Logged so far</span>
                  <span className="font-bold text-primary">${totalCost.toLocaleString()}</span>
                </div>
              </div>
            </div>

            {/* Tags */}
            <div className="bg-surface-container-lowest rounded-2xl p-7 shadow-sm border border-outline-variant/10">
              <h3 className="font-bold text-primary text-lg mb-4">Trip Tags</h3>
              <div className="flex flex-wrap gap-2">
                {itinerary.tags.map(tag => (
                  <span
                    key={tag}
                    className="bg-surface-container text-on-surface-variant text-xs px-4 py-2 rounded-full font-semibold"
                  >
                    {tag}
                  </span>
                ))}
              </div>
            </div>

            {/* Action buttons */}
            <div className="space-y-3">
              <button className="w-full bg-gradient-to-br from-primary to-primary-container text-white py-4 rounded-xl font-bold flex items-center justify-center gap-2 shadow-lg shadow-primary/20 hover:shadow-primary/30 hover:scale-[1.02] transition-all">
                <span className="material-symbols-outlined text-[20px]">save</span>
                Save Trip
              </button>
              <div className="grid grid-cols-2 gap-3">
                <button className="bg-secondary-container text-on-secondary-fixed-variant py-3 rounded-xl font-semibold text-sm flex items-center justify-center gap-2 hover:bg-secondary-fixed transition-colors">
                  <span className="material-symbols-outlined text-[18px]">download</span>
                  PDF
                </button>
                <button className="bg-secondary-container text-on-secondary-fixed-variant py-3 rounded-xl font-semibold text-sm flex items-center justify-center gap-2 hover:bg-secondary-fixed transition-colors">
                  <span className="material-symbols-outlined text-[18px]">share</span>
                  Share
                </button>
              </div>
            </div>

            {/* Chatbot CTA */}
            <ChatbotCTA
              itineraryTitle={itinerary.title}
              itinerarySlug={itinerary.slug}
              variant="sidebar"
            />
          </aside>

          {/* ═══ RIGHT: TIMELINE ═══ */}
          <div className="flex-1 min-w-0 space-y-6">

            {/* Chatbot banner (mobile/top) */}
            <div className="lg:hidden">
              <ChatbotCTA
                itineraryTitle={itinerary.title}
                itinerarySlug={itinerary.slug}
                variant="banner"
              />
            </div>

            {/* Timeline header */}
            <div className="flex items-center justify-between">
              <h2 className="font-headline text-3xl font-black text-primary">Day-by-Day Timeline</h2>
              <span className="text-sm text-outline font-medium hidden sm:block">
                {itinerary.days.length} days · {totalEvents} events
              </span>
            </div>

            {/* Days */}
            <div className="space-y-10">
              {itinerary.days.map((day, dayIdx) => (
                <section key={day.dayNumber}>

                  {/* Day header */}
                  <div className="flex items-center gap-4 mb-6">
                    <div className="w-12 h-12 rounded-2xl bg-primary flex items-center justify-center shrink-0 shadow-md shadow-primary/20">
                      <span className="text-white text-xs font-black">
                        {String(day.dayNumber).padStart(2, '0')}
                      </span>
                    </div>
                    <div>
                      <p className="text-[11px] font-black text-secondary uppercase tracking-widest">
                        Day {day.dayNumber} · {day.date}
                      </p>
                      <h3 className="font-headline text-2xl font-bold text-primary leading-tight">
                        {day.dayLabel}
                      </h3>
                    </div>
                    <div className="ml-auto hidden sm:flex items-center gap-2 text-xs text-outline font-medium">
                      <span className="material-symbols-outlined text-[16px]">event</span>
                      {day.events.length} events
                    </div>
                  </div>

                  {/* Events with connecting line */}
                  <div className="relative pl-4">
                    {/* Vertical timeline line */}
                    {day.events.length > 1 && (
                      <div className="absolute left-[26px] top-5 bottom-5 w-px bg-outline-variant/20" />
                    )}

                    <div className="space-y-4">
                      {day.events.map(event => (
                        <TimelineEventCard key={event.id} event={event} />
                      ))}
                    </div>
                  </div>

                  {/* AI suggestion strip (shown on every other day) */}
                  {dayIdx % 2 === 0 && (
                    <div className="mt-4 ml-4 p-5 bg-tertiary-fixed/10 rounded-xl border-2 border-dashed border-tertiary-fixed/25 flex gap-4 items-center">
                      <div className="w-10 h-10 rounded-full bg-tertiary-container text-white flex items-center justify-center shrink-0">
                        <span
                          className="material-symbols-outlined text-[18px]"
                          style={{ fontVariationSettings: "'FILL' 1" }}
                        >
                          auto_awesome
                        </span>
                      </div>
                      <div className="flex-1 min-w-0">
                        <p className="text-xs font-black text-on-tertiary-fixed-variant uppercase tracking-widest">
                          Vayka Suggestion
                        </p>
                        <p className="text-sm text-on-surface-variant mt-0.5">
                          {dayIdx === 0
                            ? 'I noticed a gap tomorrow morning — want me to add a local breakfast spot or temple visit?'
                            : 'Based on your pace, consider adding a free afternoon in here for rest or spontaneous exploration.'}
                        </p>
                      </div>
                      <Link
                        href={`/chat?itinerary=${itinerary.slug}&day=${day.dayNumber}`}
                        className="px-4 py-2 bg-tertiary-container text-white text-xs font-bold rounded-full shrink-0 hover:opacity-90 transition-opacity"
                      >
                        Ask Vayka
                      </Link>
                    </div>
                  )}

                  {/* Day separator */}
                  {dayIdx < itinerary.days.length - 1 && (
                    <div className="mt-8 h-px bg-outline-variant/15" />
                  )}
                </section>
              ))}

              {/* Add Day placeholder */}
              <button className="w-full py-8 rounded-2xl border-2 border-dashed border-outline-variant/25 flex flex-col items-center justify-center gap-3 group hover:border-primary/30 hover:bg-surface-container-low/50 transition-all duration-200">
                <div className="w-12 h-12 rounded-2xl bg-surface-container flex items-center justify-center group-hover:bg-primary group-hover:text-white transition-all">
                  <span className="material-symbols-outlined text-[24px] text-outline group-hover:text-white">
                    add
                  </span>
                </div>
                <div className="text-center">
                  <p className="font-bold text-on-surface text-sm">Add a Day</p>
                  <p className="text-xs text-on-surface-variant mt-0.5">
                    Or ask Vayka to extend the trip
                  </p>
                </div>
              </button>
            </div>

            {/* Bottom CTA banner (desktop) */}
            <div className="hidden lg:block mt-8">
              <ChatbotCTA
                itineraryTitle={itinerary.title}
                itinerarySlug={itinerary.slug}
                variant="banner"
              />
            </div>
          </div>
        </div>
      </div>
    </main>
  )
}
