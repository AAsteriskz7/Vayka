import Link from "next/link";
import { Itinerary } from "@/lib/mockData";

interface ActionCard {
  icon: string;
  title: string;
  description: string;
  href: string;
  accentBg: string;
  accentText: string;
}

interface Props {
  upcomingTrip?: Itinerary;
  draftTrip?: Itinerary;
  planningTrip?: Itinerary;
}

export default function PersonalizedRecommendations({
  upcomingTrip,
  draftTrip,
  planningTrip,
}: Props) {
  const activeTrip = draftTrip ?? planningTrip;

  const actions: ActionCard[] = [
    ...(activeTrip
      ? [
          {
            icon: "edit_note",
            title: `Continue planning ${activeTrip.destination.split(",")[0]}`,
            description: `${activeTrip.planningProgress}% complete — pick up where you left off`,
            href: `/itineraries/${activeTrip.slug}`,
            accentBg: "bg-primary/10",
            accentText: "text-primary",
          },
        ]
      : []),
    ...(upcomingTrip
      ? [
          {
            icon: "auto_awesome",
            title: `Refine your ${upcomingTrip.destination.split(",")[0]} trip`,
            description: "Optimize timing, add restaurants, or swap hotels",
            href: `/chat?itinerary=${upcomingTrip.slug}`,
            accentBg: "bg-secondary-container",
            accentText: "text-on-secondary-fixed-variant",
          },
        ]
      : []),
    {
      icon: "luggage",
      title: "Generate a packing list",
      description: "AI-curated essentials based on your destination & style",
      href: "/chat",
      accentBg: "bg-tertiary-fixed/25",
      accentText: "text-on-tertiary-fixed-variant",
    },
    {
      icon: "hotel",
      title: "Add hotel details",
      description: "Fill in accommodation for your upcoming trips",
      href: upcomingTrip
        ? `/itineraries/${upcomingTrip.slug}`
        : "/itineraries",
      accentBg: "bg-surface-container-high",
      accentText: "text-on-surface-variant",
    },
    {
      icon: "confirmation_number",
      title: "Review missing bookings",
      description: "Some events are still pending confirmation",
      href: upcomingTrip
        ? `/itineraries/${upcomingTrip.slug}`
        : "/itineraries",
      accentBg: "bg-surface-container-high",
      accentText: "text-on-surface-variant",
    },
    {
      icon: "share",
      title: "Share your itinerary",
      description: "Send your trip plan to travel companions",
      href: upcomingTrip
        ? `/itineraries/${upcomingTrip.slug}`
        : "/itineraries",
      accentBg: "bg-surface-container-high",
      accentText: "text-on-surface-variant",
    },
  ];

  return (
    <div className="bg-surface-container-lowest rounded-2xl border border-outline-variant/10 shadow-sm overflow-hidden h-full flex flex-col">
      <div className="p-6 pb-4 border-b border-outline-variant/10">
        <h2 className="font-headline text-xl font-bold text-primary">
          Recommended Actions
        </h2>
        <p className="text-xs text-on-surface-variant mt-0.5">
          Personalized next steps for your trips
        </p>
      </div>

      <div className="divide-y divide-outline-variant/10 flex-1 overflow-y-auto">
        {actions.slice(0, 6).map((action, idx) => (
          <Link
            key={idx}
            href={action.href}
            className="flex items-center gap-4 px-5 py-4 hover:bg-surface-container/60 transition-colors group"
          >
            <div
              className={`w-10 h-10 rounded-xl flex items-center justify-center shrink-0 ${action.accentBg}`}
            >
              <span
                className={`material-symbols-outlined text-[20px] ${action.accentText}`}
                style={{ fontVariationSettings: "'FILL' 1" }}
              >
                {action.icon}
              </span>
            </div>
            <div className="flex-1 min-w-0">
              <p className="font-semibold text-on-surface text-sm leading-tight">
                {action.title}
              </p>
              <p className="text-xs text-on-surface-variant mt-0.5 line-clamp-1">
                {action.description}
              </p>
            </div>
            <span className="material-symbols-outlined text-outline text-[18px] group-hover:text-primary group-hover:translate-x-0.5 transition-all shrink-0">
              arrow_forward
            </span>
          </Link>
        ))}
      </div>
    </div>
  );
}
