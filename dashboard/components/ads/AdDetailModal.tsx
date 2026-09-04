"use client"

import Image from "next/image"
import { Sparkles } from "lucide-react"
import { Sheet, SheetContent } from "@/components/ui/sheet"
import { ScrollArea } from "@/components/ui/scroll-area"
import { CountryChart } from "@/components/shared/CountryChart"
import type { AdCreative } from "@/lib/mock/ads"

interface AdDetailModalProps {
  ad: AdCreative | null
  onClose: () => void
}

export function AdDetailModal({ ad, onClose }: AdDetailModalProps) {
  return (
    <Sheet open={!!ad} onOpenChange={(open) => !open && onClose()}>
      <SheetContent
        side="right"
        className="w-[60vw] max-w-[700px] p-0"
        style={{
          background: "var(--bg-base)",
          borderLeft: "1px solid var(--border-subtle)",
        }}
      >
        {ad && (
          <ScrollArea className="h-full">
            <div className="flex flex-col gap-6 p-6">
              {/* Header */}
              <div className="flex gap-4 items-start">
                <div
                  className="relative h-28 w-28 flex-shrink-0 overflow-hidden rounded-xl"
                  style={{ border: "1px solid var(--border-subtle)" }}
                >
                  <Image src={ad.thumbnail} alt={ad.name} fill className="object-cover" sizes="112px" />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/30 to-transparent" />
                </div>
                <div className="flex flex-col gap-1.5 pt-1">
                  <h3 className="text-[14px] font-semibold" style={{ color: "var(--text-primary)" }}>
                    {ad.name}
                  </h3>
                  <p className="text-[10px]" style={{ color: "var(--text-faint)" }}>
                    Creativo de Meta Ads
                  </p>
                </div>
              </div>

              {/* Separator */}
              <div className="separator-line" />

              {/* Metrics */}
              <div className="grid grid-cols-3 gap-2">
                {[
                  { label: "Spend", value: "$" + ad.spend.toLocaleString() },
                  { label: "Impressiones", value: (ad.impressions / 1000).toFixed(0) + "k" },
                  { label: "Reach", value: (ad.reach / 1000).toFixed(0) + "k" },
                  { label: "Clicks", value: ad.clicks.toLocaleString() },
                  { label: "CPC", value: "$" + ad.cpc.toFixed(2) },
                  { label: "CTR", value: ad.ctr + "%" },
                  { label: "Leads", value: ad.leads },
                  { label: "CPL", value: "$" + ad.cpl.toFixed(2) },
                ].map(({ label, value }) => (
                  <div
                    key={label}
                    className="flex flex-col gap-1 rounded-lg p-2.5"
                    style={{
                      background: "var(--bg-elevated)",
                      border: "1px solid var(--border-subtle)",
                    }}
                  >
                    <span
                      className="text-[9px] font-semibold uppercase tracking-[0.11em]"
                      style={{ color: "var(--text-faint)" }}
                    >
                      {label}
                    </span>
                    <span
                      className="font-mono text-[14px] font-bold"
                      style={{ color: "var(--text-primary)" }}
                    >
                      {value}
                    </span>
                  </div>
                ))}
              </div>

              {/* AI Analysis */}
              <div className="flex flex-col gap-2.5">
                <div className="flex items-center gap-2">
                  <Sparkles size={11} style={{ color: "var(--accent-ads)" }} />
                  <span className="section-label">Análisis IA del creativo</span>
                </div>
                <div
                  className="rounded-lg p-3.5"
                  style={{
                    background: "rgba(59,130,246,0.04)",
                    border: "1px solid rgba(59,130,246,0.12)",
                  }}
                >
                  <p className="text-[11px] leading-relaxed" style={{ color: "var(--text-secondary)" }}>
                    {ad.ai_analysis}
                  </p>
                </div>
              </div>

              {/* Country breakdown */}
              <div className="flex flex-col gap-2.5">
                <span className="section-label">Distribución geográfica</span>
                <CountryChart
                  data={ad.country_breakdown.map((c) => ({
                    country: c.country,
                    organic: c.leads * 1000,
                    paid: c.spend * 100,
                  }))}
                />
                <div
                  className="flex flex-col gap-0 rounded-lg overflow-hidden mt-1"
                  style={{ border: "1px solid var(--border-subtle)" }}
                >
                  {ad.country_breakdown.map((c, i) => (
                    <div
                      key={c.country}
                      className="flex items-center justify-between px-3 py-2"
                      style={{
                        fontSize: 11,
                        background: i % 2 === 0 ? "var(--bg-elevated)" : "transparent",
                        borderBottom: i < ad.country_breakdown.length - 1 ? "1px solid var(--border-subtle)" : "none",
                      }}
                    >
                      <span style={{ color: "var(--text-secondary)" }}>{c.country}</span>
                      <div className="flex items-center gap-4">
                        <span style={{ color: "var(--text-faint)" }}>{c.leads} leads</span>
                        <span className="font-mono font-semibold" style={{ color: "var(--text-primary)" }}>
                          CPL ${c.cpl.toFixed(2)}
                        </span>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </ScrollArea>
        )}
      </SheetContent>
    </Sheet>
  )
}
