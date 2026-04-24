import type { Metadata } from 'next';
import Footer from '../../components/Footer';
import ItineraryPlanner from '../../components/ItineraryPlanner';

export const metadata: Metadata = {
  title: "Interactive Itineraries",
  description: "Collaboratively build and edit travel itineraries with our AI agent in real-time.",
};

export default function Itineraries() {
  return (
    <>
      <main className="pt-28 px-6 pb-12 lg:px-12 max-w-[1600px] mx-auto min-h-screen">
        <ItineraryPlanner />
      </main>
      <Footer />
    </>
  );
}
