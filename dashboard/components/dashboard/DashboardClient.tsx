"use client"

import { useState } from "react"
import { Eye, Bookmark, TrendingUp, Film, Calendar } from "lucide-react"
import { MetricCard } from "@/components/shared/MetricCard"
import { ViewsChart } from "@/components/dashboard/ViewsChart"
import { TopContent } from "@/components/dashboard/TopContent"
import { GoalsSectionClient } from "@/components/dashboard/GoalsSectionClient"
import { CountryChart } from "@/components/shared/CountryChart"
import { getDashboardData } from "@/lib/instagramDashboard"
import type { IGMediaItem } from "@/lib/instagramTypes"

interface DashboardClientProps {
  media: IGMediaItem[]
  followerCount: number
  countryData: any[]
}

type TimeRange = 'all' | 'today' | 'week' | 'month' | '90d' | 'year'

const RANGE_OPTIONS: { value: TimeRange; label: string }[] = [
  { value: 'all', label: 'Todo el tiempo' },
  { value: 'today', label: 'Hoy' },
  { value: 'week', label: 'Última semana' },
  { value: 'month', label: 'Último mes' },
  { value: '90d', label: 'Últimos 90 días' },
  { value: 'year', label: 'Último año' },
]

export function DashboardClient({ media, followerCount, countryData }: DashboardClientProps) {
  const [timeRange, setTimeRange] = useState<TimeRange>('month')

  // Filter media based on time range
  const filteredMedia = media.filter(item => {
    if (timeRange === 'all') return true
    
    const itemDate = new Date(item.timestamp).getTime()
    const now = new Date().getTime()
    const diff = now - itemDate
    
    const dayMs = 24 * 60 * 60 * 1000
    
    if (timeRange === 'today') return diff <= dayMs
    if (timeRange === 'week') return diff <= 7 * dayMs
    if (timeRange === 'month') return diff <= 30 * dayMs
    if (timeRange === '90d') return diff <= 90 * dayMs
    if (timeRange === 'year') return diff <= 365 * dayMs
    
    return true
  })

  // Calculate dashboard data with filtered media
  const { kpis, topContent, currentMonthReach } = getDashboardData(filteredMedia)
  const { viewsTimeSeries } = getDashboardData(media)

  return (
    <div className="flex flex-col gap-5 p-6">
      {/* Header and Filter */}
      <div className="flex items-center justify-between">
        <h1 className="text-2xl font-bold tracking-tight text-[var(--text-primary)]"></h1>
        
        <div className="flex items-center gap-2 rounded-xl p-1" style={{ background: 'var(--bg-elevated)', border: '1px solid var(--border-subtle)' }}>
          <Calendar size={13} className="ml-2" style={{ color: 'var(--text-faint)' }} />
          <select
            value={timeRange}
            onChange={(e) => setTimeRange(e.target.value as TimeRange)}
            className="bg-transparent outline-none text-[12px] font-medium px-2 py-1.5 cursor-pointer"
            style={{ color: 'var(--text-primary)' }}
          >
            {RANGE_OPTIONS.map(opt => (
              <option key={opt.value} value={opt.value} style={{ background: 'var(--bg-base)' }}>
                {opt.label}
              </option>
            ))}
          </select>
        </div>
      </div>

      {/* KPI Cards */}
      <div className="grid grid-cols-2 gap-3.5 lg:grid-cols-4">
        <MetricCard
          label="Visualizaciones"
          value={kpis.total_reach >= 1_000_000
            ? (kpis.total_reach / 1_000_000).toFixed(1) + "M"
            : kpis.total_reach >= 1_000 
            ? (kpis.total_reach / 1000).toFixed(1) + "k"
            : kpis.total_reach}
          icon={<Eye size={13} />}
        />
        <MetricCard
          label="Guardados"
          value={kpis.total_saves >= 1000 ? (kpis.total_saves / 1000).toFixed(1) + "k" : kpis.total_saves}
          icon={<Bookmark size={13} />}
        />
        <MetricCard
          label="Engagement Rate (Avg)"
          value={kpis.avg_engagement_rate.toFixed(1)}
          suffix="%"
          icon={<TrendingUp size={13} />}
        />
        <MetricCard
          label="Publicaciones"
          value={kpis.total_reels}
          icon={<Film size={13} />}
        />
      </div>

      {/* Views + Goals */}
      <div className="grid grid-cols-1 gap-3.5 lg:grid-cols-5">
        <div className="card-surface p-5 lg:col-span-3">
          <div className="mb-5">
            <h2 className="section-label">Visualizaciones en el tiempo</h2>
          </div>
          <ViewsChart data={viewsTimeSeries} />
        </div>

        <div className="card-surface p-5 lg:col-span-2">
          <div className="mb-5">
            <h2 className="section-label">Objetivos del mes</h2>
          </div>
          <GoalsSectionClient followerCount={followerCount} currentMonthReach={currentMonthReach} />
        </div>
      </div>

      {/* Top content + Country */}
      <div className="grid grid-cols-1 gap-3.5 lg:grid-cols-2">
        <div className="card-surface p-5">
          <h2 className="section-label mb-5">Top contenidos</h2>
          {topContent.length > 0 ? (
            <TopContent items={topContent} />
          ) : (
            <p className="text-[12px]" style={{ color: "var(--text-faint)" }}>
              No hay publicaciones en este rango de tiempo.
            </p>
          )}
        </div>

        <div className="card-surface p-5">
          <h2 className="section-label mb-5">Audiencia por país</h2>
          {countryData.length > 0 ? (
            <CountryChart data={countryData} />
          ) : (
            <p className="text-[12px]" style={{ color: "var(--text-faint)" }}>
              Datos de audiencia no disponibles.
            </p>
          )}
        </div>
      </div>
    </div>
  )
}
