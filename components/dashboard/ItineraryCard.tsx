import Link from 'next/link'
import { Itinerary } from '@/lib/mockData'
import StatusBadge from './StatusBadge'

export default function ItineraryCard({ itinerary }: { itinerary: Itinerary }) {
  const { budget } = itinerary
  const lodgingPct = Math.round((budget.breakdown.lodging / budget.total) * 100)
  const foodPct = Math.round((budget.breakdown.food / budget.total) * 100)
  const transportPct = Math.round((budget.breakdown.transport / budget.total) * 100)

  return (
    <Link href={`/itineraries/${itinerary.slug}`} className="group block h-full">
      <article className="bg-surface-container-lowest rounded-2xl overflow-hidden shadow-sm border border-outline-variant/10 hover:shadow-xl hover:border-primary/10 hover:-translate-y-1 transition-all duration-300 h-full flex flex-col">

        {/* Cover image */}
        <div className="relative h-52 overflow-hidden shrink-0">
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img
            src={itinerary.coverImage}
            alt={itinerary.destination}
            className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-black/10 to-transparent" />

          <div className="absolute top-4 left-4">
            <StatusBadge status={itinerary.status} />
          </div>

          <div className="absolute top-4 right-4 bg-white/90 backdrop-blur-sm px-2.5 py-1 rounded-full text-[11px] font-black text-primary">
            {itinerary.aiMatchScore}% match
          </div>

          <div className="absolute bottom-4 left-4 right-4">
            <h3 className="font-headline text-xl font-bold text-white leading-tight drop-shadow">
              {itinerary.title}
            </h3>
            <p className="text-white/80 text-sm mt-0.5 flex items-center gap-1">
              <span className="material-symbols-outlined text-[14px]">location_on</span>
              {itinerary.destination}
            </p>
          </div>
        </div>

        {/* Body */}
        <div className="p-6 flex flex-col gap-4 flex-1">

          {/* Trip meta */}
          <div className="flex items-center gap-4 text-xs text-on-surface-variant flex-wrap">
            <span className="flex items-center gap-1">
              <span className="material-symbols-outlined text-[15px]">calendar_today</span>
              {itinerary.dates.start}
            </span>
            <span className="flex items-center gap-1">
              <span className="material-symbols-outlined text-[15px]">schedule</span>
              {itinerary.duration} days
            </span>
            <span className="flex items-center gap-1">
              <span className="material-symbols-outlined text-[15px]">group</span>
              {itinerary.travelers} {itinerary.travelers === 1 ? 'traveler' : 'travelers'}
            </span>
          </div>

          {/* Budget breakdown bar */}
          <div>
            <div className="flex justify-between text-xs mb-1.5">
              <span className="text-on-surface-variant font-medium">Est. Budget</span>
              <span className="font-bold text-primary">
                ${budget.total.toLocaleString()} {budget.currency}
              </span>
            </div>
            <div className="h-1.5 rounded-full bg-surface-container flex overflow-hidden gap-px">
              <div
                className="bg-primary h-full rounded-l-full transition-all"
                style={{ width: `${lodgingPct}%` }}
              />
              <div
                className="bg-on-primary-container h-full transition-all"
                style={{ width: `${foodPct}%` }}
              />
              <div
                className="bg-secondary-fixed-dim h-full rounded-r-full transition-all"
                style={{ width: `${transportPct}%` }}
              />
            </div>
            <div className="flex gap-3 mt-1.5 text-[10px] text-outline">
              <span className="flex items-center gap-1">
                <span className="w-1.5 h-1.5 rounded-full bg-primary inline-block" />Lodging
              </span>
              <span className="flex items-center gap-1">
                <span className="w-1.5 h-1.5 rounded-full bg-on-primary-container inline-block" />Food
              </span>
              <span className="flex items-center gap-1">
                <span className="w-1.5 h-1.5 rounded-full bg-secondary-fixed-dim inline-block" />Transport
              </span>
            </div>
          </div>

          {/* Tags */}
          <div className="flex flex-wrap gap-1.5">
            {itinerary.tags.slice(0, 3).map(tag => (
              <span
                key={tag}
                className="bg-surface-container text-on-surface-variant text-[11px] px-3 py-1 rounded-full font-semibold"
              >
                {tag}
              </span>
            ))}
            {itinerary.tags.length > 3 && (
              <span className="text-[11px] px-2 py-1 text-outline font-semibold">
                +{itinerary.tags.length - 3}
              </span>
            )}
          </div>

          {/* Footer */}
          <div className="mt-auto pt-4 border-t border-outline-variant/10 flex items-center justify-between">
            <span className="text-[11px] text-outline">Edited {itinerary.lastEdited}</span>
            <span className="text-primary text-sm font-bold flex items-center gap-1 group-hover:gap-2 transition-all duration-200">
              View trip
              <span className="material-symbols-outlined text-[16px]">arrow_forward</span>
            </span>
          </div>
        </div>
      </article>
    </Link>
  )
}
