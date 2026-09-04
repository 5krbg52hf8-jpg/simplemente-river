export interface AdCountryBreakdown {
  country: string
  impressions: number
  spend: number
  leads: number
  cpl: number
}

export interface AdCreative {
  id: string
  name: string
  thumbnail: string
  spend: number
  impressions: number
  reach: number
  clicks: number
  cpc: number
  ctr: number
  leads: number
  cpl: number
  country_breakdown: AdCountryBreakdown[]
  ai_analysis: string
}

export interface AdCampaign {
  id: string
  name: string
  status: "active" | "paused" | "ended"
  objective: string
  spend: number
  impressions: number
  reach: number
  clicks: number
  leads: number
  cpl: number
  ctr: number
  start_date: string
  ads: AdCreative[]
}

export const mockCampaigns: AdCampaign[] = [
  {
    id: "camp_001",
    name: "Leads Marzo — FollowMe Principal",
    status: "active",
    objective: "Lead generation",
    spend: 1840,
    impressions: 312000,
    reach: 198000,
    clicks: 4680,
    leads: 127,
    cpl: 14.49,
    ctr: 1.5,
    start_date: "1 mar 2026",
    ads: [
      {
        id: "ad_001",
        name: "Reel — Error métricas vanidad",
        thumbnail: "https://picsum.photos/seed/ad1/400/400",
        spend: 920,
        impressions: 158000,
        reach: 102000,
        clicks: 2540,
        cpc: 0.36,
        ctr: 1.61,
        leads: 74,
        cpl: 12.43,
        ai_analysis: "Este creativo tiene el mejor CPL de la campaña. El hook de 'error que comete el 90%' genera curiosidad inmediata. El CTR es alto porque la miniatura con texto grande y contraste es muy clara en mobile.",
        country_breakdown: [
          { country: "España", impressions: 74000, spend: 432, leads: 48, cpl: 9.0 },
          { country: "Argentina", impressions: 52000, spend: 302, leads: 18, cpl: 16.8 },
          { country: "México", impressions: 21000, spend: 124, leads: 6, cpl: 20.7 },
          { country: "Colombia", impressions: 11000, spend: 62, leads: 2, cpl: 31.0 },
        ],
      },
      {
        id: "ad_002",
        name: "Reel — 40k seguidores en 6 meses",
        thumbnail: "https://picsum.photos/seed/ad2/400/400",
        spend: 920,
        impressions: 154000,
        reach: 96000,
        clicks: 2140,
        cpc: 0.43,
        ctr: 1.39,
        leads: 53,
        cpl: 17.36,
        ai_analysis: "Performance más baja que el ad anterior. El hook de 'crecimiento propio' funciona bien para audiencias frías pero tiene menor urgencia que el de 'error'. Considerar testear con más énfasis en el beneficio (cuántos clientes generó el crecimiento).",
        country_breakdown: [
          { country: "España", impressions: 61000, spend: 365, leads: 29, cpl: 12.6 },
          { country: "Argentina", impressions: 58000, spend: 347, leads: 17, cpl: 20.4 },
          { country: "México", impressions: 24000, spend: 144, leads: 5, cpl: 28.8 },
          { country: "Colombia", impressions: 11000, spend: 64, leads: 2, cpl: 32.0 },
        ],
      },
    ],
  },
  {
    id: "camp_002",
    name: "Retargeting — Visitantes Web",
    status: "active",
    objective: "Lead generation",
    spend: 620,
    impressions: 87000,
    reach: 42000,
    clicks: 1860,
    leads: 61,
    cpl: 10.16,
    ctr: 2.14,
    start_date: "5 mar 2026",
    ads: [
      {
        id: "ad_003",
        name: "Video testimonial — caso de éxito",
        thumbnail: "https://picsum.photos/seed/ad3/400/400",
        spend: 340,
        impressions: 47000,
        reach: 23000,
        clicks: 1040,
        cpc: 0.33,
        ctr: 2.21,
        leads: 35,
        cpl: 9.71,
        ai_analysis: "El mejor CPL de todas las campañas activas. Las audiencias de retargeting responden muy bien a testimoniales porque ya tienen contexto de marca. El CTR de 2.2% confirma alta intención.",
        country_breakdown: [
          { country: "España", impressions: 28000, spend: 204, leads: 26, cpl: 7.8 },
          { country: "Argentina", impressions: 12000, spend: 88, leads: 7, cpl: 12.6 },
          { country: "México", impressions: 5000, spend: 36, leads: 2, cpl: 18.0 },
          { country: "Otros", impressions: 2000, spend: 12, leads: 0, cpl: 0 },
        ],
      },
      {
        id: "ad_004",
        name: "Carousel — beneficios del servicio",
        thumbnail: "https://picsum.photos/seed/ad4/400/400",
        spend: 280,
        impressions: 40000,
        reach: 19000,
        clicks: 820,
        cpc: 0.34,
        ctr: 2.05,
        leads: 26,
        cpl: 10.77,
        ai_analysis: "Buen CPL para retargeting. El carousel permite mostrar múltiples beneficios. Recomendación: poner el beneficio más relevante (resultados en X días) primero.",
        country_breakdown: [
          { country: "España", impressions: 22000, spend: 154, leads: 18, cpl: 8.6 },
          { country: "Argentina", impressions: 11000, spend: 77, leads: 6, cpl: 12.8 },
          { country: "México", impressions: 5000, spend: 35, leads: 2, cpl: 17.5 },
          { country: "Otros", impressions: 2000, spend: 14, leads: 0, cpl: 0 },
        ],
      },
    ],
  },
  {
    id: "camp_003",
    name: "Test Audiencias Frías — Feb 2026",
    status: "ended",
    objective: "Lead generation",
    spend: 1200,
    impressions: 284000,
    reach: 176000,
    clicks: 3120,
    leads: 78,
    cpl: 15.38,
    ctr: 1.1,
    start_date: "1 feb 2026",
    ads: [
      {
        id: "ad_005",
        name: "Reel — métricas que importan",
        thumbnail: "https://picsum.photos/seed/ad5/400/400",
        spend: 600,
        impressions: 142000,
        reach: 88000,
        clicks: 1560,
        cpc: 0.38,
        ctr: 1.1,
        leads: 41,
        cpl: 14.63,
        ai_analysis: "Campaña finalizada. Resultados dentro del promedio para audiencias frías. Este creativo se convirtió en la base del ad_001 en la campaña actual, que mejoró el CPL un 15%.",
        country_breakdown: [
          { country: "España", impressions: 58000, spend: 245, leads: 21, cpl: 11.7 },
          { country: "Argentina", impressions: 54000, spend: 228, leads: 14, cpl: 16.3 },
          { country: "México", impressions: 22000, spend: 93, leads: 5, cpl: 18.6 },
          { country: "Colombia", impressions: 8000, spend: 34, leads: 1, cpl: 34.0 },
        ],
      },
    ],
  },
]

export const adsKPIs = {
  total_spend_month: 2460,
  total_leads_month: 188,
  avg_cpl: 13.09,
  avg_ctr: 1.62,
  best_country: "España",
  worst_country_cpl: "Colombia",
  ai_global_insight: "España genera el 58% de los leads con el 47% del spend. Recomendación: incrementar presupuesto asignado a España un 20% y reducir Argentina. El CPL en España está 36% por debajo del promedio global.",
}
