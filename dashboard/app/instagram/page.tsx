import { ReelsFeed } from "@/components/instagram/ReelsFeed"

export default function InstagramPage() {
  return (
    <div className="p-6 space-y-4">
      <div>
        <h1 className="text-2xl font-bold tracking-tight" style={{ color: 'var(--text-primary)' }}>
          Instagram — @simplemente.river
        </h1>
        <p className="text-[13px] mt-1" style={{ color: 'var(--text-faint)' }}>
          Todas tus publicaciones — Reels, Placas y Carruseles con métricas completas.
        </p>
      </div>
      <ReelsFeed />
    </div>
  )
}
