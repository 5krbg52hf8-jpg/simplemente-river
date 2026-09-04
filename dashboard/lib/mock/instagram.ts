export interface IGMetrics {
  reach: number
  likes: number
  comments: number
  shares: number
  saves: number
  avg_watch_time_s: number
  duration_s: number
  engagement_rate: number
}

export interface IGAvgComparison {
  metric: string
  delta: number // porcentaje vs. promedio 30d
}

export interface IGReel {
  id: string
  thumbnail: string
  caption: string
  date: string
  metrics: IGMetrics
  transcription: string[] // línea por línea
  ai_insights: string[]
  improvement_points: string[]
  avg_comparison: IGAvgComparison[]
  transcribed: boolean
}

// Genera curva de retención simulada
function retentionCurve(duration: number, dropAt?: number): { second: number; retention: number }[] {
  const pts = []
  for (let s = 0; s <= duration; s += Math.max(1, Math.floor(duration / 20))) {
    let ret = 100 - (s / duration) * 55
    if (dropAt && s >= dropAt) ret -= 18
    ret = Math.max(10, ret + (Math.random() * 4 - 2))
    pts.push({ second: s, retention: Math.round(ret) })
  }
  return pts
}

export const mockReels: IGReel[] = [
  {
    id: "reel_001",
    thumbnail: "https://picsum.photos/seed/reel1/400/711",
    caption: "El error que cometen el 90% de los creadores de contenido al medir sus resultados 📊",
    date: "14 mar 2026",
    metrics: { reach: 48200, likes: 1840, comments: 312, shares: 890, saves: 2150, avg_watch_time_s: 38, duration_s: 58, engagement_rate: 0.107 },
    transcribed: true,
    avg_comparison: [
      { metric: "Reach", delta: 34 },
      { metric: "Saves", delta: 67 },
      { metric: "Engagement", delta: 22 },
      { metric: "Watch time", delta: 12 },
    ],
    ai_insights: [
      "Este Reel tuvo un hook rate del 78% — 22 puntos por encima de tu promedio reciente. La pregunta directa en el primer segundo funcionó muy bien.",
      "Los guardados (2,150) son el 4.5% del reach total. Tus videos educativos sobre métricas generan consistentemente el doble de saves que el promedio.",
      "El pico de engagement ocurrió en el segundo 14 cuando mostraste el spreadsheet manual. La evidencia visual concreta retiene mejor que el texto.",
      "El share rate (1.8%) es tu mayor en los últimos 30 días. Contenido que 'expone un error común' tiene alto potencial de viralización.",
    ],
    improvement_points: [
      "En el segundo 38 hay una caída notable de retención. Considera acortar esa sección o hacerla más dinámica.",
      "El CTA al final es demasiado genérico. Probá con 'guardalo para la próxima vez que revises tus métricas'.",
      "La música de fondo es demasiado baja en los primeros 5 segundos.",
    ],
    transcription: [
      "El 90% de los creadores mide lo que es fácil, no lo que importa.",
      "Views, seguidores, likes — son métricas de vanidad.",
      "¿Cuántos de esos followers compraron algo? ¿Cuántos son de tu país target?",
      "Eso es lo que debería importarte.",
      "Y acá te explico exactamente qué mirar en cambio.",
      "Primero: tasa de conversión de contenido a lead.",
      "¿Cuántos de los que vieron este reel llegaron a tu perfil? ¿Cuántos te mandaron un mensaje?",
      "Segundo: calidad del prospecto.",
      "No todos los leads valen lo mismo. Un lead de España vale 3 veces más que uno de Argentina para mi negocio.",
      "Si no estás midiendo de dónde vienen tus leads, estás volando a ciegas.",
      "Guardalo y empezá a medir lo que realmente importa.",
    ],
  },
  {
    id: "reel_002",
    thumbnail: "https://picsum.photos/seed/reel2/400/711",
    caption: "Cómo pasé de 0 a 40k seguidores en 6 meses sin pagar un peso en ads 🚀",
    date: "11 mar 2026",
    metrics: { reach: 72100, likes: 3210, comments: 548, shares: 1640, saves: 1890, avg_watch_time_s: 45, duration_s: 62, engagement_rate: 0.101 },
    transcribed: true,
    avg_comparison: [
      { metric: "Reach", delta: 101 },
      { metric: "Saves", delta: 47 },
      { metric: "Engagement", delta: 14 },
      { metric: "Watch time", delta: 28 },
    ],
    ai_insights: [
      "Tu Reel con mejor reach de los últimos 3 meses. El formato 'cómo pasé de X a Y' sigue siendo el de mayor viralización en tu cuenta.",
      "El watch time de 45s sobre 62s de duración (72%) es el segundo mejor en tu historial. La narrativa personal mantiene muy bien la retención.",
      "El pico de comentarios es 3x tu promedio. Preguntas sobre el 'hack' específico dominan los comments — oportunidad para crear una segunda parte.",
    ],
    improvement_points: [
      "El título podría ser más específico con el nicho. '40k seguidores en marketing digital' conectaría mejor con tu audiencia objetivo.",
      "Los primeros 3 segundos son demasiado lentos. Empezá con el número directamente.",
    ],
    transcription: [
      "Hace 6 meses tenía 800 seguidores y nadie me conocía.",
      "Hoy tengo 40 mil.",
      "Y no gasté un peso en publicidad.",
      "Lo que hice fue simple, pero casi nadie lo aplica consistentemente.",
      "Primero: elegí un tema específico y me volví el referente en ese tema.",
      "No marketing en general. Marketing de contenido para negocios online.",
      "Segundo: publiqué 3 veces por semana sin excepción durante 4 meses.",
      "La consistencia destruye el talento.",
      "Tercero: estudié cada video que publicaba.",
      "Qué funcionó, qué no, por qué.",
      "Y repliqué lo que funcionó.",
      "Así de simple. Nada secreto.",
    ],
  },
  {
    id: "reel_003",
    thumbnail: "https://picsum.photos/seed/reel3/400/711",
    caption: "Por qué tu contenido no convierte (aunque tengas muchas views) 🎯",
    date: "8 mar 2026",
    metrics: { reach: 31500, likes: 980, comments: 187, shares: 420, saves: 1620, avg_watch_time_s: 29, duration_s: 47, engagement_rate: 0.098 },
    transcribed: true,
    avg_comparison: [
      { metric: "Reach", delta: -12 },
      { metric: "Saves", delta: 26 },
      { metric: "Engagement", delta: -8 },
      { metric: "Watch time", delta: -15 },
    ],
    ai_insights: [
      "El reach estuvo 12% por debajo de tu promedio, pero los saves están 26% por encima. Señal de contenido muy valioso para una audiencia más pequeña.",
      "El watch time cayó 15% vs. promedio. La introducción de este video tardó demasiado en llegar al punto.",
    ],
    improvement_points: [
      "La introducción dura 12 segundos antes de llegar a la promesa principal. Cortala a 5.",
      "Falta un ejemplo concreto con números reales para ilustrar el problema.",
      "El llamado a la acción no está claro.",
    ],
    transcription: [
      "Tenés 50 mil views en un video y cero clientes nuevos.",
      "¿Qué está fallando?",
      "No es el alcance. Es el contenido.",
      "El problema número uno: estás creando para entretener, no para convertir.",
      "Contenido que convierte tiene tres elementos.",
      "Uno: habla del dolor exacto de tu cliente ideal.",
      "Dos: demuestra que vos sos la solución.",
      "Tres: tiene un próximo paso claro.",
      "Sin esos tres elementos, podés tener un millón de views y cero ventas.",
    ],
  },
  {
    id: "reel_004",
    thumbnail: "https://picsum.photos/seed/reel4/400/711",
    caption: "La diferencia entre crear contenido y crear una marca personal 🔥",
    date: "5 mar 2026",
    metrics: { reach: 29800, likes: 1120, comments: 203, shares: 530, saves: 980, avg_watch_time_s: 33, duration_s: 54, engagement_rate: 0.096 },
    transcribed: true,
    avg_comparison: [
      { metric: "Reach", delta: -17 },
      { metric: "Saves", delta: -24 },
      { metric: "Engagement", delta: -4 },
      { metric: "Watch time", delta: -5 },
    ],
    ai_insights: [
      "Performance por debajo del promedio en la mayoría de métricas. El tema de 'marca personal' es más amplio y compite con más creadores.",
      "Los comentarios tienen alta proporción de preguntas sobre cómo aplicarlo — el contenido generó interés pero quedó muy teórico.",
    ],
    improvement_points: [
      "Agregar un ejemplo concreto de transformación (antes/después) haría el concepto más tangible.",
      "El hook no es lo suficientemente específico. '¿Sabés cuál es la diferencia entre...' funciona mejor como apertura.",
    ],
    transcription: [
      "Hay creadores de contenido. Y hay personas con marca personal.",
      "No es lo mismo.",
      "Un creador de contenido publica videos.",
      "Una persona con marca personal construye una posición en el mercado.",
      "La diferencia está en la consistencia del mensaje.",
      "¿Cuál es tu punto de vista único? ¿Cuál es tu posición?",
      "No 'marketing'. No 'negocios'.",
      "¿Qué creés vos que es diferente a lo que todos los demás están diciendo?",
      "Eso es una marca personal.",
    ],
  },
  {
    id: "reel_005",
    thumbnail: "https://picsum.photos/seed/reel5/400/711",
    caption: "3 métricas que miro CADA semana para saber si mi estrategia funciona 📈",
    date: "2 mar 2026",
    metrics: { reach: 41300, likes: 1560, comments: 274, shares: 710, saves: 1980, avg_watch_time_s: 41, duration_s: 56, engagement_rate: 0.109 },
    transcribed: true,
    avg_comparison: [
      { metric: "Reach", delta: 15 },
      { metric: "Saves", delta: 54 },
      { metric: "Engagement", delta: 24 },
      { metric: "Watch time", delta: 17 },
    ],
    ai_insights: [
      "Formato de lista ('3 métricas...') produce resultados consistentemente buenos en tu cuenta. Este es el cuarto video de este formato en el top 5.",
      "El engagement rate de 10.9% es tu segundo mejor en el mes. Los videos con estructura clara (número + tema) superan a los narrativos en tu audiencia.",
    ],
    improvement_points: [
      "Podés profundizar más en cada métrica. 56 segundos es suficiente para ir un nivel más profundo.",
    ],
    transcription: [
      "Cada semana miro exactamente tres métricas para saber si mi estrategia de contenido está funcionando.",
      "Métrica uno: el porcentaje de views que vienen de no seguidores.",
      "Si es mayor al 50%, tu contenido tiene potencial de crecimiento.",
      "Métrica dos: tasa de guardados.",
      "Los guardados son la métrica más honesta de valor percibido.",
      "Si la gente guarda tu contenido, le está diciendo 'esto vale la pena volver a ver'.",
      "Métrica tres: mensajes directos recibidos con intención de compra.",
      "No likes. No comentarios. Mensajes de personas que quieren trabajar con vos.",
      "Esas tres métricas me dicen todo.",
    ],
  },
  {
    id: "reel_006",
    thumbnail: "https://picsum.photos/seed/reel6/400/711",
    caption: "Lo que nadie te dice sobre el algoritmo de Instagram en 2026 🤫",
    date: "27 feb 2026",
    metrics: { reach: 55600, likes: 2090, comments: 418, shares: 1120, saves: 2340, avg_watch_time_s: 44, duration_s: 60, engagement_rate: 0.108 },
    transcribed: false,
    avg_comparison: [
      { metric: "Reach", delta: 55 },
      { metric: "Saves", delta: 82 },
      { metric: "Engagement", delta: 23 },
      { metric: "Watch time", delta: 25 },
    ],
    ai_insights: [
      "El título con 'lo que nadie te dice' genera alta expectativa. Este tipo de hook de 'secreto revelado' tiende a tener alto share rate en tu cuenta.",
      "82% más saves que tu promedio — el contenido de 'hacks de algoritmo' es el que más se guarda de toda tu cuenta.",
    ],
    improvement_points: [
      "Sin transcripción disponible aún — sincronizá para ver análisis completo.",
    ],
    transcription: [],
  },
  {
    id: "reel_007",
    thumbnail: "https://picsum.photos/seed/reel7/400/711",
    caption: "Mi proceso exacto para crear 3 reels por semana sin agotarme ⚡",
    date: "24 feb 2026",
    metrics: { reach: 27400, likes: 890, comments: 156, shares: 340, saves: 1240, avg_watch_time_s: 35, duration_s: 52, engagement_rate: 0.095 },
    transcribed: true,
    avg_comparison: [
      { metric: "Reach", delta: -24 },
      { metric: "Saves", delta: -3 },
      { metric: "Engagement", delta: -12 },
      { metric: "Watch time", delta: 0 },
    ],
    ai_insights: [
      "Contenido de proceso personal genera menos alcance pero audiencia muy comprometida. Ideal para convertir — los seguidores que lo ven tienen alta intención.",
    ],
    improvement_points: [
      "El ritmo de edición es más lento que tus videos de mejor performance. Cortá más agresivo.",
    ],
    transcription: [
      "Publico tres reels por semana. Siempre.",
      "¿Cómo no me agoto? Tengo un sistema.",
      "Un día por semana — generalmente los lunes — genero todas las ideas para la semana.",
      "No intento ser creativo todos los días. Soy creativo un día.",
      "Martes grabo. Todo junto, de una.",
      "Miércoles y jueves edito.",
      "Así simplifico el proceso al máximo.",
      "La creatividad no viene sola. Viene cuando tenés un sistema.",
    ],
  },
  {
    id: "reel_008",
    thumbnail: "https://picsum.photos/seed/reel8/400/711",
    caption: "Por qué pago $2000 al mes en herramientas y vale cada centavo 💻",
    date: "21 feb 2026",
    metrics: { reach: 33100, likes: 1180, comments: 234, shares: 480, saves: 1560, avg_watch_time_s: 38, duration_s: 55, engagement_rate: 0.104 },
    transcribed: true,
    avg_comparison: [
      { metric: "Reach", delta: -8 },
      { metric: "Saves", delta: 22 },
      { metric: "Engagement", delta: 18 },
      { metric: "Watch time", delta: 8 },
    ],
    ai_insights: [
      "Los videos con números concretos en el título ('$2000') producen mejor CTR en Instagram. La especificidad genera credibilidad.",
      "Alto engagement rate para un video con reach por debajo del promedio. La audiencia que lo vio está muy comprometida con el tema.",
    ],
    improvement_points: [
      "Podrías mostrar las herramientas en pantalla con quick cuts para más dinamismo.",
    ],
    transcription: [
      "Gasto dos mil dólares por mes en herramientas.",
      "Y es la inversión con mejor ROI que tengo en mi negocio.",
      "Las herramientas correctas multiplican tu capacidad.",
      "No te hacen trabajar menos. Te hacen producir más con el mismo tiempo.",
      "Las tres principales: automatización de marketing, CRM y análisis de contenido.",
      "Si no tenés presupuesto para herramientas, empezá con una.",
      "La que más impacto tiene en tu cuello de botella actual.",
      "Invertí en herramientas antes de invertir en publicidad.",
    ],
  },
  {
    id: "reel_009",
    thumbnail: "https://picsum.photos/seed/reel9/400/711",
    caption: "El tipo de contenido que más leads me genera (datos reales) 📊",
    date: "18 feb 2026",
    metrics: { reach: 38700, likes: 1420, comments: 289, shares: 650, saves: 2010, avg_watch_time_s: 42, duration_s: 59, engagement_rate: 0.112 },
    transcribed: true,
    avg_comparison: [
      { metric: "Reach", delta: 8 },
      { metric: "Saves", delta: 57 },
      { metric: "Engagement", delta: 27 },
      { metric: "Watch time", delta: 19 },
    ],
    ai_insights: [
      "Tu mayor engagement rate del mes. Contenido con 'datos reales' genera confianza y diferenciación — pocas personas lo hacen en tu nicho.",
      "57% más saves que el promedio. Los videos educativos basados en datos propios son tu contenido más 'guardable'.",
    ],
    improvement_points: [
      "Podés hacer un video de seguimiento con los datos actualizados a 30 días. El tema tiene alta demanda de contenido continuo.",
    ],
    transcription: [
      "Voy a mostrarte qué tipo de contenido me genera más leads con datos reales de mi cuenta.",
      "Analicé los últimos 60 videos.",
      "Resultado número uno: contenido educativo con proceso paso a paso.",
      "No opiniones. Pasos concretos.",
      "Resultado número dos: videos donde muestro mis propios resultados.",
      "La gente quiere ver evidencia, no teoría.",
      "Resultado número tres: contenido que responde una pregunta específica.",
      "No 'cómo crecer en Instagram'.",
      "Sino 'qué métrica mirar para saber si tu contenido convierte'.",
      "Más específico = más calificado el lead.",
    ],
  },
  {
    id: "reel_010",
    thumbnail: "https://picsum.photos/seed/reel10/400/711",
    caption: "Cómo uso la IA para crear contenido sin perder mi voz 🤖",
    date: "15 feb 2026",
    metrics: { reach: 44800, likes: 1780, comments: 362, shares: 920, saves: 1870, avg_watch_time_s: 40, duration_s: 57, engagement_rate: 0.106 },
    transcribed: true,
    avg_comparison: [
      { metric: "Reach", delta: 25 },
      { metric: "Saves", delta: 46 },
      { metric: "Engagement", delta: 21 },
      { metric: "Watch time", delta: 14 },
    ],
    ai_insights: [
      "El tema de IA + contenido es de los más buscados en tu nicho. Performance sólida en todas las métricas.",
      "Alto share rate (2.1%) — la gente comparte contenido sobre IA con su red. Potencial para viralización horizontal.",
    ],
    improvement_points: [
      "Mostrar el flujo en pantalla (screen recording de cómo usás la IA) haría el contenido mucho más práctico y diferencial.",
    ],
    transcription: [
      "Uso inteligencia artificial para crear contenido.",
      "Pero nunca dejo que la IA escriba por mí.",
      "La uso para amplificar mi pensamiento, no para reemplazarlo.",
      "El proceso es así.",
      "Yo tengo la idea. Yo tengo el punto de vista.",
      "Le doy eso a la IA y le pido que me ayude a estructurarlo.",
      "Después yo lo reescribo en mi voz.",
      "La IA es un asistente, no el autor.",
      "Si tu contenido suena a todos los demás, la IA lo está escribiendo por vos.",
      "Tené un punto de vista. Usá la IA para expresarlo mejor.",
    ],
  },
]

export function getReelById(id: string): IGReel | undefined {
  return mockReels.find((r) => r.id === id)
}

export function generateRetentionData(reel: IGReel) {
  return retentionCurve(reel.metrics.duration_s, Math.floor(reel.metrics.duration_s * 0.6))
}
