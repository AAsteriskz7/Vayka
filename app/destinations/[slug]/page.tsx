import Footer from '../../../components/Footer';

export default function DestinationDetail() {
  return (
    <>
      <main className="pt-24 pb-32 max-w-[1600px] mx-auto">
        {/* Hero Section */}
        <section className="px-6 md:px-12 mb-16">
          <div className="relative h-[716px] w-full rounded-xl overflow-hidden group">
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img className="w-full h-full object-cover scale-105 group-hover:scale-100 transition-transform duration-700" src="https://lh3.googleusercontent.com/aida-public/AB6AXuBusBd0fE0Xx3GFxjMZCnevW4d6EEq-yGbDVXiH2AO28EOXxVEsNIkvQ1nfAxS5szjtAYwedxCWguAIcJNYnXVXxpo5p8CrDKw_6fLtoiaO_ZAiQm55DHfxAIRso2gF9A7w3A8eSxz3axfSsD-DGutTgYEjXqtlq7rwPpxFyOBQf-9iWL8iwkeq4pKzxsgMRQga-QmPPJ82e9vS1HAxyOtRDQqMQTFFpPCx9XzQuqIZLpBJUpxQVeeEjdCdoiCzfkIowFEBSn_BpWQ7" alt="emerald green rice terraces in Bali" />
            <div className="absolute inset-0 bg-gradient-to-t from-primary/80 via-transparent to-transparent flex flex-col justify-end p-8 md:p-16">
              <span className="text-white/80 font-label tracking-widest uppercase text-sm mb-4">Hidden Paradise</span>
              <h1 className="text-5xl md:text-8xl text-white font-headline font-bold italic tracking-tight mb-6">Ubud, Bali</h1>
              <div className="flex flex-wrap gap-4">
                <button className="bg-primary-container text-white px-8 py-4 rounded-xl font-bold flex items-center gap-2 hover:shadow-lg transition-all active:scale-95">
                  Add to Trip Plan
                  <span className="material-symbols-outlined">add_circle</span>
                </button>
                <button className="bg-white/20 backdrop-blur-md text-white border border-white/30 px-8 py-4 rounded-xl font-bold hover:bg-white/30 transition-all active:scale-95">
                  Compare
                </button>
              </div>
            </div>
          </div>
        </section>

        {/* Content Grid: Asymmetrical Layout */}
        <div className="px-6 md:px-12 grid grid-cols-1 md:grid-cols-12 gap-12">
          {/* Left Column: Overview & Logistics */}
          <div className="md:col-span-7 space-y-16">
            {/* Description */}
            <article>
              <h2 className="text-4xl font-headline font-bold text-primary mb-8 leading-tight">The Spiritual Heart of the Island</h2>
              <p className="text-xl text-on-surface-variant leading-relaxed font-body">
                Nestled among lush rice paddies and steep ravines, Ubud is the cultural core of Bali. Beyond the vibrant marketplace and the Sacred Monkey Forest, you'll find a sanctuary for artists, yogis, and seekers of serenity. It's a place where ancient stone carvings breathe under moss and the scent of incense lingers in the humid morning air.
              </p>
            </article>

            {/* Logistics Bento */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
              <div className="bg-surface-container p-8 rounded-xl space-y-4">
                <span className="material-symbols-outlined text-primary text-4xl">schedule</span>
                <h3 className="text-xl font-bold text-primary">Best Time</h3>
                <p className="text-on-secondary-container">April to October. The dry season offers clear skies for trekking and photography.</p>
              </div>
              <div className="bg-secondary-container p-8 rounded-xl space-y-4">
                <span className="material-symbols-outlined text-on-secondary-container text-4xl">shield_with_heart</span>
                <h3 className="text-xl font-bold text-on-secondary-container">Safety Notes</h3>
                <p className="text-on-secondary-container/80">Generally very safe. Watch out for monkeys at the sanctuary and stay hydrated.</p>
              </div>
              <div className="bg-tertiary-container text-white p-8 rounded-xl col-span-full flex flex-col md:flex-row gap-8 items-center">
                <div className="flex-1 space-y-2">
                  <h3 className="text-2xl font-bold">Local Customs</h3>
                  <p className="opacity-80">Dress modestly (sarongs required) when entering temples. Respect the daily 'Canang Sari' offerings on the ground.</p>
                </div>
                <span className="material-symbols-outlined text-6xl opacity-20">temple_hindu</span>
              </div>
            </div>

            {/* Transportation & Costs */}
            <section className="bg-surface-container-low p-10 rounded-xl">
              <h3 className="text-3xl font-headline font-bold text-primary mb-8">Travel Logistics</h3>
              <div className="space-y-6">
                <div className="flex items-start gap-4">
                  <div className="w-12 h-12 bg-white rounded-full flex items-center justify-center shadow-sm flex-shrink-0">
                    <span className="material-symbols-outlined text-primary">directions_car</span>
                  </div>
                  <div>
                    <h4 className="font-bold">Private Driver</h4>
                    <p className="text-on-surface-variant">Recommended for day trips. ~$35 - $50 USD per day.</p>
                  </div>
                </div>
                <div className="flex items-start gap-4">
                  <div className="w-12 h-12 bg-white rounded-full flex items-center justify-center shadow-sm flex-shrink-0">
                    <span className="material-symbols-outlined text-primary">moped</span>
                  </div>
                  <div>
                    <h4 className="font-bold">Scooter Rental</h4>
                    <p className="text-on-surface-variant">Best for local agility. ~$5 - $8 USD per day.</p>
                  </div>
                </div>

                <div className="pt-6 border-t border-outline-variant/30 mt-6">
                  <div className="flex justify-between items-center mb-2">
                    <span className="text-on-surface-variant">Average Daily Spend</span>
                    <span className="text-2xl font-black text-primary">$45 - $120</span>
                  </div>
                  <div className="w-full bg-surface-variant h-2 rounded-full overflow-hidden">
                    <div className="bg-primary h-full w-2/3"></div>
                  </div>
                </div>
              </div>
            </section>
          </div>

          {/* Right Column: Stay & Itinerary */}
          <div className="md:col-span-5 space-y-12">
            {/* Neighborhood Suggestions */}
            <div className="bg-surface-container-lowest p-8 rounded-xl shadow-[0px_20px_40px_rgba(26,28,26,0.06)]">
              <h3 className="text-2xl font-headline font-bold text-primary mb-6">Where to Stay</h3>
              <div className="space-y-6">
                <div className="group cursor-pointer">
                  <div className="h-40 rounded-lg overflow-hidden mb-3">
                     {/* eslint-disable-next-line @next/next/no-img-element */}
                    <img className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500" src="https://lh3.googleusercontent.com/aida-public/AB6AXuBNkPNdxmeGNTnziJpVIUBwZxlWXyYMpB9-v8uL5ogUvcUTJIutSVMYVBhBxsEGkLXBB5M_th8bVBmrSxhEOMJn52Xz4brpeUe3ICu94LVyy7MUytDVP1ZtTr00VYBYk8gGQxwlkeJeg_IHWCqjzw1ML6OhlxmWXW9MImhc1oXSx-UYZwP4rt5oVsYKs4nl9ptAZbNJwo_dbuzBIJlG6QPf3KezC1JVhxkpxCOn5LJ1YWC0cZxRs3KpB2nwzLt6VOIk_nxYKQrrwlF4" alt="Jungle Villa" />
                  </div>
                  <h4 className="font-bold text-lg">Tegalalang Valley</h4>
                  <p className="text-sm text-on-surface-variant">Quiet, luxury villas with dramatic views. Perfect for honeymooners.</p>
                </div>
                <div className="group cursor-pointer">
                  <div className="h-40 rounded-lg overflow-hidden mb-3">
                     {/* eslint-disable-next-line @next/next/no-img-element */}
                    <img className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500" src="https://lh3.googleusercontent.com/aida-public/AB6AXuDJSdCA-_mgYf821h91fmjvarKDJDQJlLZvdJH14dSiW0piUEUd7SgLPLtAMKraZaEj6vEryUUTqiNisFAF-Apygz3riZiLfbUpbL87Cxx0rcxbqpy5N7gUsjlnUBATRayC7rz9brSKuXVcPb_OQnqsWNmmHk8Ym6xhlbyZvbD0dfUfk4U4r2X6pV95eQFXwEOTHJH1id118JykJbCpbmCJzYoJS1F6LZn-Y7qf52u9Sl5K9I8Bzz5YP5gXp50Kfk7zvfj35mZVxRS2" alt="Boutique Hotel" />
                  </div>
                  <h4 className="font-bold text-lg">Ubud Center</h4>
                  <p className="text-sm text-on-surface-variant">Walkable to cafes, spas, and markets. Ideal for solo travelers.</p>
                </div>
              </div>
            </div>

            {/* Itinerary Suggestion */}
            <div className="relative bg-primary text-white p-10 rounded-xl overflow-hidden">
              <div className="relative z-10">
                <span className="inline-block px-3 py-1 bg-tertiary-container text-white text-[10px] tracking-widest uppercase rounded-full mb-4">Curated Plan</span>
                <h3 className="text-3xl font-headline font-black italic mb-6">The 3-Day Essential</h3>
                <ul className="space-y-6">
                  <li className="flex gap-4">
                    <span className="text-primary-fixed-dim font-black text-xl italic">01</span>
                    <div>
                      <p className="font-bold">Sunrise at Campuhan Ridge</p>
                      <p className="text-sm opacity-70">Followed by breakfast at a jungle cafe.</p>
                    </div>
                  </li>
                  <li className="flex gap-4">
                    <span className="text-primary-fixed-dim font-black text-xl italic">02</span>
                    <div>
                      <p className="font-bold">Artisan Workshops</p>
                      <p className="text-sm opacity-70">Learn silver smithing or traditional painting.</p>
                    </div>
                  </li>
                  <li className="flex gap-4">
                    <span className="text-primary-fixed-dim font-black text-xl italic">03</span>
                    <div>
                      <p className="font-bold">Spiritual Water Temple</p>
                      <p className="text-sm opacity-70">Purification ritual at Tirta Empul.</p>
                    </div>
                  </li>
                </ul>
                <button className="mt-8 w-full py-4 bg-white text-primary rounded-full font-bold hover:bg-primary-fixed transition-colors">
                  Download Full Itinerary
                </button>
              </div>
              {/* Abstract Shape Decor */}
              <div className="absolute -bottom-10 -right-10 w-40 h-40 bg-tertiary rounded-full opacity-50 blur-3xl"></div>
            </div>
          </div>
        </div>
      </main>

      {/* Map Section Bleed */}
      <section className="mb-24 px-6 md:px-0 max-w-[1600px] mx-auto">
        <div className="h-[400px] w-full md:rounded-none rounded-xl overflow-hidden grayscale contrast-125 hover:grayscale-0 transition-all duration-1000">
           {/* eslint-disable-next-line @next/next/no-img-element */}
          <img className="w-full h-full object-cover" src="https://lh3.googleusercontent.com/aida-public/AB6AXuAyIMvHrbt_Ne_7xBhCmi1MtwjHXJQeTv09V5DK0wm9MF0Ae0FeDCiilj2dFU3Cxt6bilKCWouGg-Jf5wA7UuJV57P2rvObe1ll1d0LYjtvJx3sD__8n54yzprDQt42ITzn8yQ-dD1ZbvIrQzN6mh8eTX5_Ce5AydIYUTTvw7DaETSB5ZKVEGw7tJ1BWYlyPlGL3nna6DsZ1IwOdPbO6iXgcSCkMDbucuvh6yWGuryTlOLF-SD0Tr2ZWUlGeVCV0nVci6Wi3rkb9mJf" alt="Map Location" />
        </div>
      </section>

      <Footer />
    </>
  );
}
