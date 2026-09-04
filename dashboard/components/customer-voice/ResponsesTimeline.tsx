import { FileText, Phone } from "lucide-react"
import type { CustomerResponse, CallTranscript } from "@/lib/mock/customer-voice"

const sourceLabels: Record<string, string> = {
  typeform_onboarding: "Onboarding",
  typeform_satisfaction: "Satisfacción",
  call: "Llamada de venta",
}

const sentimentColors: Record<string, string> = {
  positive: "var(--color-positive)",
  neutral: "#f59e0b",
  negative: "var(--color-negative)",
}

export function ResponsesTimeline({
  responses,
  calls,
}: {
  responses: CustomerResponse[]
  calls: CallTranscript[]
}) {
  const outcomeLabels: Record<string, string> = { closed: "Cerrado", no_show: "No show", follow_up: "Follow up" }
  const outcomeColors: Record<string, string> = {
    closed: "var(--color-positive)",
    no_show: "var(--color-negative)",
    follow_up: "#f59e0b",
  }
  const outcomeBg: Record<string, string> = {
    closed: "var(--color-positive-bg)",
    no_show: "var(--color-negative-bg)",
    follow_up: "rgba(245,158,11,0.10)",
  }

  return (
    <div className="flex flex-col gap-2">
      {responses.map((r) => (
        <div key={r.id} className="card-surface p-4">
          <div className="flex items-start justify-between gap-3">
            <div className="flex items-center gap-2">
              <FileText size={12} className="flex-shrink-0" style={{ color: "var(--text-secondary)" }} />
              <div>
                <p className="text-[12px] font-medium" style={{ color: "var(--text-primary)" }}>
                  {r.name}
                </p>
                <p className="text-[10px]" style={{ color: "var(--text-faint)" }}>
                  {r.country} · {r.date}
                </p>
              </div>
            </div>
            <div className="flex items-center gap-2 flex-shrink-0">
              <span
                className="rounded-full px-2 py-0.5 text-[10px]"
                style={{
                  background: "var(--sidebar-accent)",
                  color: "var(--text-secondary)",
                  border: "1px solid var(--border-subtle)",
                }}
              >
                {sourceLabels[r.source]}
              </span>
              <span
                className="h-1.5 w-1.5 rounded-full"
                style={{ background: sentimentColors[r.sentiment] }}
              />
            </div>
          </div>

          {r.key_phrases.length > 0 && (
            <div className="mt-3 flex flex-wrap gap-1.5">
              {r.key_phrases.map((phrase) => (
                <span
                  key={phrase}
                  className="rounded-md px-2 py-0.5 text-[10px]"
                  style={{
                    background: "var(--bg-elevated)",
                    border: "1px solid var(--border-subtle)",
                    color: "var(--text-secondary)",
                  }}
                >
                  "{phrase}"
                </span>
              ))}
            </div>
          )}

          {r.answers[0] && (
            <div
              className="mt-3 rounded-lg p-2.5"
              style={{
                background: "var(--bg-elevated)",
                border: "1px solid var(--border-subtle)",
              }}
            >
              <p className="text-[10px]" style={{ color: "var(--text-faint)" }}>
                {r.answers[0].question}
              </p>
              <p className="mt-1 text-[11px] leading-relaxed" style={{ color: "var(--text-secondary)" }}>
                "{r.answers[0].answer}"
              </p>
            </div>
          )}
        </div>
      ))}

      {calls.map((call) => (
        <div key={call.id} className="card-surface p-4">
          <div className="flex items-start justify-between gap-3">
            <div className="flex items-center gap-2">
              <Phone size={12} className="flex-shrink-0" style={{ color: "var(--accent-voice)" }} />
              <div>
                <p className="text-[12px] font-medium" style={{ color: "var(--text-primary)" }}>
                  Llamada de venta
                </p>
                <p className="text-[10px]" style={{ color: "var(--text-faint)" }}>
                  {call.date} · {call.duration_min} min
                </p>
              </div>
            </div>
            <span
              className="flex-shrink-0 rounded-full px-2 py-0.5 text-[10px] font-semibold"
              style={{
                color: outcomeColors[call.outcome],
                background: outcomeBg[call.outcome],
                border: `1px solid ${outcomeColors[call.outcome]}22`,
              }}
            >
              {outcomeLabels[call.outcome]}
            </span>
          </div>
          <p className="mt-2 text-[11px] leading-relaxed" style={{ color: "var(--text-secondary)" }}>
            {call.summary}
          </p>

          {call.closing_phrases.length > 0 && (
            <div className="mt-2 flex flex-wrap gap-1">
              {call.closing_phrases.map((p) => (
                <span
                  key={p}
                  className="rounded-md px-2 py-0.5 text-[10px]"
                  style={{
                    background: "rgba(34,197,94,0.06)",
                    border: "1px solid rgba(34,197,94,0.16)",
                    color: "var(--accent-voice)",
                  }}
                >
                  "{p}"
                </span>
              ))}
            </div>
          )}
        </div>
      ))}
    </div>
  )
}
