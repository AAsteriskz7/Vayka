'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';

export default function FloatingChatButton() {
  const pathname = usePathname();

  // Highlight the chat button if we're on the chat page
  const isChat = pathname === '/chat';

  // We might want to hide the FAB on the chat page itself since we're already there,
  // but let's keep it visible per standard AI app patterns (or hide it, let's hide it for cleanliness).
  if (isChat || pathname?.startsWith('/admin')) return null;

  return (
    <Link href="/chat" className="fixed bottom-[88px] md:bottom-12 right-6 md:right-12 z-50 group">
      <div className="flex items-center gap-2">
        <div className="absolute right-full mr-4 bg-white dark:bg-stone-800 text-sm font-bold text-primary dark:text-teal-50 px-4 py-2 rounded-xl shadow-lg opacity-0 translate-x-4 group-hover:opacity-100 group-hover:translate-x-0 transition-all pointer-events-none whitespace-nowrap hidden md:block">
          Ask TravelAI
        </div>
        <button className="w-16 h-16 bg-primary dark:bg-teal-700 text-white dark:text-teal-50 rounded-full shadow-2xl flex items-center justify-center hover:scale-110 active:scale-95 transition-all outline-none focus:ring-4 focus:ring-primary/30">
          <span className="material-symbols-outlined text-3xl" style={{ fontVariationSettings: "'FILL' 1" }}>auto_awesome</span>
        </button>
      </div>
    </Link>
  );
}
