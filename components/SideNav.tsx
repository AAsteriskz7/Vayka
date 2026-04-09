"use client";
import Link from 'next/link';
import { usePathname } from 'next/navigation';

export default function SideNav() {
  const pathname = usePathname();

  return (
    <aside className="fixed left-0 top-0 h-full z-40 flex flex-col p-12 overflow-y-auto bg-[#faf9f6] dark:bg-[#1a1c1a] rounded-r-[3rem] w-80 hidden lg:flex border-r border-outline-variant/10">
      <div className="mb-12">
        <h1 className="font-headline text-primary text-3xl font-bold italic mb-1">Vayka</h1>
        <p className="text-secondary label-sm">The Fluid Curator</p>
      </div>
      <nav className="flex flex-col gap-8 flex-grow">
        <Link href="/destinations" className={`flex items-center gap-4 ${pathname === '/destinations' ? 'text-teal-900 dark:text-teal-50 font-bold border-l-4 border-teal-900 dark:border-teal-50 pl-4' : 'text-teal-700/60 dark:text-teal-200/60 pl-8'} hover:text-teal-900 transition-all`}>
          <span className="material-symbols-outlined">explore</span>
          <span className="font-body tracking-tight">Destinations</span>
        </Link>
        <Link href="/itineraries" className={`flex items-center gap-4 ${pathname === '/itineraries' ? 'text-teal-900 dark:text-teal-50 font-bold border-l-4 border-teal-900 dark:border-teal-50 pl-4' : 'text-teal-700/60 dark:text-teal-200/60 pl-8'} hover:text-teal-900 transition-all`}>
          <span className="material-symbols-outlined">map</span>
          <span className="font-body tracking-tight">Itineraries</span>
        </Link>
        <Link href="/journal" className={`flex items-center gap-4 ${pathname === '/journal' ? 'text-teal-900 dark:text-teal-50 font-bold border-l-4 border-teal-900 dark:border-teal-50 pl-4' : 'text-teal-700/60 dark:text-teal-200/60 pl-8'} hover:text-teal-900 transition-all`}>
          <span className="material-symbols-outlined">auto_stories</span>
          <span className="font-body tracking-tight">Journal</span>
        </Link>
      </nav>
      <div className="mt-12 flex flex-col gap-6 pt-12 border-t border-outline-variant/10">
        <button className="bg-gradient-to-br from-primary to-primary-container text-white py-4 px-6 rounded-xl font-medium shadow-lg hover:scale-95 transition-transform duration-200">
          Start New Trip
        </button>
        <div className="flex flex-col gap-4">
          <Link href="/settings" className="flex items-center gap-4 text-teal-700/60 hover:text-teal-900 pl-4">
            <span className="material-symbols-outlined">settings</span>
            <span>Settings</span>
          </Link>
          <Link href="/support" className="flex items-center gap-4 text-teal-700/60 hover:text-teal-900 pl-4">
            <span className="material-symbols-outlined">contact_support</span>
            <span>Support</span>
          </Link>
        </div>
      </div>
    </aside>
  );
}
