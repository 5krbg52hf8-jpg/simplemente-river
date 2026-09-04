import { Heart, AlertTriangle, ShoppingBag } from "lucide-react"
import type { voiceInsights } from "@/lib/mock/customer-voice"

type Insights = typeof voiceInsights

const categories = [
  {
    key: "top_motivations" as keyof Insights,
    label: "Motivaciones de compra",
    icon: Heart,
    color: "var(--color-positive)",
    bg: "var(--color-positive-bg)",
  },
  {
    key: "top_objections" as keyof Insights,
    label: "Objeciones más comunes",
    icon: AlertTriangle,
    color: "var(--color-negative)",
    bg: "var(--color-negative-bg)",
  },
  {
    key: "top_closing_phrases" as keyof Insights,
    label: "Frases de cierre",
    icon: ShoppingBag,
    color: "var(--accent-ads)",
    bg: "rgba(59,130,246,0.08)",
  },
]

export function InsightsPanel({ insights }: { insights: Insights }) {
  return (
    <div className="flex flex-col gap-4">
      {categories.map(({ key, label, icon: Icon, color, bg }) => {
        const items = insights[key] as Array<{ phrase: string; count: number }>
        return (
          <div key={key} className="flex flex-col gap-2">
            <div className="flex items-center gap-2">
              <Icon size={11} style={{ color }} />
              <span className="section-label">{label}</span>
            </div>
            <div className="flex flex-col gap-1">
              {items.map((item) => (
                <div
                  key={item.phrase}
                  className="flex items-center justify-between gap-3 rounded-lg px-3 py-2"
                  style={{
                    background: "var(--bg-elevated)",
                    border: "1px solid var(--border-subtle)",
                  }}
                >
                  <p className="text-[11px]" style={{ color: "var(--text-secondary)" }}>
                    "{item.phrase}"
                  </p>
                  <span
                    className="flex-shrink-0 rounded-full px-1.5 py-0.5 text-[9px] font-bold"
                    style={{ color, background: bg }}
                  >
                    ×{item.count}
                  </span>
                </div>
              ))}
            </div>
          </div>
        )
      })}
    </div>
  )
}
