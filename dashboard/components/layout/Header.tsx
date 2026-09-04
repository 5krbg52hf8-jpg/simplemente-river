"use client"

import { usePathname } from "next/navigation"
import { Sun, Moon, RefreshCw } from "lucide-react"
import { cn } from "@/lib/utils"
import { useTheme } from "@/components/providers/ThemeProvider"
import { useState, useEffect } from "react"

const pageTitles: Record<string, { title: string; description: string }> = {
  "/dashboard": { title: "Dashboard", description: "Vista general de tu marca personal" },
  "/instagram": { title: "Instagram Intelligence", description: "Análisis profundo de tus Reels" },
  "/chat": { title: "AI Chat", description: "Conversá con tus agentes de datos" },
  "/settings": { title: "Settings", description: "Configuración y objetivos mensuales" },
}

export function Header() {
  const pathname = usePathname()
  const { theme, toggle } = useTheme()
  const [syncing, setSyncing] = useState(false)
  const [syncMsg, setSyncMsg] = useState<string | null>(null)

  const key = Object.keys(pageTitles)
    .sort((a, b) => b.length - a.length)
    .find((k) => pathname === k || pathname.startsWith(k + "/"))

  const info = key ? pageTitles[key] : { title: "Dashboard", description: "" }

  async function handleSync() {
    setSyncing(true)
    setSyncMsg(null)
    try {
      // 1. Forzar refresco del cache de Instagram (trae datos nuevos de la API de Meta)
      const igRes = await fetch("/api/instagram/media?refresh=1")
      if (!igRes.ok) throw new Error("Error fetching IG data")
      
      // 2. Sincronizar con Supabase (no bloqueante, ignoramos si falla por falta de variables .env)
      fetch("/api/sync", { method: "POST" }).catch(() => {})
      
      localStorage.setItem("last_sync", Date.now().toString())
      setSyncMsg(`✓ Sincronizado`)
      
      // Recargar la página para mostrar datos frescos
      setTimeout(() => window.location.reload(), 1000)
    } catch {
      setSyncMsg("Error")
    } finally {
      setSyncing(false)
      setTimeout(() => setSyncMsg(null), 3000)
    }
  }

  // Auto-sync al abrir el app — máximo 1 vez por hora
  useEffect(() => {
    // 1. Sincronización de tu propia cuenta (cada 15 minutos)
    const lastSync = parseInt(localStorage.getItem("last_sync") ?? "0")
    const fifteenMinutes = 15 * 60 * 1000
    if (Date.now() - lastSync > fifteenMinutes) {
      handleSync()
    }

    // 2. Sincronización pasiva de competidores (cada 15 minutos)
    const lastCompetitorUpdate = parseInt(localStorage.getItem("last_competitor_update") ?? "0")
    if (Date.now() - lastCompetitorUpdate > fifteenMinutes) {
      fetch("/api/cron/competitors-update")
        .then((res) => res.json())
        .then((data) => {
          if (data.ok) {
            localStorage.setItem("last_competitor_update", Date.now().toString())
            console.log("[Passive Cron] Competidores actualizados:", data.results)
          }
        })
        .catch((err) => console.error("[Passive Cron] Error actualizando competidores:", err))
    }
  }, []) // eslint-disable-line react-hooks/exhaustive-deps

  const iconBtn = cn(
    "flex h-8 w-8 items-center justify-center rounded-lg",
    "text-[var(--text-faint)] hover:text-[var(--text-secondary)]",
    "transition-all duration-150 cursor-pointer",
    "hover:bg-[rgba(255,255,255,0.06)]"
  )

  return (
    <header
      className="relative flex h-[58px] flex-shrink-0 items-center justify-between px-5"
      style={{
        background: "var(--bg-sidebar)",
        borderBottom: "1px solid var(--sidebar-border)",
      }}
    >
      <div
        className="pointer-events-none absolute bottom-0 left-0 right-0 h-px"
        style={{
          background: "linear-gradient(to right, transparent 0%, var(--border-subtle) 12%, var(--border-subtle) 88%, transparent 100%)",
        }}
      />

      {/* Left */}
      <div className="flex flex-col gap-[4px]">
        <h1
          className="text-[15px] font-bold leading-none tracking-tight"
          style={{ color: "var(--text-primary)" }}
        >
          {info.title}
        </h1>
        {info.description && (
          <p className="text-[12px] leading-none" style={{ color: "var(--text-faint)" }}>
            {info.description}
          </p>
        )}
      </div>

      {/* Right */}
      <div className="flex items-center gap-1">
        {/* Sync button */}
        <button
          onClick={handleSync}
          disabled={syncing}
          className={cn(iconBtn, "relative w-auto gap-1.5 px-2.5", syncing && "opacity-50")}
          aria-label="Sincronizar datos"
          title="Sincronizar datos con Instagram"
        >
          <RefreshCw size={13} className={syncing ? "animate-spin" : ""} />
          {syncMsg ? (
            <span className="text-[11px] font-medium" style={{ color: "var(--text-secondary)" }}>
              {syncMsg}
            </span>
          ) : (
            <span className="text-[11px]" style={{ color: "var(--text-faint)" }}>
              Sync
            </span>
          )}
        </button>

        <button onClick={toggle} className={iconBtn} aria-label={theme === "dark" ? "Modo día" : "Modo noche"}>
          {theme === "dark" ? <Sun size={14} /> : <Moon size={14} />}
        </button>
      </div>
    </header>
  )
}
