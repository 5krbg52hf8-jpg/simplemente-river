import { Sidebar } from "./Sidebar"
import { Header } from "./Header"

export function AppShell({ children }: { children: React.ReactNode }) {
  return (
    <div className="relative z-10 flex h-screen overflow-hidden" style={{ backgroundColor: "transparent" }}>
      <Sidebar />
      <div className="flex flex-1 flex-col overflow-hidden">
        <Header />
        <main className="flex-1 overflow-y-auto">
          {children}
        </main>
      </div>
    </div>
  )
}
