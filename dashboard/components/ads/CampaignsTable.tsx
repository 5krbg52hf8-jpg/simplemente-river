"use client"

import { useState } from "react"
import { ChevronDown, ChevronRight } from "lucide-react"
import { AdDetailModal } from "./AdDetailModal"
import { mockCampaigns } from "@/lib/mock/ads"
import type { AdCreative } from "@/lib/mock/ads"
import { cn } from "@/lib/utils"

const statusColors: Record<string, string> = {
  active: "var(--color-positive)",
  paused: "#f59e0b",
  ended: "var(--text-faint)",
}

const statusLabels: Record<string, string> = {
  active: "Activa",
  paused: "Pausada",
  ended: "Finalizada",
}

export function CampaignsTable() {
  const [expanded, setExpanded] = useState<string[]>([])
  const [selectedAd, setSelectedAd] = useState<AdCreative | null>(null)

  function toggle(id: string) {
    setExpanded((prev) => prev.includes(id) ? prev.filter((x) => x !== id) : [...prev, id])
  }

  return (
    <>
      <div className="flex flex-col gap-2">
        {mockCampaigns.map((campaign) => {
          const isExpanded = expanded.includes(campaign.id)
          return (
            <div key={campaign.id} className="card-surface overflow-hidden">
              {/* Campaign row */}
              <button
                onClick={() => toggle(campaign.id)}
                className="flex w-full items-center gap-3 p-4 text-left transition-colors hover:bg-white/[0.03]"
              >
                <span className="text-[var(--text-secondary)]">
                  {isExpanded ? <ChevronDown size={15} /> : <ChevronRight size={15} />}
                </span>
                <div className="flex flex-1 items-center gap-3 min-w-0">
                  <div className="min-w-0 flex-1">
                    <p className="truncate text-sm font-medium text-[var(--text-primary)]">{campaign.name}</p>
                    <p className="text-[10px] text-[var(--text-faint)]">{campaign.objective} · desde {campaign.start_date}</p>
                  </div>
                  <span
                    className="flex-shrink-0 rounded-full px-2 py-0.5 text-[10px] font-medium"
                    style={{ color: statusColors[campaign.status], backgroundColor: statusColors[campaign.status] + "15" }}
                  >
                    {statusLabels[campaign.status]}
                  </span>
                </div>
                <div className="hidden items-center gap-6 sm:flex">
                  {[
                    { label: "Spend", value: "$" + campaign.spend.toLocaleString() },
                    { label: "Leads", value: campaign.leads },
                    { label: "CPL", value: "$" + campaign.cpl.toFixed(2) },
                    { label: "CTR", value: campaign.ctr + "%" },
                  ].map(({ label, value }) => (
                    <div key={label} className="flex flex-col items-end gap-0.5">
                      <span className="text-[9px] uppercase tracking-widest text-[var(--text-faint)]">{label}</span>
                      <span className="font-mono text-xs font-semibold text-[var(--text-primary)]">{value}</span>
                    </div>
                  ))}
                </div>
              </button>

              {/* Expanded ads */}
              {isExpanded && (
                <div className="border-t border-[var(--border-subtle)] bg-[var(--bg-elevated)]">
                  {campaign.ads.map((ad) => (
                    <button
                      key={ad.id}
                      onClick={() => setSelectedAd(ad)}
                      className={cn(
                        "flex w-full items-center gap-3 px-6 py-3 text-left",
                        "border-b border-[var(--border-subtle)] last:border-0",
                        "transition-colors hover:bg-white/[0.03]"
                      )}
                    >
                      <div className="flex flex-1 min-w-0 flex-col">
                        <p className="truncate text-xs font-medium text-[var(--text-secondary)]">
                          {ad.name}
                        </p>
                      </div>
                      <div className="flex items-center gap-6">
                        {[
                          { label: "Spend", value: "$" + ad.spend.toLocaleString() },
                          { label: "Leads", value: ad.leads },
                          { label: "CPL", value: "$" + ad.cpl.toFixed(2) },
                          { label: "CTR", value: ad.ctr + "%" },
                        ].map(({ label, value }) => (
                          <div key={label} className="hidden flex-col items-end gap-0.5 sm:flex">
                            <span className="text-[9px] uppercase tracking-widest text-[var(--text-faint)]">{label}</span>
                            <span className="font-mono text-xs font-semibold text-[var(--text-primary)]">{value}</span>
                          </div>
                        ))}
                        <ChevronRight size={13} className="text-[var(--text-faint)]" />
                      </div>
                    </button>
                  ))}
                </div>
              )}
            </div>
          )
        })}
      </div>

      <AdDetailModal ad={selectedAd} onClose={() => setSelectedAd(null)} />
    </>
  )
}
