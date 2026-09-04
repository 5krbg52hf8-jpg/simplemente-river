const path = require('path')
require('dotenv').config({ path: path.join(__dirname, '.env.local') })

async function testViews() {
  const token = process.env.INSTAGRAM_ACCESS_TOKEN
  const userId = process.env.INSTAGRAM_USER_ID
  if (!token || !userId) throw new Error("No credentials")

  const reelId = '18102392114359206' // The specific Ponzio reel

  // Let's test all possible cross-posted metrics
  const possibleMetrics = [
    'facebook_likes', 'crossposted_likes', 
    'facebook_comments', 'crossposted_comments',
    'facebook_shares', 'crossposted_shares',
    'total_likes', 'total_comments', 'total_shares', 'total_interactions'
  ]

  for (const metric of possibleMetrics) {
    const url = `https://graph.facebook.com/v21.0/${reelId}/insights?metric=${metric}&access_token=${token}`
    const res = await fetch(url)
    const data = await res.json()
    if (data.error) {
      console.log(`[${metric}] ERROR:`, data.error.message.substring(0, 100) + '...')
    } else {
      console.log(`[${metric}] SUCCESS:`, data.data?.[0]?.values?.[0]?.value)
    }
  }
}

testViews().catch(console.error)
