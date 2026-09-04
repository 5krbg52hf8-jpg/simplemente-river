import { supabase } from '../supabaseClient'
import type { IGInsights } from '../instagramTypes'

export async function upsertMetrics(postId: string, insights: IGInsights) {
  const { error } = await supabase.from('metrics').upsert({
    post_id: postId,
    reach: insights.reach,
    plays: insights.plays,
    likes: insights.likes,
    comments: insights.comments,
    shares: insights.shares,
    saves: insights.saves,
    avg_watch_time_ms: insights.avg_watch_time_ms ?? 0,
    engagement_rate: insights.engagement_rate ?? 0,
    captured_at: new Date().toISOString(),
  }, { onConflict: 'post_id' })

  if (error) throw new Error(`upsertMetrics ${postId}: ${error.message}`)
}
