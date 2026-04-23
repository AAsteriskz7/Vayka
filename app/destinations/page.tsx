import type { Metadata } from 'next';
import Footer from '../../components/Footer';

export const metadata: Metadata = {
  title: "Destinations",
  description: "Discover curated travel destinations that match your mood, budget, and vibe.",
};

export default function Destinations() {
  return (
    <>
      {/* Main Content Canvas */}
      <main className="pt-32 pb-20 px-6 md:px-12 lg:px-24 max-w-[1600px] mx-auto">
        {/* Header & Search */}
        <header className="mb-16">
          <h1 className="font-headline text-5xl md:text-7xl text-primary leading-tight max-w-3xl mb-8">
            Where the <span className="italic font-normal">organic</span> meets the <span className="text-secondary">extraordinary.</span>
          </h1>

          {/* Filters & Discovery Controls */}
          <div className="flex flex-wrap items-center gap-4">
            <div className="flex items-center gap-2 bg-surface-container-low px-6 py-4 rounded-xl flex-grow max-w-md">
              <span className="material-symbols-outlined text-outline">search</span>
              <input className="bg-transparent border-none focus:ring-0 text-on-surface-variant w-full font-body outline-none" placeholder="Search hidden sanctuaries..." type="text" />
            </div>
            <div className="flex items-center gap-3 overflow-x-auto pb-2 hide-scrollbar">
              <button className="bg-tertiary-container text-on-tertiary px-6 py-3 rounded-full font-label text-sm flex items-center gap-2 whitespace-nowrap">
                <span className="material-symbols-outlined text-base">filter_list</span>
                All Styles
              </button>
              <button className="bg-secondary-container text-on-secondary-fixed-variant px-6 py-3 rounded-full font-label text-sm whitespace-nowrap hover:bg-secondary-fixed transition-colors">Under $2000</button>
              <button className="bg-secondary-container text-on-secondary-fixed-variant px-6 py-3 rounded-full font-label text-sm whitespace-nowrap hover:bg-secondary-fixed transition-colors">Tropical Escape</button>
              <button className="bg-secondary-container text-on-secondary-fixed-variant px-6 py-3 rounded-full font-label text-sm whitespace-nowrap hover:bg-secondary-fixed transition-colors">7-10 Days</button>
            </div>
          </div>
        </header>

        {/* Discovery Masonry Grid */}
        <div className="columns-1 md:columns-2 lg:columns-3 gap-8 space-y-8">
          {/* Destination Card 1 */}
          <div className="break-inside-avoid relative group rounded-xl overflow-hidden shadow-sm hover:shadow-xl transition-all duration-500 w-full aspect-[4/5] mb-4">
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img className="absolute inset-0 w-full h-full object-cover transition-transform duration-700 group-hover:scale-105" src="https://lh3.googleusercontent.com/aida-public/AB6AXuD90HFg7qJzYZlwqaMCsBhyfUIguL8fMm9V-WIjIUfWpUQl_uASbVePJ_R1KFzJTmqk7I_klfcnRGvXeSy5kmMs7fxbEsJk3Bka-3iGawAot7G5U28QIzEnu7TT0AoEu51qJDw3HRghKT3drFVMiNEQMdaZ8lWEBJIaN9VVJFuozkefyZYCcE5H5vEzEHZ-fgNcdbdE__3lfGQnEFqEEUnHk0IFDKgzI-d3bqLxPMN8Y_NTxt61bpSO1PgXsFW2Ak8gFE7ayFGr5g72" alt="minimalist wooden villa in tropical jungle" />
            <div className="absolute inset-0 bg-gradient-to-t from-primary/80 via-transparent to-transparent opacity-60 group-hover:opacity-80 transition-opacity"></div>
            <div className="absolute top-6 left-6 right-6 flex justify-between items-start">
              <span className="bg-white/20 backdrop-blur-md text-white text-[10px] tracking-widest font-bold px-3 py-1 rounded-full uppercase opacity-0 group-hover:opacity-100 transition-all duration-300">Curated Choice</span>
              <button className="material-symbols-outlined text-white p-2 bg-black/10 backdrop-blur-sm rounded-full hover:bg-white hover:text-primary transition-all">bookmark</button>
            </div>
            <div className="absolute bottom-8 left-8 right-8">
              <p className="text-tertiary-fixed font-label text-xs tracking-widest uppercase mb-2">Bali, Indonesia</p>
              <h3 className="font-headline text-3xl text-white leading-tight">Ubud Sanctuaries</h3>
            </div>
          </div>

          {/* Destination Card 2 (Tall) */}
          <div className="break-inside-avoid relative group rounded-xl overflow-hidden shadow-sm hover:shadow-xl transition-all duration-500 w-full aspect-[3/4] mb-4">
             {/* eslint-disable-next-line @next/next/no-img-element */}
            <img className="absolute inset-0 w-full h-full object-cover transition-transform duration-700 group-hover:scale-105" src="https://lh3.googleusercontent.com/aida-public/AB6AXuAvq5BJlA1xYRYkY7VpRSfM7Ls6avsOSh-vt5GLXSUY50cJSRKyC54p_3vfY8e7pSoxoE3KisSc_i3IlGwGsLG91V2efPWF9esP_GDvEwvmYjj4lcklka2g5P2zCLHQpjaac5jecQ0rGJmQ_XDKdGSS0IoJiaPjXb9xMT2NJ7ilEXCwbjWDzFqpjg2vceGDHWbM1pYy0TEerIwPhKmps9RPBuvK3tsThv2Q2NykFop70foaRwWAv9wMiLwyLfNLJ_qdRap7uygRtgjF" alt="aerial view of turquoise ocean lagoons" />
            <div className="absolute inset-0 bg-gradient-to-t from-primary/80 via-transparent to-transparent opacity-60"></div>
            <div className="absolute top-6 right-6">
              <button className="material-symbols-outlined text-white p-2 bg-black/10 backdrop-blur-sm rounded-full hover:bg-white hover:text-primary transition-all">bookmark</button>
            </div>
            <div className="absolute bottom-8 left-8 right-8">
              <p className="text-tertiary-fixed font-label text-xs tracking-widest uppercase mb-2">South Pacific</p>
              <h3 className="font-headline text-3xl text-white leading-tight">Bora Bora Lagoons</h3>
              <div className="mt-4 flex items-center gap-4 opacity-0 group-hover:opacity-100 transition-all duration-500 transform translate-y-2 group-hover:translate-y-0">
                <span className="text-white/80 text-sm font-label flex items-center gap-1"><span className="material-symbols-outlined text-sm">schedule</span> 12 Days</span>
                <span className="text-white/80 text-sm font-label flex items-center gap-1"><span className="material-symbols-outlined text-sm">payments</span> $4.2k</span>
              </div>
            </div>
          </div>

          {/* Destination Card 3 */}
          <div className="break-inside-avoid relative group rounded-xl overflow-hidden shadow-sm hover:shadow-xl transition-all duration-500 w-full aspect-square mb-4">
             {/* eslint-disable-next-line @next/next/no-img-element */}
            <img className="absolute inset-0 w-full h-full object-cover transition-transform duration-700 group-hover:scale-105" src="https://lh3.googleusercontent.com/aida-public/AB6AXuCeUCl1G9j4S0-V0SSIerRGY4VWKY0jR1dPP1YzBXW69gX69kjQt1XHFF1ObIW_JaiCAgo3iZ57NqNdfwhbSTJaMZqw1Vq3QbpzkziA-gs4EREyrk1qSy4hjn4JyV6dVURo76eSQltVUhUL1Q_UJPcafSWJKgcP6rIi6T1rC0b9cEGzOpEg6yJXrbumqhWNNphdaqZUIYO9dQpo0d4_gnJCnBxkiNLF2MrXtwcInBtJZ2XdF0-9FaP7WpmcT_sO1Go-nxHOE21lRFSe" alt="white-washed buildings in Santorini" />
            <div className="absolute inset-0 bg-gradient-to-t from-primary/80 via-transparent to-transparent opacity-60"></div>
            <div className="absolute top-6 right-6">
              <button className="material-symbols-outlined text-white p-2 bg-black/10 backdrop-blur-sm rounded-full hover:bg-white hover:text-primary transition-all">bookmark</button>
            </div>
            <div className="absolute bottom-8 left-8 right-8">
              <p className="text-tertiary-fixed font-label text-xs tracking-widest uppercase mb-2">Cyclades, Greece</p>
              <h3 className="font-headline text-3xl text-white leading-tight">Azure Horizons</h3>
            </div>
          </div>

          {/* Destination Card 4 (Short) */}
          <div className="break-inside-avoid relative group rounded-xl overflow-hidden shadow-sm hover:shadow-xl transition-all duration-500 w-full aspect-video mb-4">
             {/* eslint-disable-next-line @next/next/no-img-element */}
            <img className="absolute inset-0 w-full h-full object-cover transition-transform duration-700 group-hover:scale-105" src="https://lh3.googleusercontent.com/aida-public/AB6AXuA21P2UkM0Y8e-HqOkGJi7qB3m83ID6cIptkYCHtxJ822xvHP9OP1ONBOraty0X9xoob5fTo7eLtEgdoHp0eCXAYd2a79UURsaqc-1PaY2RWeNfbO8qQBKXlx2A0PUc_vMrJP-crbrbEZDT5WxCEHLkdzCloxsUHAhvxTx7tRtXtkewWA8cA6UidiREtg1SeZRjNldU4Iav59zsvd_57cYEiujfhvY4_jIK4c46lFx5ILx-XwicZoSu-6uOEAj3wgcwSH1tyG64ggbn" alt="narrow cobblestone street in Kyoto" />
            <div className="absolute inset-0 bg-gradient-to-t from-primary/80 via-transparent to-transparent opacity-60"></div>
            <div className="absolute bottom-8 left-8 right-8">
              <p className="text-tertiary-fixed font-label text-xs tracking-widest uppercase mb-2">Kyoto, Japan</p>
              <h3 className="font-headline text-2xl text-white leading-tight">Old Town Whispers</h3>
            </div>
          </div>

          {/* Destination Card 5 */}
          <div className="break-inside-avoid relative group rounded-xl overflow-hidden shadow-sm hover:shadow-xl transition-all duration-500 w-full aspect-[4/5] mb-4">
             {/* eslint-disable-next-line @next/next/no-img-element */}
            <img className="absolute inset-0 w-full h-full object-cover transition-transform duration-700 group-hover:scale-105" src="https://lh3.googleusercontent.com/aida-public/AB6AXuBTlCgV7JOF2ZvPymH-1AYF_JRweMJXPmw5AyLwpG5BLHvMpXLWiZ357MXub6yA5Alum3_1__om4F9ihg1va-vYb0L87rnCMwpbEMRc9ING7iaz2_5GYMC4HdezmrkOVL2k8mg4RzJ1bwpgh_iWj4E31f--N8U6fSZNf_BdHeXqZgUPFwV7j-0SG4gxKwlIjDItmJPASCtj-JfWnRseboTLxq10ohhHaC4ceczQcGyYXtfxRX5ptAXiveJ12L60gd5k6eDcEwnEaYx4" alt="lush vertical forest" />
            <div className="absolute inset-0 bg-gradient-to-t from-primary/80 via-transparent to-transparent opacity-60"></div>
            <div className="absolute bottom-8 left-8 right-8">
              <p className="text-tertiary-fixed font-label text-xs tracking-widest uppercase mb-2">Singapore</p>
              <h3 className="font-headline text-3xl text-white leading-tight">Green Metropoles</h3>
            </div>
          </div>

          {/* Destination Card 6 (Tall) */}
          <div className="break-inside-avoid relative group rounded-xl overflow-hidden shadow-sm hover:shadow-xl transition-all duration-500 w-full aspect-[3/4] mb-4">
             {/* eslint-disable-next-line @next/next/no-img-element */}
            <img className="absolute inset-0 w-full h-full object-cover transition-transform duration-700 group-hover:scale-105" src="https://lh3.googleusercontent.com/aida-public/AB6AXuCYM45N4riCr5rCjETuLKptx-2okkrQ8jSqThgP9AyC4-i-PE9E55W8fIzjFUXzKJdxmS0J2llCQqAdcCdhiZBjsMzv22cH0VhhidjxTHNyBzORH6R7ulAcoxXJZCOXsoE8Z4QJxGcD_IWIhdhIi5KhVXOe8uU2DvtcKThTyTDinkAXjFvy__DhA58CLQjJRE8OIwZqC7jkNZyOZyjuDJc7_rx9C7eC2Rp84SMwd1M4fhDs4n5JbxZwiWTOO6-9a8FSMeW9NWR3bYgE" alt="lone traveler walking through vast golden sand desert dunes" />
            <div className="absolute inset-0 bg-gradient-to-t from-primary/80 via-transparent to-transparent opacity-60"></div>
            <div className="absolute bottom-8 left-8 right-8">
              <p className="text-tertiary-fixed font-label text-xs tracking-widest uppercase mb-2">Namibia, Africa</p>
              <h3 className="font-headline text-3xl text-white leading-tight">Sands of Silence</h3>
              <p className="mt-4 text-white/70 font-body text-sm line-clamp-2 opacity-0 group-hover:opacity-100 transition-all duration-500">Discover the world's oldest desert where the dunes meet the Atlantic ocean in a dramatic display of nature.</p>
            </div>
          </div>
        </div>

        {/* Featured Section (Editorial Layout) */}
        <section className="mt-40 grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
          <div className="lg:col-span-5 order-2 lg:order-1">
            <span className="text-secondary font-label font-bold tracking-[0.2em] uppercase text-sm block mb-4">The Curator's Note</span>
            <h2 className="font-headline text-4xl md:text-6xl text-primary mb-8 leading-[1.1]">The art of finding <span className="italic font-normal">nothing.</span></h2>
            <p className="text-on-surface-variant font-body text-lg leading-relaxed mb-10">
              We believe travel isn't about checking boxes, but about unlearning schedules. Our algorithm prioritizes "Human Density" in reverse—showing you the places where the only footprints in the sand are yours.
            </p>
            <div className="flex items-center gap-6">
              <button className="bg-primary text-white px-8 py-4 rounded-xl font-label font-bold text-sm tracking-wide hover:shadow-lg transition-shadow flex items-center gap-3 group">
                Start New Trip
                <span className="material-symbols-outlined group-hover:translate-x-1 transition-transform">arrow_forward</span>
              </button>
              <button className="text-primary font-label font-bold text-sm flex items-center gap-2 hover:opacity-70 transition-opacity">
                Read the Journal
              </button>
            </div>
          </div>
          <div className="lg:col-span-7 order-1 lg:order-2 relative">
            <div className="bg-surface-container-high rounded-xl aspect-[4/5] md:aspect-video relative overflow-hidden">
               {/* eslint-disable-next-line @next/next/no-img-element */}
              <img className="w-full h-full object-cover" src="https://lh3.googleusercontent.com/aida-public/AB6AXuB4m5BGAZGYs2QKzsp-5S3YiSnHB1lc-spsOwtwtcCnpowVsaNQUP6rRy00f8BGQO7C3FJ7nwwTOISYt2R3K_eFimZ1gcOjYd4OlKnRKgUOWoyHtlCJXlx7N5uVQElREzyfNGi2ulL_d2z2j1QYeRJkIBeYBd5JLWNrjaesk4u1fP7VVfj0bK5eooUHM5Y8rkdkX4HLZU9T9haynn1zfLQzk9JEqTVy2gaGCu7I_eYrxcDO-hoYcxZ7TsjSwLMO6YHIXn0SinSmwh7Y" alt="person sitting by mountain lake" />
              {/* Overlapping Glass Card */}
              <div className="absolute bottom-10 -left-6 md:-left-12 bg-white/40 backdrop-blur-2xl p-8 rounded-xl shadow-2xl max-w-xs border border-white/20 ml-12 lg:ml-0">
                <span className="material-symbols-outlined text-primary-container mb-4 scale-150 transform transition">auto_stories</span>
                <h4 className="font-headline text-xl text-primary mb-2">The Hidden Valley</h4>
                <p className="text-on-surface-variant text-sm font-body leading-snug">A photographic essay on the quietest corners of the Swiss Alps.</p>
                <div className="mt-6 pt-6 border-t border-primary/10">
                  <p className="text-xs font-label text-secondary uppercase tracking-widest">Published 12 Oct</p>
                </div>
              </div>
            </div>
          </div>
        </section>
      </main>

      {/* FAB (Contextual) */}
      <div className="fixed bottom-10 right-10 z-40 hidden md:block">
        <button className="bg-primary text-white w-16 h-16 rounded-full flex items-center justify-center shadow-2xl hover:scale-105 transition-transform group">
          <span className="material-symbols-outlined text-3xl group-hover:rotate-90 transition-transform">add</span>
        </button>
      </div>

      <Footer />
    </>
  );
}
