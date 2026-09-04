"use client"

import { useState } from "react"
import Image from "next/image"
import { ExternalLink, TrendingUp, Heart, MessageCircle, Flame, ChevronRight, Users, BarChart2, ArrowUpDown, Clock, X } from "lucide-react"
import { Sheet, SheetContent } from "@/components/ui/sheet"
import { ScrollArea } from "@/components/ui/scroll-area"
import { cn } from "@/lib/utils"

type SortKey = 'recent' | 'likes' | 'comments' | 'engagement' | 'viral_score'

interface EnrichedPost {
  id: string
  caption?: string
  media_type: string
  media_url?: string
  permalink: string
  timestamp: string
  like_count: number
  comments_count: number
  viral_score: number
  engagement: number
}

interface EnrichedCompetitor {
  username: string
  followers_count: number
  media_count: number
  profile_picture_url?: string
  biography?: string
  posts: EnrichedPost[]
  keywords: string[]
  avg_likes: number
  updated_at?: string
}

interface Props {
  competitors: EnrichedCompetitor[]
}

const SORT_OPTIONS: { key: SortKey; label: string }[] = [
  { key: 'recent', label: 'Más reciente' },
  { key: 'viral_score', label: 'Viral Score 🔥' },
  { key: 'likes', label: 'Likes' },
  { key: 'comments', label: 'Comentarios' },
  { key: 'engagement', label: 'Engagement Total' },
]

function fmt(n: number): string {
  if (n >= 1_000_000) return (n / 1_000_000).toFixed(1) + "M"
  if (n >= 1_000) return (n / 1_000).toFixed(1) + "k"
  return n.toString()
}

function formatDate(timestamp: string): string {
  const d = new Date(timestamp)
  const months = ['ene', 'feb', 'mar', 'abr', 'may', 'jun', 'jul', 'ago', 'sep', 'oct', 'nov', 'dic']
  return `${d.getDate()} ${months[d.getMonth()]} ${d.getFullYear()}`
}

export function CompetitorRadar({ competitors }: Props) {
  const [selectedUsername, setSelectedUsername] = useState<string>(competitors[0]?.username ?? '')
  const [sortKey, setSortKey] = useState<SortKey>('recent')
  const [selectedPost, setSelectedPost] = useState<EnrichedPost | null>(null)

  const selected = competitors.find(c => c.username === selectedUsername)
  const sortedPosts = selected
    ? [...selected.posts].sort((a, b) => {
        if (sortKey === 'recent') return new Date(b.timestamp).getTime() - new Date(a.timestamp).getTime()
        if (sortKey === 'likes') return b.like_count - a.like_count
        if (sortKey === 'comments') return b.comments_count - a.comments_count
        if (sortKey === 'engagement') return b.engagement - a.engagement
        if (sortKey === 'viral_score') return b.viral_score - a.viral_score
        return 0
      })
    : []

  function formatFollowers(n: number): string {
    if (n >= 1_000_000) return (n / 1_000_000).toFixed(1) + 'M'
    if (n >= 1_000) return (n / 1_000).toFixed(1) + 'k'
    return String(n)
  }

  function timeAgo(timestamp: string): string {
    const diff = (Date.now() - new Date(timestamp).getTime()) / 1000
    if (diff < 3600) return `${Math.round(diff / 60)}m`
    if (diff < 86400) return `${Math.round(diff / 3600)}h`
    return `${Math.round(diff / 86400)}d`
  }

  return (
    <>
      <div className="flex h-[calc(100vh-3.5rem)] overflow-hidden">
        {/* Sidebar: lista de cuentas */}
        <aside
          className="flex flex-col w-[240px] flex-shrink-0 overflow-y-auto"
          style={{ background: 'var(--bg-sidebar)', borderRight: '1px solid var(--sidebar-border)' }}
        >
          <div className="px-4 py-4" style={{ borderBottom: '1px solid var(--sidebar-border)' }}>
            <h2 className="text-[13px] font-semibold" style={{ color: 'var(--text-primary)' }}>
              Radar de Competencia
            </h2>
            <p className="text-[11px] mt-0.5" style={{ color: 'var(--text-faint)' }}>
              {competitors.length} cuentas monitoreadas
            </p>
          </div>

          <nav className="flex flex-col gap-0.5 p-2">
            {competitors.map(comp => {
              const isActive = comp.username === selectedUsername
              return (
                <button
                  key={comp.username}
                  onClick={() => setSelectedUsername(comp.username)}
                  className={cn(
                    "flex items-center gap-3 px-3 py-2.5 rounded-xl text-left transition-all cursor-pointer w-full",
                  )}
                  style={{
                    background: isActive ? 'var(--sidebar-active-bg)' : 'transparent',
                    border: isActive ? '1px solid var(--border-medium)' : '1px solid transparent',
                  }}
                >
                  {comp.profile_picture_url ? (
                    <img src={comp.profile_picture_url} alt={comp.username} className="w-8 h-8 rounded-full flex-shrink-0 object-cover" style={{ border: '1px solid var(--border-subtle)' }} />
                  ) : (
                    <div className="w-8 h-8 rounded-full flex-shrink-0 flex items-center justify-center text-[12px] font-bold" style={{ background: 'var(--bg-elevated)', color: 'var(--text-primary)' }}>
                      {comp.username.charAt(0).toUpperCase()}
                    </div>
                  )}
                  <div className="min-w-0 flex-1">
                    <p className="text-[12px] font-medium truncate" style={{ color: isActive ? 'var(--text-primary)' : 'var(--text-secondary)' }}>
                      @{comp.username}
                    </p>
                    <p className="text-[10px]" style={{ color: 'var(--text-faint)' }}>
                      {formatFollowers(comp.followers_count)} seguidores
                    </p>
                  </div>
                  {isActive && <ChevronRight size={12} style={{ color: 'var(--text-faint)', flexShrink: 0 }} />}
                </button>
              )
            })}
          </nav>
        </aside>

        {/* Panel principal: posts de la cuenta seleccionada */}
        <main className="flex-1 overflow-y-auto p-6 space-y-5">
          {!selected ? (
            <div className="flex items-center justify-center h-full">
              <p style={{ color: 'var(--text-faint)' }}>Seleccioná una cuenta</p>
            </div>
          ) : (
            <>
              {/* Header de la cuenta */}
              <div className="flex items-start gap-4 p-5 rounded-2xl" style={{ background: 'var(--bg-elevated)', border: '1px solid var(--border-subtle)' }}>
                {selected.profile_picture_url ? (
                  <img src={selected.profile_picture_url} alt={selected.username} className="w-14 h-14 rounded-full flex-shrink-0" style={{ border: '2px solid var(--border-medium)' }} />
                ) : (
                  <div className="w-14 h-14 rounded-full flex items-center justify-center font-bold text-xl flex-shrink-0" style={{ background: 'var(--bg-surface)', color: 'var(--text-primary)' }}>
                    {selected.username.charAt(0).toUpperCase()}
                  </div>
                )}
                <div className="flex-1 min-w-0">
                  <div className="flex items-center gap-2 flex-wrap">
                    <h1 className="text-xl font-bold" style={{ color: 'var(--text-primary)' }}>
                      @{selected.username}
                    </h1>
                    <a href={`https://instagram.com/${selected.username}`} target="_blank" rel="noreferrer" className="flex items-center gap-1 text-[11px] px-2 py-0.5 rounded-md hover:opacity-80 transition-opacity" style={{ background: 'var(--bg-surface)', color: 'var(--text-faint)', border: '1px solid var(--border-subtle)' }}>
                      Ver en IG <ExternalLink size={10} />
                    </a>
                    {selected.updated_at && (
                      <span className="text-[10px]" style={{ color: 'var(--text-faint)' }}>
                        (Actualizado {timeAgo(selected.updated_at)} atrás)
                      </span>
                    )}
                  </div>
                  {selected.biography && (
                    <p className="text-[12px] mt-1 line-clamp-2" style={{ color: 'var(--text-secondary)' }}>{selected.biography}</p>
                  )}
                  <div className="flex gap-4 mt-3 flex-wrap">
                    <div className="flex items-center gap-1.5">
                      <Users size={12} style={{ color: 'var(--text-faint)' }} />
                      <span className="text-[12px] font-semibold" style={{ color: 'var(--text-primary)' }}>{formatFollowers(selected.followers_count)}</span>
                      <span className="text-[11px]" style={{ color: 'var(--text-faint)' }}>seguidores</span>
                    </div>
                    <div className="flex items-center gap-1.5">
                      <BarChart2 size={12} style={{ color: 'var(--text-faint)' }} />
                      <span className="text-[12px] font-semibold" style={{ color: 'var(--text-primary)' }}>{selected.avg_likes}</span>
                      <span className="text-[11px]" style={{ color: 'var(--text-faint)' }}>likes promedio</span>
                    </div>
                    <div className="flex items-center gap-1.5">
                      <TrendingUp size={12} style={{ color: 'var(--text-faint)' }} />
                      <span className="text-[12px] font-semibold" style={{ color: 'var(--text-primary)' }}>{selected.media_count}</span>
                      <span className="text-[11px]" style={{ color: 'var(--text-faint)' }}>posts totales</span>
                    </div>
                  </div>
                </div>
                
                {/* Keywords */}
                {selected.keywords.length > 0 && (
                  <div className="flex flex-col gap-1.5 flex-shrink-0">
                    <p className="text-[10px] font-semibold uppercase tracking-wider" style={{ color: 'var(--text-faint)' }}>Temas virales</p>
                    <div className="flex flex-wrap gap-1">
                      {selected.keywords.map(kw => (
                        <span key={kw} className="text-[10px] px-2 py-0.5 rounded-full font-medium" style={{ background: 'var(--sidebar-active-bg)', color: 'var(--text-primary)', border: '1px solid var(--border-medium)' }}>
                          #{kw}
                        </span>
                      ))}
                    </div>
                  </div>
                )}
              </div>

              {/* Sort bar */}
              <div className="flex items-center gap-2">
                <ArrowUpDown size={12} style={{ color: 'var(--text-faint)' }} />
                <span className="text-[11px]" style={{ color: 'var(--text-faint)' }}>Ordenar por:</span>
                <div className="flex gap-1.5 flex-wrap">
                  {SORT_OPTIONS.map(opt => (
                    <button
                      key={opt.key}
                      onClick={() => setSortKey(opt.key)}
                      className="text-[11px] px-2.5 py-1 rounded-lg font-medium transition-all cursor-pointer"
                      style={{
                        background: sortKey === opt.key ? 'var(--sidebar-active-bg)' : 'var(--bg-elevated)',
                        color: sortKey === opt.key ? 'var(--text-primary)' : 'var(--text-faint)',
                        border: sortKey === opt.key ? '1px solid var(--border-medium)' : '1px solid var(--border-subtle)',
                      }}
                    >
                      {opt.label}
                    </button>
                  ))}
                </div>
              </div>

              {/* Posts grid */}
              {sortedPosts.length === 0 ? (
                <div className="flex items-center justify-center rounded-xl p-12" style={{ border: '1px dashed var(--border-medium)', background: 'var(--bg-elevated)' }}>
                  <p className="text-[13px]" style={{ color: 'var(--text-faint)' }}>No hay posts disponibles para esta cuenta.</p>
                </div>
              ) : (
                <div className="grid grid-cols-1 gap-3 sm:grid-cols-2 xl:grid-cols-3">
                  {sortedPosts.map(post => {
                    const isViral = post.viral_score >= 2

                    return (
                      <button
                        key={post.id}
                        onClick={() => setSelectedPost(post)}
                        className="group block rounded-2xl p-4 transition-all hover:scale-[1.01] text-left cursor-pointer w-full"
                        style={{
                          background: 'var(--bg-elevated)',
                          border: isViral
                            ? '1px solid rgba(251, 146, 60, 0.5)'
                            : '1px solid var(--border-subtle)',
                        }}
                      >
                        {/* Top row */}
                        <div className="flex items-start justify-between gap-2 mb-3">
                          <div className="flex items-center gap-1.5">
                            {isViral && (
                              <span className="flex items-center gap-1 text-[10px] font-semibold px-2 py-0.5 rounded-full" style={{ background: 'rgba(251, 146, 60, 0.15)', color: '#fb923c', border: '1px solid rgba(251, 146, 60, 0.3)' }}>
                                <Flame size={9} />
                                VIRAL
                              </span>
                            )}
                            <span className="text-[10px] px-1.5 py-0.5 rounded-md" style={{ background: 'var(--bg-surface)', color: 'var(--text-faint)' }}>
                              {post.media_type === 'VIDEO' ? 'Reel' : post.media_type === 'CAROUSEL_ALBUM' ? 'Carrusel' : 'Post'}
                            </span>
                          </div>
                          <div className="flex items-center gap-1 text-[10px]" style={{ color: 'var(--text-faint)' }}>
                            <Clock size={9} />
                            {timeAgo(post.timestamp)}
                          </div>
                        </div>

                        {/* Caption */}
                        <p className="text-[12px] line-clamp-3 mb-3" style={{ color: 'var(--text-secondary)' }}>
                          {post.caption || 'Sin descripción'}
                        </p>

                        {/* Metrics */}
                        <div className="flex items-center justify-between pt-3" style={{ borderTop: '1px solid var(--border-subtle)' }}>
                          <div className="flex gap-3">
                            <div className="flex items-center gap-1">
                              <Heart size={11} style={{ color: 'var(--text-faint)' }} />
                              <span className="text-[12px] font-semibold" style={{ color: 'var(--text-primary)' }}>
                                {post.like_count.toLocaleString('es-AR')}
                              </span>
                            </div>
                            <div className="flex items-center gap-1">
                              <MessageCircle size={11} style={{ color: 'var(--text-faint)' }} />
                              <span className="text-[12px] font-semibold" style={{ color: 'var(--text-primary)' }}>
                                {post.comments_count.toLocaleString('es-AR')}
                              </span>
                            </div>
                          </div>
                          <div className="flex items-center gap-1">
                            <TrendingUp size={10} style={{ color: isViral ? '#fb923c' : 'var(--text-faint)' }} />
                            <span className="text-[10px] font-mono" style={{ color: isViral ? '#fb923c' : 'var(--text-faint)' }}>
                              {post.viral_score.toFixed(1)}x avg
                            </span>
                          </div>
                        </div>
                      </button>
                    )
                  })}
                </div>
              )}
            </>
          )}
        </main>
      </div>

      {/* Slide-out panel para post seleccionado */}
      <Sheet open={!!selectedPost} onOpenChange={(open) => !open && setSelectedPost(null)}>
        <SheetContent
          side="right"
          className="w-[50vw] max-w-[600px] p-0"
          style={{
            background: "var(--bg-base)",
            borderLeft: "1px solid var(--border-subtle)",
          }}
        >
          {selectedPost && selected && (
            <ScrollArea className="h-full">
              <div className="flex flex-col gap-5 p-6">

                {/* Cuenta info mini */}
                <div className="flex items-center gap-3">
                  {selected.profile_picture_url ? (
                    <img src={selected.profile_picture_url} alt={selected.username} className="w-8 h-8 rounded-full" style={{ border: '1px solid var(--border-subtle)' }} />
                  ) : (
                    <div className="w-8 h-8 rounded-full flex items-center justify-center text-[11px] font-bold" style={{ background: 'var(--bg-elevated)', color: 'var(--text-primary)' }}>
                      {selected.username.charAt(0).toUpperCase()}
                    </div>
                  )}
                  <div>
                    <p className="text-[12px] font-semibold" style={{ color: 'var(--text-primary)' }}>@{selected.username}</p>
                    <p className="text-[10px]" style={{ color: 'var(--text-faint)' }}>{formatDate(selectedPost.timestamp)}</p>
                  </div>
                  {selectedPost.viral_score >= 2 && (
                    <span className="flex items-center gap-1 text-[10px] font-semibold px-2 py-0.5 rounded-full ml-auto" style={{ background: 'rgba(251, 146, 60, 0.15)', color: '#fb923c', border: '1px solid rgba(251, 146, 60, 0.3)' }}>
                      <Flame size={9} />
                      VIRAL
                    </span>
                  )}
                </div>

                {/* Image */}
                {selectedPost.media_url && (
                  <div
                    className={`relative w-full overflow-hidden rounded-xl ${
                      selectedPost.media_type === "VIDEO" ? "aspect-[9/16] max-h-[380px]" : "aspect-[4/5] max-h-[480px]"
                    }`}
                    style={{ border: "1px solid var(--border-subtle)" }}
                  >
                    <img
                      src={selectedPost.media_url}
                      alt={selectedPost.caption || "Post de competencia"}
                      className="object-cover w-full h-full"
                    />
                  </div>
                )}

                {/* Caption completo */}
                <p className="text-[13px] leading-relaxed" style={{ color: 'var(--text-primary)' }}>
                  {selectedPost.caption || "Sin descripción"}
                </p>

                {/* Métricas */}
                <div className="grid grid-cols-2 gap-2">
                  {[
                    { label: "Likes", value: fmt(selectedPost.like_count) },
                    { label: "Comentarios", value: fmt(selectedPost.comments_count) },
                    { label: "Engagement", value: fmt(selectedPost.engagement) },
                    { label: "Viral Score", value: selectedPost.viral_score.toFixed(1) + "x" },
                  ].map(({ label, value }) => (
                    <div
                      key={label}
                      className="flex flex-col gap-1.5 rounded-lg px-3 py-2.5"
                      style={{
                        background: "var(--bg-elevated)",
                        border: "1px solid var(--border-subtle)",
                      }}
                    >
                      <span className="text-[9px] font-semibold uppercase tracking-[0.05em]" style={{ color: "var(--text-secondary)" }}>
                        {label}
                      </span>
                      <span className="font-mono text-[15px] font-bold leading-none" style={{ color: "var(--text-primary)" }}>
                        {value}
                      </span>
                    </div>
                  ))}
                </div>

                <div className="separator-line" />

                {/* Tipo y fecha */}
                <div className="flex items-center gap-2 flex-wrap">
                  <span className="text-[10px] px-2 py-0.5 rounded-md" style={{ background: 'var(--bg-elevated)', color: 'var(--text-faint)', border: '1px solid var(--border-subtle)' }}>
                    {selectedPost.media_type === 'VIDEO' ? 'Reel' : selectedPost.media_type === 'CAROUSEL_ALBUM' ? 'Carrusel' : 'Post'}
                  </span>
                  <span className="text-[10px]" style={{ color: 'var(--text-faint)' }}>
                    Promedio de @{selected.username}: {selected.avg_likes} likes
                  </span>
                </div>

                {/* Contexto vs promedio */}
                <div className="rounded-lg p-4" style={{ background: 'var(--bg-elevated)', border: '1px solid var(--border-subtle)' }}>
                  <p className="text-[11px] font-semibold mb-2" style={{ color: 'var(--text-secondary)' }}>Rendimiento vs. promedio de la cuenta</p>
                  <div className="flex items-center gap-3">
                    <div className="flex-1 h-2 rounded-full overflow-hidden" style={{ background: 'var(--bg-surface)' }}>
                      <div
                        className="h-full rounded-full transition-all"
                        style={{
                          width: `${Math.min(selectedPost.viral_score * 50, 100)}%`,
                          background: selectedPost.viral_score >= 2 ? '#fb923c' : selectedPost.viral_score >= 1 ? '#22c55e' : '#ef4444',
                        }}
                      />
                    </div>
                    <span className="text-[12px] font-mono font-bold" style={{ color: selectedPost.viral_score >= 2 ? '#fb923c' : selectedPost.viral_score >= 1 ? '#22c55e' : '#ef4444' }}>
                      {selectedPost.viral_score.toFixed(1)}x
                    </span>
                  </div>
                  <p className="text-[10px] mt-2" style={{ color: 'var(--text-faint)' }}>
                    {selectedPost.viral_score >= 2
                      ? "Este post rindió más del doble del promedio. Analizá qué lo hizo viral."
                      : selectedPost.viral_score >= 1
                      ? "Este post rindió por encima del promedio."
                      : "Este post rindió por debajo del promedio."}
                  </p>
                </div>

                {/* Link a Instagram */}
                <a
                  href={selectedPost.permalink}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center justify-center gap-2 rounded-lg px-4 py-2.5 text-[12px] font-medium transition-opacity hover:opacity-80"
                  style={{ background: 'var(--bg-elevated)', border: '1px solid var(--border-subtle)', color: 'var(--text-primary)' }}
                >
                  <ExternalLink size={12} />
                  Ver en Instagram
                </a>
              </div>
            </ScrollArea>
          )}
        </SheetContent>
      </Sheet>
    </>
  )
}
