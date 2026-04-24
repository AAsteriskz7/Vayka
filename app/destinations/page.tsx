import type { Metadata } from 'next';
import Footer from '../../components/Footer';
import DestinationsGrid from '../../components/DestinationsGrid';

export const metadata: Metadata = {
  title: "Destinations",
  description: "Discover curated travel destinations that match your mood, budget, and vibe.",
};

export default function Destinations() {
  return (
    <>
      <main className="pt-32 pb-20 px-6 md:px-12 lg:px-24 max-w-[1600px] mx-auto">
        {/* Header */}
        <header className="mb-16">
          <h1 className="font-headline text-5xl md:text-7xl text-primary leading-tight max-w-3xl mb-8">
            Where the <span className="italic font-normal">organic</span> meets the <span className="text-secondary">extraordinary.</span>
          </h1>
        </header>

        <DestinationsGrid />

        {/* Featured Section (Editorial Layout) */}
        <section className="mt-40 grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
          <div className="lg:col-span-5 order-2 lg:order-1">
            <span className="text-secondary font-label font-bold tracking-[0.2em] uppercase text-sm block mb-4">The Curator&apos;s Note</span>
            <h2 className="font-headline text-4xl md:text-6xl text-primary mb-8 leading-[1.1]">The art of finding <span className="italic font-normal">nothing.</span></h2>
            <p className="text-on-surface-variant font-body text-lg leading-relaxed mb-10">
              We believe travel isn&apos;t about checking boxes, but about unlearning schedules. Our algorithm prioritizes &quot;Human Density&quot; in reverse—showing you the places where the only footprints in the sand are yours.
            </p>
          </div>
          <div className="lg:col-span-7 order-1 lg:order-2 relative">
            <div className="bg-surface-container-high rounded-xl aspect-[4/5] md:aspect-video relative overflow-hidden">
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img className="w-full h-full object-cover" src="https://lh3.googleusercontent.com/aida-public/AB6AXuB4m5BGAZGYs2QKzsp-5S3YiSnHB1lc-spsOwtwtcCnpowVsaNQUP6rRy00f8BGQO7C3FJ7nwwTOISYt2R3K_eFimZ1gcOjYd4OlKnRKgUOWoyHtlCJXlx7N5uVQElREzyfNGi2ulL_d2z2j1QYeRJkIBeYBd5JLWNrjaesk4u1fP7VVfj0bK5eooUHM5Y8rkdkX4HLZU9T9haynn1zfLQzk9JEqTVy2gaGCu7I_eYrxcDO-hoYcxZ7TsjSwLMO6YHIXn0SinSmwh7Y" alt="person sitting by mountain lake" />
              <div className="absolute bottom-10 -left-6 md:-left-12 bg-white/40 backdrop-blur-2xl p-8 rounded-xl shadow-2xl max-w-xs border border-white/20 ml-12 lg:ml-0">
                <span className="material-symbols-outlined text-primary-container mb-4 scale-150 transform transition">auto_stories</span>
                <h4 className="font-headline text-xl text-primary mb-2">The Hidden Valley</h4>
                <p className="text-on-surface-variant text-sm font-body leading-snug">A photographic essay on the quietest corners of the Swiss Alps.</p>
              </div>
            </div>
          </div>
        </section>
      </main>

      <Footer />
    </>
  );
}
