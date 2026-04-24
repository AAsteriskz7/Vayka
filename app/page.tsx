import Footer from '../components/Footer';
import Link from 'next/link';
import HeroSearchForm from '../components/HeroSearchForm';

export default function Home() {
  return (
    <>
      <main className="pt-32 pb-24 overflow-x-hidden">
        {/* Hero Section: Beyond Search */}
        <section className="max-w-screen-2xl mx-auto px-12 mb-32">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-16 items-center">
            {/* Left: Chatbot Input */}
            <div className="lg:col-span-5 space-y-10 z-10">
              <div className="space-y-4">
                <span className="inline-block px-4 py-1.5 rounded-full bg-tertiary-fixed text-on-tertiary-fixed-variant text-xs font-bold tracking-widest uppercase shadow-sm">The Fluid Curator</span>
                <h1 className="font-headline text-6xl lg:text-7xl leading-tight font-black text-primary tracking-tight">Beyond Search. <br/><span className="italic text-on-primary-container font-normal">Into Discovery.</span></h1>
                <p className="text-secondary text-lg max-w-md leading-relaxed">Let Vayka bridge the gap between your wanderlust and the world&apos;s best-kept secrets.</p>
              </div>
              <HeroSearchForm />
            </div>
            {/* Right: Overlapping Organic Image */}
            <div className="lg:col-span-7 relative">
              <div className="relative w-full aspect-[4/3] organic-shape-1 overflow-hidden shadow-2xl">
                {/* eslint-disable-next-line @next/next/no-img-element */}
                <img className="w-full h-full object-cover scale-110" alt="Dreamy landscape of misty mountains in Bali at sunrise with lush green palm trees and soft orange sky" src="https://lh3.googleusercontent.com/aida-public/AB6AXuAlru85wh2RRvOMR2s9Fw-W68mYGt8mytH3wk9kGvKTgBuY6DQuxQGIGDenUiWFp8IJgD6GuJESK_1nZutLA6TN5gnFjMzhfwKFIswYrc6-o58o2IXcWHiWMcCzVO9rYR7ImMHHWrz8EpA2eOzEnJm7uzbDh5_0Tt1hObCcfVE2Mky7gj1e1B7fN5pw1FS0oyzhHlZtY0ue34sTvAQ5ZBGxZGccHfvF0WkyVLIs2oD6-AQz7RDb-rc830mz_HmbzH-IRVvx3vj2oFw"/>
              </div>
              {/* Overlapping Decorative Elements */}
              <div className="absolute -bottom-10 -left-10 w-64 h-80 rounded-xl overflow-hidden border-[12px] border-background shadow-xl">
                {/* eslint-disable-next-line @next/next/no-img-element */}
                <img className="w-full h-full object-cover" alt="Close up of a luxury tropical resort pool overlooking the ocean during golden hour" src="https://lh3.googleusercontent.com/aida-public/AB6AXuDhMB4kVT6lRvB03DI_l-V7qjX-ddkzfc6YINPsQSHNzSzpJizQA4HCVeSUV8JTIbh90W37BV4WS4dsXVwoT8a_-MlS4OHj4-97WDcugcY031b1f-yJGShgs-rSLNlsEwUoqKRoUSEFINkOoVSx3ehlbb3magncs-lPQSFWoEn8bHXp87rRujwQ_P2NGN5PT4gxqHNmWKyI3aRMj25DK7r8vyTVEkQVQQOOCMDMpPSMgw_AV7xGpFaPgf1QCqI6rntwamx3AFgxApg"/>
              </div>
              <div className="absolute top-1/4 -right-12 bg-surface-container-lowest/80 backdrop-blur-xl p-6 rounded-xl shadow-2xl max-w-[200px]">
                <div className="flex items-center gap-3 mb-2">
                  <div className="w-8 h-8 rounded-full bg-tertiary-fixed-dim flex items-center justify-center">
                    <span className="material-symbols-outlined text-on-tertiary-fixed-variant text-sm">auto_awesome</span>
                  </div>
                  <span className="text-xs font-bold uppercase tracking-tighter">AI Insight</span>
                </div>
                <p className="text-xs text-on-surface italic leading-relaxed">&quot;This region is trending for its unique artisanal textiles and sunrise meditation retreats.&quot;</p>
              </div>
            </div>
          </div>
        </section>
        
        {/* Quick Navigation Fluid List */}
        <section className="mb-32">
          <div className="max-w-screen-2xl mx-auto px-12 mb-12 flex justify-between items-end">
            <div>
              <h2 className="font-headline text-4xl font-bold text-primary">Curated Paths</h2>
              <p className="text-secondary mt-2">Swift entries into your next narrative.</p>
            </div>
          </div>
          <div className="flex gap-8 px-12 overflow-x-auto custom-scrollbar pb-12 snap-x">
            <Link href="/destinations" className="flex-shrink-0 w-80 group snap-start block">
              <div className="bg-surface-container rounded-xl p-8 h-full transition-all hover:bg-primary hover:text-on-primary">
                <div className="w-16 h-16 rounded-full bg-primary-container/10 group-hover:bg-white/10 flex items-center justify-center mb-6">
                  <span className="material-symbols-outlined text-4xl text-primary group-hover:text-white" style={{ fontVariationSettings: "'FILL' 1" }}>explore</span>
                </div>
                <h3 className="font-headline text-2xl font-bold mb-4">Slow Living</h3>
                <p className="opacity-70 text-sm leading-relaxed mb-6">Retreats focused on mindfulness, artisanal crafts, and the art of doing nothing.</p>
                <span className="material-symbols-outlined group-hover:translate-x-2 transition-transform">east</span>
              </div>
            </Link>
            <Link href="/destinations" className="flex-shrink-0 w-80 group snap-start block">
              <div className="bg-surface-container rounded-xl p-8 h-full transition-all hover:bg-tertiary hover:text-white">
                <div className="w-16 h-16 rounded-full bg-tertiary-container/10 group-hover:bg-white/10 flex items-center justify-center mb-6">
                  <span className="material-symbols-outlined text-4xl text-tertiary group-hover:text-white" style={{ fontVariationSettings: "'FILL' 1" }}>hiking</span>
                </div>
                <h3 className="font-headline text-2xl font-bold mb-4">Wild Frontiers</h3>
                <p className="opacity-70 text-sm leading-relaxed mb-6">Off-the-grid expeditions to the world&apos;s most untamed and breathtaking landscapes.</p>
                <span className="material-symbols-outlined group-hover:translate-x-2 transition-transform">east</span>
              </div>
            </Link>
            <Link href="/destinations" className="flex-shrink-0 w-80 group snap-start block">
              <div className="bg-surface-container rounded-xl p-8 h-full transition-all hover:bg-secondary hover:text-white">
                <div className="w-16 h-16 rounded-full bg-secondary-container/10 group-hover:bg-white/10 flex items-center justify-center mb-6">
                  <span className="material-symbols-outlined text-4xl text-secondary group-hover:text-white" style={{ fontVariationSettings: "'FILL' 1" }}>museum</span>
                </div>
                <h3 className="font-headline text-2xl font-bold mb-4">Cultural Deep</h3>
                <p className="opacity-70 text-sm leading-relaxed mb-6">Immersive heritage experiences guided by locals and AI-curated history.</p>
                <span className="material-symbols-outlined group-hover:translate-x-2 transition-transform">east</span>
              </div>
            </Link>
            <Link href="/destinations" className="flex-shrink-0 w-80 group snap-start block">
              <div className="bg-surface-container rounded-xl p-8 h-full transition-all hover:bg-primary-container hover:text-white">
                <div className="w-16 h-16 rounded-full bg-white/10 flex items-center justify-center mb-6">
                  <span className="material-symbols-outlined text-4xl text-white" style={{ fontVariationSettings: "'FILL' 1" }}>restaurant</span>
                </div>
                <h3 className="font-headline text-2xl font-bold mb-4">Palate Pursuit</h3>
                <p className="opacity-70 text-sm leading-relaxed mb-6">A culinary map of the globe, from street markets to Michelin-starred enclaves.</p>
                <span className="material-symbols-outlined group-hover:translate-x-2 transition-transform">east</span>
              </div>
            </Link>
          </div>
        </section>

        {/* Travel Recommendations Section */}
        <section className="max-w-screen-2xl mx-auto px-12 mb-32">
          <div className="flex flex-col md:flex-row justify-between items-baseline gap-6 mb-16">
            <div>
              <h2 className="font-headline text-5xl font-black text-primary tracking-tight">Personalized For You</h2>
              <p className="text-secondary text-lg mt-3">Synthesizing 2M+ data points to find your soul&apos;s destination.</p>
            </div>
            <div className="flex gap-4">
              <button className="w-14 h-14 rounded-full border border-outline-variant flex items-center justify-center hover:bg-surface-container-high transition-colors">
                <span className="material-symbols-outlined">chevron_left</span>
              </button>
              <button className="w-14 h-14 rounded-full border border-outline-variant flex items-center justify-center hover:bg-surface-container-high transition-colors">
                <span className="material-symbols-outlined">chevron_right</span>
              </button>
            </div>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-12">
            {/* Kyoto Card */}
            <Link href="/destinations/kyoto" className="relative group cursor-pointer block">
              <div className="aspect-[16/10] rounded-xl overflow-hidden shadow-xl mb-6">
                {/* eslint-disable-next-line @next/next/no-img-element */}
                <img className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105" alt="Traditional wooden temples in Kyoto surrounded by pink cherry blossoms in soft daylight" src="https://lh3.googleusercontent.com/aida-public/AB6AXuBI4j3-ZkEYphWDkomrBO-qk9_E45EbUNGh3utVH5Wzoe5WnuoFkngqQ2z23MGyeLxkJBHX8syEecRvrwRJgT9JRMDOpRG3m0lvNGWls1Hz2i183xbVrzK1E9o8jWRBTOVjydtVr-IEa2c5mPlGwJNqE3isfL6lSj7ApuHz4Fj__N8FkcCW7pQQSiPQ7GpDjlihQYLxjbC3wYeBUmeCyMhXdOfcWcjYLHtG3ugc6DewKo-iXsFHyHT25H2bo0ZEiN2aWd6BNAT_MQs"/>
                <div className="absolute top-6 left-6 flex items-center gap-2 bg-white/90 backdrop-blur px-3 py-1.5 rounded-full shadow-sm">
                  <span className="material-symbols-outlined text-primary text-base" style={{ fontVariationSettings: "'FILL' 1" }}>verified</span>
                  <span className="text-[10px] font-bold uppercase tracking-widest text-primary">High Trust Score</span>
                </div>
              </div>
              <div className="flex justify-between items-start">
                <div>
                  <h3 className="font-headline text-3xl font-bold text-primary">Kyoto, Japan</h3>
                  <p className="text-secondary mt-1 font-medium italic">Timeless Zen &amp; Tea Ceremony Trails</p>
                </div>
                <div className="text-right">
                  <div className="text-primary font-bold text-2xl">98%</div>
                  <div className="text-[10px] text-secondary font-bold uppercase tracking-tighter">AI Match</div>
                </div>
              </div>
              <div className="mt-6 flex flex-wrap gap-2">
                <span className="bg-surface-container text-on-surface-variant text-xs px-4 py-2 rounded-full font-semibold">Historical</span>
                <span className="bg-surface-container text-on-surface-variant text-xs px-4 py-2 rounded-full font-semibold">Vegetarian Friendly</span>
                <span className="bg-surface-container text-on-surface-variant text-xs px-4 py-2 rounded-full font-semibold">Cherry Blossoms</span>
              </div>
            </Link>
            {/* Positano Card */}
            <Link href="/destinations/positano" className="relative group cursor-pointer block md:mt-24">
              <div className="aspect-[16/10] rounded-xl overflow-hidden shadow-xl mb-6">
                {/* eslint-disable-next-line @next/next/no-img-element */}
                <img className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105" alt="Colorful houses built on the steep cliffs of Positano overlooking the deep blue Amalfi Coast sea" src="https://lh3.googleusercontent.com/aida-public/AB6AXuBJ_tLx4GBumGXC7n2ZnUMQr7lS44TDr-R6t8GFFWfy_5Bssr7T68ywQolCShunz9lHoYwrm64lWeTGDZu6DD2Oq-iOZSo7TN9Zi51Q1y9ub8jzefoIYNqYm3yE7qsxhrgalxgk-FRFOzPVyKmZ3eI-k8Ap5xAoB7CXb3JJryciuE5X1p4tsEqGMhQeTYB66MDtjjibWDII7XYwEV0wgj_WKpBN2PU5DbSclCgT-beozQdrDGRpNAgaA4Tloi3YoPD0Yf-T-Z7wmoE"/>
                <div className="absolute top-6 left-6 flex items-center gap-2 bg-white/90 backdrop-blur px-3 py-1.5 rounded-full shadow-sm">
                  <span className="material-symbols-outlined text-primary text-base" style={{ fontVariationSettings: "'FILL' 1" }}>verified</span>
                  <span className="text-[10px] font-bold uppercase tracking-widest text-primary">Curator&apos;s Choice</span>
                </div>
              </div>
              <div className="flex justify-between items-start">
                <div>
                  <h3 className="font-headline text-3xl font-bold text-primary">Positano, Italy</h3>
                  <p className="text-secondary mt-1 font-medium italic">Cliffside Glamour &amp; Lemon Groves</p>
                </div>
                <div className="text-right">
                  <div className="text-primary font-bold text-2xl">94%</div>
                  <div className="text-[10px] text-secondary font-bold uppercase tracking-tighter">AI Match</div>
                </div>
              </div>
              <div className="mt-6 flex flex-wrap gap-2">
                <span className="bg-surface-container text-on-surface-variant text-xs px-4 py-2 rounded-full font-semibold">Coastal</span>
                <span className="bg-surface-container text-on-surface-variant text-xs px-4 py-2 rounded-full font-semibold">Romance</span>
                <span className="bg-surface-container text-on-surface-variant text-xs px-4 py-2 rounded-full font-semibold">Sunset Views</span>
              </div>
            </Link>
          </div>
        </section>

        {/* Newsletter / Community Section */}
        <section className="max-w-screen-2xl mx-auto px-12">
          <div className="bg-primary-container rounded-xl p-16 relative overflow-hidden">
            <div className="absolute -right-20 -bottom-20 w-96 h-96 bg-primary rounded-full blur-3xl opacity-50"></div>
            <div className="relative z-10 grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
              <div className="space-y-6">
                <h2 className="font-headline text-4xl lg:text-5xl font-black text-white leading-tight">Join the Vayka Collective</h2>
                <p className="text-on-primary-container text-lg max-w-md">Receive bi-weekly dispatches featuring under-the-radar destinations and exclusive curator tools.</p>
              </div>
              <div className="flex flex-col sm:flex-row gap-4">
                <input className="flex-grow bg-white/10 border-none rounded-xl px-6 py-4 text-white placeholder:text-white/40 focus:ring-2 focus:ring-white/20 font-body outline-none" placeholder="your@journal.com" type="email"/>
                <button className="bg-white text-primary px-10 py-4 rounded-xl font-bold hover:bg-surface-container-high transition-colors shadow-lg">
                  Subscribe
                </button>
              </div>
            </div>
          </div>
        </section>
      </main>
      
      <Footer />
    </>
  );
}
