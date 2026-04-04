"use client";
import Link from 'next/link';
import { usePathname } from 'next/navigation';

export default function MobileNav() {
  const pathname = usePathname();

  return (
    <nav className="md:hidden fixed bottom-0 left-0 right-0 bg-white/80 backdrop-blur-xl flex justify-around p-4 z-50 border-t border-outline-variant/10">
      <Link href="/destinations" className={`flex flex-col items-center gap-1 ${pathname === '/destinations' ? 'text-primary' : 'text-outline/80'} hover:text-primary transition-colors`}>
        <span className="material-symbols-outlined" style={{ fontVariationSettings: pathname === '/destinations' ? "'FILL' 1" : "" }}>explore</span>
        <span className="text-[10px] font-bold uppercase tracking-widest">Explore</span>
      </Link>
      <Link href="/" className={`flex flex-col items-center gap-1 ${pathname === '/' || pathname === '/itineraries' ? 'text-primary' : 'text-outline/80'} hover:text-primary transition-colors`}>
        <span className="material-symbols-outlined" style={{ fontVariationSettings: pathname === '/' || pathname === '/itineraries' ? "'FILL' 1" : "" }}>map</span>
        <span className="text-[10px] font-bold uppercase tracking-widest">Trips</span>
      </Link>
      <Link href="/journal" className={`flex flex-col items-center gap-1 ${pathname === '/journal' ? 'text-primary' : 'text-outline/80'} hover:text-primary transition-colors`}>
        <span className="material-symbols-outlined" style={{ fontVariationSettings: pathname === '/journal' ? "'FILL' 1" : "" }}>auto_stories</span>
        <span className="text-[10px] font-bold uppercase tracking-widest">Journal</span>
      </Link>
      <Link href="/profile" className={`flex flex-col items-center gap-1 ${pathname === '/profile' ? 'text-primary' : 'text-outline/80'} hover:text-primary transition-colors`}>
        <span className="material-symbols-outlined" style={{ fontVariationSettings: pathname === '/profile' ? "'FILL' 1" : "" }}>person</span>
        <span className="text-[10px] font-bold uppercase tracking-widest">Profile</span>
      </Link>
    </nav>
  );
}
