"use client"

import { useEffect, useState } from "react"
import Image from "next/image"
import type { ModuleCheck } from "@/app/api/init/route"

type Phase = "loading" | "revealing" | "done" | "hidden"

const STATUS_ICONS: Record<ModuleCheck["status"], string> = {
  ok: "✓",
  not_configured: "○",
  error: "✗",
}

const STATUS_COLORS: Record<ModuleCheck["status"], string> = {
  ok: "rgba(255,255,255,0.7)",
  not_configured: "rgba(255,255,255,0.28)",
  error: "rgba(255,100,100,0.7)",
}

const REVEAL_INTERVAL = 220
const HOLD_AFTER_DONE = 600
const FADE_DURATION = 500

export function SplashScreen() {
  const [phase, setPhase] = useState<Phase>("loading")
  const [checks, setChecks] = useState<ModuleCheck[]>([])
  const [revealed, setRevealed] = useState(0)
  const [progress, setProgress] = useState(0)

  // Fetch real status on mount
  useEffect(() => {
    fetch("/api/init")
      .then((r) => r.json())
      .then((data: ModuleCheck[]) => {
        setChecks(data)
        setPhase("revealing")
      })
      .catch(() => {
        // If fetch fails, show generic done state
        setPhase("done")
      })
  }, [])

  // Reveal each check result one by one
  useEffect(() => {
    if (phase !== "revealing" || checks.length === 0) return
    if (revealed >= checks.length) {
      const t = setTimeout(() => setPhase("done"), HOLD_AFTER_DONE)
      return () => clearTimeout(t)
    }
    const t = setTimeout(() => {
      setRevealed((n) => n + 1)
      setProgress(((revealed + 1) / checks.length) * 100)
    }, REVEAL_INTERVAL)
    return () => clearTimeout(t)
  }, [phase, revealed, checks.length])

  // Fade out when done
  useEffect(() => {
    if (phase !== "done") return
    setProgress(100)
    const t = setTimeout(() => setPhase("hidden"), FADE_DURATION)
    return () => clearTimeout(t)
  }, [phase])

  if (phase === "hidden") return null

  const isFading = phase === "done"
  const currentLabel =
    phase === "loading"
      ? "Verificando módulos..."
      : revealed < checks.length
        ? `Verificando ${checks[revealed]?.label ?? ""}...`
        : "Listo."

  return (
    <div
      style={{
        position: "fixed",
        inset: 0,
        zIndex: 9999,
        backgroundColor: "#000",
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        justifyContent: "center",
        transition: `opacity ${FADE_DURATION}ms cubic-bezier(0.4, 0, 0.2, 1)`,
        opacity: isFading ? 0 : 1,
        pointerEvents: isFading ? "none" : "all",
      }}
    >
      {/* Logo */}
      <div
        style={{
          animation: "arko-in 0.5s cubic-bezier(0.4, 0, 0.2, 1) forwards",
          opacity: 0,
          marginBottom: 56,
        }}
      >
        <Image
          src="/logo.svg"
          alt="Lumina Studio"
          width={120}
          height={120}
          priority
          style={{ objectFit: "contain" }}
        />
      </div>

      {/* Check list */}
      <div
        style={{
          display: "flex",
          flexDirection: "column",
          gap: 10,
          minWidth: 240,
          animation: "arko-in 0.5s 0.15s cubic-bezier(0.4, 0, 0.2, 1) forwards",
          opacity: 0,
        }}
      >
        {checks.slice(0, revealed).map((check) => (
          <div
            key={check.id}
            style={{
              display: "flex",
              alignItems: "center",
              gap: 10,
              animation: "arko-step 0.2s cubic-bezier(0.4, 0, 0.2, 1) forwards",
            }}
          >
            <span
              style={{
                fontFamily: "-apple-system, BlinkMacSystemFont, 'SF Pro Text', system-ui, sans-serif",
                fontSize: 11,
                color: STATUS_COLORS[check.status],
                width: 10,
                textAlign: "center",
                flexShrink: 0,
              }}
            >
              {STATUS_ICONS[check.status]}
            </span>
            <span
              style={{
                fontFamily: "-apple-system, BlinkMacSystemFont, 'SF Pro Text', system-ui, sans-serif",
                fontSize: 11,
                letterSpacing: "0.04em",
                color: STATUS_COLORS[check.status],
              }}
            >
              {check.label}
            </span>
          </div>
        ))}

        {/* Current step */}
        {phase !== "done" && revealed < checks.length && (
          <div
            key={`step-${revealed}`}
            style={{
              display: "flex",
              alignItems: "center",
              gap: 10,
              animation: "arko-step 0.2s cubic-bezier(0.4, 0, 0.2, 1) forwards",
            }}
          >
            <span
              style={{
                fontFamily: "-apple-system, BlinkMacSystemFont, 'SF Pro Text', system-ui, sans-serif",
                fontSize: 11,
                color: "rgba(255,255,255,0.18)",
                width: 10,
                textAlign: "center",
                flexShrink: 0,
              }}
            >
              ·
            </span>
            <span
              style={{
                fontFamily: "-apple-system, BlinkMacSystemFont, 'SF Pro Text', system-ui, sans-serif",
                fontSize: 11,
                letterSpacing: "0.04em",
                color: "rgba(255,255,255,0.28)",
              }}
            >
              {currentLabel}
            </span>
          </div>
        )}

        {phase === "loading" && checks.length === 0 && (
          <div
            style={{
              fontFamily: "-apple-system, BlinkMacSystemFont, 'SF Pro Text', system-ui, sans-serif",
              fontSize: 11,
              letterSpacing: "0.04em",
              color: "rgba(255,255,255,0.28)",
            }}
          >
            {currentLabel}
          </div>
        )}
      </div>

      {/* Progress bar */}
      <div
        style={{
          position: "absolute",
          bottom: 0,
          left: 0,
          right: 0,
          height: 1,
          backgroundColor: "rgba(255,255,255,0.06)",
        }}
      >
        <div
          style={{
            height: "100%",
            backgroundColor: "rgba(255,255,255,0.9)",
            width: `${progress}%`,
            transition: `width ${REVEAL_INTERVAL * 0.9}ms cubic-bezier(0.4, 0, 0.2, 1)`,
          }}
        />
      </div>

      <style>{`
        @keyframes arko-in {
          from { opacity: 0; transform: translateY(8px); }
          to   { opacity: 1; transform: translateY(0); }
        }
        @keyframes arko-step {
          from { opacity: 0; transform: translateY(3px); }
          to   { opacity: 1; transform: translateY(0); }
        }
      `}</style>
    </div>
  )
}
