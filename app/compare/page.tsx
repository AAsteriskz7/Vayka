import type { Metadata } from 'next';
import Footer from '../../components/Footer';
import CompareEngine from '../../components/CompareEngine';

export const metadata: Metadata = {
  title: "Compare Destinations",
  description: "Side-by-side AI-powered comparison of travel destinations.",
};

export default function Compare() {
  return (
    <>
      <main className="pt-32 pb-24 px-6 md:px-12 max-w-7xl mx-auto min-h-screen">
        <section className="mb-12">
          <div className="flex flex-col md:flex-row items-end gap-8 mb-8">
            <div className="md:w-2/3">
              <span className="font-label text-secondary uppercase tracking-widest text-sm mb-4 block">Comparison Engine</span>
              <h1 className="text-5xl md:text-7xl font-headline font-black text-primary leading-tight tracking-tight">
                Weighing the <br /> <span className="italic font-normal">Wanderlust.</span>
              </h1>
            </div>
            <div className="md:w-1/3 text-right">
              <p className="text-on-surface-variant text-lg max-w-xs ml-auto leading-relaxed font-body">
                Enter two or three destinations and let the AI compare them across key travel criteria.
              </p>
            </div>
          </div>
        </section>

        <CompareEngine />
      </main>
      <Footer />
    </>
  );
}
