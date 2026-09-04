import { MessageSquare, Star, Phone, TrendingUp } from "lucide-react"
import { MetricCard } from "@/components/shared/MetricCard"
import { ResponsesTimeline } from "@/components/customer-voice/ResponsesTimeline"
import { InsightsPanel } from "@/components/customer-voice/InsightsPanel"
import { PhrasesCloud } from "@/components/customer-voice/PhrasesCloud"
import { mockResponses, mockCallTranscripts, voiceInsights } from "@/lib/mock/customer-voice"

const allPhrases = [
  ...voiceInsights.top_motivations,
  ...voiceInsights.top_closing_phrases,
].sort((a, b) => b.count - a.count)

export default function CustomerVoicePage() {
  return (
    <div className="flex flex-col gap-5 p-6">
      {/* KPIs */}
      <div className="grid grid-cols-2 gap-3.5 lg:grid-cols-4">
        <MetricCard label="Respuestas Typeform" value={mockResponses.length} icon={<MessageSquare size={13} />} />
        <MetricCard label="NPS Promedio" value={voiceInsights.nps.toFixed(1)} suffix="/10" icon={<Star size={13} />} />
        <MetricCard label="Llamadas analizadas" value={mockCallTranscripts.length} icon={<Phone size={13} />} />
        <MetricCard label="Tasa de cierre" value="67" suffix="%" delta={12} deltaLabel="vs mes ant." icon={<TrendingUp size={13} />} />
      </div>

      {/* Main grid */}
      <div className="grid grid-cols-1 gap-3.5 lg:grid-cols-5">
        {/* Timeline */}
        <div className="lg:col-span-3">
          <h2 className="section-label mb-3">Respuestas recientes</h2>
          <ResponsesTimeline responses={mockResponses.slice(0, 5)} calls={mockCallTranscripts} />
        </div>

        {/* Insights + phrases */}
        <div className="flex flex-col gap-3.5 lg:col-span-2">
          <div className="card-surface p-4">
            <InsightsPanel insights={voiceInsights} />
          </div>
          <div className="card-surface p-4">
            <h2 className="section-label mb-3">Frases más repetidas</h2>
            <PhrasesCloud phrases={allPhrases} />
          </div>
        </div>
      </div>
    </div>
  )
}
