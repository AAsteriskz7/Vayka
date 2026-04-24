import Link from "next/link";
import { Itinerary } from "@/lib/mockData";
import StatusBadge from "./StatusBadge";

export default function UpcomingTripCard({
  itinerary,
}: {
  itinerary: Itinerary;
}) {
  const totalEvents = itinerary.days.reduce(
    (acc, d) => acc + d.events.length,
    0
  );
  const confirmedEvents = itinerary.days
    .flatMap((d) => d.events)
    .filter((e) => e.status === "confirmed").length;
  const pendingEvents = totalEvents - confirmedEvents;

  return (
    <div className="bg-surface-container-lowest rounded-2xl overflow-hidden shadow-sm border border-outline-variant/10 hover:shadow-lg transition-shadow h-full flex flex-col">
      {/* Cover image */}
      <div className="relative h-56 overflow-hidden shrink-0">
        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img
          src={itinerary.coverImage}
          alt={itinerary.destination}
          className="w-full h-full object-cover"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-black/75 via-black/20 to-transparent" />

        <div className="absolute top-4 left-4">
          <StatusBadge status={itinerary.status} />
        </div>

        <div className="absolute top-4 right-4 bg-white/90 backdrop-blur-sm rounded-xl px-3 py-1.5 text-center">
          <p className="text-[9px] font-black text-primary uppercase tracking-widest">
            Featured Trip
          </p>
          <p className="text-xs font-bold text-primary">
            {itinerary.aiMatchScore}% match
          </p>
        </div>

        <div className="absolute bottom-5 left-6 right-6">
          <h2 className="font-headline text-2xl md:text-3xl font-bold text-white drop-shadow leading-tight">
            {itinerary.title}
          </h2>
          <p className="text-white/80 text-sm flex items-center gap-1 mt-1">
            <span className="material-symbols-outlined text-[14px]">
              location_on
            </span>
            {itinerary.destination} &middot; {itinerary.dates.start} —{" "}
            {itinerary.dates.end}
          </p>
        </div>
      </div>

      {/* Body */}
      <div className="p-6 space-y-5 flex-1 flex flex-col">
        {/* Planning progress */}
        <div>
          <div className="flex justify-between text-xs mb-2">
            <span className="font-semibold text-on-surface-variant">
              Planning Progress
            </span>
            <span className="font-bold text-primary">
              {itinerary.planningProgress}%
            </span>
          </div>
          <div className="h-2 bg-surface-container rounded-full overflow-hidden">
            <div
              className="h-full bg-gradient-to-r from-primary to-primary-container rounded-full transition-all duration-500"
              style={{ width: `${itinerary.planningProgress}%` }}
            />
          </div>
          {pendingEvents > 0 && (
            <p className="text-[11px] text-outline mt-1.5">
              {pendingEvents} event{pendingEvents !== 1 ? "s" : ""} still
              pending confirmation
            </p>
          )}
        </div>

        {/* Stats grid */}
        <div className="grid grid-cols-3 gap-3">
          {[
            {
              icon: "schedule",
              label: "Duration",
              value: `${itinerary.duration}d`,
            },
            {
              icon: "group",
              label: "Travelers",
              value: `${itinerary.travelers}`,
            },
            {
              icon: "payments",
              label: "Budget",
              value: `$${(itinerary.budget.total / 1000).toFixed(1)}k`,
            },
          ].map((s) => (
            <div
              key={s.label}
              className="text-center bg-surface-container rounded-xl p-3"
            >
              <span className="material-symbols-outlined text-primary text-[18px]">
                {s.icon}
              </span>
              <p className="font-bold text-on-surface text-sm mt-0.5">
                {s.value}
              </p>
              <p className="text-[10px] text-outline uppercase tracking-wide">
                {s.label}
              </p>
            </div>
          ))}
        </div>

        {/* Tags */}
        <div className="flex flex-wrap gap-1.5">
          {itinerary.tags.slice(0, 4).map((tag) => (
            <span
              key={tag}
              className="bg-surface-container text-on-surface-variant text-[11px] px-3 py-1 rounded-full font-semibold"
            >
              {tag}
            </span>
          ))}
        </div>

        {/* CTA buttons */}
        <div className="flex gap-3 mt-auto pt-2">
          <Link
            href={`/itineraries/${itinerary.slug}`}
            className="flex-1 bg-primary text-white py-3 rounded-xl font-bold text-sm text-center flex items-center justify-center gap-2 hover:shadow-lg hover:shadow-primary/20 transition-all"
          >
            <span className="material-symbols-outlined text-[18px]">map</span>
            View Timeline
          </Link>
          <Link
            href={`/chat?itinerary=${itinerary.slug}`}
            className="flex-1 bg-surface-container text-on-surface-variant py-3 rounded-xl font-bold text-sm text-center flex items-center justify-center gap-2 hover:bg-primary-container hover:text-primary transition-all"
          >
            <span
              className="material-symbols-outlined text-[18px]"
              style={{ fontVariationSettings: "'FILL' 1" }}
            >
              auto_awesome
            </span>
            Ask Vayka
          </Link>
        </div>
      </div>
    </div>
  );
}
