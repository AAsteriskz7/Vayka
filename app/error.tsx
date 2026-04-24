'use client';

import { useEffect } from 'react';
import Link from 'next/link';

export default function GlobalError({
  error,
  reset,
}: {
  error: Error & { digest?: string };
  reset: () => void;
}) {
  useEffect(() => {
    // Log the error to an error reporting service if available
    console.error('Global Error Boundary caught:', error);
  }, [error]);

  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-surface text-on-surface px-6 text-center">
      <div className="bg-error-container text-on-error-container p-6 rounded-full mb-8 inline-flex">
        <span className="material-symbols-outlined text-5xl">warning</span>
      </div>
      <h1 className="font-headline text-5xl md:text-6xl font-black text-primary mb-4 tracking-tight">
        Turbulence detected.
      </h1>
      <p className="text-secondary text-lg mb-12 max-w-lg">
        We encountered an unexpected issue while preparing your journey. Our team has been notified.
      </p>
      <div className="flex gap-4">
        <button
          onClick={() => reset()}
          className="px-8 py-3 bg-primary text-white rounded-full font-bold hover:scale-105 active:scale-95 transition-all shadow-md"
        >
          Try Again
        </button>
        <Link
          href="/"
          className="px-8 py-3 bg-surface-container text-on-surface-variant rounded-full font-bold hover:bg-surface-container-high transition-colors"
        >
          Return Home
        </Link>
      </div>
    </div>
  );
}
