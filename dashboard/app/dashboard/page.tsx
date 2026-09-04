import { getIGMedia, getFollowerCount } from "@/lib/instagramClient"
import { getFollowerDemographics } from "@/lib/instagramDemographics"
import { DashboardClient } from "@/components/dashboard/DashboardClient"

export default async function DashboardPage() {
  const [media, followerCount, countryData] = await Promise.all([
    getIGMedia(),
    getFollowerCount(),
    getFollowerDemographics(),
  ])

  return (
    <DashboardClient 
      media={media} 
      followerCount={followerCount} 
      countryData={countryData} 
    />
  )
}
