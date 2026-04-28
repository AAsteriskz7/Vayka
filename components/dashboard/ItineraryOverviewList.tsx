import Link from "next/link";
import { Itinerary } from "@/lib/mockData";
import ItineraryCard from "./ItineraryCard";

export default function ItineraryOverviewList({
  itineraries,
}: {
  itineraries: Itinerary[];
}) {
  const sorted = [...itineraries].sort((a, b) => {
    const order = { upcoming: 0, planning: 1, draft: 2, completed: 3 };
    return order[a.status] - order[b.status];
  });

  return (
    <section className="mt-10">
      <div className="flex items-center justify-between mb-6">
        <div>
          <h2 className="font-headline text-3xl font-bold text-primary">
            My Itineraries
          </h2>
          <p className="text-on-surface-variant text-sm mt-0.5">
            {itineraries.length} trip{itineraries.length !== 1 ? "s" : ""}{" "}
            saved · sorted by status
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

      {sorted.length === 0 ? (
        <div className="text-center py-20 bg-surface-container-low rounded-2xl">
          <span className="material-symbols-outlined text-6xl text-outline/25 mb-4 block">
            map
          </span>
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
        <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-4 gap-6">
          {sorted.map((itinerary) => (
            <ItineraryCard key={itinerary.id} itinerary={itinerary} />
          ))}
        </div>
      )}
    </section>
  );
}
