export default function Dashboard() {
  return (
    <>
      {/* Main Content Shell */}
      <main className="pt-28 px-6 pb-12 lg:px-12 flex flex-col md:flex-row gap-12 max-w-[1600px] mx-auto">
        {/* Conversation Thread (The Curator) */}
        <section className="flex-1 max-w-3xl space-y-12">
          <header>
            <h2 className="font-headline text-5xl text-primary font-bold leading-tight mb-4">Crafting your <br /><span className="italic text-secondary">Tuscan escape</span>.</h2>
            <p className="text-on-surface-variant text-lg max-w-lg">Generating a 7-day immersion into the Chianti hills, focusing on slow-living and heritage estates.</p>
          </header>

          <div className="space-y-10">
            {/* User Message */}
            <div className="flex justify-end">
              <div className="bg-secondary-container/30 p-6 rounded-xl rounded-tr-none max-w-md">
                <p className="text-on-secondary-fixed-variant">I'd like to focus on boutique wineries that prioritize organic methods. Can we add a day in Siena?</p>
              </div>
            </div>

            {/* AI Response */}
            <div className="flex gap-6 items-start">
              <div className="w-12 h-12 bg-primary flex items-center justify-center rounded-full flex-shrink-0">
                <span className="material-symbols-outlined text-white">auto_awesome</span>
              </div>
              <div className="space-y-6 flex-grow">
                <div className="bg-surface-container-lowest p-8 rounded-xl shadow-sm border border-outline-variant/5">
                  <p className="text-lg leading-relaxed mb-6">Absolutely. Incorporating Siena adds a wonderful medieval contrast to the rolling vineyards. I've curated three organic estates that align with your preference for slow-living.</p>

                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    {/* Citation Cards */}
                    <div className="bg-surface-container-low p-4 rounded-lg flex items-center gap-4 hover:bg-surface-container-high transition-colors group">
                      <div className="w-16 h-16 rounded-lg overflow-hidden flex-shrink-0">
                        {/* eslint-disable-next-line @next/next/no-img-element */}
                        <img className="w-full h-full object-cover" src="https://lh3.googleusercontent.com/aida-public/AB6AXuBRpGINpJlDeZkIxHmt6CSdupqfemg2tv0xsBbaQ-I_r60vQm5VxfYRMjv9Nc3fbrs9iHnYl0s_WPPNwf2YUxCVzwI8tQBB7Wi-M6JOvgQqrZeZGomfuaXEJ4PwcgG1qQvAq9JlIbRX3L3e_r6S_6aBTKkcEI_mXfQBC3lbfFj7PpV15d45ALfpssB_Gsu6zR1wjGlpsVrPnFqaGnOrc2zrNcsHQfTsfxOK2DXGeHrDjLy_rYevwR9yd0g8MfXjh4IWaf2ahlXS-w8M" alt="Grapes in a Tuscan vineyard" />
                      </div>
                      <div>
                        <p className="font-headline text-sm font-bold text-primary">Tenuta Casanuova</p>
                        <p className="text-xs text-secondary italic">Sustainable Viticulture</p>
                      </div>
                      <span className="material-symbols-outlined ml-auto text-outline group-hover:text-primary transition-colors">arrow_outward</span>
                    </div>

                    <div className="bg-surface-container-low p-4 rounded-lg flex items-center gap-4 hover:bg-surface-container-high transition-colors group">
                      <div className="w-16 h-16 rounded-lg overflow-hidden flex-shrink-0">
                        {/* eslint-disable-next-line @next/next/no-img-element */}
                        <img className="w-full h-full object-cover" src="https://lh3.googleusercontent.com/aida-public/AB6AXuAZ1jTTT3SuFL1gbRZZ2frO08qdAWG86Qec8d4h2aCJi53-91aIDsR0gx9kLorN6caLVV880OupgyO_Wc-SWb5Z6Gjd8BoCRFdMi4w3oeaAp8_dJLXHutpgXRvZGmDazRdiqfhWiDuCmy_NNNkENTJBZcupC222AhuZ0qVueqFUnLNLlcRJLNX38biwd6Av8FqDAIcJ4JU-eGL3ZsoyykQa9y3p5TeDvYbzEc77FqwXmSp5B7Rpmozp85DL8uX9IAepXQ6r-9H-0twG" alt="Stone farmhouse in Tuscany" />
                      </div>
                      <div>
                        <p className="font-headline text-sm font-bold text-primary">Villa di Geggiano</p>
                        <p className="text-xs text-secondary italic">Siena Heritage</p>
                      </div>
                      <span className="material-symbols-outlined ml-auto text-outline group-hover:text-primary transition-colors">arrow_outward</span>
                    </div>
                  </div>
                </div>

                {/* Chat Interaction */}
                <div className="relative group">
                  <input className="w-full bg-surface-container-high border-none py-5 px-8 rounded-xl focus:ring-2 focus:ring-surface-tint/20 text-on-surface placeholder:text-outline transition-all" placeholder="Ask about Siena's morning markets..." type="text" />
                  <button className="absolute right-4 top-1/2 -translate-y-1/2 bg-primary text-white p-2 rounded-lg hover:scale-110 transition-transform">
                    <span className="material-symbols-outlined">send</span>
                  </button>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Itinerary Side Panel (The Journal View) */}
        <section className="md:w-96 lg:w-[450px] space-y-8">
          <div className="sticky top-28 bg-surface-container rounded-xl p-8 shadow-sm">
            <div className="flex justify-between items-end mb-10">
              <div>
                <span className="text-secondary font-label text-sm uppercase tracking-widest font-bold">The Journey</span>
                <h3 className="font-headline text-3xl text-primary font-bold italic">Siena &amp; Chianti</h3>
              </div>
              <div className="text-right">
                <span className="text-primary font-bold text-lg">7 Days</span>
              </div>
            </div>

            {/* Vertical Timeline */}
            <div className="relative pl-10 space-y-12 before:content-[''] before:absolute before:left-3 before:top-4 before:bottom-4 before:w-[1px] before:bg-outline-variant/30">
              {/* Day 1 */}
              <div className="relative group">
                <div className="absolute -left-10 top-0 w-7 h-7 rounded-full bg-primary flex items-center justify-center z-10">
                  <span className="text-white text-[10px] font-bold">01</span>
                </div>
                <div className="space-y-4">
                  <h4 className="font-headline text-xl text-primary">Arrival in Gaiole</h4>
                  <div className="rounded-xl overflow-hidden shadow-lg h-48 group-hover:scale-[1.02] transition-transform duration-500">
                    {/* eslint-disable-next-line @next/next/no-img-element */}
                    <img className="w-full h-full object-cover" src="https://lh3.googleusercontent.com/aida-public/AB6AXuAVzbjQr1v39mrA-eaehOHIjXkCc8m0_6FqcX86VjVBaBLYROKw6cj01CBi0SELkxJu9ZOmP_PQuMU-6WROUeXEyW0YG8oDT5J7bBWtiUhe9O9RIJM6xM8ebkI1fAuLYUki3HE2vXRtTI0yFO3r1qWOUeX2DoggaeaymuPUDZkRbELNKzIoYxEJTH-hYRmyESi11Xmwd9o_fGsLl_EcgPyiCVjmz_jWbpyJp4cLWTZeW95qXDs6wg4T95EphifpN7UmrkD72mLwlaH6" alt="Aerial view of village" />
                  </div>
                  <div className="flex gap-2">
                    <span className="bg-tertiary-container/10 text-on-tertiary-fixed-variant px-3 py-1 rounded-full text-xs font-medium">Boutique Hotel</span>
                    <span className="bg-secondary-container/20 text-on-secondary-fixed-variant px-3 py-1 rounded-full text-xs font-medium">Wine Tasting</span>
                  </div>
                </div>
              </div>

              {/* Day 2 */}
              <div className="relative group">
                <div className="absolute -left-10 top-0 w-7 h-7 rounded-full bg-surface-container-highest border border-primary/20 flex items-center justify-center z-10">
                  <span className="text-primary text-[10px] font-bold">02</span>
                </div>
                <div className="space-y-4">
                  <div className="flex justify-between items-center">
                    <h4 className="font-headline text-xl text-primary">Organic Harvest</h4>
                    <span className="material-symbols-outlined text-secondary opacity-0 group-hover:opacity-100 transition-opacity">more_horiz</span>
                  </div>
                  <p className="text-on-surface-variant text-sm leading-relaxed">Morning session at Tenuta Casanuova, followed by a farm-to-table lunch overlooking the valleys.</p>
                </div>
              </div>

              {/* Day 3 */}
              <div className="relative group">
                <div className="absolute -left-10 top-0 w-7 h-7 rounded-full bg-surface-container-highest border border-primary/20 flex items-center justify-center z-10">
                  <span className="text-primary text-[10px] font-bold">03</span>
                </div>
                <div className="space-y-4">
                  <h4 className="font-headline text-xl text-primary">The Siena Pulse</h4>
                  <div className="rounded-xl overflow-hidden h-32 relative group-hover:h-48 transition-all duration-700">
                    {/* eslint-disable-next-line @next/next/no-img-element */}
                    <img className="w-full h-full object-cover grayscale group-hover:grayscale-0 transition-all duration-700" src="https://lh3.googleusercontent.com/aida-public/AB6AXuDi3qp3XMbcACzbCaXYvx606HSWI-39ya-TcgSUo7eju4QVbCA2UklSxlnsch8g_OZP3EstmGL100Joc2HtZ5HVdWU5Bdom96Up9W-MrJdbTQHZGGcLd0eCSjR7GXs4KbDqnx2msCE3LaqZflh42YUbDYGi-rFFUtwAaX_4f58DuclE2iM_QEizvuHTLHC1MoX6zPAbMWPhp630fHc8UmGY8rMueDX7zXAVAcdNEHwCJUUVdZCDUGaAcKVHk2UMkviy-Fq8Y6VIk71S" alt="Siena" />
                    <div className="absolute inset-0 bg-primary/20 group-hover:bg-transparent transition-colors"></div>
                  </div>
                </div>
              </div>
            </div>

            <button className="w-full mt-12 py-5 bg-on-surface text-surface rounded-full font-bold tracking-tight hover:bg-primary transition-colors flex items-center justify-center gap-3">
              Confirm Itinerary
              <span className="material-symbols-outlined">auto_fix_high</span>
            </button>
          </div>
        </section>
      </main>

      {/* Floating Action Element */}
      <div className="fixed bottom-10 right-10 z-50">
        <button className="bg-primary text-white w-16 h-16 rounded-full shadow-2xl flex items-center justify-center hover:scale-110 active:scale-95 transition-all">
          <span className="material-symbols-outlined text-3xl">map</span>
        </button>
      </div>
    </>
  );
}
