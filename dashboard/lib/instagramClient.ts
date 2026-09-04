import fs from 'fs'
import path from 'path'
import type { IGMediaItem, IGInsights, IGCacheEntry } from './instagramTypes'

const CACHE_DIR = '.cache/instagram'
const CACHE_HOURS_MEDIA = 0.25 // 15 minutos
const CACHE_HOURS_INSIGHTS = 0.25 // 15 minutos

// --- Cache helpers ---

function cachePath(key: string): string {
  const dir = path.resolve(process.cwd(), CACHE_DIR)
  fs.mkdirSync(dir, { recursive: true })
  return path.join(dir, `${key}.json`)
}

function loadCache<T>(key: string, maxHours: number): T | null {
  const p = cachePath(key)
  if (!fs.existsSync(p)) return null
  try {
    const entry: IGCacheEntry<T> = JSON.parse(fs.readFileSync(p, 'utf-8'))
    const ageH = (Date.now() - new Date(entry.cached_at).getTime()) / 3_600_000
    return ageH > maxHours ? null : entry.payload
  } catch {
    return null
  }
}

function saveCache<T>(key: string, payload: T): void {
  fs.writeFileSync(
    cachePath(key),
    JSON.stringify({ cached_at: new Date().toISOString(), payload }, null, 2)
  )
}

// --- API ---

function getCredentials(): { token: string; userId: string } | null {
  const token = process.env.INSTAGRAM_ACCESS_TOKEN
  const userId = process.env.INSTAGRAM_USER_ID
  if (!token || !userId) return null
  return { token, userId }
}

// Insights por video/post
async function getIGInsights(mediaId: string, mediaType: string, token: string, forceRefresh = false): Promise<IGInsights> {
  if (!forceRefresh) {
    const cached = loadCache<IGInsights>(`insights_${mediaId}`, CACHE_HOURS_INSIGHTS)
    if (cached) return cached
  }

  // Pedimos las métricas normales, pero para Reels agregamos los "Totales Combinados" (IG + Facebook)
  let metrics = 'views,reach,likes,comments,shares,saved'
  if (mediaType === 'REEL' || mediaType === 'VIDEO') {
    metrics += ',ig_reels_avg_watch_time,total_views,total_likes,total_comments'
  }

  const url = `https://graph.facebook.com/v21.0/${mediaId}/insights?metric=${metrics}&access_token=${token}`

  const res = await fetch(url)
  const data = await res.json()

  if (data.error) {
    console.error('Error fetching insights para', mediaId, data.error)
    return { reach: 0, plays: 0, likes: 0, comments: 0, shares: 0, saves: 0 }
  }

  const getValue = (name: string) =>
    data.data?.find((d: { name: string }) => d.name === name)?.values?.[0]?.value ?? 0

  const reach = getValue('reach')
  
  // Usamos los totales combinados si existen, sino el base de IG
  const plays = getValue('total_views') || getValue('views')
  const likes = getValue('total_likes') || getValue('likes')
  const comments = getValue('total_comments') || getValue('comments')
  
  const shares = getValue('shares')
  const saves = getValue('saved')
  const avg_watch_time_ms = getValue('ig_reels_avg_watch_time')
  const engagement_rate = reach > 0 ? ((likes + comments + shares + saves) / reach) * 100 : 0
  const viral_index = reach > 0 ? (shares / reach) * 1000 : 0

  const insights: IGInsights = { reach, plays, likes, comments, shares, saves, avg_watch_time_ms, engagement_rate, viral_index }
  saveCache(`insights_${mediaId}`, insights)
  return insights
}

// Obtiene lista de media con insights — fetch paginado, sin límite de 50
export async function getIGMedia(forceRefresh = false): Promise<IGMediaItem[]> {
  if (!forceRefresh) {
    const cached = loadCache<IGMediaItem[]>('media_list', CACHE_HOURS_MEDIA)
    if (cached) return cached
  }

  const creds = getCredentials()
  if (!creds) return []
  const { token, userId } = creds
  const fields = 'id,caption,media_type,thumbnail_url,media_url,permalink,timestamp,video_duration'
  const allItems: IGMediaItem[] = []

  // Fetch paginado — itera todas las páginas hasta que no haya "next"
  let url: string | null =
    `https://graph.facebook.com/v21.0/${userId}/media?fields=${fields}&limit=50&access_token=${token}`

  while (url) {
    const currentUrl: string = url
    const res = await fetch(currentUrl)
    const data = await res.json()
    if (data.error) throw new Error(`IG API: ${data.error.message}`)

    // Traer todos los tipos: VIDEO/REEL, IMAGE (placas), CAROUSEL_ALBUM (carruseles)
    const page = data.data ?? []
    allItems.push(...page)

    url = data.paging?.next ?? null
  }

  const withInsights = await Promise.all(
    allItems.map(async (item: IGMediaItem) => ({
      ...item,
      insights: await getIGInsights(item.id, item.media_type, token, forceRefresh),
    }))
  )

  saveCache('media_list', withInsights)
  return withInsights
}

// Seguidores actuales — cache 6h
export async function getFollowerCount(): Promise<number> {
  const cached = loadCache<number>('follower_count', 6)
  if (cached !== null) return cached

  const creds = getCredentials()
  if (!creds) return 0
  const { token, userId } = creds
  const url = `https://graph.facebook.com/v21.0/${userId}?fields=followers_count&access_token=${token}`
  const res = await fetch(url)
  const data = await res.json()
  if (data.error) return 0
  const count = data.followers_count ?? 0
  saveCache('follower_count', count)
  return count
}

// media_url fresca — NUNCA cachear, expira ~1h
export async function getIGMediaUrl(mediaId: string): Promise<string> {
  const creds = getCredentials()
  if (!creds) throw new Error('INSTAGRAM_ACCESS_TOKEN o INSTAGRAM_USER_ID no configurados')
  const { token } = creds
  const url = `https://graph.facebook.com/v21.0/${mediaId}?fields=media_url&access_token=${token}`
  const res = await fetch(url)
  const data = await res.json()
  if (data.error) throw new Error(`IG API: ${data.error.message}`)
  if (!data.media_url) throw new Error(`No media_url disponible para ${mediaId}`)
  return data.media_url
}
