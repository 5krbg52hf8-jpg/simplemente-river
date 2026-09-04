"use client"

import Image from "next/image"
import { ExternalLink, TrendingUp, TrendingDown, Clock, Eye, ThumbsUp } from "lucide-react"
import { Sheet, SheetContent } from "@/components/ui/sheet"
import { ScrollArea } from "@/components/ui/scroll-area"
import { RetentionChart } from "@/components/shared/RetentionChart"
import { TranscriptionBlock } from "@/components/instagram/TranscriptionBlock"
import { AIInsightsBlock } from "@/components/instagram/AIInsightsBlock"
import { getVideoById } from "@/lib/mock/youtube"

interface VideoModalProps {
  videoId: string | null
  onClose: () => void
}

function fmt(n: number): string {
  if (n >= 1_000_000) return (n / 1_000_000).toFixed(1) + "M"
  if (n >= 1_000) return (n / 1_000).toFixed(1) + "k"
  return n.toString()
}

function fakeRetention(duration_s: number) {
  const pts = []
  for (let s = 0; s <= duration_s; s += Math.floor(duration_s / 20)) {
    let ret = 100 - (s / duration_s) * 60
    ret = Math.max(15, ret + (Math.random() * 5 - 2.5))
    pts.push({ second: s, retention: Math.round(ret) })
  }
  return pts
}

export function VideoModal({ videoId, onClose }: VideoModalProps) {
  const video = videoId ? getVideoById(videoId) : null

  return (
    <Sheet open={!!videoId} onOpenChange={(open) => !open && onClose()}>
      <SheetContent
        side="right"
        className="w-[65vw] max-w-[800px] border-l border-[var(--border-subtle)] bg-[var(--bg-base)] p-0"
      >
        {video && (
          <ScrollArea className="h-full">
            <div className="flex flex-col gap-6 p-6">

              {/* Thumbnail 16:9 */}
              <div className="relative aspect-video w-full overflow-hidden rounded-xl border border-[var(--border-subtle)]">
                <Image
                  src={video.thumbnail}
                  alt={video.title}
                  fill
                  className="object-cover"
                  sizes="(max-width: 800px) 100vw, 800px"
                />
                <div className="absolute bottom-3 right-3 flex items-center gap-1 rounded-lg bg-black/80 px-2 py-1 text-xs font-medium text-white">
                  <Clock size={11} />
                  {video.duration}
                </div>
              </div>

              {/* Title + date */}
              <div>
                <h2 className="text-base font-semibold leading-snug text-[var(--text-primary)]">
                  {video.title}
                </h2>
                <p className="mt-1 text-xs text-[var(--text-faint)]">{video.date}</p>
              </div>

              {/* KPI grid */}
              <div className="grid grid-cols-3 gap-2 sm:grid-cols-4">
                {[
                  { label: "Views", value: fmt(video.metrics.views), icon: <Eye size={10} /> },
                  { label: "Likes", value: fmt(video.metrics.likes), icon: <ThumbsUp size={10} /> },
                  { label: "CTR", value: video.metrics.ctr + "%" },
                  { label: "Watch time", value: fmt(video.metrics.watch_time_total_h) + "h" },
                  { label: "Avg view", value: Math.floor(video.metrics.avg_view_duration_s / 60) + "m " + (video.metrics.avg_view_duration_s % 60) + "s" },
                  { label: "Impresiones", value: fmt(video.metrics.impressions) },
                  { label: "Comentarios", value: fmt(video.metrics.comments) },
                  { label: "Retención", value: Math.round((video.metrics.avg_view_duration_s / video.metrics.duration_s) * 100) + "%" },
                ].map(({ label, value, icon }) => (
                  <div key={label} className="flex flex-col gap-0.5 rounded-lg border border-[var(--border-subtle)] bg-[var(--bg-surface)] p-2.5">
                    <span className="flex items-center gap-1 text-[9px] font-semibold uppercase tracking-widest text-[var(--text-faint)]">
                      {icon}
                      {label}
                    </span>
                    <span className="font-mono text-sm font-bold text-[var(--text-primary)]">{value}</span>
                  </div>
                ))}
              </div>

              {/* Comparación vs promedio */}
              <div className="flex flex-col gap-2">
                <span className="text-[10px] font-semibold uppercase tracking-widest text-[var(--text-secondary)]">
                  Comparación vs. promedio del canal
                </span>
                <div className="grid grid-cols-2 gap-2 sm:grid-cols-4">
                  {video.avg_comparison.map(({ metric, delta }) => (
                    <div key={metric} className="flex flex-col gap-1 rounded-lg border border-[var(--border-subtle)] bg-[var(--bg-surface)] p-3">
                      <span className="text-[10px] text-[var(--text-faint)]">{metric}</span>
                      <div className="flex items-center gap-1">
                        {delta > 0 ? (
                          <TrendingUp size={12} className="text-[var(--color-positive)]" />
                        ) : delta < 0 ? (
                          <TrendingDown size={12} className="text-[var(--color-negative)]" />
                        ) : null}
                        <span
                          className="text-sm font-bold"
                          style={{ color: delta > 0 ? "var(--color-positive)" : delta < 0 ? "var(--color-negative)" : "var(--text-secondary)" }}
                        >
                          {delta > 0 ? "+" : ""}{delta}%
                        </span>
                      </div>
                    </div>
                  ))}
                </div>
              </div>

              {/* Retention */}
              <div className="card-surface p-4">
                <span className="mb-3 block text-[10px] font-semibold uppercase tracking-widest text-[var(--text-secondary)]">
                  Curva de retención
                </span>
                <RetentionChart
                  data={fakeRetention(video.metrics.duration_s)}
                  avgWatchTime={video.metrics.avg_view_duration_s}
                  duration={video.metrics.duration_s}
                />
              </div>

              {/* AI Insights */}
              <AIInsightsBlock insights={video.ai_insights} improvements={video.improvement_points} />

              {/* Transcription */}
              <TranscriptionBlock lines={video.transcription} />

              <a href="#" className="flex w-fit items-center gap-1 text-[10px] text-[var(--text-secondary)] hover:text-[var(--text-primary)]">
                <ExternalLink size={10} />
                Ver en YouTube
              </a>
            </div>
          </ScrollArea>
        )}
      </SheetContent>
    </Sheet>
  )
}
