import { TimelineEvent, EventType, EventStatus } from '@/lib/mockData'

interface TypeConfig {
  icon: string
  iconColor: string
  iconBg: string
}

const typeConfig: Record<EventType, TypeConfig> = {
  flight: {
    icon: 'flight',
    iconColor: 'text-primary',
    iconBg: 'bg-primary/10',
  },
  hotel: {
    icon: 'hotel',
    iconColor: 'text-on-primary-container',
    iconBg: 'bg-primary-container/15',
  },
  meal: {
    icon: 'restaurant',
    iconColor: 'text-secondary',
    iconBg: 'bg-secondary-container/50',
  },
  activity: {
    icon: 'attractions',
    iconColor: 'text-on-tertiary-fixed-variant',
    iconBg: 'bg-tertiary-fixed/15',
  },
  transport: {
    icon: 'directions_car',
    iconColor: 'text-on-secondary-fixed-variant',
    iconBg: 'bg-secondary-container/30',
  },
}

interface StatusConfig {
  label: string
  classes: string
}

const statusConfig: Record<EventStatus, StatusConfig> = {
  confirmed: {
    label: 'Confirmed',
    classes: 'bg-tertiary-fixed/20 text-on-tertiary-fixed-variant',
  },
  pending: {
    label: 'Pending',
    classes: 'bg-secondary-container text-on-secondary-fixed-variant',
  },
  suggested: {
    label: 'AI Suggested',
    classes: 'bg-primary/10 text-on-primary-container',
  },
}

export default function TimelineEventCard({ event }: { event: TimelineEvent }) {
  const { icon, iconColor, iconBg } = typeConfig[event.type]
  const { label: statusLabel, classes: statusClasses } = statusConfig[event.status]

  return (
    <div className="flex gap-3 group">
      {/* Type icon */}
      <div className="flex flex-col items-center pt-1 shrink-0">
        <div className={`w-9 h-9 rounded-xl flex items-center justify-center ${iconBg}`}>
          <span
            className={`material-symbols-outlined text-[18px] ${iconColor}`}
            style={{ fontVariationSettings: "'FILL' 1" }}
          >
            {icon}
          </span>
        </div>
      </div>

      {/* Card */}
      <div className="flex-1 bg-surface-container-lowest rounded-xl p-5 border border-outline-variant/10 hover:border-primary/15 hover:shadow-md group-hover:-translate-y-0.5 transition-all duration-200">

        {/* Top row: time + status + cost */}
        <div className="flex items-center justify-between gap-2 flex-wrap mb-2">
          <div className="flex items-center gap-2 flex-wrap">
            <span className="text-xs font-black text-primary tracking-wide">
              {event.time}
              {event.endTime ? ` — ${event.endTime}` : ''}
            </span>
            <span className={`text-[10px] px-2 py-0.5 rounded-full font-bold uppercase tracking-wide ${statusClasses}`}>
              {statusLabel}
            </span>
          </div>
          {event.cost !== undefined && (
            <span className={`text-sm font-bold shrink-0 ${event.cost === 0 ? 'text-on-tertiary-fixed-variant' : 'text-primary'}`}>
              {event.cost === 0 ? 'Free' : `$${event.cost.toLocaleString()}`}
            </span>
          )}
        </div>

        {/* Title + description */}
        <h4 className="font-body font-bold text-on-surface text-[15px] mb-1 leading-snug">
          {event.title}
        </h4>
        <p className="text-sm text-on-surface-variant leading-relaxed">
          {event.description}
        </p>

        {/* Footer: location + booking ref */}
        {(event.location || event.bookingRef) && (
          <div className="flex items-center flex-wrap gap-4 mt-3 pt-3 border-t border-outline-variant/10">
            {event.location && (
              <span className="flex items-center gap-1.5 text-[11px] text-outline font-medium">
                <span className="material-symbols-outlined text-[13px]">location_on</span>
                {event.location}
              </span>
            )}
            {event.bookingRef && (
              <span className="flex items-center gap-1.5 text-[11px] text-outline font-medium">
                <span className="material-symbols-outlined text-[13px]">confirmation_number</span>
                {event.bookingRef}
              </span>
            )}
          </div>
        )}
      </div>
    </div>
  )
}
