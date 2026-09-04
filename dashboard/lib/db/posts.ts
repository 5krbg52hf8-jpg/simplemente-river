import { supabase } from '../supabaseClient'
import type { IGMediaItem } from '../instagramTypes'

export async function upsertPost(item: IGMediaItem) {
  const { error } = await supabase.from('posts').upsert({
    id: item.id,
    caption: item.caption ?? null,
    media_type: item.media_type,
    thumbnail_url: item.thumbnail_url ?? null,
    permalink: item.permalink,
    published_at: item.timestamp,
    updated_at: new Date().toISOString(),
  }, { onConflict: 'id' })

  if (error) throw new Error(`upsertPost ${item.id}: ${error.message}`)
}

export async function getPosts() {
  const { data, error } = await supabase
    .from('posts')
    .select('*, metrics(*)')
    .order('published_at', { ascending: false })

  if (error) throw new Error(`getPosts: ${error.message}`)
  return data ?? []
}
