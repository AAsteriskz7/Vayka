type Accent = 'primary' | 'secondary' | 'tertiary' | 'surface'

interface SummaryCardProps {
  icon: string
  label: string
  value: string | number
  sub?: string
  accent?: Accent
}

const accentMap: Record<Accent, string> = {
  primary: 'bg-primary text-white',
  secondary: 'bg-secondary-container text-on-secondary-fixed-variant',
  tertiary: 'bg-tertiary-fixed/25 text-on-tertiary-fixed-variant',
  surface: 'bg-surface-container-high text-on-surface-variant',
}

export default function SummaryCard({
  icon,
  label,
  value,
  sub,
  accent = 'primary',
}: SummaryCardProps) {
  return (
    <div className="bg-surface-container-lowest rounded-2xl p-6 shadow-sm border border-outline-variant/10 flex flex-col gap-4 hover:shadow-md transition-shadow">
      <div className={`w-11 h-11 rounded-xl flex items-center justify-center shrink-0 ${accentMap[accent]}`}>
        <span
          className="material-symbols-outlined text-[22px]"
          style={{ fontVariationSettings: "'FILL' 1" }}
        >
          {icon}
        </span>
      </div>
      <div>
        <p className="text-3xl font-headline font-bold text-primary leading-none">{value}</p>
        <p className="text-sm font-semibold text-on-surface mt-1">{label}</p>
        {sub && <p className="text-xs text-outline mt-0.5">{sub}</p>}
      </div>
    </div>
  )
}
