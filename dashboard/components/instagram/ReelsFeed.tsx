"use client"

import { useState, useEffect } from "react"
import { RefreshCw, Film, Image, LayoutGrid, Grid2x2 } from "lucide-react"
import { ContentCard } from "@/components/shared/ContentCard"
import { ReelModal } from "./ReelModal"
import type { IGReelData } from "@/lib/instagramTypes"

type FilterTab = 'reels' | 'post'

const TABS: { key: FilterTab; label: string; icon: React.ReactNode }[] = [
  { key: 'reels', label: 'Reels', icon: <Film size={13} /> },
  { key: 'post', label: 'Post', icon: <Image size={13} /> },
]

function matchesTab(reel: IGReelData, tab: FilterTab): boolean {
  if (tab === 'reels') return reel.media_type === 'VIDEO' || reel.media_type === 'REEL'
  if (tab === 'post') return reel.media_type === 'IMAGE' || reel.media_type === 'CAROUSEL_ALBUM'
  return true
}

function getTabCount(reels: IGReelData[], tab: FilterTab): number {
  return reels.filter(r => matchesTab(r, tab)).length
}

export function ReelsFeed() {
  const [reels, setReels] = useState<IGReelData[]>([])
  const [loading, setLoading] = useState(true)
  const [syncing, setSyncing] = useState(false)
  const [error, setError] = useState<string | null>(null)
  const [selectedReel, setSelectedReel] = useState<IGReelData | null>(null)
  const [activeTab, setActiveTab] = useState<FilterTab>('reels')

  async function fetchReels(refresh = false) {
    if (refresh) setSyncing(true)
    else setLoading(true)
    setError(null)
    try {
      const res = await fetch(`/api/instagram/media${refresh ? "?refresh=1" : ""}`)
      const data = await res.json()
      if (!res.ok) throw new Error(data.error ?? "Error al cargar publicaciones")
      setReels(data.reels)
    } catch (err) {
      setError(err instanceof Error ? err.message : "Error desconocido")
    } finally {
      setLoading(false)
      setSyncing(false)
    }
  }

  useEffect(() => {
    fetchReels()
  }, [])

  const filtered = reels.filter(r => matchesTab(r, activeTab))

  if (loading) {
    return (
      <div className="space-y-5">
        <div className="flex gap-2">
          {TABS.map(t => (
            <div key={t.key} className="h-8 w-24 animate-pulse rounded-lg" style={{ background: 'var(--bg-elevated)' }} />
          ))}
        </div>
        <div className="grid grid-cols-2 gap-3.5 md:grid-cols-3 xl:grid-cols-4">
          {Array.from({ length: 8 }).map((_, i) => (
            <div key={i} className="animate-pulse rounded-xl" style={{ height: 220, background: "var(--bg-elevated)", border: "1px solid var(--border-subtle)" }} />
          ))}
        </div>
      </div>
    )
  }

  if (error) {
    return (
      <div className="flex flex-col items-center gap-3 rounded-xl p-10 text-center" style={{ border: "1px dashed var(--border-medium)", background: "var(--bg-elevated)" }}>
        <p className="text-[13px] font-medium" style={{ color: "var(--text-primary)" }}>No se pudieron cargar las publicaciones</p>
        <p className="text-[11px]" style={{ color: "var(--text-faint)" }}>{error}</p>
        <button onClick={() => fetchReels()} className="mt-1 rounded-md px-3 py-1.5 text-[11px] font-medium transition-colors cursor-pointer" style={{ background: "var(--sidebar-active-bg)", border: "1px solid var(--border-medium)", color: "var(--text-primary)" }}>
          Reintentar
        </button>
      </div>
    )
  }

  return (
    <>
      {/* Toolbar */}
      <div className="mb-5 flex items-center justify-between flex-wrap gap-3">
        {/* Tabs */}
        <div className="flex items-center gap-1.5 p-1 rounded-xl" style={{ background: 'var(--bg-elevated)', border: '1px solid var(--border-subtle)' }}>
          {TABS.map(tab => {
            const count = getTabCount(reels, tab.key)
            const isActive = activeTab === tab.key
            return (
              <button
                key={tab.key}
                onClick={() => setActiveTab(tab.key)}
                className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-[12px] font-medium transition-all cursor-pointer"
                style={{
                  background: isActive ? 'var(--sidebar-active-bg)' : 'transparent',
                  color: isActive ? 'var(--text-primary)' : 'var(--text-faint)',
                  border: isActive ? '1px solid var(--border-medium)' : '1px solid transparent',
                }}
              >
                {tab.icon}
                {tab.label}
                <span className="text-[10px] font-mono px-1.5 py-0.5 rounded-md" style={{ background: 'var(--bg-surface)', color: 'var(--text-faint)' }}>
                  {count}
                </span>
              </button>
            )
          })}
        </div>

        {/* Refresh */}
        <button
          onClick={() => fetchReels(true)}
          disabled={syncing}
          className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-[11px] font-medium transition-colors cursor-pointer"
          style={{ background: 'var(--bg-elevated)', border: '1px solid var(--border-subtle)', color: 'var(--text-faint)' }}
        >
          <RefreshCw size={12} className={syncing ? 'animate-spin' : ''} />
          {syncing ? 'Sincronizando...' : 'Actualizar'}
        </button>
      </div>

      {/* Grid */}
      {filtered.length === 0 ? (
        <div className="flex items-center justify-center rounded-xl p-12 text-center" style={{ border: '1px dashed var(--border-medium)', background: 'var(--bg-elevated)' }}>
          <p className="text-[13px]" style={{ color: 'var(--text-faint)' }}>No hay publicaciones de este tipo todavía.</p>
        </div>
      ) : (
        <div className="grid grid-cols-2 gap-3.5 md:grid-cols-3 xl:grid-cols-4">
          {filtered.map((reel) => (
            <ContentCard
              key={reel.id}
              id={reel.id}
              thumbnail={reel.thumbnail}
              caption={reel.caption}
              date={reel.date}
              metrics={{
                reach: reel.metrics.reach,
                plays: reel.metrics.plays,
                likes: reel.metrics.likes,
                saves: reel.metrics.saves,
                engagement_rate: reel.metrics.engagement_rate,
              }}
              transcribed={reel.transcribed}
              platform="instagram"
              media_type={reel.media_type}
              duration={reel.metrics.duration_s > 0 ? `${reel.metrics.duration_s}s` : undefined}
              onClick={() => setSelectedReel(reel)}
            />
          ))}
        </div>
      )}

      {/* Modal */}
      <ReelModal reel={selectedReel} onClose={() => setSelectedReel(null)} />
    </>
  )
}
