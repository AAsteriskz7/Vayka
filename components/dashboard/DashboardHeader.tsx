import { User, Itinerary } from "@/lib/mockData";
import Link from "next/link";

interface Props {
  user: User;
  itineraries: Itinerary[];
}

export default function DashboardHeader({ user, itineraries }: Props) {
  const upcomingTrip = itineraries.find((i) => i.status === "upcoming");
  const firstName = user.name.split(" ")[0];

  return (
    <div className="relative overflow-hidden rounded-3xl bg-gradient-to-br from-primary to-primary/80 p-8 lg:p-12 mb-8 shadow-xl shadow-primary/20">
      {/* Decorative blobs */}
      <div className="absolute -top-20 -right-20 w-80 h-80 bg-white/5 rounded-full pointer-events-none" />
      <div className="absolute -bottom-10 left-1/3 w-48 h-48 bg-white/5 rounded-full pointer-events-none" />

      <div className="relative flex flex-col sm:flex-row items-start justify-between gap-6">
        {/* Greeting */}
        <div className="flex-1">
          <p className="text-white/60 text-xs font-black uppercase tracking-widest mb-3">
            Your Travel Dashboard
          </p>
          <h1 className="font-headline text-4xl lg:text-5xl font-bold text-white leading-tight">
            Welcome back,{" "}
            <span className="italic">{firstName}</span>
          </h1>
          <p className="text-white/70 mt-3 text-base lg:text-lg">
            {upcomingTrip
              ? `Your next trip to ${upcomingTrip.destination.split(",")[0]} is coming up — keep planning.`
              : "Ready to plan your next adventure?"}
          </p>

          {/* Tags row */}
          <div className="flex flex-wrap gap-2 mt-5">
            {user.homeAirport && (
              <span className="bg-white/15 text-white/90 px-3 py-1.5 rounded-full text-xs font-bold flex items-center gap-1.5">
                <span className="material-symbols-outlined text-[14px]">
                  flight_takeoff
                </span>
                {user.homeAirport}
              </span>
            )}
            {user.travelPreferences?.map((pref) => (
              <span
                key={pref}
                className="bg-white/10 text-white/70 px-3 py-1.5 rounded-full text-xs font-semibold"
              >
                {pref}
              </span>
            ))}
          </div>
        </div>

        {/* Avatar + next trip card */}
        <div className="shrink-0 flex flex-col items-end gap-4">
          {/* Avatar */}
          <div className="flex items-center gap-3">
            <div className="text-right">
              <p className="text-white font-bold text-sm">{user.name}</p>
              <p className="text-white/50 text-xs">{user.email}</p>
            </div>
            <div className="w-12 h-12 rounded-full bg-white/20 border-2 border-white/30 flex items-center justify-center shadow-lg">
              <span className="text-white font-headline font-bold text-base">
                {user.avatarInitials}
              </span>
            </div>
          </div>

          {/* Mini next-trip card */}
          {upcomingTrip && (
            <Link
              href={`/itineraries/${upcomingTrip.slug}`}
              className="bg-white/10 hover:bg-white/20 transition-colors backdrop-blur-sm rounded-2xl p-4 border border-white/15 text-left w-full sm:w-56"
            >
              <p className="text-white/50 text-[10px] font-black uppercase tracking-widest mb-1">
                Next Trip
              </p>
              <p className="text-white font-bold text-sm truncate">
                {upcomingTrip.destination.split(",")[0]}
              </p>
              <p className="text-white/60 text-xs mt-0.5">
                {upcomingTrip.dates.start}
              </p>
              <div className="mt-2 h-1 bg-white/20 rounded-full overflow-hidden">
                <div
                  className="h-full bg-white/60 rounded-full"
                  style={{ width: `${upcomingTrip.planningProgress}%` }}
                />
              </div>
              <p className="text-white/50 text-[10px] mt-1">
                {upcomingTrip.planningProgress}% planned
              </p>
            </Link>
          )}
        </div>
      </div>
    </div>
  );
}
