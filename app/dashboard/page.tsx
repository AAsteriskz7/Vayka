import { redirect } from 'next/navigation'
import { getSession } from '@/lib/session'
import { itineraries } from '@/lib/mockData'
import type { User } from '@/lib/mockData'
import DashboardHeader from '@/components/dashboard/DashboardHeader'
import UpcomingTripCard from '@/components/dashboard/UpcomingTripCard'
import DashboardItineraryList from '@/components/dashboard/DashboardItineraryList'
import type { Metadata } from 'next'

export const metadata: Metadata = {
  title: 'Dashboard',
  description: 'Your personal Vayka travel dashboard.',
}

export default async function DashboardPage() {
  const session = await getSession()
  if (!session) redirect('/login')

  const initials = session.displayName
    .split(' ')
    .slice(0, 2)
    .map((w: string) => w[0])
    .join('')
    .toUpperCase() || 'U'

  const currentUser: User = {
    id: session.userId,
    name: session.displayName,
    email: session.email,
    role: session.role,
    avatarInitials: initials,
  }

  // Filter mock itineraries by userId; falls back to empty list for new users
  const userItineraries = itineraries.filter(i => i.userId === session.userId)

  const upcomingTrip = userItineraries.find(i => i.status === 'upcoming')

  return (
    <main className="min-h-screen bg-surface pt-24 px-4 pb-12 md:px-8 lg:px-16 max-w-7xl mx-auto">
      <DashboardHeader user={currentUser} itineraries={userItineraries} />

      <div className="flex flex-col gap-8 mt-2">
        {upcomingTrip && <UpcomingTripCard itinerary={upcomingTrip} />}
        <DashboardItineraryList />
      </div>
    </main>
  )
}
