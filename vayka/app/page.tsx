import Footer from '../components/Footer';

export default function Home() {
  return (
    <>
      <main className="relative overflow-hidden min-h-screen pt-32 pb-24">
        {/* Hero Section */}
        <section className="max-w-7xl mx-auto px-6 md:px-12 grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
          {/* Hero Content */}
          <div className="lg:col-span-6 z-10">
            <h1 className="font-headline text-6xl md:text-8xl text-primary text-editorial-spacing leading-[1.1] mb-8">
              Where should your <span className="italic font-normal">curiosity</span> take you?
            </h1>
            
            {/* Chatbot Input */}
            <div className="relative group max-w-2xl">
              <div className="absolute inset-0 bg-surface-container-highest/20 blur-2xl rounded-full -z-10 group-focus-within:bg-primary/5 transition-all duration-500"></div>
              <div className="bg-surface-container-lowest shadow-[0px_20px_40px_rgba(26,28,26,0.06)] rounded-full p-2 flex items-center">
                <span className="material-symbols-outlined ml-6 text-outline">explore</span>
                <input className="w-full bg-transparent border-none focus:ring-0 px-4 py-4 text-lg font-body placeholder:text-outline/60 outline-none" placeholder="Imagine a getaway..." type="text"/>
                <button className="bg-gradient-to-br from-primary to-primary-container text-white p-4 rounded-full flex items-center justify-center hover:scale-105 transition-transform duration-300">
                  <span className="material-symbols-outlined">auto_awesome</span>
                </button>
              </div>
            </div>

            {/* Action Chips */}
            <div className="flex flex-wrap gap-4 mt-12">
              <button className="bg-secondary-container text-on-secondary-container px-8 py-5 rounded-xl font-bold flex items-center gap-3 organic-blob-2 hover:scale-95 transition-all duration-300 shadow-sm">
                <span className="material-symbols-outlined">map</span>
                Discover Destinations
              </button>
              <button className="bg-gradient-to-r from-primary to-primary-container text-white px-8 py-5 rounded-xl font-bold flex items-center gap-3 organic-blob-1 hover:scale-105 transition-all duration-300 shadow-xl">
                <span className="material-symbols-outlined">edit_calendar</span>
                Plan My Trip
              </button>
            </div>
          </div>

          {/* Hero Image Visual */}
          <div className="lg:col-span-6 relative flex justify-end">
            <div className="relative w-full max-w-[500px]">
              <div className="absolute -top-12 -left-12 w-48 h-48 bg-tertiary-fixed-dim/30 rounded-full blur-3xl opacity-60"></div>
              <div className="absolute -bottom-12 -right-12 w-64 h-64 bg-secondary-fixed/20 rounded-full blur-3xl opacity-60"></div>
              
              <div className="relative z-10 overflow-hidden organic-blob-1 aspect-[4/5] shadow-2xl">
                 {/* eslint-disable-next-line @next/next/no-img-element */}
                <img className="w-full h-full object-cover scale-110 hover:scale-100 transition-transform duration-[2000ms]" src="https://lh3.googleusercontent.com/aida-public/AB6AXuAJvTFiTkRj_myPV-NsmARaP8e45KfUcxhN3vD3w4X1An9SsX7m5eOgPykMMgkd420t-HCcZfeNO1ljYl5T2KmetJaZH8VYut-NxiF7Dkr0sAchKizGuECNsyPnfzmIDKuUmQaVb2XJYYhOlykUmOPZMQRbe0x2N0P0xz3JyT2YSnGTDjNmG-bU3HSjmjSVknlhY3S1BeQPTEoSxqlKe5yzxTo_iVM1Jq8HPFntUInIZnXSd1fdKqhYRE_mvCE-NLAQKT9UIpExW4ym" alt="serene tropical infinity pool" />
              </div>
              
              {/* Floating Source Card (Asymmetric) */}
              <div className="absolute -bottom-8 -left-16 z-20 bg-white/80 backdrop-blur-xl p-6 rounded-xl shadow-2xl border-none max-w-xs group cursor-default">
                <div className="flex items-center gap-4 mb-2">
                  <span className="material-symbols-outlined text-tertiary">verified</span>
                  <span className="font-headline text-lg italic text-primary">Maldives Reimagined</span>
                </div>
                <p className="text-sm text-secondary leading-relaxed">Curated based on your preference for quiet coastal escapes and sustainable luxury architecture.</p>
                <div className="mt-4 pt-4 border-t border-outline-variant/20 flex gap-2 overflow-hidden opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                  <span className="text-[10px] uppercase tracking-widest text-outline px-2 py-1 bg-surface-container rounded-full">Source: Conde Nast</span>
                  <span className="text-[10px] uppercase tracking-widest text-outline px-2 py-1 bg-surface-container rounded-full">Source: Travel+Leisure</span>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Asymmetric Featured Content Section */}
        <section className="mt-48 max-w-7xl mx-auto px-6 md:px-12">
          <div className="flex flex-col md:flex-row justify-between items-end mb-16 gap-8">
            <div className="max-w-2xl">
              <span className="text-secondary font-bold tracking-[0.2em] uppercase text-xs mb-4 block">Seasonal Edit</span>
              <h2 className="font-headline text-5xl text-primary leading-tight">The Art of Wandering: <br/>Spring Collection {new Date().getFullYear()}</h2>
            </div>
            <div className="md:text-right">
              <a className="text-primary font-bold flex items-center gap-2 group hover:opacity-80 transition-opacity" href="#">
                View All Collections 
                <span className="material-symbols-outlined group-hover:translate-x-2 transition-transform">arrow_forward</span>
              </a>
            </div>
          </div>

          <div className="relative grid grid-cols-1 md:grid-cols-12 gap-12">
            {/* Bento-style Asymmetric Cards */}
            <div className="md:col-span-7 group">
              <div className="relative overflow-hidden rounded-xl aspect-video mb-6">
                 {/* eslint-disable-next-line @next/next/no-img-element */}
                <img className="w-full h-full object-cover grayscale group-hover:grayscale-0 transition-all duration-700 scale-100 group-hover:scale-105" src="https://lh3.googleusercontent.com/aida-public/AB6AXuBNpbewApBRkvM-zkWtQulqRk3li4Srs5wKkeRNCkztTAHNET4p5pAcLxlky_x8a2P0jKDLFgGia7RstAUvJK_eFbPprs5-uA7uwZDo4lXDslFzLFTEQ2PJLZmmloqRg6ghZIzfnNYzdBHVkskPKilboqlKwkuvGGQm-3dZI6sUiP9Fa4FOER7SSdqjYydww3_bSkMTpkIiUBRC-ZCuRgFqEnBclh91ezqCdWFe-67cS4pv1oPsJYYt9XwxtDlzwS-NaHJ_gYJMNg8a" alt="cinematic view of colourful houses in Positano" />
                <div className="absolute inset-0 bg-gradient-to-t from-primary/60 to-transparent"></div>
                <div className="absolute bottom-8 left-8 text-white">
                  <span className="text-xs font-bold tracking-widest uppercase mb-2 block">Region Focus</span>
                  <h3 className="font-headline text-3xl">Amalfi Coastline</h3>
                </div>
              </div>
              <p className="text-secondary-fixed-dim text-lg italic font-headline pr-24">&quot;A vertical landscape where lemon groves meet the azure embrace of the Mediterranean.&quot;</p>
            </div>

            <div className="md:col-span-5 flex flex-col gap-12 mt-12 md:mt-24">
              <div className="bg-surface-container-high organic-blob-2 p-12 relative overflow-hidden group">
                <div className="relative z-10">
                  <span className="material-symbols-outlined text-4xl text-primary mb-6">auto_stories</span>
                  <h3 className="font-headline text-2xl text-primary mb-4">Curated Journal</h3>
                  <p className="text-on-surface-variant mb-8 leading-loose">Deep dives into local cultures, written by those who breathe the mountain air.</p>
                  <button className="text-primary font-bold border-b-2 border-primary/20 pb-1 hover:border-primary transition-all">Read Story</button>
                </div>
                <div className="absolute -bottom-8 -right-8 w-32 h-32 bg-primary/5 rounded-full blur-xl group-hover:scale-150 transition-transform duration-700"></div>
              </div>

              <div className="relative rounded-xl overflow-hidden aspect-square self-end w-4/5 shadow-xl group">
                 {/* eslint-disable-next-line @next/next/no-img-element */}
                <img className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700" src="https://lh3.googleusercontent.com/aida-public/AB6AXuBiVEK9HgS_0eWEQ1VTgjG1hjlkfUNbzqocdqAOg6mrhXjlSFM3yeqr3HidF2zXqxhkMn870n3h62O1huG-R6HsndvJomUJT75_4BoSLDjbJn0tOz_0vAIJ0IXpQmvlh8VdN1q6n9HdO0rUFaKguDwJmY4SiH2aZAVAcrqOxVs7eEwPteuFGz2EYIGgwGR2ErU12hhfhrvenjjPgEPKJg0SMe-3ftIX0wHxFbLeRn5ImoqG4sn7X9AXFXdLAlmB6u99MOgJCK--L-xD" alt="Eiffel tower through cherry blossoms" />
                <div className="absolute inset-0 bg-secondary/10 backdrop-overlay"></div>
                <div className="absolute top-6 left-6 bg-white/90 backdrop-blur px-4 py-2 rounded-full text-xs font-bold text-primary">Trending Now</div>
              </div>
            </div>
          </div>
        </section>

        {/* Subtle Background Elements */}
        <div className="fixed top-1/4 -right-64 w-[600px] h-[600px] bg-secondary-fixed/10 rounded-full blur-[120px] -z-20 pointer-events-none"></div>
        <div className="fixed bottom-0 -left-64 w-[800px] h-[800px] bg-primary-fixed-dim/5 rounded-full blur-[160px] -z-20 pointer-events-none"></div>
      </main>
      
      <Footer />
    </>
  );
}
