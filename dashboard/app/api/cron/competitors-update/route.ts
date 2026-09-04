import { NextRequest, NextResponse } from 'next/server'
import { supabase } from '@/lib/supabaseClient'
import { getCompetitorData } from '@/lib/instagramDiscovery'

const COMPETITORS = [
  'millodzn',
  'riverlpm',
  'hinchada._.millonaria',
  'bandamillonaria.ok',
  'statsmillo',
  'riverplaydigital',
]

async function runCronUpdate() {
  const now = Date.now()
  const results = []

  for (const username of COMPETITORS) {
    try {
      // 1. Consultar el perfil y posts en Supabase para decidir si escaneamos
      const { data: profile, error } = await supabase
        .from('competitor_profiles')
        .select('*, competitor_posts(*)')
        .eq('username', username)
        .maybeSingle()

      if (error) {
        console.error(`[Cron] Error consultando perfil de ${username}:`, error)
      }

      if (!profile) {
        // Si no está registrado en la base de datos, forzamos la primera carga
        console.log(`[Cron] Primera carga para competidor: ${username}`)
        await getCompetitorData(username, true)
        results.push({ username, action: 'initial_load' })
        continue
      }

      // Obtener el post más reciente
      const posts = profile.competitor_posts || []
      const latestPost = posts.reduce((latest: any, current: any) => {
        if (!latest) return current
        return new Date(current.timestamp).getTime() > new Date(latest.timestamp).getTime() ? current : latest
      }, null)

      const lastScanned = new Date(profile.updated_at).getTime()
      const timeSinceLastScanMs = now - lastScanned

      let shouldUpdate = false
      let reason = ''

      if (!latestPost) {
        // No hay posts guardados, actualizar
        shouldUpdate = true
        reason = 'no_posts'
      } else {
        const latestPostAgeMs = now - new Date(latestPost.timestamp).getTime()
        const latestPostAgeHours = latestPostAgeMs / 3_600_000

        if (latestPostAgeHours < 6) {
          // Escaneo Agresivo: post de menos de 6 horas -> actualizar cada 15 min (900.000 ms)
          if (timeSinceLastScanMs >= 15 * 60 * 1000) {
            shouldUpdate = true
            reason = 'aggressive_scan (<6h age)'
          }
        } else if (latestPostAgeHours < 24) {
          // Escaneo Moderado: post de 6-24 horas -> actualizar cada 2 horas (7.200.000 ms)
          if (timeSinceLastScanMs >= 2 * 60 * 60 * 1000) {
            shouldUpdate = true
            reason = 'moderate_scan (6-24h age)'
          }
        } else {
          // Escaneo Frío: sin posts recientes -> actualizar cada 24 horas (86.400.000 ms)
          if (timeSinceLastScanMs >= 24 * 60 * 60 * 1000) {
            shouldUpdate = true
            reason = 'cold_scan (>24h age)'
          }
        }
      }

      if (shouldUpdate) {
        console.log(`[Cron] Actualizando ${username}. Razón: ${reason}`)
        await getCompetitorData(username, true)
        results.push({ username, action: 'updated', reason })
      } else {
        results.push({ username, action: 'skipped', last_scan_ago_min: Math.round(timeSinceLastScanMs / 60000) })
      }
    } catch (err: any) {
      console.error(`[Cron] Error procesando competidor ${username}:`, err)
      results.push({ username, action: 'error', error: err.message })
    }
  }

  return results
}

export async function POST() {
  try {
    const results = await runCronUpdate()
    return NextResponse.json({ ok: true, results })
  } catch (err: any) {
    return NextResponse.json({ ok: false, error: err.message }, { status: 500 })
  }
}

export async function GET() {
  try {
    const results = await runCronUpdate()
    return NextResponse.json({ ok: true, results })
  } catch (err: any) {
    return NextResponse.json({ ok: false, error: err.message }, { status: 500 })
  }
}
