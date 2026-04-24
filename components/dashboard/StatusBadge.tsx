import { TripStatus } from '@/lib/mockData'

interface Config {
  label: string
  classes: string
  icon: string
}

const config: Record<TripStatus, Config> = {
  upcoming: {
    label: 'Upcoming',
    classes: 'bg-tertiary-fixed/20 text-on-tertiary-fixed-variant',
    icon: 'flight_takeoff',
  },
  planning: {
    label: 'In Planning',
    classes: 'bg-secondary-container text-on-secondary-fixed-variant',
    icon: 'edit_note',
  },
  completed: {
    label: 'Completed',
    classes: 'bg-surface-container-high text-on-surface-variant',
    icon: 'check_circle',
  },
  draft: {
    label: 'Draft',
    classes: 'bg-surface-container text-outline',
    icon: 'draft',
  },
}

export default function StatusBadge({ status }: { status: TripStatus }) {
  const { label, classes, icon } = config[status]
  return (
    <span
      className={`inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-[10px] font-black uppercase tracking-widest ${classes}`}
    >
      <span
        className="material-symbols-outlined text-[13px]"
        style={{ fontVariationSettings: "'FILL' 1" }}
      >
        {icon}
      </span>
      {label}
    </span>
  )
}
