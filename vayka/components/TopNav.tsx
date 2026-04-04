"use client";
import Link from 'next/link';
import { usePathname } from 'next/navigation';

export default function TopNav() {
  const pathname = usePathname();

  const isDestinations = pathname === '/destinations';
  const isItineraries = pathname === '/itineraries';
  const isSearch = pathname === '/search';

  return (
    <nav className="fixed top-0 left-0 right-0 z-50 flex justify-between items-center bg-white/60 dark:bg-teal-950/60 backdrop-blur-3xl rounded-full max-w-fit mx-auto mt-6 px-6 py-3 shadow-[0px_20px_40px_rgba(26,28,26,0.06)]">
      <div className="flex items-center gap-8">
        <Link href="/" className="font-headline italic text-2xl font-bold text-teal-950 dark:text-teal-50 pr-4">Vayka</Link>
        <div className="hidden md:flex items-center gap-6">
          <Link
            href="/destinations"
            className={`${isDestinations ? 'text-teal-900 dark:text-white font-bold' : 'text-teal-700/70 dark:text-teal-200/70'} font-body font-medium tracking-wide hover:bg-white/40 dark:hover:bg-teal-800/40 transition-all duration-300 px-3 py-1 rounded-full`}
          >
            Destinations
          </Link>
          <Link
            href="/itineraries"
            className={`${isItineraries ? 'text-teal-900 dark:text-white font-bold' : 'text-teal-700/70 dark:text-teal-200/70'} font-body font-medium tracking-wide hover:bg-white/40 dark:hover:bg-teal-800/40 transition-all duration-300 px-3 py-1 rounded-full`}
          >
            Itineraries
          </Link>
          <Link
            href="/search"
            className={`${isSearch ? 'text-teal-900 dark:text-white font-bold' : 'text-teal-700/70 dark:text-teal-200/70'} font-body font-medium tracking-wide hover:bg-white/40 dark:hover:bg-teal-800/40 transition-all duration-300 px-3 py-1 rounded-full flex items-center gap-1`}
          >
            <span className="material-symbols-outlined text-[18px]">search</span>
            Search
          </Link>
        </div>
      </div>
      <div className="flex items-center gap-3 ml-8">
        <button className="material-symbols-outlined text-teal-900 dark:text-teal-50 p-2 hover:bg-white/40 rounded-full transition-all">notifications</button>
        <button className="material-symbols-outlined text-teal-900 dark:text-teal-50 p-2 hover:bg-white/40 rounded-full transition-all">account_circle</button>
      </div>
    </nav>
  );
}
