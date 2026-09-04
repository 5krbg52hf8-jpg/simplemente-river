"use client"

import { useState } from "react"
import Image from "next/image"
import { Eye, ThumbsUp, Clock, CheckCircle, Youtube } from "lucide-react"
import { VideoModal } from "./VideoModal"
import { mockVideos } from "@/lib/mock/youtube"
import { cn } from "@/lib/utils"

function fmt(n: number): string {
  if (n >= 1_000) return (n / 1_000).toFixed(1) + "k"
  return n.toString()
}

export function VideosFeed() {
  const [selectedId, setSelectedId] = useState<string | null>(null)

  return (
    <>
      <div className="flex flex-col gap-3">
        {mockVideos.map((video) => (
          <div
            key={video.id}
            onClick={() => setSelectedId(video.id)}
            className="card-surface group flex cursor-pointer gap-4 p-4 transition-all hover:border-white/[0.12] hover:bg-[#1a1a28]"
          >
            {/* Thumbnail 16:9 */}
            <div className="relative h-[80px] w-[142px] flex-shrink-0 overflow-hidden rounded-lg">
              <Image
                src={video.thumbnail}
                alt={video.title}
                fill
                className="object-cover transition-transform duration-200 group-hover:scale-[1.02]"
                sizes="142px"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/40 to-transparent" />
              <div className="absolute bottom-1.5 right-1.5 flex items-center gap-1 rounded bg-black/80 px-1.5 py-0.5 text-[10px] font-medium text-white">
                <Clock size={9} />
                {video.duration}
              </div>
            </div>

            {/* Info */}
            <div className="flex min-w-0 flex-1 flex-col justify-between">
              <div>
                <div className="flex items-start gap-2">
                  <p className="flex-1 text-sm font-medium leading-snug text-[var(--text-primary)] group-hover:text-white">
                    {video.title}
                  </p>
                  {video.transcribed && (
                    <span className="flex flex-shrink-0 items-center gap-1 rounded bg-[var(--color-positive)]/10 px-1.5 py-0.5 text-[9px] font-medium text-[var(--color-positive)]">
                      <CheckCircle size={9} />
                      Transcripto
                    </span>
                  )}
                </div>
                <p className="mt-0.5 text-[10px] text-[var(--text-faint)]">{video.date}</p>
              </div>

              {/* Metrics row */}
              <div className="mt-2 flex items-center gap-4">
                <div className="flex items-center gap-1 text-[11px] text-[var(--text-secondary)]">
                  <Eye size={11} />
                  <span>{fmt(video.metrics.views)}</span>
                </div>
                <div className="flex items-center gap-1 text-[11px] text-[var(--text-secondary)]">
                  <ThumbsUp size={11} />
                  <span>{fmt(video.metrics.likes)}</span>
                </div>
                <div className="flex items-center gap-1 text-[11px] text-[var(--text-secondary)]">
                  <Clock size={11} />
                  <span>{fmt(video.metrics.watch_time_total_h)}h watch time</span>
                </div>
                <div className={cn("ml-auto flex items-center gap-1 text-[11px]")}>
                  <Youtube size={11} className="text-[var(--accent-youtube)]" />
                  <span className="font-semibold text-[var(--text-primary)]">CTR {video.metrics.ctr}%</span>
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>

      <VideoModal videoId={selectedId} onClose={() => setSelectedId(null)} />
    </>
  )
}
