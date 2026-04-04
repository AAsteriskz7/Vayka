import Footer from '../../components/Footer';

export default function Chat() {
  return (
    <>
      <main className="flex-1 pt-24 pb-32 md:pb-8 px-4 md:px-8 max-w-[1600px] mx-auto w-full grid grid-cols-1 lg:grid-cols-12 gap-8 min-h-[calc(100vh-80px)]">
        {/* Left Column: Chat Window */}
        <section className="lg:col-span-7 flex flex-col h-full gap-6">
          <div className="flex-1 flex flex-col bg-surface-container-low rounded-xl overflow-hidden relative p-6 md:p-8">
            
            {/* Chat Feed */}
            <div className="flex-1 overflow-y-auto space-y-8 pr-4 custom-scrollbar">
              {/* AI Response */}
              <div className="flex gap-4 items-start max-w-[85%]">
                <div className="w-10 h-10 rounded-full bg-primary flex items-center justify-center shrink-0">
                  <span className="material-symbols-outlined text-white text-sm" style={{ fontVariationSettings: "'FILL' 1" }}>auto_awesome</span>
                </div>
                <div className="space-y-3">
                  <div className="bg-surface-container-lowest p-6 rounded-xl rounded-tl-none shadow-sm text-on-surface leading-relaxed">
                    <p className="mb-4">Based on your preference for artisanal markets and medieval architecture, <strong className="font-bold">Bruges</strong> would be a perfect addition to your Belgian trip. It&apos;s often called the &quot;Venice of the North&quot; and offers a much more intimate atmosphere than Brussels.</p>
                    <div className="flex flex-wrap gap-2 mt-4">
                      <span className="px-3 py-1 bg-surface-container rounded-full text-[10px] font-bold uppercase tracking-wider text-secondary flex items-center gap-1">
                        <span className="material-symbols-outlined text-[14px]">menu_book</span> Source: Visit Flanders
                      </span>
                      <span className="px-3 py-1 bg-surface-container rounded-full text-[10px] font-bold uppercase tracking-wider text-secondary flex items-center gap-1">
                        <span className="material-symbols-outlined text-[14px]">map</span> Dist: 1hr from Brussels
                      </span>
                    </div>
                  </div>
                </div>
              </div>

              {/* User Message */}
              <div className="flex gap-4 items-start flex-row-reverse ml-auto max-w-[85%]">
                <div className="w-10 h-10 rounded-full overflow-hidden shrink-0">
                  {/* eslint-disable-next-line @next/next/no-img-element */}
                  <img src="https://lh3.googleusercontent.com/aida-public/AB6AXuBtSwqVoNL_yG94KukW87DxFyTWJ_yjobc1hhneQYx4hURXG5szHNhbD8lnZITjGBubfJ-233lUf2oLBgpPkFmQBHr9C0yQ2lIWTat9zQ-rggOs02iswRQz0bsC-1gdXq9Y-Tmn_fDn3tOJAd-tXrG8uzDQrSntdSOrKCUY_gsOpR4z_Oke3WDDzpTkeChiFSG76VmA0szcSviY71zISZzTa3FPCMKWMK7VceXywuDpxQyqGQUSDkC5zZ4W-eFiyMuAE2iUIH0d3yEu" alt="Profile" className="w-full h-full object-cover" />
                </div>
                <div className="bg-primary text-white p-5 rounded-xl rounded-tr-none shadow-md">
                  <p>Is Brussels far from where I am right now? I&apos;m currently in Ghent.</p>
                </div>
              </div>

              {/* AI Response with Cards */}
              <div className="flex gap-4 items-start max-w-[90%]">
                <div className="w-10 h-10 rounded-full bg-primary flex items-center justify-center shrink-0">
                  <span className="material-symbols-outlined text-white text-sm" style={{ fontVariationSettings: "'FILL' 1" }}>auto_awesome</span>
                </div>
                <div className="space-y-4">
                  <div className="bg-surface-container-lowest p-6 rounded-xl rounded-tl-none shadow-sm text-on-surface">
                    <p className="mb-4">Brussels is very accessible from Ghent! Here are your best options:</p>
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                      <div className="p-4 bg-surface-variant/30 rounded-lg flex items-center gap-3">
                        <span className="material-symbols-outlined text-primary">train</span>
                        <div>
                          <p className="text-xs font-bold text-secondary uppercase tracking-tight">Train</p>
                          <p className="text-sm font-semibold">35-40 mins</p>
                        </div>
                      </div>
                      <div className="p-4 bg-surface-variant/30 rounded-lg flex items-center gap-3">
                        <span className="material-symbols-outlined text-primary">directions_car</span>
                        <div>
                          <p className="text-xs font-bold text-secondary uppercase tracking-tight">Drive</p>
                          <p className="text-sm font-semibold">55 mins</p>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            {/* Input Area */}
            <div className="mt-6 space-y-4">
              {/* Suggested Prompts */}
              <div className="flex gap-2 overflow-x-auto pb-2 no-scrollbar">
                <button className="shrink-0 px-4 py-2 bg-white text-on-surface text-sm font-medium rounded-full border border-outline-variant/20 hover:bg-surface-container-high transition-colors">Is Brussels far from where I am?</button>
                <button className="shrink-0 px-4 py-2 bg-white text-on-surface text-sm font-medium rounded-full border border-outline-variant/20 hover:bg-surface-container-high transition-colors">Best chocolate in Ghent?</button>
                <button className="shrink-0 px-4 py-2 bg-white text-on-surface text-sm font-medium rounded-full border border-outline-variant/20 hover:bg-surface-container-high transition-colors">Train schedules</button>
              </div>

              {/* Main Input */}
              <div className="relative group">
                <textarea className="w-full bg-surface-container-lowest border-none rounded-xl p-5 pr-16 focus:ring-2 focus:ring-surface-tint/20 min-h-[80px] resize-none text-on-surface placeholder:text-stone-400" placeholder="Ask anything about your Belgian adventure..."></textarea>
                <button className="absolute right-4 bottom-4 w-10 h-10 bg-primary-container text-on-primary-container rounded-full flex items-center justify-center hover:scale-105 active:scale-95 transition-all shadow-lg">
                  <span className="material-symbols-outlined">arrow_upward</span>
                </button>
              </div>
            </div>
            
          </div>
        </section>

        {/* Right Column: Context Panel */}
        <aside className="lg:col-span-5 flex flex-col gap-6 overflow-y-auto pr-2 custom-scrollbar">
          {/* Trip Context Card */}
          <div className="bg-white rounded-xl p-8 shadow-[0px_20px_40px_rgba(26,28,26,0.04)] space-y-6">
            <div className="flex justify-between items-center">
              <h2 className="font-headline text-2xl font-bold text-primary italic">Trip Context</h2>
              <span className="material-symbols-outlined text-secondary">tune</span>
            </div>
            <div className="space-y-4">
              <div className="flex items-center gap-4">
                <div className="w-10 h-10 rounded-full bg-secondary-container flex items-center justify-center shrink-0">
                  <span className="material-symbols-outlined text-on-secondary-container">calendar_today</span>
                </div>
                <div>
                  <p className="text-[10px] font-bold text-secondary uppercase tracking-widest leading-none">Dates</p>
                  <p className="text-sm font-semibold mt-1">Oct 12 - Oct 19, 2024</p>
                </div>
              </div>
              <div className="flex items-center gap-4">
                <div className="w-10 h-10 rounded-full bg-secondary-container flex items-center justify-center shrink-0">
                  <span className="material-symbols-outlined text-on-secondary-container">payments</span>
                </div>
                <div>
                  <p className="text-[10px] font-bold text-secondary uppercase tracking-widest leading-none">Budget</p>
                  <p className="text-sm font-semibold mt-1">€2,500 Total (Mid-range)</p>
                </div>
              </div>
              <div className="flex items-center gap-4">
                <div className="w-10 h-10 rounded-full bg-secondary-container flex items-center justify-center shrink-0">
                  <span className="material-symbols-outlined text-on-secondary-container">person_pin_circle</span>
                </div>
                <div>
                  <p className="text-[10px] font-bold text-secondary uppercase tracking-widest leading-none">Preferences</p>
                  <div className="flex flex-wrap gap-2 mt-2">
                    <span className="text-xs px-2 py-1 bg-tertiary-container/10 text-tertiary-container rounded-md font-medium">Art History</span>
                    <span className="text-xs px-2 py-1 bg-tertiary-container/10 text-tertiary-container rounded-md font-medium">Biking</span>
                    <span className="text-xs px-2 py-1 bg-tertiary-container/10 text-tertiary-container rounded-md font-medium">Eco-friendly</span>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Saved Destinations Masonry */}
          <div className="space-y-4">
            <h3 className="font-headline text-xl font-bold text-primary">Saved Destinations</h3>
            <div className="grid grid-cols-2 gap-4">
              <div className="group relative bg-surface-container rounded-xl overflow-hidden aspect-[4/5] shadow-sm hover:shadow-lg transition-all">
                {/* eslint-disable-next-line @next/next/no-img-element */}
                <img src="https://lh3.googleusercontent.com/aida-public/AB6AXuCwKX8f2eJplTu6xnPIgdZ-7rNf0nBRI1LLOH4q09s5ZDYqsh2hcdUbSHGQIgJWYI_K85ZBiYaFn1wpwib8-NEneCq_V0d7m1Al1M-7xxY5Z3MLaOs-UzvLwWGpc46GJsOwCQO_sgxf1j6iW_55Eqgl-ssIeJdtCFiqpnWGUYKl8mZYAu2iZg_aHOr5jD2BRAv0G1kixHOPFWq59wkgs4pX631n7FhMsG3M8VmkCmOzBpKJ9VSWIvwBmqnrTxIxNKscEkHeOmfrefSR" alt="Bruges" className="w-full h-full object-cover" />
                <div className="absolute inset-0 bg-gradient-to-t from-primary/80 to-transparent flex flex-col justify-end p-4">
                  <p className="text-white font-bold">Bruges</p>
                  <p className="text-white/70 text-xs">Recommended Addition</p>
                </div>
              </div>
              <div className="group relative bg-surface-container rounded-xl overflow-hidden aspect-[1/1] mt-4 shadow-sm hover:shadow-lg transition-all">
                {/* eslint-disable-next-line @next/next/no-img-element */}
                <img src="https://lh3.googleusercontent.com/aida-public/AB6AXuAgtErECCzcCMjSQJ_2fPjtiQbBtLSKB4vsyMTNPc-vYWs05Sqz4qKLH_LAEJZmAa0AMJG86s9wnCpDm2eqD17Z9aiFB4WXnNkuY22sDww32uW-xNn2gGizuMCkel6IkL2U8OtWnazIaptAry-A53e9n0dHdC6MIQac9_on8We3fTDx2fLACQL_TwfFmlIZhEPq6AOtYvTg721XoaxpLLtuxaVcOST3Ax801rJW8m-eMpquhYnZcTWmxUBcqgLkehRD9_X0NGtZhz0j" alt="Brussels" className="w-full h-full object-cover" />
                <div className="absolute inset-0 bg-gradient-to-t from-primary/80 to-transparent flex flex-col justify-end p-4">
                  <p className="text-white font-bold">Brussels</p>
                  <p className="text-white/70 text-xs">Primary Base</p>
                </div>
              </div>
            </div>
          </div>

          {/* Travel Constraints */}
          <div className="bg-surface-container-high rounded-xl p-6 border-l-4 border-tertiary">
            <div className="flex items-center gap-2 mb-3">
              <span className="material-symbols-outlined text-tertiary">warning</span>
              <h4 className="font-bold text-sm text-tertiary">Current Constraints</h4>
            </div>
            <ul className="space-y-2 text-sm text-secondary">
              <li className="flex items-center gap-2">• Last train from Ghent to Brussels: 23:45</li>
              <li className="flex items-center gap-2">• Sunday market closures in Antwerp</li>
            </ul>
          </div>

          {/* Action Buttons */}
          <div className="grid grid-cols-1 gap-3 pt-4 pb-12">
            <button className="w-full py-4 bg-gradient-to-br from-primary to-primary-container text-white rounded-xl font-bold flex items-center justify-center gap-2 shadow-xl hover:opacity-90 active:scale-95 transition-all">
              <span className="material-symbols-outlined">add_task</span>
              Add to Trip Plan
            </button>
            <div className="flex gap-3">
              <button className="flex-1 py-3 bg-secondary-container text-on-secondary-container rounded-xl font-bold text-sm flex items-center justify-center gap-2 hover:bg-secondary-fixed-dim transition-colors">
                <span className="material-symbols-outlined text-lg">compare_arrows</span>
                Compare
              </button>
              <button className="flex-1 py-3 bg-white text-primary rounded-xl font-bold text-sm flex items-center justify-center gap-2 border-outline-variant/10 shadow-sm hover:bg-surface-container transition-colors">
                <span className="material-symbols-outlined text-lg">bookmark</span>
                Save Response
              </button>
            </div>
          </div>
        </aside>
      </main>

      {/* Added global styles for the scrollbars in this layout */}
      <style dangerouslySetInnerHTML={{
        __html: `
        .custom-scrollbar::-webkit-scrollbar {
          width: 4px;
        }
        .custom-scrollbar::-webkit-scrollbar-track {
          background: transparent;
        }
        .custom-scrollbar::-webkit-scrollbar-thumb {
          background: #e3e2e0;
          border-radius: 10px;
        }
        .no-scrollbar::-webkit-scrollbar {
          display: none;
        }
      `}} />
    </>
  );
}
