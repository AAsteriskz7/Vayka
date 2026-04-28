"use client";
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import AccountMenu from './dashboard/AccountMenu';
import { useAuth } from "@/context/AuthContext";

export default function TopNav() {
  const pathname = usePathname();
  const { user } = useAuth();
  const isAdmin = user?.role === "admin";

  const linkClass = (path: string) =>
    `${pathname === path ? 'text-teal-900 dark:text-white font-bold' : 'text-teal-700/70 dark:text-teal-200/70'} font-body font-medium tracking-wide hover:bg-white/40 dark:hover:bg-teal-800/40 transition-all duration-300 px-3 py-1 rounded-full`;

  return (
    <nav className="fixed top-0 left-0 right-0 z-50 flex justify-between items-center bg-white/60 dark:bg-teal-950/60 backdrop-blur-3xl rounded-full max-w-fit mx-auto mt-6 px-6 py-3 shadow-[0px_20px_40px_rgba(26,28,26,0.06)]">
      <div className="flex items-center gap-8">
        <Link href="/" className="font-headline italic text-2xl font-bold text-teal-950 dark:text-teal-50 pr-4">Vayka</Link>
        <div className="hidden md:flex items-center gap-6">
          {isAdmin ? (
            <Link href="/admin" className={`${linkClass('/admin')} flex items-center gap-1`}>
              <span className="material-symbols-outlined text-[18px]">admin_panel_settings</span>
              Admin
            </Link>
          ) : (
            <>
              {user && (
                <Link href="/dashboard" className={linkClass('/dashboard')}>Dashboard</Link>
              )}
              <Link href="/destinations" className={linkClass('/destinations')}>Destinations</Link>
              <Link href="/compare" className={linkClass('/compare')}>Compare</Link>
              <Link href="/itineraries" className={linkClass('/itineraries')}>Itineraries</Link>
              <Link href="/search" className={`${linkClass('/search')} flex items-center gap-1`}>
                <span className="material-symbols-outlined text-[18px]">search</span>
                Search
              </Link>
            </>
          )}
        </div>
      </div>
      <div className="hidden md:flex items-center gap-3 ml-8">
        <AccountMenu />
      </div>
    </nav>
  );
}
