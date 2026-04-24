import Link from 'next/link';

export default function Footer() {
  return (
    <footer className="bg-surface-container py-24 px-6 md:px-12 border-none">
      <div className="max-w-7xl mx-auto grid grid-cols-1 md:grid-cols-4 gap-16">
        <div className="md:col-span-2">
          <Link href="/" className="font-headline italic text-4xl font-bold text-primary mb-8 block">Vayka</Link>
          <p className="text-secondary max-w-sm text-lg leading-relaxed mb-8">
            An organic interface for the modern explorer. We curate not just destinations, but the feeling of being somewhere new.
          </p>
          <div className="flex gap-4">
            <div className="w-12 h-12 rounded-full bg-primary/5 flex items-center justify-center hover:bg-primary/10 cursor-pointer transition-colors">
              <span className="material-symbols-outlined text-primary">share</span>
            </div>
            <div className="w-12 h-12 rounded-full bg-primary/5 flex items-center justify-center hover:bg-primary/10 cursor-pointer transition-colors">
              <span className="material-symbols-outlined text-primary">public</span>
            </div>
          </div>
        </div>
        <div>
          <h4 className="font-bold text-primary mb-6">Explore</h4>
          <ul className="space-y-4 text-on-surface-variant">
            <li><Link className="hover:text-primary transition-colors" href="/destinations">Destinations</Link></li>
            <li><Link className="hover:text-primary transition-colors" href="/search">Search</Link></li>
            <li><Link className="hover:text-primary transition-colors" href="/compare">Compare</Link></li>
            <li><Link className="hover:text-primary transition-colors" href="/itineraries">AI Itineraries</Link></li>
          </ul>
        </div>
        <div>
          <h4 className="font-bold text-primary mb-6">Support</h4>
          <ul className="space-y-4 text-on-surface-variant">
            <li><Link className="hover:text-primary transition-colors" href="/admin">Admin Dashboard</Link></li>
          </ul>
        </div>
      </div>
      <div className="max-w-7xl mx-auto mt-24 pt-12 border-t border-outline-variant/10 text-sm text-outline flex flex-col md:flex-row justify-between gap-4">
        <span>&copy; {new Date().getFullYear()} Vayka. All rights reserved.</span>
        <span>Designed for the Curated Soul.</span>
      </div>
    </footer>
  );
}
