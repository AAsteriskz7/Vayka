import Link from 'next/link';
import Footer from '../../../components/Footer';

export default function SearchResults() {
  return (
    <>
      {/* Main Content Canvas */}
      <main className="pt-32 pb-24 px-6 md:px-12 max-w-[1600px] mx-auto min-h-screen">
        {/* Page Header */}
        <header className="mb-16 max-w-4xl">
          <h1 className="text-5xl md:text-7xl font-black text-primary leading-tight tracking-tight mb-4">
            Your Next Destination
          </h1>
          <p className="text-lg text-secondary font-medium tracking-wide">
            Search Results: 14 Curated Experiences Found
          </p>
        </header>

        <div className="flex flex-col lg:flex-row gap-12">
          {/* Sidebar Filters */}
          <aside className="w-full lg:w-72 shrink-0">
            <div className="sticky top-32 space-y-12">
              {/* Budget Filter */}
              <section>
                <h3 className="text-sm font-label font-bold uppercase tracking-widest text-secondary mb-6">Budget</h3>
                <div className="space-y-4">
                  <label className="flex items-center gap-4 group cursor-pointer">
                    <div className="w-6 h-6 rounded-lg bg-surface-container flex items-center justify-center group-hover:bg-secondary-container transition-colors">
                      <span className="material-symbols-outlined text-sm hidden group-aria-checked:block" style={{ fontVariationSettings: "'FILL' 1" }}>check</span>
                    </div>
                    <span className="text-on-surface-variant font-medium">Economy</span>
                  </label>
                  <label className="flex items-center gap-4 group cursor-pointer">
                    <div className="w-6 h-6 rounded-lg bg-tertiary-container flex items-center justify-center">
                      <span className="material-symbols-outlined text-sm text-white" style={{ fontVariationSettings: "'FILL' 1" }}>check</span>
                    </div>
                    <span className="text-primary font-bold">Standard</span>
                  </label>
                  <label className="flex items-center gap-4 group cursor-pointer">
                    <div className="w-6 h-6 rounded-lg bg-surface-container flex items-center justify-center group-hover:bg-secondary-container transition-colors"></div>
                    <span className="text-on-surface-variant font-medium">Luxury</span>
                  </label>
                </div>
              </section>

              {/* Travel Time */}
              <section>
                <h3 className="text-sm font-label font-bold uppercase tracking-widest text-secondary mb-6">Travel time</h3>
                <div className="space-y-3">
                  <div className="h-1 w-full bg-surface-container-highest rounded-full overflow-hidden relative">
                    <div className="absolute left-0 top-0 h-full bg-primary-container w-2/3 rounded-full"></div>
                  </div>
                  <div className="flex justify-between text-xs font-bold text-secondary">
                    <span>1 HR</span>
                    <span>12+ HRS</span>
                  </div>
                </div>
              </section>

              {/* Activity Type */}
              <section>
                <h3 className="text-sm font-label font-bold uppercase tracking-widest text-secondary mb-6">Activity type</h3>
                <div className="flex flex-wrap gap-2">
                  <span className="px-4 py-2 bg-tertiary-container text-on-tertiary-container rounded-full text-xs font-bold cursor-pointer">Adventure</span>
                  <span className="px-4 py-2 bg-surface-container text-secondary rounded-full text-xs font-bold hover:bg-surface-container-high cursor-pointer transition-colors">Cultural</span>
                  <span className="px-4 py-2 bg-surface-container text-secondary rounded-full text-xs font-bold hover:bg-surface-container-high cursor-pointer transition-colors">Nature</span>
                  <span className="px-4 py-2 bg-surface-container text-secondary rounded-full text-xs font-bold hover:bg-surface-container-high cursor-pointer transition-colors">Culinary</span>
                </div>
              </section>

              {/* Region */}
              <section>
                <h3 className="text-sm font-label font-bold uppercase tracking-widest text-secondary mb-6">Region</h3>
                <div className="relative">
                  <select className="w-full bg-surface-container border-0 rounded-xl py-4 px-4 text-primary font-bold focus:ring-2 focus:ring-surface-tint/20 transition-all appearance-none cursor-pointer outline-none">
                    <option>Scandinavia</option>
                    <option>Mediterranean</option>
                    <option>Southeast Asia</option>
                    <option>Patagonia</option>
                  </select>
                  <span className="material-symbols-outlined absolute right-4 top-1/2 -translate-y-1/2 pointer-events-none text-primary">expand_more</span>
                </div>
              </section>
            </div>
          </aside>

          {/* Results Grid (Masonry Aesthetic) */}
          <div className="flex-1">
            <div className="masonry-grid relative z-10">
              
              {/* Destination Card 1 */}
              <Link href="/destinations/lofoten" className="masonry-item-tall flex flex-col group">
                <div className="relative flex-1 rounded-xl overflow-hidden mb-6 bg-surface-container-low shadow-sm">
                  {/* eslint-disable-next-line @next/next/no-img-element */}
                  <img alt="Lofoten Islands" className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110" src="https://lh3.googleusercontent.com/aida-public/AB6AXuAuFu1P719pF93_EI1H-k3JGWJFpUBcmNQdpMAhCdPtQ4t2hfSu5yc5zWgmliV-5fsDpp5YM9ZKwKO9I7gHGyCf_tjgJ_y2Mk73xy3y_Seahs594GEkZ5lK4JvBiM2fAdmDRj8fp2TeJmdtyL0GrAheNKo2CicJWpQ5Uer86C1g6ATmAv9FmwGTG-RLWrE785gnMX5UeQKz2UW6d3fXo--mh6o5Zh84Kc9hKQwAXsDag0Q9d6ZQxXVdN-sMeqa8slu8Dh_sdLHwyAkf" />
                  <div className="absolute top-6 right-6 px-4 py-2 bg-white/80 backdrop-blur-md rounded-full text-[10px] font-bold uppercase tracking-widest text-primary shadow-sm">
                    Trending
                  </div>
                </div>
                <div className="px-2">
                  <div className="flex justify-between items-start mb-2">
                    <h2 className="text-3xl font-black text-primary">Lofoten, Norway</h2>
                    <span className="material-symbols-outlined text-primary group-hover:translate-x-2 transition-transform duration-300">arrow_forward</span>
                  </div>
                  <div className="flex gap-4 mb-4 text-xs font-bold text-secondary uppercase tracking-tighter">
                    <span>2,400 KM away</span>
                    <span>Est. $1,800</span>
                  </div>
                  <div className="flex flex-wrap gap-2">
                    <span className="text-xs text-on-surface-variant bg-surface-container px-3 py-1 rounded-full">Hiking</span>
                    <span className="text-xs text-on-surface-variant bg-surface-container px-3 py-1 rounded-full">Aurora Hunting</span>
                  </div>
                </div>
              </Link>

              {/* Destination Card 2 */}
              <Link href="/destinations/kyoto" className="masonry-item-short flex flex-col group">
                <div className="relative flex-1 rounded-xl overflow-hidden mb-6 bg-surface-container-low shadow-sm">
                  {/* eslint-disable-next-line @next/next/no-img-element */}
                  <img alt="Kyoto Temples" className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110" src="https://lh3.googleusercontent.com/aida-public/AB6AXuB8nfMq_ChUXQDkD-pKVZCX3t5Y40ZNDimt_AVg-CgVFH71Xh713K5W4M6Fi5A9RfRg61v3czQSH9ATiUBSDh51lCLrpvxh4t8BF6K4Br8ITYSrt2F0UfhvaOmMyMB8KJARzlkmTVfZ4I3vfC0_vzHBZHKnv71bBKJcHzn8eMr-gxOcFm2yTePb7HkJoHKn1i28rFmxeUD058A_0wQS261mU8Tmm4Eu022ZLcb41zQzesE3GhsJsi6iBh2p-_AY2YYIiLViDiIc1wHO" />
                </div>
                <div className="px-2">
                  <div className="flex justify-between items-start mb-2">
                    <h2 className="text-3xl font-black text-primary">Kyoto, Japan</h2>
                    <span className="material-symbols-outlined text-primary group-hover:translate-x-2 transition-transform duration-300">arrow_forward</span>
                  </div>
                  <div className="flex gap-4 mb-4 text-xs font-bold text-secondary uppercase tracking-tighter">
                    <span>9,200 KM away</span>
                    <span>Est. $2,200</span>
                  </div>
                  <div className="flex flex-wrap gap-2">
                    <span className="text-xs text-on-surface-variant bg-surface-container px-3 py-1 rounded-full">Shrines</span>
                    <span className="text-xs text-on-surface-variant bg-surface-container px-3 py-1 rounded-full">Tea Rituals</span>
                  </div>
                </div>
              </Link>

              {/* Destination Card 3 */}
              <Link href="/destinations/tuscany" className="masonry-item flex flex-col group">
                <div className="relative flex-1 rounded-xl overflow-hidden mb-6 bg-surface-container-low shadow-sm">
                  {/* eslint-disable-next-line @next/next/no-img-element */}
                  <img alt="Tuscany Hills" className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110" src="https://lh3.googleusercontent.com/aida-public/AB6AXuCoZCsLKdLYUX9eTUVc5EPCjxU7Z19ga7tnINTgXhIRctYTs4QTlew6Stm3jZLqjYYF-p-EiED_VcE0ny5989chCxkMtP-o94dmpaj5W2NSAI5MYBQUzTDv5mKxXgsi2J0zGum4PLaPm_TWTXjawaM9tNEGYVKp_aizfNuGofMUkNZ8u6Vx0GWnh0fezy3drzmY4sCo7UhWlk8dRaxshJCKPcscW-bT3gEwxOFHkiZ7DJvW_Up-hWOesBlN83xFYt3upHqMQZKi-EFP" />
                </div>
                <div className="px-2">
                  <div className="flex justify-between items-start mb-2">
                    <h2 className="text-3xl font-black text-primary">Tuscany, Italy</h2>
                    <span className="material-symbols-outlined text-primary group-hover:translate-x-2 transition-transform duration-300">arrow_forward</span>
                  </div>
                  <div className="flex gap-4 mb-4 text-xs font-bold text-secondary uppercase tracking-tighter">
                    <span>1,200 KM away</span>
                    <span>Est. $1,400</span>
                  </div>
                  <div className="flex flex-wrap gap-2">
                    <span className="text-xs text-on-surface-variant bg-surface-container px-3 py-1 rounded-full">Wine Tasting</span>
                    <span className="text-xs text-on-surface-variant bg-surface-container px-3 py-1 rounded-full">Cycling</span>
                  </div>
                </div>
              </Link>

              {/* Destination Card 4 */}
              <Link href="/destinations/ubud" className="masonry-item-tall flex flex-col group">
                <div className="relative flex-1 rounded-xl overflow-hidden mb-6 bg-surface-container-low shadow-sm">
                  {/* eslint-disable-next-line @next/next/no-img-element */}
                  <img alt="Bali Jungle" className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110" src="https://lh3.googleusercontent.com/aida-public/AB6AXuAqRVNHQVTQz3x-lXQoQ87dUWF_lJwUvnGzhnqvaMGYJVDr2fRATgvHIivx6uqjNcJY6fNs6GF1LPcf7DAaIInE04Xylq_T0aBnO7YooKb5g_Dt3eTZOp6ASlwqjUTHzm9yFB-ShL-DskuNXDGprLn7z6IuLzjek21H3H-dCj6QY-TtPeB1IwdNKUWFPumROd-s5gK-ouvo9Ty-QN3L_VS2Bqk-0qz_sF6hXvbbqLOQBoQpzs6x0WkQDQAmLfJ_y3u7VO2J7Nb_qTCy" />
                </div>
                <div className="px-2">
                  <div className="flex justify-between items-start mb-2">
                    <h2 className="text-3xl font-black text-primary">Ubud, Bali</h2>
                    <span className="material-symbols-outlined text-primary group-hover:translate-x-2 transition-transform duration-300">arrow_forward</span>
                  </div>
                  <div className="flex gap-4 mb-4 text-xs font-bold text-secondary uppercase tracking-tighter">
                    <span>12,000 KM away</span>
                    <span>Est. $950</span>
                  </div>
                  <div className="flex flex-wrap gap-2">
                    <span className="text-xs text-on-surface-variant bg-surface-container px-3 py-1 rounded-full">Yoga</span>
                    <span className="text-xs text-on-surface-variant bg-surface-container px-3 py-1 rounded-full">Spiritual</span>
                  </div>
                </div>
              </Link>

              {/* Destination Card 5 */}
              <Link href="/destinations/santorini" className="masonry-item flex flex-col group">
                <div className="relative flex-1 rounded-xl overflow-hidden mb-6 bg-surface-container-low shadow-sm">
                  {/* eslint-disable-next-line @next/next/no-img-element */}
                  <img alt="Santorini Coast" className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110" src="https://lh3.googleusercontent.com/aida-public/AB6AXuC4VubQuqqa22iLxHqoYBhmVQ7WkM2cIW5FoKRDOARHS2WuHZt6i6mNZ4yBjOxf8OSy7_IYdJzUKzJgrZgXPADe7gb_AfQvtJio0wUe2NcE0zGHFLIC-6dlve-CyuhTc3ivL-7sS4ZflEkIbH__LAvwyePzBGC6sDca6eKgUEWYQSG_7Sc8-2J99oFca22-Ayj0VsV2WhNkPpaNKMMtMa2AVAw5IvXfOYF-RbGw_g95fY93I8p0VqH-PbvS3ceUNjt8gPWIkgM62OUc" />
                </div>
                <div className="px-2">
                  <div className="flex justify-between items-start mb-2">
                    <h2 className="text-3xl font-black text-primary">Santorini, Greece</h2>
                    <span className="material-symbols-outlined text-primary group-hover:translate-x-2 transition-transform duration-300">arrow_forward</span>
                  </div>
                  <div className="flex gap-4 mb-4 text-xs font-bold text-secondary uppercase tracking-tighter">
                    <span>2,100 KM away</span>
                    <span>Est. $1,900</span>
                  </div>
                  <div className="flex flex-wrap gap-2">
                    <span className="text-xs text-on-surface-variant bg-surface-container px-3 py-1 rounded-full">Sunset Sails</span>
                    <span className="text-xs text-on-surface-variant bg-surface-container px-3 py-1 rounded-full">Dining</span>
                  </div>
                </div>
              </Link>

            </div>
          </div>
        </div>
      </main>
      
      <Footer />
    </>
  );
}
