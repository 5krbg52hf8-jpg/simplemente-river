interface PhrasesCloudProps {
  phrases: Array<{ phrase: string; count: number }>
  accentColor?: string
}

export function PhrasesCloud({ phrases, accentColor = "var(--accent-voice)" }: PhrasesCloudProps) {
  const max = Math.max(...phrases.map((p) => p.count))

  return (
    <div className="flex flex-col gap-2.5">
      {phrases.map(({ phrase, count }) => {
        const pct = count / max
        return (
          <div key={phrase} className="flex-1">
            <div className="flex items-center justify-between mb-1">
              <span className="text-[11px]" style={{ color: "var(--text-secondary)" }}>
                "{phrase}"
              </span>
              <span className="font-mono text-[10px]" style={{ color: "var(--text-faint)" }}>
                ×{count}
              </span>
            </div>
            <div className="progress-track">
              <div
                className="h-full rounded-full transition-all duration-500"
                style={{
                  width: `${pct * 100}%`,
                  background: `linear-gradient(90deg, ${accentColor}66 0%, ${accentColor} 100%)`,
                  boxShadow: `0 0 5px ${accentColor}33`,
                }}
              />
            </div>
          </div>
        )
      })}
    </div>
  )
}
