import { Itinerary } from "@/lib/mockData";

interface StatTile {
  icon: string;
  label: string;
  value: number;
  sub: string;
  iconBg: string;
  iconColor: string;
}

export default function UserStatsCards({
  itineraries,
}: {
  itineraries: Itinerary[];
}) {
  const total = itineraries.length;
  const upcoming = itineraries.filter((i) => i.status === "upcoming").length;
  const inPlanning =
    itineraries.filter((i) => i.status === "planning").length +
    itineraries.filter((i) => i.status === "draft").length;
  const completed = itineraries.filter((i) => i.status === "completed").length;
  const avgProgress = total
    ? Math.round(
        itineraries.reduce((s, i) => s + i.planningProgress, 0) / total
      )
    : 0;

  const stats: StatTile[] = [
    {
      icon: "map",
      label: "Total Trips",
      value: total,
      sub: "All time",
      iconBg: "bg-primary",
      iconColor: "text-white",
    },
    {
      icon: "flight_takeoff",
      label: "Upcoming",
      value: upcoming,
      sub: "Confirmed trips",
      iconBg: "bg-tertiary-fixed/25",
      iconColor: "text-on-tertiary-fixed-variant",
    },
    {
      icon: "edit_note",
      label: "In Planning",
      value: inPlanning,
      sub: "Active & drafts",
      iconBg: "bg-secondary-container",
      iconColor: "text-on-secondary-fixed-variant",
    },
    {
      icon: "check_circle",
      label: "Completed",
      value: completed,
      sub: `Avg ${avgProgress}% planned`,
      iconBg: "bg-surface-container-high",
      iconColor: "text-on-surface-variant",
    },
  ];

  return (
    <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 mb-8">
      {stats.map((stat) => (
        <div
          key={stat.label}
          className="bg-surface-container-lowest rounded-2xl p-6 shadow-sm border border-outline-variant/10 hover:shadow-md transition-shadow flex flex-col gap-4"
        >
          <div
            className={`w-11 h-11 rounded-xl flex items-center justify-center ${stat.iconBg}`}
          >
            <span
              className={`material-symbols-outlined text-[22px] ${stat.iconColor}`}
              style={{ fontVariationSettings: "'FILL' 1" }}
            >
              {stat.icon}
            </span>
          </div>
          <div>
            <p className="text-3xl font-headline font-bold text-primary leading-none">
              {stat.value}
            </p>
            <p className="text-sm font-semibold text-on-surface mt-1">
              {stat.label}
            </p>
            <p className="text-xs text-outline mt-0.5">{stat.sub}</p>
          </div>
        </div>
      ))}
    </div>
  );
}
