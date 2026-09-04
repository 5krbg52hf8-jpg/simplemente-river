import { DollarSign, Users, TrendingDown, BarChart2, Sparkles } from "lucide-react"
import { MetricCard } from "@/components/shared/MetricCard"
import { CampaignsTable } from "@/components/ads/CampaignsTable"
import { SpendChart } from "@/components/ads/SpendChart"
import { mockCampaigns, adsKPIs } from "@/lib/mock/ads"

const spendChartData = mockCampaigns.map((c) => ({
  name: c.name.split("—")[0].trim().substring(0, 16) + "…",
  spend: c.spend,
  leads: c.leads,
}))

export default function AdsPage() {
  return (
    <div className="flex flex-col gap-5 p-6">
      {/* KPIs */}
      <div className="grid grid-cols-2 gap-3.5 lg:grid-cols-4">
        <MetricCard label="Spend total" value={"$" + adsKPIs.total_spend_month.toLocaleString()} icon={<DollarSign size={13} />} />
        <MetricCard label="Leads generados" value={adsKPIs.total_leads_month} icon={<Users size={13} />} />
        <MetricCard label="CPL promedio" value={"$" + adsKPIs.avg_cpl.toFixed(2)} icon={<TrendingDown size={13} />} />
        <MetricCard label="CTR promedio" value={adsKPIs.avg_ctr + "%"} icon={<BarChart2 size={13} />} />
      </div>

      {/* Insight global — refined glass */}
      <div
        className="flex items-start gap-3 rounded-xl p-4"
        style={{
          background: "rgba(59,130,246,0.05)",
          border: "1px solid rgba(59,130,246,0.14)",
          boxShadow: "0 0 0 1px rgba(59,130,246,0.04) inset",
        }}
      >
        <Sparkles size={13} className="mt-0.5 flex-shrink-0" style={{ color: "var(--accent-ads)" }} />
        <p className="text-[11px] leading-relaxed" style={{ color: "var(--text-secondary)" }}>
          {adsKPIs.ai_global_insight}
        </p>
      </div>

      {/* Table + Chart */}
      <div className="grid grid-cols-1 gap-3.5 lg:grid-cols-3">
        <div className="lg:col-span-2">
          <h2 className="section-label mb-3">Campañas activas</h2>
          <CampaignsTable />
        </div>
        <div className="card-surface p-5">
          <h2 className="section-label mb-4">Spend vs. Leads</h2>
          <SpendChart data={spendChartData} />
        </div>
      </div>
    </div>
  )
}
