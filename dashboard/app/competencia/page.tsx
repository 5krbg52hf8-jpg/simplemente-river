import { getCompetitorData } from '@/lib/instagramDiscovery'
import { CompetitorRadar } from '@/components/competencia/CompetitorRadar'

const DEFAULT_COMPETITORS = [
  'Millodzn',
  'Riverlpm',
  'hinchada._.millonaria',
  'bandamillonaria.ok',
  'statsmillo',
  'riverplaydigital',
]

export default async function CompetenciaPage() {
  const competitorsData = await Promise.all(
    DEFAULT_COMPETITORS.map(handle => getCompetitorData(handle.toLowerCase()))
  )

  // Calcular viral score de cada post: likes / promedio de likes de la cuenta
  const enriched = competitorsData
    .filter(c => c !== null && !c.error)
    .map(comp => {
      if (!comp) return null
      const avgLikes = comp.posts.length > 0
        ? comp.posts.reduce((sum, p) => sum + p.like_count, 0) / comp.posts.length
        : 1

      const postsWithScore = comp.posts.map(post => ({
        ...post,
        viral_score: avgLikes > 0 ? post.like_count / avgLikes : 1,
        engagement: post.like_count + post.comments_count,
      }))

      // Extraer keywords de los posts más virales
      const topCaptions = postsWithScore
        .sort((a, b) => b.viral_score - a.viral_score)
        .slice(0, 5)
        .map(p => p.caption ?? '')
        .join(' ')

      const words = topCaptions
        .toLowerCase()
        .split(/\s+/)
        .filter(w => w.length > 4 && !['river', 'https', '#river', 'para', 'este', 'esta', 'desde', 'hasta'].includes(w))
      
      const freq: Record<string, number> = {}
      for (const w of words) freq[w] = (freq[w] ?? 0) + 1
      const keywords = Object.entries(freq)
        .sort((a, b) => b[1] - a[1])
        .slice(0, 5)
        .map(([word]) => word)

      return { ...comp, posts: postsWithScore, keywords, avg_likes: Math.round(avgLikes) }
    })
    .filter(Boolean)

  return <CompetitorRadar competitors={enriched as any} />
}
