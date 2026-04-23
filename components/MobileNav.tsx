"use client";
import Link from 'next/link';
import { usePathname } from 'next/navigation';

export default function MobileNav() {
  const pathname = usePathname();

  // Hide global navigation on the admin dashboard
  if (pathname?.startsWith('/admin')) return null;

  return (
    <nav className="md:hidden fixed bottom-0 left-0 right-0 bg-white/80 backdrop-blur-xl flex justify-around p-4 z-50 border-t border-outline-variant/10 pb-6 pt-2">
      <Link href="/destinations" className={`flex flex-col items-center gap-1 ${pathname === '/destinations' || pathname === '/' ? 'text-primary' : 'text-outline/80'} hover:text-primary transition-colors`}>
        <span className="material-symbols-outlined" style={{ fontVariationSettings: pathname === '/destinations' || pathname === '/' ? "'FILL' 1" : "" }}>explore</span>
        <span className="text-[10px] font-bold uppercase tracking-widest mt-1">Explore</span>
      </Link>

      <Link href="/chat" className={`flex flex-col items-center gap-1 ${pathname === '/chat' ? 'text-primary' : 'text-outline/80'} hover:text-primary transition-colors`}>
        <span className="material-symbols-outlined" style={{ fontVariationSettings: pathname === '/chat' ? "'FILL' 1" : "" }}>chat_bubble</span>
        <span className="text-[10px] font-bold uppercase tracking-widest mt-1">Chat</span>
      </Link>

      <Link href="/search" className={`flex flex-col items-center justify-center ${pathname === '/search' ? 'bg-primary text-on-primary' : 'bg-primary/90 text-on-primary'} rounded-full p-3 -mt-4 shadow-lg hover:bg-primary transition-all duration-300 ease-in-out hover:scale-105 active:scale-95`}>
        <span className="material-symbols-outlined">search</span>
        <span className="font-sans text-[10px] font-bold uppercase tracking-widest mt-1">Search</span>
      </Link>

      <Link href="/itineraries" className={`flex flex-col items-center gap-1 ${pathname === '/itineraries' ? 'text-primary' : 'text-outline/80'} hover:text-primary transition-colors`}>
        <span className="material-symbols-outlined" style={{ fontVariationSettings: pathname === '/itineraries' ? "'FILL' 1" : "" }}>map</span>
        <span className="text-[10px] font-bold uppercase tracking-widest mt-1">Trips</span>
      </Link>

      <Link href="/profile" className={`flex flex-col items-center gap-1 ${pathname === '/profile' ? 'text-primary' : 'text-outline/80'} hover:text-primary transition-colors`}>
        <span className="material-symbols-outlined" style={{ fontVariationSettings: pathname === '/profile' ? "'FILL' 1" : "" }}>person</span>
        <span className="text-[10px] font-bold uppercase tracking-widest mt-1">Profile</span>
      </Link>
    </nav>
  );
}
