import type { Metadata } from 'next';
import Footer from '../../components/Footer';

export const metadata: Metadata = {
  title: "Compare Destinations",
  description: "Side-by-side AI-powered comparison of travel destinations by cost, weather, safety, culture, and more.",
};

export default function Compare() {
  return (
    <>
      <main className="pt-32 pb-40 px-6 md:px-12 max-w-7xl mx-auto min-h-screen">
        {/* Hero Section */}
        <section className="mb-20">
          <div className="flex flex-col md:flex-row items-end gap-8 mb-12">
            <div className="md:w-2/3">
              <span className="font-label text-secondary uppercase tracking-widest text-sm mb-4 block">Comparison Engine</span>
              <h1 className="text-5xl md:text-7xl font-headline font-black text-primary leading-tight tracking-tight">
                Weighing the <br /> <span className="italic font-normal">Wanderlust.</span>
              </h1>
            </div>
            <div className="md:w-1/3 text-right">
              <p className="text-on-surface-variant text-lg max-w-xs ml-auto leading-relaxed font-body">
                An editorial side-by-side analysis of your top three curiosities: Kyoto, Lisbon, and Cape Town.
              </p>
            </div>
          </div>
        </section>

        {/* AI Summary Recommendation */}
        <section className="mb-24 relative">
          <div className="absolute -top-12 -left-8 w-24 h-24 bg-tertiary-fixed-dim/20 rounded-full blur-3xl"></div>
          <div className="bg-primary-container text-white p-10 md:p-16 rounded-xl relative overflow-hidden flex flex-col md:flex-row gap-12 items-center">
            <div className="flex-1">
              <div className="flex items-center gap-3 mb-6">
                <span className="material-symbols-outlined text-primary-fixed">auto_awesome</span>
                <span className="font-label text-primary-fixed text-sm uppercase tracking-widest font-bold">AI Curator&apos;s Choice</span>
              </div>
              <blockquote className="text-3xl md:text-4xl font-headline italic mb-8 leading-tight">
                &quot;Based on your preference for slow mornings, artisanal craft, and coastal walks, <span className="underline decoration-tertiary-fixed-dim decoration-4 underline-offset-8">Lisbon</span> is your soul-match destination this season.&quot;
              </blockquote>
              <button className="bg-primary-fixed text-on-primary-fixed px-8 py-4 rounded-xl font-bold hover:scale-105 transition-transform font-body">
                Confirm Lisbon Itinerary
              </button>
            </div>
            <div className="w-full md:w-80 h-96 rounded-xl overflow-hidden shadow-2xl rotate-3 flex-shrink-0">
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img src="https://lh3.googleusercontent.com/aida-public/AB6AXuAwcjob2ElXlTGAv3ofgNXZbJh52dLUJ0ljai0Uk66j-Ke8w2wqy-D07YagIVrfoqQX9FM1VQRvtfkRHeYEPqmB-23_VDhU00uxTZvxVNhmrcxbuLe6XXquYZDYq7f_amkwbhp2j2CiomDqmWqCVJhvXeRIR33qxgQu1y9v_bSUb8pP7fs3eEqvFZk_2lOjQD1WAY6XQhMeAcSKACXT4MK7Bz2PIWjI2l7nqEgJXuyhyqU65KTlqqvjGSs-UrNPc2WGzLGwOMQMi7zI" alt="Lisbon street view" className="w-full h-full object-cover" />
            </div>
          </div>
        </section>

        {/* Comparison Matrix */}
        <section className="mb-24">
          <h2 className="text-3xl font-headline font-bold text-primary mb-12 flex items-center gap-4">
            The Anatomy of Travel
            <div className="h-[2px] flex-1 bg-surface-container-highest rounded-full"></div>
          </h2>
          <div className="overflow-x-auto pb-8">
            <table className="w-full border-separate border-spacing-x-4 border-spacing-y-0">
              <thead>
                <tr>
                  <th className="p-6 text-left w-48"></th>
                  <th className="p-8 bg-surface-container rounded-t-xl min-w-[280px]">
                    <div className="flex flex-col items-center">
                      <span className="text-2xl font-headline font-black mb-2">Kyoto</span>
                      <span className="text-xs uppercase tracking-widest text-secondary font-body">Japan</span>
                    </div>
                  </th>
                  <th className="p-8 bg-surface-container-high rounded-t-xl min-w-[280px]">
                    <div className="flex flex-col items-center">
                      <span className="text-2xl font-headline font-black mb-2">Lisbon</span>
                      <span className="text-xs uppercase tracking-widest text-secondary font-body">Portugal</span>
                    </div>
                  </th>
                  <th className="p-8 bg-surface-container rounded-t-xl min-w-[280px]">
                    <div className="flex flex-col items-center">
                      <span className="text-2xl font-headline font-black mb-2">Cape Town</span>
                      <span className="text-xs uppercase tracking-widest text-secondary font-body">South Africa</span>
                    </div>
                  </th>
                </tr>
              </thead>
              <tbody className="text-on-surface font-body">
                {/* Travel Time */}
                <tr>
                  <td className="p-6 border-b border-surface-container-highest">
                    <div className="flex items-center gap-3">
                      <span className="material-symbols-outlined text-secondary">schedule</span>
                      <span className="font-bold text-sm uppercase">Travel Time</span>
                    </div>
                  </td>
                  <td className="p-8 bg-surface-container/50 border-b border-surface-container-highest text-center font-medium">14h 20m</td>
                  <td className="p-8 bg-surface-container-high/50 border-b border-surface-container-highest text-center font-bold text-primary">7h 45m</td>
                  <td className="p-8 bg-surface-container/50 border-b border-surface-container-highest text-center font-medium">11h 10m</td>
                </tr>
                {/* Average Cost */}
                <tr>
                  <td className="p-6 border-b border-surface-container-highest">
                    <div className="flex items-center gap-3">
                      <span className="material-symbols-outlined text-secondary">payments</span>
                      <span className="font-bold text-sm uppercase">Cost Index</span>
                    </div>
                  </td>
                  <td className="p-8 bg-surface-container/50 border-b border-surface-container-highest text-center font-medium">$$$$</td>
                  <td className="p-8 bg-surface-container-high/50 border-b border-surface-container-highest text-center font-medium">$$</td>
                  <td className="p-8 bg-surface-container/50 border-b border-surface-container-highest text-center font-medium">$$$</td>
                </tr>
                {/* Activities */}
                <tr>
                  <td className="p-6 border-b border-surface-container-highest">
                    <div className="flex items-center gap-3">
                      <span className="material-symbols-outlined text-secondary">hiking</span>
                      <span className="font-bold text-sm uppercase">Activities</span>
                    </div>
                  </td>
                  <td className="p-8 bg-surface-container/50 border-b border-surface-container-highest text-center">
                    <span className="block mb-1">Temples, Tea Ceremonies</span>
                    <span className="text-xs text-secondary italic">Spirituality & Tradition</span>
                  </td>
                  <td className="p-8 bg-surface-container-high/50 border-b border-surface-container-highest text-center">
                    <span className="block mb-1">Surfing, Fado, Art</span>
                    <span className="text-xs text-secondary italic">Urban Coastal Chic</span>
                  </td>
                  <td className="p-8 bg-surface-container/50 border-b border-surface-container-highest text-center">
                    <span className="block mb-1">Wine, Safaris, Hiking</span>
                    <span className="text-xs text-secondary italic">Rugged Adventure</span>
                  </td>
                </tr>
                {/* Weather */}
                <tr>
                  <td className="p-6 border-b border-surface-container-highest">
                    <div className="flex items-center gap-3">
                      <span className="material-symbols-outlined text-secondary">wb_sunny</span>
                      <span className="font-bold text-sm uppercase">Weather</span>
                    </div>
                  </td>
                  <td className="p-8 bg-surface-container/50 border-b border-surface-container-highest text-center">
                    <span className="flex items-center justify-center gap-2">18°C <span className="material-symbols-outlined text-sm">cloud</span></span>
                  </td>
                  <td className="p-8 bg-surface-container-high/50 border-b border-surface-container-highest text-center">
                    <span className="flex items-center justify-center gap-2 font-bold text-primary">24°C <span className="material-symbols-outlined text-sm">sunny</span></span>
                  </td>
                  <td className="p-8 bg-surface-container/50 border-b border-surface-container-highest text-center">
                    <span className="flex items-center justify-center gap-2">21°C <span className="material-symbols-outlined text-sm">air</span></span>
                  </td>
                </tr>
                {/* Safety */}
                <tr>
                  <td className="p-6 border-b border-surface-container-highest">
                    <div className="flex items-center gap-3">
                      <span className="material-symbols-outlined text-secondary">verified_user</span>
                      <span className="font-bold text-sm uppercase">Safety</span>
                    </div>
                  </td>
                  <td className="p-8 bg-surface-container/50 border-b border-surface-container-highest text-center">Excellent</td>
                  <td className="p-8 bg-surface-container-high/50 border-b border-surface-container-highest text-center">Very High</td>
                  <td className="p-8 bg-surface-container/50 border-b border-surface-container-highest text-center">Moderate</td>
                </tr>
                {/* Accommodation */}
                <tr>
                  <td className="p-6">
                    <div className="flex items-center gap-3">
                      <span className="material-symbols-outlined text-secondary">bed</span>
                      <span className="font-bold text-sm uppercase">Stay / Night</span>
                    </div>
                  </td>
                  <td className="p-8 bg-surface-container/50 rounded-b-xl text-center">$240 avg.</td>
                  <td className="p-8 bg-surface-container-high/50 rounded-b-xl text-center font-bold text-primary">$130 avg.</td>
                  <td className="p-8 bg-surface-container/50 rounded-b-xl text-center">$185 avg.</td>
                </tr>
              </tbody>
            </table>
          </div>
        </section>

        {/* Visual Pull Quotes & Detail Bento */}
        <section className="grid grid-cols-1 md:grid-cols-12 gap-8 mb-24">
          {/* Pull Quote Card */}
          <div className="md:col-span-4 bg-secondary-container/30 p-10 rounded-xl flex flex-col justify-center">
            <span className="material-symbols-outlined text-secondary text-5xl mb-6">format_quote</span>
            <p className="font-headline italic text-2xl text-on-secondary-container leading-snug">
              Travel isn&apos;t just about the miles; it&apos;s about how the pace of a city matches the beating of your heart.
            </p>
            <div className="mt-8 border-t border-secondary-container pt-4">
              <span className="font-bold uppercase tracking-widest text-xs text-secondary font-body">The Travel Curator</span>
            </div>
          </div>
          {/* Bento Detail 1 */}
          <div className="md:col-span-4 group relative overflow-hidden rounded-xl h-80">
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img src="https://lh3.googleusercontent.com/aida-public/AB6AXuB0LTNkIausm2t1RpDcV-J-hxP2Lw83muoAYIUSll7u1xfOqMFq1GHzs8fkxWzk0DVsioo2wLU4muJRpaTSLiQ61P5t2xCk61EUaYpmPgN74bCG50KLP39IIYzkJpuj71nPFsiuKdwYhICP4MSCfbXk2Ww7Y0cQlHQK6HU1gqpfFljrmkPqwkE6qPIPh7HamFH-VXNUA85dMxMTg41_m9tL2N_Wh2x2YUeGhY57m8yQ3Nlhvvy9aWda7SBCdBrQapaq_NuvIazmS_Z3" alt="Kyoto Zen Garden" className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700" />
            <div className="absolute inset-0 bg-gradient-to-t from-primary/80 to-transparent flex flex-col justify-end p-8">
              <span className="text-white/80 uppercase text-[10px] tracking-[0.2em] mb-1 font-label">Local Vibe</span>
              <h3 className="text-white text-2xl font-bold font-headline">Kyoto Silence</h3>
            </div>
          </div>
          {/* Bento Detail 2 */}
          <div className="md:col-span-4 group relative overflow-hidden rounded-xl h-80">
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img src="https://lh3.googleusercontent.com/aida-public/AB6AXuB-QYMfOQgwNUzl2LUEhFArUJ82eW2hznYHhCB2ugks6O5Dh_uLt3tJ3Ng5tBKeZ3LeEXpwNjj0to4MSDUvdRkxabYx8ffvWF5R5PSNoiyg0XxC9H65cl7HhnUMlv8iMH61csSAV9aWu_gY7_BAcbyk4jy8r13XCDEa97r50y655BSH_Dy9oKA_T6bewVxhdaaOQpFwUEY-kATPadOT44q_m-njHvoRNMpyVAzE31coBKwF_ZKozKVIDUugVAaQIN0wi-AR9R2YAVka" alt="Cape Town Table Mountain" className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700" />
            <div className="absolute inset-0 bg-gradient-to-t from-primary/80 to-transparent flex flex-col justify-end p-8">
              <span className="text-white/80 uppercase text-[10px] tracking-[0.2em] mb-1 font-label">Landscape</span>
              <h3 className="text-white text-2xl font-bold font-headline">The Great Cape</h3>
            </div>
          </div>
        </section>
      </main>

      <Footer />
    </>
  );
}
