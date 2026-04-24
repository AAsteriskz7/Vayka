import Link from 'next/link'

interface ChatbotCTAProps {
  itineraryTitle: string
  itinerarySlug: string
  variant?: 'sidebar' | 'banner'
}

export default function ChatbotCTA({
  itineraryTitle,
  itinerarySlug,
  variant = 'sidebar',
}: ChatbotCTAProps) {
  if (variant === 'banner') {
    return (
      <div className="bg-surface-container-lowest border border-outline-variant/10 rounded-2xl p-6 flex flex-col sm:flex-row items-start sm:items-center gap-6">
        <div className="w-12 h-12 bg-primary rounded-xl flex items-center justify-center shrink-0">
          <span
            className="material-symbols-outlined text-white text-[24px]"
            style={{ fontVariationSettings: "'FILL' 1" }}
          >
            auto_awesome
          </span>
        </div>
        <div className="flex-1 min-w-0">
          <p className="font-bold text-on-surface">Want to refine this itinerary?</p>
          <p className="text-sm text-on-surface-variant mt-0.5">
            Ask Vayka to swap hotels, add restaurants, or optimize your travel times.
          </p>
        </div>
        <Link
          href={`/chat?itinerary=${itinerarySlug}`}
          className="bg-primary text-white px-6 py-3 rounded-xl font-bold text-sm hover:bg-primary-container transition-colors flex items-center gap-2 shrink-0"
        >
          <span className="material-symbols-outlined text-[18px]">chat</span>
          Chat with Vayka
        </Link>
      </div>
    )
  }

  return (
    <div className="bg-primary rounded-2xl p-6 space-y-4">
      <div className="flex items-start gap-3">
        <div className="w-10 h-10 bg-white/15 rounded-full flex items-center justify-center shrink-0 mt-0.5">
          <span
            className="material-symbols-outlined text-white text-[20px]"
            style={{ fontVariationSettings: "'FILL' 1" }}
          >
            auto_awesome
          </span>
        </div>
        <div>
          <p className="text-white/60 text-[10px] font-black uppercase tracking-widest">Vayka AI</p>
          <p className="text-white font-semibold text-sm leading-snug mt-0.5">
            Refine &ldquo;{itineraryTitle}&rdquo;
          </p>
        </div>
      </div>

      <p className="text-white/70 text-sm leading-relaxed">
        Add restaurants, swap hotels, optimize transit, or discover hidden gems — just ask.
      </p>

      <Link
        href={`/chat?itinerary=${itinerarySlug}`}
        className="w-full bg-white text-primary py-3 rounded-xl font-bold text-sm text-center hover:bg-primary-fixed transition-colors flex items-center justify-center gap-2"
      >
        <span className="material-symbols-outlined text-[18px]">chat</span>
        Continue planning with Vayka
      </Link>

      <Link
        href="/chat"
        className="w-full text-white/60 text-xs text-center hover:text-white/90 transition-colors flex items-center justify-center gap-1"
      >
        <span className="material-symbols-outlined text-[14px]">add_circle</span>
        Start a new trip instead
      </Link>
    </div>
  )
}
