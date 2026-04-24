"use client";
import Link from 'next/link';
import { usePathname } from 'next/navigation';

export default function MobileNav() {
  const pathname = usePathname();

  if (pathname?.startsWith('/admin')) return null;

  const linkClass = (path: string) =>
    `flex flex-col items-center gap-1 ${pathname === path ? 'text-primary' : 'text-outline/80'} hover:text-primary transition-colors`;

  const iconFill = (path: string) =>
    pathname === path ? { fontVariationSettings: "'FILL' 1" as const } : {};

  return (
    <nav className="md:hidden fixed bottom-0 left-0 right-0 bg-white/80 backdrop-blur-xl flex justify-around p-4 z-50 border-t border-outline-variant/10 pb-6 pt-2">
      <Link href="/destinations" className={linkClass('/destinations')}>
        <span className="material-symbols-outlined" style={iconFill('/destinations')}>explore</span>
        <span className="text-[10px] font-bold uppercase tracking-widest mt-1">Explore</span>
      </Link>

      <Link href="/compare" className={linkClass('/compare')}>
        <span className="material-symbols-outlined" style={iconFill('/compare')}>compare_arrows</span>
        <span className="text-[10px] font-bold uppercase tracking-widest mt-1">Compare</span>
      </Link>

      <Link href="/search" className={`flex flex-col items-center justify-center ${pathname === '/search' ? 'bg-primary text-on-primary' : 'bg-primary/90 text-on-primary'} rounded-full p-3 -mt-4 shadow-lg hover:bg-primary transition-all duration-300 ease-in-out hover:scale-105 active:scale-95`}>
        <span className="material-symbols-outlined">search</span>
        <span className="font-sans text-[10px] font-bold uppercase tracking-widest mt-1">Search</span>
      </Link>

      <Link href="/itineraries" className={linkClass('/itineraries')}>
        <span className="material-symbols-outlined" style={iconFill('/itineraries')}>map</span>
        <span className="text-[10px] font-bold uppercase tracking-widest mt-1">Trips</span>
      </Link>
    </nav>
  );
}
