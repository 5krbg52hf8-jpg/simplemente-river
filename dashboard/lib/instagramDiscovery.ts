import { supabase } from './supabaseClient'

const CACHE_HOURS_DISCOVERY = 4

export interface CompetitorPost {
  id: string
  caption?: string
  media_type: string
  media_url?: string
  permalink: string
  timestamp: string
  like_count: number
  comments_count: number
}

export interface CompetitorProfile {
  username: string
  followers_count: number
  media_count: number
  profile_picture_url?: string
  biography?: string
  posts: CompetitorPost[]
  updated_at?: string
  error?: string
}

function getCredentials(): { token: string; userId: string } | null {
  const token = process.env.INSTAGRAM_ACCESS_TOKEN
  const userId = process.env.INSTAGRAM_USER_ID
  if (!token || !userId) return null
  return { token, userId }
}

export async function getCompetitorData(username: string, forceRefresh = false): Promise<CompetitorProfile | null> {
  const cleanUsername = username.startsWith('@') ? username.slice(1).toLowerCase() : username.toLowerCase()

  if (!forceRefresh) {
    try {
      // 1. Intentar cargar desde Supabase
      const { data, error } = await supabase
        .from('competitor_profiles')
        .select('*, competitor_posts(*)')
        .eq('username', cleanUsername)
        .single()

      if (data && !error) {
        // Verificar edad del cache
        const ageH = (Date.now() - new Date(data.updated_at).getTime()) / 3_600_000
        if (ageH <= CACHE_HOURS_DISCOVERY) {
          // Tipado seguro para la respuesta
          const posts = (data.competitor_posts || []).map((p: any) => ({
            id: p.id,
            caption: p.caption,
            media_type: p.media_type,
            media_url: p.media_url,
            permalink: p.permalink,
            timestamp: p.timestamp,
            like_count: p.like_count || 0,
            comments_count: p.comments_count || 0,
          })).sort((a: any, b: any) => new Date(b.timestamp).getTime() - new Date(a.timestamp).getTime())

          return {
            username: data.username,
            followers_count: data.followers_count || 0,
            media_count: data.media_count || 0,
            profile_picture_url: data.profile_picture_url,
            biography: data.biography,
            posts,
            updated_at: data.updated_at
          }
        }
      }
    } catch (e) {
      console.warn('Error al leer de Supabase, cayendo a API:', e)
    }
  }

  // 2. Si no hay cache válido o se forzó, buscar de la API de Meta
  const creds = getCredentials()
  if (!creds) throw new Error('Missing Instagram credentials')
  
  const { token, userId } = creds
  
  const fields = `business_discovery.username(${cleanUsername}){followers_count,media_count,profile_picture_url,biography,media{id,caption,media_type,media_url,permalink,timestamp,like_count,comments_count}}`
  const url = `https://graph.facebook.com/v21.0/${userId}?fields=${fields}&access_token=${token}`

  try {
    const res = await fetch(url)
    const data = await res.json()

    if (data.error) {
      return { username: cleanUsername, followers_count: 0, media_count: 0, posts: [], error: data.error.message }
    }

    const discovery = data.business_discovery
    if (!discovery) return null

    const profile: CompetitorProfile = {
      username: cleanUsername,
      followers_count: discovery.followers_count || 0,
      media_count: discovery.media_count || 0,
      profile_picture_url: discovery.profile_picture_url,
      biography: discovery.biography,
      posts: (discovery.media?.data || []).map((m: any) => ({
        id: m.id,
        caption: m.caption,
        media_type: m.media_type,
        media_url: m.media_url,
        permalink: m.permalink,
        timestamp: m.timestamp,
        like_count: m.like_count || 0,
        comments_count: m.comments_count || 0,
      })),
      updated_at: new Date().toISOString()
    }

    // 3. Guardar/Actualizar en Supabase
    try {
      // Upsert perfil
      await supabase.from('competitor_profiles').upsert({
        username: cleanUsername,
        followers_count: profile.followers_count,
        media_count: profile.media_count,
        profile_picture_url: profile.profile_picture_url,
        biography: profile.biography,
        updated_at: new Date().toISOString(),
      })

      // Upsert posts
      if (profile.posts.length > 0) {
        const dbPosts = profile.posts.map(p => ({
          id: p.id,
          username: cleanUsername,
          caption: p.caption,
          media_type: p.media_type,
          media_url: p.media_url,
          permalink: p.permalink,
          timestamp: p.timestamp,
          like_count: p.like_count,
          comments_count: p.comments_count,
          last_scanned_at: new Date().toISOString()
        }))
        await supabase.from('competitor_posts').upsert(dbPosts)
      }
    } catch (dbErr) {
      console.error('Error guardando competencia en Supabase:', dbErr)
    }

    return profile
  } catch (error: any) {
    console.error(`Error fetching competitor ${username}:`, error)
    return { username: cleanUsername, followers_count: 0, media_count: 0, posts: [], error: error.message }
  }
}
