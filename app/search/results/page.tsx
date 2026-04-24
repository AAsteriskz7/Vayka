"use client";

import { useSearchParams } from "next/navigation";
import { useState, useEffect, Suspense } from "react";
import Link from "next/link";
import Footer from "../../../components/Footer";

interface SearchResult {
  content: string;
  source: string;
  similarity: number;
}

function SearchResultsContent() {
  const searchParams = useSearchParams();
  const query = searchParams.get("q") || "";
  const [results, setResults] = useState<SearchResult[]>([]);
  const [aiSummary, setAiSummary] = useState("");
  const [loading, setLoading] = useState(false);
  const [searched, setSearched] = useState(false);

  useEffect(() => {
    if (!query) return;
    setLoading(true);
    setSearched(false);

    fetch("/api/chat", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ message: query }),
    })
      .then((res) => res.json())
      .then((data) => {
        setAiSummary(data.response || "");
        // Build result cards from sources
        const sources: string[] = data.sources || [];
        const cards: SearchResult[] = sources.map((src: string, idx: number) => ({
          content: `Matched from knowledge base`,
          source: src,
          similarity: Math.round((1 - idx * 0.05) * 100) / 100,
        }));
        setResults(cards);
      })
      .catch(() => {
        setAiSummary("Something went wrong. Please try again.");
        setResults([]);
      })
      .finally(() => {
        setLoading(false);
        setSearched(true);
      });
  }, [query]);

  return (
    <>
      <main className="pt-32 pb-24 px-6 md:px-12 max-w-[1600px] mx-auto min-h-screen">
        {/* Header */}
        <header className="mb-12 max-w-4xl">
          <Link
            href="/search"
            className="inline-flex items-center gap-1 text-secondary text-sm font-medium mb-6 hover:text-primary transition-colors"
          >
            <span className="material-symbols-outlined text-base">arrow_back</span>
            Back to Search
          </Link>
          <h1 className="text-4xl md:text-6xl font-black text-primary leading-tight tracking-tight mb-3">
            {query ? `Results for "${query}"` : "Search Results"}
          </h1>
          {searched && (
            <p className="text-lg text-secondary font-medium">
              {results.length > 0
                ? `${results.length} source${results.length !== 1 ? "s" : ""} matched from the knowledge base`
                : "No matching sources found"}
            </p>
          )}
        </header>

        {/* Loading State */}
        {loading && (
          <div className="flex items-center gap-3 text-secondary mb-12">
            <span className="material-symbols-outlined animate-spin">progress_activity</span>
            <span className="text-lg">Searching the knowledge base...</span>
          </div>
        )}

        {/* No query */}
        {!query && !loading && (
          <div className="text-center py-24">
            <span className="material-symbols-outlined text-6xl text-outline/40 mb-4 block">travel_explore</span>
            <p className="text-xl text-secondary mb-6">Enter a search query to discover destinations</p>
            <Link
              href="/search"
              className="inline-flex items-center gap-2 px-8 py-4 bg-primary text-white rounded-full font-bold hover:scale-105 transition-transform"
            >
              Go to Search
              <span className="material-symbols-outlined">arrow_forward</span>
            </Link>
          </div>
        )}

        {/* Results */}
        {searched && !loading && query && (
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-12">
            {/* AI Summary */}
            <div className="lg:col-span-8">
              <div className="bg-surface-container-lowest rounded-2xl p-8 shadow-sm border border-surface-variant/30 mb-8">
                <div className="flex items-center gap-3 mb-5">
                  <div className="w-10 h-10 rounded-full bg-primary flex items-center justify-center">
                    <span className="material-symbols-outlined text-white text-sm" style={{ fontVariationSettings: "'FILL' 1" }}>auto_awesome</span>
                  </div>
                  <div>
                    <p className="font-bold text-primary text-sm">Vayka AI</p>
                    <p className="text-[10px] text-secondary uppercase tracking-widest">Curated Response</p>
                  </div>
                </div>
                <div className="text-on-surface leading-relaxed whitespace-pre-line">
                  {aiSummary}
                </div>
              </div>

              {/* Source Cards */}
              {results.length > 0 && (
                <div className="space-y-4">
                  <h3 className="text-sm font-label font-bold text-secondary uppercase tracking-widest mb-4">
                    Matched Sources
                  </h3>
                  {results.map((result, idx) => (
                    <div
                      key={idx}
                      className="bg-surface-container-low rounded-xl p-6 border border-surface-variant/20 hover:border-primary/20 hover:shadow-md transition-all group"
                    >
                      <div className="flex items-start justify-between gap-4">
                        <div className="flex items-center gap-3">
                          <div className="w-10 h-10 bg-secondary-container rounded-lg flex items-center justify-center shrink-0">
                            <span className="material-symbols-outlined text-primary text-sm">description</span>
                          </div>
                          <div>
                            <p className="font-bold text-primary">{result.source}</p>
                            <p className="text-xs text-secondary mt-0.5">Knowledge base source</p>
                          </div>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              )}
            </div>

            {/* Sidebar */}
            <aside className="lg:col-span-4">
              <div className="sticky top-32 space-y-6">
                <div className="bg-surface-container rounded-2xl p-6">
                  <h3 className="text-sm font-label font-bold text-secondary uppercase tracking-widest mb-4">
                    Refine Your Search
                  </h3>
                  <Link
                    href="/chat"
                    className="w-full flex items-center gap-3 px-5 py-4 bg-primary text-white rounded-xl font-bold text-sm hover:shadow-lg transition-shadow"
                  >
                    <span className="material-symbols-outlined text-base" style={{ fontVariationSettings: "'FILL' 1" }}>auto_awesome</span>
                    Ask Vayka AI directly
                  </Link>
                  <p className="text-xs text-secondary mt-3 leading-relaxed">
                    Get a more detailed, conversational answer by chatting with our AI travel assistant.
                  </p>
                </div>

                <div className="bg-surface-container rounded-2xl p-6">
                  <h3 className="text-sm font-label font-bold text-secondary uppercase tracking-widest mb-4">
                    Try Searching
                  </h3>
                  <div className="space-y-2">
                    {["Budget trips to Japan", "Best beaches in Europe", "Weekend getaway ideas"].map((suggestion) => (
                      <Link
                        key={suggestion}
                        href={`/search/results?q=${encodeURIComponent(suggestion)}`}
                        className="block px-4 py-3 bg-surface-container-low rounded-lg text-sm text-on-surface-variant hover:bg-surface-container-high hover:text-primary transition-colors"
                      >
                        {suggestion}
                      </Link>
                    ))}
                  </div>
                </div>
              </div>
            </aside>
          </div>
        )}
      </main>

      <Footer />
    </>
  );
}

export default function SearchResults() {
  return (
    <Suspense fallback={
      <main className="pt-32 pb-24 px-6 md:px-12 max-w-[1600px] mx-auto min-h-screen">
        <div className="flex items-center gap-3 text-secondary">
          <span className="material-symbols-outlined animate-spin">progress_activity</span>
          <span className="text-lg">Loading...</span>
        </div>
      </main>
    }>
      <SearchResultsContent />
    </Suspense>
  );
}
