"use client";

import { useState, useEffect, useCallback } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useAuth } from "@/context/AuthContext";

interface Destination {
  name: string;
  region: string;
  description: string;
  budget: string;
  tags: string[];
  source: string;
}

// Curated images for destination cards — cycles through these
const CARD_IMAGES = [
  "https://lh3.googleusercontent.com/aida-public/AB6AXuD90HFg7qJzYZlwqaMCsBhyfUIguL8fMm9V-WIjIUfWpUQl_uASbVePJ_R1KFzJTmqk7I_klfcnRGvXeSy5kmMs7fxbEsJk3Bka-3iGawAot7G5U28QIzEnu7TT0AoEu51qJDw3HRghKT3drFVMiNEQMdaZ8lWEBJIaN9VVJFuozkefyZYCcE5H5vEzEHZ-fgNcdbdE__3lfGQnEFqEEUnHk0IFDKgzI-d3bqLxPMN8Y_NTxt61bpSO1PgXsFW2Ak8gFE7ayFGr5g72",
  "https://lh3.googleusercontent.com/aida-public/AB6AXuAvq5BJlA1xYRYkY7VpRSfM7Ls6avsOSh-vt5GLXSUY50cJSRKyC54p_3vfY8e7pSoxoE3KisSc_i3IlGwGsLG91V2efPWF9esP_GDvEwvmYjj4lcklka2g5P2zCLHQpjaac5jecQ0rGJmQ_XDKdGSS0IoJiaPjXb9xMT2NJ7ilEXCwbjWDzFqpjg2vceGDHWbM1pYy0TEerIwPhKmps9RPBuvK3tsThv2Q2NykFop70foaRwWAv9wMiLwyLfNLJ_qdRap7uygRtgjF",
  "https://lh3.googleusercontent.com/aida-public/AB6AXuCeUCl1G9j4S0-V0SSIerRGY4VWKY0jR1dPP1YzBXW69gX69kjQt1XHFF1ObIW_JaiCAgo3iZ57NqNdfwhbSTJaMZqw1Vq3QbpzkziA-gs4EREyrk1qSy4hjn4JyV6dVURo76eSQltVUhUL1Q_UJPcafSWJKgcP6rIi6T1rC0b9cEGzOpEg6yJXrbumqhWNNphdaqZUIYO9dQpo0d4_gnJCnBxkiNLF2MrXtwcInBtJZ2XdF0-9FaP7WpmcT_sO1Go-nxHOE21lRFSe",
  "https://lh3.googleusercontent.com/aida-public/AB6AXuA21P2UkM0Y8e-HqOkGJi7qB3m83ID6cIptkYCHtxJ822xvHP9OP1ONBOraty0X9xoob5fTo7eLtEgdoHp0eCXAYd2a79UURsaqc-1PaY2RWeNfbO8qQBKXlx2A0PUc_vMrJP-crbrbEZDT5WxCEHLkdzCloxsUHAhvxTx7tRtXtkewWA8cA6UidiREtg1SeZRjNldU4Iav59zsvd_57cYEiujfhvY4_jIK4c46lFx5ILx-XwicZoSu-6uOEAj3wgcwSH1tyG64ggbn",
  "https://lh3.googleusercontent.com/aida-public/AB6AXuBTlCgV7JOF2ZvPymH-1AYF_JRweMJXPmw5AyLwpG5BLHvMpXLWiZ357MXub6yA5Alum3_1__om4F9ihg1va-vYb0L87rnCMwpbEMRc9ING7iaz2_5GYMC4HdezmrkOVL2k8mg4RzJ1bwpgh_iWj4E31f--N8U6fSZNf_BdHeXqZgUPFwV7j-0SG4gxKwlIjDItmJPASCtj-JfWnRseboTLxq10ohhHaC4ceczQcGyYXtfxRX5ptAXiveJ12L60gd5k6eDcEwnEaYx4",
  "https://lh3.googleusercontent.com/aida-public/AB6AXuCYM45N4riCr5rCjETuLKptx-2okkrQ8jSqThgP9AyC4-i-PE9E55W8fIzjFUXzKJdxmS0J2llCQqAdcCdhiZBjsMzv22cH0VhhidjxTHNyBzORH6R7ulAcoxXJZCOXsoE8Z4QJxGcD_IWIhdhIi5KhVXOe8uU2DvtcKThTyTDinkAXjFvy__DhA58CLQjJRE8OIwZqC7jkNZyOZyjuDJc7_rx9C7eC2Rp84SMwd1M4fhDs4n5JbxZwiWTOO6-9a8FSMeW9NWR3bYgE",
  "https://lh3.googleusercontent.com/aida-public/AB6AXuBI4j3-ZkEYphWDkomrBO-qk9_E45EbUNGh3utVH5Wzoe5WnuoFkngqQ2z23MGyeLxkJBHX8syEecRvrwRJgT9JRMDOpRG3m0lvNGWls1Hz2i183xbVrzK1E9o8jWRBTOVjydtVr-IEa2c5mPlGwJNqE3isfL6lSj7ApuHz4Fj__N8FkcCW7pQQSiPQ7GpDjlihQYLxjbC3wYeBUmeCyMhXdOfcWcjYLHtG3ugc6DewKo-iXsFHyHT25H2bo0ZEiN2aWd6BNAT_MQs",
  "https://lh3.googleusercontent.com/aida-public/AB6AXuBJ_tLx4GBumGXC7n2ZnUMQr7lS44TDr-R6t8GFFWfy_5Bssr7T68ywQolCShunz9lHoYwrm64lWeTGDZu6DD2Oq-iOZSo7TN9Zi51Q1y9ub8jzefoIYNqYm3yE7qsxhrgalxgk-FRFOzPVyKmZ3eI-k8Ap5xAoB7CXb3JJryciuE5X1p4tsEqGMhQeTYB66MDtjjibWDII7XYwEV0wgj_WKpBN2PU5DbSclCgT-beozQdrDGRpNAgaA4Tloi3YoPD0Yf-T-Z7wmoE",
];

function formatSourceName(source: string): string {
  if (!source) return 'Knowledge Base'
  const lower = source.toLowerCase()
  if (lower.includes('world_famous') || lower.includes('world famous')) return 'World Famous Places 2024'
  if (lower.includes('rag_seed')) return 'Vayka Travel Guide'
  if (lower.includes('travel_recommendations') || lower.includes('recommendations')) return 'Travel Recommendations'
  if (lower.includes('travel details') || lower.includes('details dataset')) return 'Trip Reports'
  return source.replace(/\.[^/.]+$/, '').replace(/[_-]/g, ' ').split(' ').map((w: string) => w.charAt(0).toUpperCase() + w.slice(1)).join(' ')
}

const ASPECT_CLASSES = [
  "aspect-[4/5]",
  "aspect-[3/4]",
  "aspect-square",
  "aspect-video",
  "aspect-[4/5]",
  "aspect-[3/4]",
];

const FILTERS = ["All", "Low Budget", "Medium Budget", "High Budget"];

export default function DestinationsGrid() {
  const { user } = useAuth();
  const router = useRouter();
  const [destinations, setDestinations] = useState<Destination[]>([]);
  const [loading, setLoading] = useState(true);
  const [searchQuery, setSearchQuery] = useState("");
  const [activeFilter, setActiveFilter] = useState("All");
  const [searchTimeout, setSearchTimeout] = useState<NodeJS.Timeout | null>(null);

  const fetchDestinations = useCallback(async (query: string, budget: string) => {
    setLoading(true);
    try {
      const params = new URLSearchParams();
      if (query) params.set("q", query);
      if (budget && budget !== "All") {
        const budgetMap: Record<string, string> = {
          "Low Budget": "low",
          "Medium Budget": "medium",
          "High Budget": "high",
        };
        params.set("budget", budgetMap[budget] || "");
      }
      const res = await fetch(`/api/destinations?${params.toString()}`);
      const data = await res.json();
      setDestinations(data.destinations || []);
    } catch {
      setDestinations([]);
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    fetchDestinations("", "All");
  }, [fetchDestinations]);

  function handleSearch(value: string) {
    if (!user) { router.push('/login?next=/destinations'); return; }
    setSearchQuery(value);
    if (searchTimeout) clearTimeout(searchTimeout);
    const timeout = setTimeout(() => {
      fetchDestinations(value, activeFilter);
    }, 500);
    setSearchTimeout(timeout);
  }

  function handleFilter(filter: string) {
    if (!user) { router.push('/login?next=/destinations'); return; }
    setActiveFilter(filter);
    fetchDestinations(searchQuery, filter);
  }

  return (
    <>
      {/* Filters & Search */}
      <div className="flex flex-wrap items-center gap-4 mb-12">
        <div className="flex items-center gap-2 bg-surface-container-low px-6 py-4 rounded-xl flex-grow max-w-md">
          <span className="material-symbols-outlined text-outline">{user ? 'search' : 'lock'}</span>
          <input
            className="bg-transparent border-none focus:ring-0 text-on-surface-variant w-full font-body outline-none"
            placeholder={user ? "Search destinations..." : "Sign in to search destinations"}
            type="text"
            value={searchQuery}
            onChange={(e) => handleSearch(e.target.value)}
            readOnly={!user}
          />
        </div>
        <div className="flex items-center gap-3 overflow-x-auto pb-2 hide-scrollbar">
          {FILTERS.map((filter) => (
            <button
              key={filter}
              onClick={() => handleFilter(filter)}
              className={`px-6 py-3 rounded-full font-label text-sm whitespace-nowrap transition-colors ${
                activeFilter === filter
                  ? "bg-tertiary-container text-on-tertiary-container font-bold"
                  : "bg-secondary-container text-on-secondary-fixed-variant hover:bg-secondary-fixed"
              }`}
            >
              {filter}
            </button>
          ))}
        </div>
      </div>

      {/* Loading */}
      {loading && (
        <div className="flex items-center justify-center py-24 gap-3 text-secondary">
          <span className="material-symbols-outlined animate-spin">progress_activity</span>
          <span>Loading destinations from knowledge base...</span>
        </div>
      )}

      {/* Empty State */}
      {!loading && destinations.length === 0 && (
        <div className="text-center py-24">
          <span className="material-symbols-outlined text-6xl text-outline/30 mb-4 block">travel_explore</span>
          <p className="text-xl text-secondary mb-2">No destinations found</p>
          <p className="text-sm text-on-surface-variant max-w-md mx-auto">
            Try a different search or make sure your knowledge base has destination data ingested via the{" "}
            <Link href="/admin?tab=knowledge" className="text-primary font-bold hover:underline">Admin Dashboard</Link>.
          </p>
        </div>
      )}

      {/* Masonry Grid */}
      {!loading && destinations.length > 0 && (
        <div className="columns-1 md:columns-2 lg:columns-3 gap-8 space-y-8">
          {destinations.map((dest, idx) => (
            <div
              key={dest.name}
              className={`break-inside-avoid relative group rounded-xl overflow-hidden shadow-sm hover:shadow-xl transition-all duration-500 w-full ${ASPECT_CLASSES[idx % ASPECT_CLASSES.length]} mb-4`}
            >
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img
                className="absolute inset-0 w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
                src={CARD_IMAGES[idx % CARD_IMAGES.length]}
                alt={dest.name}
              />
              <div className="absolute inset-0 bg-gradient-to-t from-primary/80 via-transparent to-transparent opacity-60 group-hover:opacity-80 transition-opacity"></div>

              {/* Budget Badge */}
              {dest.budget && (
                <div className="absolute top-6 left-6">
                  <span className="bg-white/20 backdrop-blur-md text-white text-[10px] tracking-widest font-bold px-3 py-1 rounded-full uppercase">
                    {dest.budget} budget
                  </span>
                </div>
              )}

              <div className="absolute bottom-8 left-8 right-8">
                <p className="text-tertiary-fixed font-label text-xs tracking-widest uppercase mb-2">
                  {dest.region || formatSourceName(dest.source)}
                </p>
                <h3 className="font-headline text-2xl md:text-3xl text-white leading-tight mb-3">
                  {dest.name}
                </h3>

                {/* Tags */}
                {dest.tags.length > 0 && (
                  <div className="flex flex-wrap gap-2 opacity-0 group-hover:opacity-100 transition-all duration-500 transform translate-y-2 group-hover:translate-y-0">
                    {dest.tags.map((tag) => (
                      <span key={tag} className="text-white/80 text-xs font-label bg-white/10 backdrop-blur-sm px-2.5 py-1 rounded-full">
                        {tag}
                      </span>
                    ))}
                  </div>
                )}
                {/* Source attribution */}
                {dest.source && (
                  <div className="opacity-0 group-hover:opacity-100 transition-all duration-500 mt-2">
                    <span className="inline-flex items-center gap-1 text-white/60 text-[9px] font-label">
                      <span className="material-symbols-outlined text-[9px]">library_books</span>
                      {formatSourceName(dest.source)}
                    </span>
                  </div>
                )}
              </div>
            </div>
          ))}
        </div>
      )}
    </>
  );
}
