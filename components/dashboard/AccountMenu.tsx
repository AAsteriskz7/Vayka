"use client";

import { useState, useRef, useEffect } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useAuth } from "@/context/AuthContext";

export default function AccountMenu() {
  const { user, logout } = useAuth();
  const [open, setOpen] = useState(false);
  const ref = useRef<HTMLDivElement>(null);
  const router = useRouter();

  useEffect(() => {
    function handleClickOutside(e: MouseEvent) {
      if (ref.current && !ref.current.contains(e.target as Node)) {
        setOpen(false);
      }
    }
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  async function handleLogout() {
    await logout();
    setOpen(false);
    router.push("/");
    router.refresh();
  }

  if (!user) {
    return (
      <Link
        href="/login"
        className="px-4 py-2 bg-primary text-white rounded-full font-bold text-sm hover:shadow-lg transition-all flex items-center gap-2"
      >
        <span className="material-symbols-outlined text-[16px]">login</span>
        Sign In
      </Link>
    );
  }

  return (
    <div ref={ref} className="relative">
      <button
        onClick={() => setOpen((o) => !o)}
        className="flex items-center gap-2.5 bg-surface-container hover:bg-surface-container-high transition-colors px-3 py-1.5 rounded-full"
        aria-label="Account menu"
      >
        <div className="w-7 h-7 rounded-full bg-primary flex items-center justify-center">
          <span className="text-white text-[11px] font-black">
            {user.avatarInitials}
          </span>
        </div>
        <span className="text-sm font-semibold text-on-surface hidden sm:block">
          {user.name.split(" ")[0] || "Account"}
        </span>
        <span className="material-symbols-outlined text-[16px] text-outline">
          {open ? "expand_less" : "expand_more"}
        </span>
      </button>

      {open && (
        <div className="absolute right-0 mt-2 w-56 bg-surface-container-lowest rounded-2xl shadow-xl border border-outline-variant/15 overflow-hidden z-50">
          {/* User info */}
          <div className="px-4 py-3 border-b border-outline-variant/10">
            <p className="font-bold text-on-surface text-sm">{user.name}</p>
            <p className="text-xs text-outline truncate">{user.email}</p>
            {user.role === "admin" && (
              <span className="mt-1 inline-flex items-center gap-1 bg-primary/10 text-primary text-[10px] font-black uppercase tracking-widest px-2 py-0.5 rounded-full">
                Admin
              </span>
            )}
          </div>

          {/* Menu items */}
          <div className="py-1">
            <Link
              href="/profile"
              onClick={() => setOpen(false)}
              className="flex items-center gap-3 px-4 py-2.5 text-sm text-on-surface hover:bg-surface-container transition-colors"
            >
              <span className="material-symbols-outlined text-[18px] text-primary">
                person
              </span>
              My Profile
            </Link>
            {user.role !== "admin" && (
              <Link
                href="/itineraries"
                onClick={() => setOpen(false)}
                className="flex items-center gap-3 px-4 py-2.5 text-sm text-on-surface hover:bg-surface-container transition-colors"
              >
              <span className="material-symbols-outlined text-[18px] text-primary">
                map
              </span>
              My Itineraries
            </Link>
            )}
          </div>

          <div className="border-t border-outline-variant/10 py-1">
            <button
              onClick={handleLogout}
              className="w-full flex items-center gap-3 px-4 py-2.5 text-sm text-red-600 hover:bg-red-50 transition-colors"
            >
              <span className="material-symbols-outlined text-[18px]">
                logout
              </span>
              Sign Out
            </button>
          </div>
        </div>
      )}
    </div>
  );
}
