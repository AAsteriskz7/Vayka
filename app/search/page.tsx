import Link from 'next/link';
import type { Metadata } from 'next';
import Footer from '../../components/Footer';
import SearchForm from '../../components/SearchForm';

export const metadata: Metadata = {
  title: "Find Destinations",
  description: "Search for your next travel destination with AI-powered filters for budget, vibe, and region.",
};

export default function Search() {
  return (
    <>
      <main className="relative pt-24 pb-32">
        {/* Hero Section */}
        <section className="px-6 md:px-12 lg:px-24 mb-16">
          <div className="relative w-full h-[614px] rounded-xl overflow-hidden shadow-2xl">
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img 
              alt="Coastal landscape" 
              className="absolute inset-0 w-full h-full object-cover" 
              src="https://lh3.googleusercontent.com/aida-public/AB6AXuDz-miC5JYt-DgavXJTXMc1opmbDH5tt0Ph_QWuNyLZmiOPJVS0MNxWo7yOGwWoB731kZIac2iPzgvZjVtQSsYu358KqlifU5o6KPls9R3saAZZRg5gYYIKra0K64AW5GjyurlfmBn7KVN7APYQDI59FQVBSyWzatgfvkh-TrXe1amU0IXzTcJ8mxuFqfjVuM9eaH0BNH0grRw0VU2AiTSRV0-tPX6vjV4EceV57FP3-cFmMNmhsW4U8otSvYDbox7FHu5HP8RYS7vq" 
            />
            <div className="absolute inset-0 bg-gradient-to-t from-primary/60 to-transparent"></div>
            <div className="absolute inset-0 flex flex-col items-center justify-center text-center p-6">
              <h1 className="text-5xl md:text-7xl font-black text-white italic tracking-tight mb-4 drop-shadow-lg">
                Where to next?
              </h1>
              <p className="text-white/90 max-w-xl text-lg md:text-xl font-light">
                Let AI curate your perfect journey based on your mood, budget, and timing.
              </p>
            </div>
          </div>
        </section>

        {/* Search Discovery Tool (Floating Bento-ish Form) */}
        <section className="max-w-5xl mx-auto px-6 -mt-32 relative z-10">
          <div className="bg-surface-container-lowest glass-panel p-8 md:p-12 rounded-xl shadow-[0px_40px_80px_rgba(26,28,26,0.1)]">
            <SearchForm />
          </div>
        </section>

        {/* Inspirations (Asymmetric Masonry) */}
        <section className="max-w-7xl mx-auto px-6 mt-24">
          <div className="flex items-baseline justify-between mb-12">
            <h2 className="text-4xl font-black text-primary">Trending Now</h2>
            <Link href="/destinations" className="text-secondary font-semibold hover:underline decoration-tertiary-fixed-dim underline-offset-8">
              View All
            </Link>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            
            {/* Large Vertical Card */}
            <div className="md:row-span-2 flex flex-col group cursor-pointer">
              <div className="relative rounded-xl overflow-hidden flex-1 min-h-[400px]">
                {/* eslint-disable-next-line @next/next/no-img-element */}
                <img alt="Luxury resort" className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700" src="https://lh3.googleusercontent.com/aida-public/AB6AXuCLJG9JQCAOE8McyqlT3sZv7UtmYapXknrr-svRlXLRQ7wK0EtDrP8-0R8SckuoB4aIiGFNGag3d5GTnKxbWoulA5_OmFnTDNt5qcbfdYAg3MlafJw2cD2yZx7tYO46HN7C8NFCZ1rgxzGyiS_2rSbVmuzB77szpz2pdsAOTCa1VcQnH2SLQw_At1FTH7hGxrPufI82iih7s0obn0P23vUpNCkGXSQaIFraz-vKfHeSwSKvD8o2B8hHVjT-R8Hs9MRH93OOvqKyvdp_" />
                <div className="absolute inset-0 bg-gradient-to-t from-black/40 to-transparent"></div>
                <div className="absolute bottom-6 left-6">
                  <span className="bg-tertiary-fixed text-on-tertiary-fixed text-xs font-bold px-3 py-1 rounded-full uppercase tracking-tighter mb-2 inline-block shadow-sm">Recommended</span>
                  <h3 className="text-2xl font-bold text-white shadow-sm">Bali Serenity</h3>
                </div>
              </div>
            </div>

            {/* Medium Top Card */}
            <div className="flex flex-col group cursor-pointer">
              <div className="relative rounded-xl overflow-hidden h-[300px]">
                {/* eslint-disable-next-line @next/next/no-img-element */}
                <img alt="Swiss mountains" className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700" src="https://lh3.googleusercontent.com/aida-public/AB6AXuC2gt4aBzdWAWiaOeB60wEBWzGREifEFiONxNG7B5yPMJwF2m5lVe-UvmdWARcR-IoLdNEnT-qnFCI0nj3_TtkT1z1OxJXnMWNegI6wtXAjIzvP-6GiWbGKHzfdvvJHsw9KYaqfRWhfkgGCi2FFAWrZcdQr4FdzCFudXkzVwv_o_n3qcFaAfduw4HAqBXCkz1u0IaDjlqqUGaZl5LeO8Xt3ar9rb6054XUampZZkFs-OSPmXCmc7-ygvv4MJxsVs3AWMh3IK_ur4TRW" />
                <div className="absolute inset-0 bg-gradient-to-t from-black/40 to-transparent"></div>
                <div className="absolute bottom-6 left-6">
                  <h3 className="text-2xl font-bold text-white shadow-sm">Alpine Escape</h3>
                </div>
              </div>
            </div>

            {/* Medium Top Card 2 */}
            <div className="flex flex-col group cursor-pointer">
              <div className="relative rounded-xl overflow-hidden h-[300px]">
                {/* eslint-disable-next-line @next/next/no-img-element */}
                <img alt="Kyoto street" className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700" src="https://lh3.googleusercontent.com/aida-public/AB6AXuC3SQ4srCHMxW1XMkqjMRUqAjNVDVo7omuTbSaApemOXX1XrtCyWJpLbDTfEdzmAx82Cops6DkO8AFR_8b5fM4l30tw9Rut_6X0VjhzuNaZOYUEszvR9mz58Dm36SV6GRwf2pIzzS7ebTGcuxKa3TtGudwePxODnph5miBfrObKyFUMpqgz_re7UZQGQYvopQjk5VVDaxvyIrwOEqcDZa6f1dr4TIy3oGT95BGFnCDWHH71xB1fOCOW_TOjU-O5EFm6MGRc-FUqpoN5" />
                <div className="absolute inset-0 bg-gradient-to-t from-black/40 to-transparent"></div>
                <div className="absolute bottom-6 left-6">
                  <h3 className="text-2xl font-bold text-white shadow-sm">Kyoto Nights</h3>
                </div>
              </div>
            </div>

            {/* Wide Card */}
            <div className="md:col-span-2 flex flex-col group cursor-pointer">
              <div className="relative rounded-xl overflow-hidden h-[300px]">
                {/* eslint-disable-next-line @next/next/no-img-element */}
                <img alt="Taj Mahal" className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700" src="https://lh3.googleusercontent.com/aida-public/AB6AXuAkdm0vRZ_hG-027FsdopBqahZ-KL4IPK9bSU3S1anaSRsRDowHEKsezQ3Z7quxHQQZW9PEDwxtmOFhG06nK6Wkvtf4YHNmW9hoE0Y305hVrFJoJpbqOGi49Vq6ShCNLa1bXIVXZG1QJs6qqE_poMUDls3jhhAEPBLpiFr7PSN68dTpcTwCzFf4JVrxne2P0kD_-WflNQvUXQscRrGwDuijWwPu0hwzPZhAECZS_tq1GpQnehxoYnPkBcy-ud6pBpR-PtyH26Zi310e" />
                <div className="absolute inset-0 bg-gradient-to-t from-black/40 to-transparent"></div>
                <div className="absolute bottom-6 left-6">
                  <h3 className="text-2xl font-bold text-white shadow-sm">The Golden Route</h3>
                </div>
              </div>
            </div>

          </div>
        </section>
      </main>

      <Footer />

      <style dangerouslySetInnerHTML={{
        __html: `
        .glass-panel {
          backdrop-filter: blur(24px);
          -webkit-backdrop-filter: blur(24px);
        }
      `}} />
    </>
  );
}
