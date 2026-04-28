"use client";

import { createContext, useContext, useEffect, useState, ReactNode } from "react";
import { supabase } from "@/lib/supabase";
import type { User as SupabaseUser } from "@supabase/supabase-js";

export interface AuthUser {
  id: string;
  name: string;
  email: string;
  role: "user" | "admin";
  avatarInitials: string;
}

interface AuthContextValue {
  user: AuthUser | null;
  isLoading: boolean;
  logout: () => Promise<void>;
}

const AuthContext = createContext<AuthContextValue>({
  user: null,
  isLoading: true,
  logout: async () => {},
});

async function toAuthUser(su: SupabaseUser): Promise<AuthUser> {
  const name: string =
    su.user_metadata?.display_name ?? su.email?.split("@")[0] ?? "Traveler";

  const { data: profile, error } = await supabase
    .from("profiles")
    .select("role, display_name")
    .eq("id", su.id)
    .single();

  if (error) {
    console.error("Profile fetch error:", error);
  }

  const role: "user" | "admin" = profile?.role === "admin" ? "admin" : "user";

  const displayName = profile?.display_name ?? name;

  const initials = displayName
    .split(" ")
    .slice(0, 2)
    .map((w: string) => w[0])
    .join("")
    .toUpperCase();

  return {
    id: su.id,
    name: displayName,
    email: su.email ?? "",
    role,
    avatarInitials: initials,
  };
}

export function AuthProvider({ children }: { children: ReactNode }) {
  const [user, setUser] = useState<AuthUser | null>(null);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    if (!supabase) {
      setIsLoading(false);
      return;
    }

    supabase.auth.getSession().then(async ({ data: { session } }) => {
      setUser(session?.user ? await toAuthUser(session.user) : null);
      setIsLoading(false);
    });

    const {
      data: { subscription },
    } = supabase.auth.onAuthStateChange((event, session) => {
  const su = session?.user ?? null;

  if (!su) {
    setUser(null);
    return;
  }

  // delay profile fetch so it doesn't fight Supabase's auth lock
  setTimeout(async () => {
    const authUser = await toAuthUser(su);
    setUser(authUser);

    if (event === "SIGNED_IN") {
      await fetch("/api/auth/session", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          userId: su.id,
          role: authUser.role,
          displayName: authUser.name,
          email: su.email ?? '',
        }),
      });
    }
  }, 0);
});

    return () => subscription.unsubscribe();
  }, []);

  async function logout() {
    if (!supabase) return;
    await supabase.auth.signOut();
    await fetch("/api/auth/session", { method: "DELETE" });
    setUser(null);
  }

  return (
    <AuthContext.Provider value={{ user, isLoading, logout }}>
      {children}
    </AuthContext.Provider>
  );
}

export function useAuth() {
  return useContext(AuthContext);
}
