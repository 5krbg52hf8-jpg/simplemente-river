export interface YTMetrics {
  views: number
  likes: number
  comments: number
  watch_time_total_h: number
  avg_view_duration_s: number
  duration_s: number
  ctr: number
  impressions: number
  engagement_rate: number
}

export interface YTVideo {
  id: string
  thumbnail: string
  title: string
  description: string
  date: string
  duration: string
  metrics: YTMetrics
  transcription: string[]
  ai_insights: string[]
  improvement_points: string[]
  avg_comparison: { metric: string; delta: number }[]
  transcribed: boolean
}

export const mockVideos: YTVideo[] = [
  {
    id: "yt_001",
    thumbnail: "https://picsum.photos/seed/yt1/640/360",
    title: "Cómo construir un sistema de contenido que genere ventas (guía completa)",
    description: "En este video te muestro el sistema exacto que uso para crear contenido que no solo atrae seguidores, sino que convierte en clientes reales.",
    date: "10 mar 2026",
    duration: "18:42",
    transcribed: true,
    metrics: {
      views: 12400,
      likes: 487,
      comments: 93,
      watch_time_total_h: 1840,
      avg_view_duration_s: 534,
      duration_s: 1122,
      ctr: 6.8,
      impressions: 182000,
      engagement_rate: 0.047,
    },
    avg_comparison: [
      { metric: "Views", delta: 24 },
      { metric: "CTR", delta: 31 },
      { metric: "Watch time", delta: 18 },
      { metric: "Engagement", delta: 12 },
    ],
    ai_insights: [
      "CTR del 6.8% — significativamente por encima del promedio de tu canal (4.1%). El thumbnail con contraste fuerte y texto corto está funcionando muy bien.",
      "El avg view duration de 534s sobre 1122s (47.6%) es el mejor en tu historial de YouTube. Los tutoriales estructurados retienen mejor que el contenido de opinión.",
      "93 comentarios es 3x tu promedio. Preguntas sobre implementación del sistema dominan — hay una comunidad activa formándose.",
    ],
    improvement_points: [
      "El segmento entre el minuto 8 y el 11 tiene una caída notable de retención. Considera añadir un corte de ritmo o pantalla de resumen.",
      "El intro dura 90 segundos antes de entrar al contenido. Reducilo a 30-45 para YouTube actual.",
    ],
    transcription: [
      "Hoy te voy a mostrar el sistema exacto que uso para crear contenido que convierte.",
      "No voy a hablar de teoría. Voy a mostrarte paso a paso lo que hago cada semana.",
      "Este sistema me llevó dos años perfeccionar.",
      "Y desde que lo implementé, mis ventas a través de contenido se triplicaron.",
      "El sistema tiene cuatro etapas.",
      "Primera etapa: investigación de dolores.",
      "No creo contenido sobre lo que yo quiero hablar.",
      "Creo contenido sobre lo que mi cliente ideal busca.",
      "Segunda etapa: creación en batch.",
      "Un día por semana produzco todo el contenido de la semana.",
      "Tercera etapa: distribución estratégica.",
      "Un video largo se convierte en cinco cortos, tres posts y un email.",
      "Cuarta etapa: análisis y optimización.",
      "Cada semana reviso qué funcionó y por qué.",
      "Vamos etapa por etapa.",
    ],
  },
  {
    id: "yt_002",
    thumbnail: "https://picsum.photos/seed/yt2/640/360",
    title: "Las 5 herramientas de IA que cambiarán tu negocio en 2026",
    description: "Análisis profundo de las herramientas de IA más útiles para negocios de servicios y contenido digital.",
    date: "3 mar 2026",
    duration: "14:18",
    transcribed: true,
    metrics: {
      views: 18700,
      likes: 742,
      comments: 148,
      watch_time_total_h: 2210,
      avg_view_duration_s: 425,
      duration_s: 858,
      ctr: 8.2,
      impressions: 228000,
      engagement_rate: 0.048,
    },
    avg_comparison: [
      { metric: "Views", delta: 87 },
      { metric: "CTR", delta: 100 },
      { metric: "Watch time", delta: 43 },
      { metric: "Engagement", delta: 14 },
    ],
    ai_insights: [
      "Tu video con mejor performance en el último trimestre. El tema de IA + negocios tiene búsqueda orgánica activa en YouTube.",
      "CTR de 8.2% — el mejor de tu canal. El número '5' en el título y el thumbnail de pantallas de herramientas funciona excepcionalmente bien.",
      "87% más views que tu promedio. Este tipo de contenido de 'herramientas' se rankea bien y sigue atrayendo tráfico orgánico semanas después.",
    ],
    improvement_points: [
      "Actualizar el video cada 6 meses con herramientas nuevas para mantener el tráfico orgánico.",
    ],
    transcription: [
      "La IA está transformando completamente cómo se hacen los negocios.",
      "Y la mayoría de los emprendedores todavía no sabe cuáles herramientas usar.",
      "Hoy te muestro las cinco que más impacto tienen en un negocio de servicios o contenido digital.",
      "Número uno: automatización de procesos con Make o Zapier.",
      "Número dos: generación de contenido asistida con Claude o GPT-4.",
      "Número tres: análisis de datos con herramientas de BI con IA integrada.",
      "Número cuatro: atención al cliente automatizada.",
      "Número cinco: optimización de ads con IA predictiva.",
      "Para cada una voy a mostrarte un caso de uso real.",
    ],
  },
  {
    id: "yt_003",
    thumbnail: "https://picsum.photos/seed/yt3/640/360",
    title: "Por qué dejé de cobrar por hora (y multiplicé mis ingresos x4)",
    description: "Mi historia sobre la transición de servicios por hora a modelos de valor, y cómo eso cambió completamente mi negocio.",
    date: "24 feb 2026",
    duration: "12:55",
    transcribed: true,
    metrics: {
      views: 9200,
      likes: 389,
      comments: 67,
      watch_time_total_h: 980,
      avg_view_duration_s: 384,
      duration_s: 775,
      ctr: 5.1,
      impressions: 180000,
      engagement_rate: 0.050,
    },
    avg_comparison: [
      { metric: "Views", delta: -8 },
      { metric: "CTR", delta: -1 },
      { metric: "Watch time", delta: 3 },
      { metric: "Engagement", delta: 19 },
    ],
    ai_insights: [
      "Contenido de historia personal genera menor alcance pero mayor engagement. Los 67 comentarios tienen alta proporción de comentarios largos y reflexivos.",
      "El engagement rate del 5% es el más alto de los últimos 5 videos. Las historias de transformación generan conversación de calidad.",
    ],
    improvement_points: [
      "El video podría tener más estructura visual (pantalla de resumen de los pasos). El contenido narrativo se beneficia de puntos de anclaje visuales.",
    ],
    transcription: [
      "Durante los primeros dos años de mi carrera cobré por hora.",
      "Era la forma más intuitiva de hacerlo.",
      "Y fue el error más costoso que cometí.",
      "Te voy a explicar por qué cambié el modelo y qué pasó después.",
      "Cuando cobrás por hora, hay un techo natural.",
      "Hay 24 horas en el día. No podés crecer más que eso.",
      "Cuando cobrás por valor, el precio refleja el resultado que generás.",
      "No el tiempo que tardás.",
      "El cambio fue incómodo. Perdí algunos clientes.",
      "Pero los que quedaron y los nuevos que llegaron pagaban 4 veces más.",
      "Y el trabajo era más interesante porque me contrataban para generar resultados, no para ejecutar tareas.",
    ],
  },
  {
    id: "yt_004",
    thumbnail: "https://picsum.photos/seed/yt4/640/360",
    title: "Cómo analizo mi competencia sin copiarla (framework de 3 pasos)",
    description: "Un framework simple pero poderoso para entender qué hace tu competencia y usarlo para diferenciarte, no para imitarlos.",
    date: "17 feb 2026",
    duration: "16:30",
    transcribed: false,
    metrics: {
      views: 7800,
      likes: 298,
      comments: 54,
      watch_time_total_h: 1020,
      avg_view_duration_s: 470,
      duration_s: 990,
      ctr: 4.3,
      impressions: 181000,
      engagement_rate: 0.045,
    },
    avg_comparison: [
      { metric: "Views", delta: -22 },
      { metric: "CTR", delta: -17 },
      { metric: "Watch time", delta: 26 },
      { metric: "Engagement", delta: 7 },
    ],
    ai_insights: [
      "Bajo CTR y views pero alto watch time (47.5%). El thumbnail no está comunicando bien el valor del contenido, pero quienes entran se quedan.",
      "Sin transcripción — sincronizar para análisis completo de contenido.",
    ],
    improvement_points: [
      "El thumbnail necesita ser más llamativo. Probá con un contraste más fuerte o cara visible.",
      "El título es bueno pero el thumbnail no lo acompaña.",
    ],
    transcription: [],
  },
  {
    id: "yt_005",
    thumbnail: "https://picsum.photos/seed/yt5/640/360",
    title: "Mi rutina semanal como creador de contenido + dueño de agencia",
    description: "Un día en mi vida: cómo organizo el tiempo entre la creación de contenido y la gestión de la agencia.",
    date: "10 feb 2026",
    duration: "21:14",
    transcribed: true,
    metrics: {
      views: 10100,
      likes: 412,
      comments: 81,
      watch_time_total_h: 1560,
      avg_view_duration_s: 556,
      duration_s: 1274,
      ctr: 5.9,
      impressions: 171000,
      engagement_rate: 0.049,
    },
    avg_comparison: [
      { metric: "Views", delta: 1 },
      { metric: "CTR", delta: 14 },
      { metric: "Watch time", delta: 49 },
      { metric: "Engagement", delta: 17 },
    ],
    ai_insights: [
      "Watch time total de 1,560 horas es el segundo mejor de tu canal. El formato 'día en mi vida' retiene muy bien en YouTube — la narrativa personal funciona.",
      "43.6% de retención promedio en un video de 21 minutos es muy bueno. El ritmo de edición está bien calibrado para contenido largo.",
    ],
    improvement_points: [
      "Agregar capítulos (timestamps) mejoraría la experiencia y el SEO de YouTube.",
    ],
    transcription: [
      "Hoy te voy a mostrar cómo organizo mi semana.",
      "Tengo una agencia de automatizaciones con cinco clientes activos.",
      "Y también creo contenido para mi marca personal tres veces por semana.",
      "¿Cómo hago las dos cosas sin quemarme?",
      "Lunes: planificación de la semana y revisión de métricas.",
      "Martes: trabajo profundo en la agencia — proyectos de clientes.",
      "Miércoles: grabación de todo el contenido de la semana.",
      "Jueves: edición y preparación de publicaciones.",
      "Viernes: reuniones de clientes, calls de ventas.",
      "Sábado y domingo: descanso real.",
      "La clave es la separación de roles.",
      "Cuando estoy en modo agencia, no pienso en contenido.",
      "Cuando estoy en modo creador, no pienso en clientes.",
      "El contexto switching mata la productividad.",
    ],
  },
]

export function getVideoById(id: string): YTVideo | undefined {
  return mockVideos.find((v) => v.id === id)
}
