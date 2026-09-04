"use client"

import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  ResponsiveContainer,
} from "recharts"

interface SpendChartProps {
  data: { name: string; spend: number; leads: number }[]
}

function CustomTooltip({ active, payload, label }: { active?: boolean; payload?: Array<{ name: string; value: number; color: string }>; label?: string }) {
  if (active && payload?.length) {
    return (
      <div
        style={{
          background: "var(--bg-floating)",
          border: "1px solid var(--border-medium)",
          borderRadius: "8px",
          padding: "8px 12px",
          boxShadow: "0 8px 24px rgba(0,0,0,0.40)",
          fontSize: 11,
        }}
      >
        <p
          style={{
            marginBottom: 6,
            fontWeight: 600,
            color: "var(--text-primary)",
            fontSize: 11,
          }}
        >
          {label}
        </p>
        {payload.map((p) => (
          <div
            key={p.name}
            style={{ display: "flex", alignItems: "center", gap: 6, marginBottom: 2 }}
          >
            <span
              style={{
                width: 6,
                height: 6,
                borderRadius: "2px",
                backgroundColor: p.color,
                flexShrink: 0,
              }}
            />
            <span style={{ color: "var(--text-secondary)", fontSize: 10 }}>{p.name}</span>
            <span style={{ fontWeight: 700, marginLeft: "auto", paddingLeft: 8, color: p.color }}>
              {p.name === "Spend" ? "$" + p.value : p.value}
            </span>
          </div>
        ))}
      </div>
    )
  }
  return null
}

export function SpendChart({ data }: SpendChartProps) {
  return (
    <ResponsiveContainer width="100%" height={200}>
      <BarChart data={data} margin={{ top: 4, right: 4, bottom: 0, left: -8 }} barCategoryGap="32%">
        <CartesianGrid
          strokeDasharray="0"
          stroke="rgba(255,255,255,0.035)"
          vertical={false}
        />
        <XAxis
          dataKey="name"
          tick={{ fontSize: 9, fill: "var(--text-faint)" }}
          axisLine={false}
          tickLine={false}
        />
        <YAxis
          yAxisId="left"
          tick={{ fontSize: 9, fill: "var(--text-faint)" }}
          axisLine={false}
          tickLine={false}
          tickFormatter={(v) => "$" + v}
        />
        <YAxis
          yAxisId="right"
          orientation="right"
          tick={{ fontSize: 9, fill: "var(--text-faint)" }}
          axisLine={false}
          tickLine={false}
        />
        <Tooltip content={<CustomTooltip />} cursor={{ fill: "rgba(255,255,255,0.025)" }} />
        <Legend
          wrapperStyle={{ fontSize: 10, color: "var(--text-secondary)", paddingTop: 8 }}
          iconType="square"
          iconSize={6}
        />
        <Bar yAxisId="left" dataKey="spend" name="Spend" fill="var(--accent-ads)" radius={[3, 3, 0, 0]} fillOpacity={0.85} />
        <Bar yAxisId="right" dataKey="leads" name="Leads" fill="var(--color-positive)" radius={[3, 3, 0, 0]} fillOpacity={0.75} />
      </BarChart>
    </ResponsiveContainer>
  )
}
