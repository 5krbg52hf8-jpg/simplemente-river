"use client"

import { useState, useEffect } from "react"
import Link from "next/link"
import Image from "next/image"
import { usePathname } from "next/navigation"
import {
  LayoutDashboard,
  Instagram,
  MessageSquare,
  Settings,
  ChevronLeft,
  ChevronRight,
  Crosshair,
  Palette
} from "lucide-react"
import { Tooltip, TooltipContent, TooltipTrigger } from "@/components/ui/tooltip"
import { cn } from "@/lib/utils"

const navItems = [
  { href: "/dashboard", label: "Dashboard", icon: LayoutDashboard },
  { href: "/instagram", label: "Instagram", icon: Instagram },
  { href: "/chat", label: "AI Chat", icon: MessageSquare },
  { href: "/competencia", label: "Radar Competencia", icon: Crosshair },
]

export function Sidebar() {
  const pathname = usePathname()
  const [collapsed, setCollapsed] = useState(false)

  useEffect(() => {
    const stored = localStorage.getItem("sidebar-collapsed")
    if (stored === "true") setCollapsed(true)
  }, [])

  function toggle() {
    const next = !collapsed
    setCollapsed(next)
    localStorage.setItem("sidebar-collapsed", String(next))
  }

  return (
    <aside
      className={cn(
        "relative flex h-screen flex-col flex-shrink-0",
        "transition-all duration-200 ease-in-out",
        collapsed ? "w-[64px]" : "w-[236px]"
      )}
      style={{
        background: "var(--bg-sidebar)",
        borderRight: "1px solid var(--sidebar-border)",
      }}
    >
      <div
        className="pointer-events-none absolute inset-y-0 right-0 w-px"
        style={{
          background: "linear-gradient(to bottom, transparent 0%, var(--border-subtle) 15%, var(--border-subtle) 85%, transparent 100%)",
        }}
      />

      {/* Logo */}
      <div
        className={cn(
          "flex h-[58px] items-center px-4",
          collapsed ? "justify-center px-0" : "gap-3"
        )}
        style={{ borderBottom: "1px solid var(--sidebar-border)" }}
      >
        <div className="flex h-[52px] w-[52px] flex-shrink-0 items-center justify-center">
          <Image
            src="/logo.svg"
            alt="Logo"
            width={38}
            height={38}
            className="logo-adaptive object-contain"
            priority
          />
        </div>
        {!collapsed && (
          <div className="flex flex-col min-w-0">
            <span
              className="text-[14px] font-bold tracking-tight truncate"
              style={{ color: "var(--text-primary)" }}
            >
              Lumina Studio
            </span>
            <span className="text-[10px] text-muted-foreground font-mono uppercase tracking-wider">
              Content Intelligence
            </span>
          </div>
        )}
      </div>

      {/* Nav */}
      <nav className="flex flex-1 flex-col gap-0.5 p-2 pt-3">
        {navItems.map(({ href, label, icon: Icon }) => {
          const active = pathname === href || pathname.startsWith(href + "/")
          const item = (
            <Link
              href={href}
              className={cn(
                "group relative flex items-center rounded-[10px] font-medium",
                "transition-all duration-150 cursor-pointer",
                collapsed ? "justify-center p-3" : "gap-3 px-3 py-2.5",
                "text-[14px]",
                active
                  ? "text-[var(--sidebar-active-text)]"
                  : "text-[var(--text-secondary)] hover:text-[var(--text-primary)]"
              )}
              style={
                active
                  ? {
                      background: "linear-gradient(90deg, rgba(255,255,255,0.10) 0%, rgba(255,255,255,0.04) 100%)",
                      boxShadow: "inset 0 1px 0 rgba(255,255,255,0.07), inset 0 -1px 0 rgba(0,0,0,0.12), 0 1px 4px rgba(0,0,0,0.20)",
                    }
                  : undefined
              }
            >
              {active && !collapsed && (
                <span
                  className="absolute left-0 top-1/2 -translate-y-1/2 w-[3px] h-5 rounded-full"
                  style={{
                    background: "linear-gradient(to bottom, rgba(255,255,255,0.85), rgba(255,255,255,0.30))",
                    boxShadow: "0 0 8px rgba(255,255,255,0.20), 0 0 16px rgba(255,255,255,0.10)",
                  }}
                />
              )}

              <Icon
                size={16}
                className={cn(
                  "flex-shrink-0 transition-colors duration-150",
                  active ? "opacity-100" : "opacity-50 group-hover:opacity-75"
                )}
              />
              {!collapsed && (
                <span className="truncate">{label}</span>
              )}
            </Link>
          )

          if (collapsed) {
            return (
              <Tooltip key={href}>
                <TooltipTrigger render={<div />}>
                  {item}
                </TooltipTrigger>
                <TooltipContent side="right" className="text-xs">
                  {label}
                </TooltipContent>
              </Tooltip>
            )
          }

          return <div key={href}>{item}</div>
        })}
      </nav>

      {/* Bottom — Settings */}
      <div
        className="p-2 pb-3"
        style={{ borderTop: "1px solid var(--sidebar-border)" }}
      >
        {collapsed ? (
          <Tooltip>
            <TooltipTrigger render={<div />}>
              <Link
                href="/settings"
                className={cn(
                  "group relative flex items-center justify-center rounded-[10px] p-3",
                  "transition-all duration-150 cursor-pointer",
                  pathname === "/settings"
                    ? "text-[var(--sidebar-active-text)]"
                    : "text-[var(--text-secondary)] hover:text-[var(--text-primary)]"
                )}
                style={
                  pathname === "/settings"
                    ? {
                        background: "linear-gradient(90deg, rgba(255,255,255,0.10) 0%, rgba(255,255,255,0.04) 100%)",
                        boxShadow: "inset 0 1px 0 rgba(255,255,255,0.07), 0 1px 4px rgba(0,0,0,0.20)",
                      }
                    : undefined
                }
              >
                <Settings size={16} className="opacity-50 group-hover:opacity-75 transition-opacity" />
              </Link>
            </TooltipTrigger>
            <TooltipContent side="right" className="text-xs">
              Settings
            </TooltipContent>
          </Tooltip>
        ) : (
          <Link
            href="/settings"
            className={cn(
              "group relative flex items-center gap-3 rounded-[10px] px-3 py-2.5",
              "text-[14px] font-medium transition-all duration-150 cursor-pointer",
              pathname === "/settings"
                ? "text-[var(--sidebar-active-text)]"
                : "text-[var(--text-secondary)] hover:text-[var(--text-primary)]"
            )}
            style={
              pathname === "/settings"
                ? {
                    background: "linear-gradient(90deg, rgba(255,255,255,0.10) 0%, rgba(255,255,255,0.04) 100%)",
                    boxShadow: "inset 0 1px 0 rgba(255,255,255,0.07), 0 1px 4px rgba(0,0,0,0.20)",
                  }
                : undefined
            }
          >
            {pathname === "/settings" && (
              <span
                className="absolute left-0 top-1/2 -translate-y-1/2 w-[3px] h-5 rounded-full"
                style={{
                  background: "linear-gradient(to bottom, rgba(255,255,255,0.85), rgba(255,255,255,0.30))",
                  boxShadow: "0 0 8px rgba(255,255,255,0.20)",
                }}
              />
            )}
            <Settings size={16} className="flex-shrink-0 opacity-50 group-hover:opacity-75 transition-opacity" />
            <span>Settings</span>
          </Link>
        )}
      </div>

      {/* Toggle */}
      <button
        onClick={toggle}
        className={cn(
          "absolute -right-3 top-[56px] z-10",
          "flex h-6 w-6 items-center justify-center rounded-full",
          "transition-all duration-150 cursor-pointer"
        )}
        style={{
          background: "var(--bg-elevated)",
          border: "1px solid var(--border-medium)",
          color: "var(--text-faint)",
          boxShadow: "0 2px 10px rgba(0,0,0,0.40), 0 1px 0 rgba(255,255,255,0.06) inset",
        }}
        aria-label={collapsed ? "Expandir sidebar" : "Colapsar sidebar"}
      >
        {collapsed ? <ChevronRight size={11} /> : <ChevronLeft size={11} />}
      </button>
    </aside>
  )
}
