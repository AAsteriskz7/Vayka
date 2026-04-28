import { redirect } from 'next/navigation'
import { getSession } from '@/lib/session'
import { itineraries } from '@/lib/mockData'
import type { User } from '@/lib/mockData'
import DashboardHeader from '@/components/dashboard/DashboardHeader'
import UserStatsCards from '@/components/dashboard/UserStatsCards'
import UpcomingTripCard from '@/components/dashboard/UpcomingTripCard'
import DashboardItineraryList from '@/components/dashboard/DashboardItineraryList'
import PersonalizedRecommendations from '@/components/dashboard/PersonalizedRecommendations'
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
  const draftTrip = userItineraries.find(i => i.status === 'draft')
  const planningTrip = userItineraries.find(i => i.status === 'planning')

  return (
    <main className="min-h-screen bg-surface pt-24 px-4 pb-12 md:px-8 lg:px-16 max-w-7xl mx-auto">
      <DashboardHeader user={currentUser} itineraries={userItineraries} />
      <UserStatsCards itineraries={userItineraries} />

      <div className="grid grid-cols-1 xl:grid-cols-3 gap-8 mt-2">
        <div className="xl:col-span-2 flex flex-col gap-8">
          {upcomingTrip && <UpcomingTripCard itinerary={upcomingTrip} />}
          <DashboardItineraryList />
        </div>
        <div className="xl:col-span-1">
          <PersonalizedRecommendations
            upcomingTrip={upcomingTrip}
            draftTrip={draftTrip}
            planningTrip={planningTrip}
          />
        </div>
      </div>
    </main>
  )
}
