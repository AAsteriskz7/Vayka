import Footer from '../../../components/Footer';

export default function ItineraryDetail() {
  return (
    <>
      <main className="pt-24 pb-32 px-6 md:px-12 max-w-[1600px] mx-auto min-h-screen">
        <div className="flex flex-col lg:flex-row gap-12 items-start">
          {/* Left Sidebar: Trip Summary Panel */}
          <aside className="w-full lg:w-[380px] space-y-8 sticky top-24">
            <section className="bg-surface-container-lowest p-8 rounded-xl shadow-[0px_20px_40px_rgba(26,28,26,0.06)] relative overflow-hidden flex-shrink-0">
              <div className="absolute top-0 right-0 w-32 h-32 bg-secondary-container/20 rounded-full -mr-16 -mt-16 blur-3xl"></div>
              <h2 className="text-3xl font-headline font-black text-primary mb-6 leading-tight">Coastal Serenity in Amalfi</h2>
              
              <div className="space-y-6 flex-shrink-0">
                <div className="flex items-center gap-4">
                  <div className="p-3 bg-surface-container rounded-full text-primary flex-shrink-0">
                    <span className="material-symbols-outlined">location_on</span>
                  </div>
                  <div>
                    <p className="text-xs font-bold uppercase tracking-widest text-secondary">Destination</p>
                    <p className="text-on-surface font-semibold">Positano, Italy</p>
                  </div>
                </div>
                
                <div className="flex items-center gap-4">
                  <div className="p-3 bg-surface-container rounded-full text-primary flex-shrink-0">
                    <span className="material-symbols-outlined">calendar_today</span>
                  </div>
                  <div>
                    <p className="text-xs font-bold uppercase tracking-widest text-secondary">Dates</p>
                    <p className="text-on-surface font-semibold">Sep 12 — Sep 19, 2024</p>
                  </div>
                </div>
                
                <div className="flex items-center gap-4">
                  <div className="p-3 bg-surface-container rounded-full text-primary flex-shrink-0">
                    <span className="material-symbols-outlined">payments</span>
                  </div>
                  <div>
                    <p className="text-xs font-bold uppercase tracking-widest text-secondary">Budget</p>
                    <p className="text-on-surface font-semibold">$4,500 Total</p>
                  </div>
                </div>
                
                <div className="flex items-center gap-4">
                  <div className="p-3 bg-surface-container rounded-full text-primary flex-shrink-0">
                    <span className="material-symbols-outlined">sailing</span>
                  </div>
                  <div>
                    <p className="text-xs font-bold uppercase tracking-widest text-secondary">Travel Type</p>
                    <p className="text-on-surface font-semibold">Luxury / Leisure</p>
                  </div>
                </div>
              </div>
              
              <div className="mt-10 pt-8 border-t border-outline-variant/15 space-y-4">
                <h3 className="text-lg font-bold text-primary">Cost Breakdown</h3>
                <div className="flex justify-between items-center text-sm">
                  <span className="text-on-surface-variant">Lodging</span>
                  <span className="font-bold">$2,800</span>
                </div>
                <div className="flex justify-between items-center text-sm">
                  <span className="text-on-surface-variant">Food & Dining</span>
                  <span className="font-bold">$1,200</span>
                </div>
                <div className="flex justify-between items-center text-sm">
                  <span className="text-on-surface-variant">Misc & Experiences</span>
                  <span className="font-bold">$500</span>
                </div>
                <div className="w-full bg-surface-container h-2 rounded-full mt-4 overflow-hidden flex">
                  <div className="bg-primary h-full w-[60%]"></div>
                  <div className="bg-tertiary-container h-full w-[25%]"></div>
                  <div className="bg-secondary-fixed-dim h-full w-[15%]"></div>
                </div>
              </div>
            </section>
            
            {/* Export Options */}
            <div className="flex flex-col gap-3">
              <button className="w-full bg-gradient-to-br from-primary to-primary-container text-white py-4 rounded-xl font-bold flex items-center justify-center gap-3 shadow-lg hover:shadow-primary/20 transition-all">
                <span className="material-symbols-outlined">save</span>
                Save Trip
              </button>
              <div className="grid grid-cols-2 gap-3">
                <button className="bg-secondary-container text-on-secondary-container py-3 rounded-xl font-semibold text-sm flex items-center justify-center gap-2 hover:bg-secondary-fixed transition-colors">
                  <span className="material-symbols-outlined text-lg">download</span>
                  PDF
                </button>
                <button className="bg-secondary-container text-on-secondary-container py-3 rounded-xl font-semibold text-sm flex items-center justify-center gap-2 hover:bg-secondary-fixed transition-colors">
                  <span className="material-symbols-outlined text-lg">share</span>
                  Share
                </button>
              </div>
            </div>
          </aside>

          {/* Right Content: Itinerary Builder */}
          <div className="flex-1 space-y-12">
            <header className="flex justify-between items-end">
              <div>
                <h1 className="text-5xl font-headline font-black text-primary mb-4 tracking-tighter">Your Itinerary</h1>
                <p className="text-secondary font-medium max-w-xl font-body">A curated week of Mediterranean sun, world-class cuisine, and clifftop adventures, optimized for relaxation.</p>
              </div>
              <div className="hidden md:flex gap-2 p-1 bg-surface-container rounded-full">
                <button className="px-6 py-2 bg-white rounded-full text-sm font-bold shadow-sm">Timeline</button>
                <button className="px-6 py-2 text-sm font-medium text-secondary">Map View</button>
              </div>
            </header>
            
            <div className="space-y-16">
              {/* Day 1 */}
              <div className="relative pl-8">
                <div className="absolute left-0 top-0 bottom-0 w-[1px] bg-outline-variant/30"></div>
                <div className="absolute left-[-6px] top-0 w-3 h-3 rounded-full bg-primary ring-4 ring-surface"></div>
                <div className="mb-8">
                  <span className="text-xs font-black tracking-widest text-primary uppercase">Day 01 — Sunday, Sep 12</span>
                  <h2 className="text-3xl font-headline font-bold text-primary mt-1">The Arrival at the Coast</h2>
                </div>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  {/* Activity Card */}
                  <div className="bg-surface-container-low p-6 rounded-xl space-y-4 hover:translate-y-[-4px] transition-transform duration-300">
                    <div className="flex justify-between items-start">
                      <span className="px-4 py-1 bg-tertiary-container/10 text-tertiary-container text-[10px] font-bold uppercase rounded-full">10:00 AM</span>
                      <span className="material-symbols-outlined text-secondary text-sm">more_horiz</span>
                    </div>
                    <h4 className="font-bold font-body text-lg">Naples Private Transfer</h4>
                    <p className="text-sm font-body text-on-surface-variant leading-relaxed">Luxury chauffeur from NAP Airport through the scenic Sorrento pass to your clifftop villa.</p>
                    <div className="flex items-center gap-2 text-xs text-secondary font-semibold">
                      <span className="material-symbols-outlined text-sm">info</span>
                      Confirmed: Booking #A882
                    </div>
                  </div>
                  {/* Activity Card with Image */}
                  <div className="bg-surface-container-lowest rounded-xl overflow-hidden shadow-sm hover:shadow-md transition-shadow group">
                    <div className="h-40 overflow-hidden">
                      {/* eslint-disable-next-line @next/next/no-img-element */}
                      <img className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500" src="https://lh3.googleusercontent.com/aida-public/AB6AXuDkYQJXHD8CJnLFPNIa4gsMezvjfRMzPc-sho9jt-ChDx8SKPvYDmNFQoDBt4lfgVk1nrv9lTw_p2YYYhntTqxMMel9J4heaeRY1KlPWR4NbW3gJ0BER6BlXTzEjdPibEf8ovzey5kH-dAnWaZeYRVJ_pejp8AeRQH1ClTR2tbgdKJ5KG8GHHQVen4XaRKEKeOuOPRSFJUFO80_L65IBPb57jA6CxXjI2eKrVqkPyu3eKlh-RFr3D7c3tmD41iWxoTUKdPofUFAQXiz" alt="Amalfi Coast view" />
                    </div>
                    <div className="p-6 space-y-3">
                      <div className="flex justify-between items-start">
                        <span className="px-4 py-1 bg-tertiary-container/10 text-tertiary-container text-[10px] font-bold uppercase rounded-full">02:00 PM</span>
                      </div>
                      <h4 className="font-bold font-body text-lg">Villa check-in & Welcome Spritz</h4>
                      <p className="text-sm font-body text-on-surface-variant leading-relaxed">Refresh at Le Sirenuse. Valet will handle your luggage while you enjoy terrace views.</p>
                    </div>
                  </div>
                </div>
                {/* AI Suggestion Prompt */}
                <div className="mt-8 p-6 bg-tertiary-fixed/10 rounded-xl border-2 border-dashed border-tertiary-fixed/30 flex gap-6 items-center">
                  <div className="w-12 h-12 rounded-full bg-tertiary-container text-white flex items-center justify-center shrink-0">
                    <span className="material-symbols-outlined" style={{ fontVariationSettings: "'FILL' 1" }}>auto_awesome</span>
                  </div>
                  <div className="flex-1">
                    <p className="text-sm font-bold text-tertiary">AI SUGGESTION</p>
                    <p className="text-sm text-on-tertiary-fixed-variant">I noticed a gap in your evening. Would you like a reservation at <strong>Da Adolfo</strong>? It's highly rated for sunset dining.</p>
                  </div>
                  <button className="px-6 py-2 bg-tertiary-container text-white text-xs font-bold rounded-full">Add to Day 1</button>
                </div>
              </div>
              
              {/* Day 2 */}
              <div className="relative pl-8">
                <div className="absolute left-0 top-0 bottom-0 w-[1px] bg-outline-variant/30"></div>
                <div className="absolute left-[-6px] top-0 w-3 h-3 rounded-full bg-outline-variant"></div>
                <div className="mb-8">
                  <span className="text-xs font-black tracking-widest text-secondary uppercase">Day 02 — Monday, Sep 13</span>
                  <h2 className="text-3xl font-headline font-bold text-primary mt-1">Limone & Leather</h2>
                </div>
                <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                  <div className="md:col-span-2 bg-surface-container-low p-6 rounded-xl flex gap-6">
                    <div className="w-24 h-24 rounded-lg bg-surface-container overflow-hidden shrink-0">
                      {/* eslint-disable-next-line @next/next/no-img-element */}
                      <img className="w-full h-full object-cover" src="https://lh3.googleusercontent.com/aida-public/AB6AXuCv9fKHWk2WRsZVwK54ny5jahGvzim74WNct_WITXrg8eZ187mt-uRbJIRheX59mkOVSaLGiJZ0QvbNGFOFnTfEBff7azw9J_pYgCMnjx7XZ5f6WYvW1HMXGnuBxTYFqtNxpniZ_Hj9MZkg2X5U9_TTctk_ACQ6XtUg7pkpPByQfRq_1gd5bSJqsghyxIYsMlQySMVV6InuYw6YMrMRUEGtD4Wy8GenT-9MEYp8GcR_K7RHZyAkLVbP3MqOnRcA8uwr0hCgsLyBOweL" alt="Italian Lemons" />
                    </div>
                    <div className="space-y-2">
                      <span className="px-4 py-1 bg-tertiary-container/10 text-tertiary-container text-[10px] font-bold uppercase rounded-full">09:00 AM</span>
                      <h4 className="font-bold text-lg font-body">Amalfi Lemon Grove Tour</h4>
                      <p className="text-sm font-body text-on-surface-variant">A private walking tour through the 'Sfusato Amalfitano' gardens followed by limoncello tasting.</p>
                    </div>
                  </div>
                  <div className="bg-surface-container-low p-6 rounded-xl flex flex-col justify-between">
                    <div className="space-y-3">
                      <span className="px-4 py-1 bg-tertiary-container/10 text-tertiary-container text-[10px] font-bold uppercase rounded-full">01:00 PM</span>
                      <h4 className="font-bold text-lg font-body">Custom Sandal Fitting</h4>
                      <p className="text-sm font-body text-on-surface-variant">La Botteguccia artisan workshop.</p>
                    </div>
                    <div className="pt-4 border-t border-outline-variant/10 text-xs font-bold text-primary">
                      $85.00 Estimated
                    </div>
                  </div>
                </div>
              </div>
              
              {/* Add Day Placeholder */}
              <button className="w-full py-6 rounded-xl border-2 border-dashed border-outline-variant/30 flex flex-col items-center justify-center gap-2 group hover:border-primary/30 transition-colors">
                <div className="w-10 h-10 rounded-full bg-surface-container flex items-center justify-center group-hover:bg-primary group-hover:text-white transition-all">
                  <span className="material-symbols-outlined">add</span>
                </div>
                <span className="text-sm font-bold text-secondary">Add New Day</span>
              </button>
            </div>
          </div>
        </div>
      </main>

      {/* Floating Action Button */}
      <button className="fixed bottom-10 right-10 md:bottom-20 md:right-12 w-16 h-16 bg-gradient-to-br from-primary to-primary-container text-white rounded-full shadow-2xl flex items-center justify-center scale-100 active:scale-90 transition-transform z-40">
        <span className="material-symbols-outlined text-3xl">add</span>
      </button>

      <Footer />
    </>
  );
}
