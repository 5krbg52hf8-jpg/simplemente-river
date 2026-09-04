export type ResponseSource = "typeform_onboarding" | "typeform_satisfaction" | "call"

export interface CustomerResponse {
  id: string
  source: ResponseSource
  date: string
  name: string
  country: string
  answers: { question: string; answer: string }[]
  key_phrases: string[]
  sentiment: "positive" | "neutral" | "negative"
}

export interface CallTranscript {
  id: string
  date: string
  duration_min: number
  outcome: "closed" | "no_show" | "follow_up"
  summary: string
  pain_points: string[]
  objections: string[]
  closing_phrases: string[]
}

export const mockResponses: CustomerResponse[] = [
  {
    id: "resp_001",
    source: "typeform_onboarding",
    date: "12 mar 2026",
    name: "Marcela R.",
    country: "España",
    sentiment: "positive",
    key_phrases: ["resultados rápidos", "claridad en la estrategia", "ya probé otras herramientas"],
    answers: [
      { question: "¿Por qué decidiste trabajar con nosotros?", answer: "Venía siguiendo el contenido de Francisco hace 4 meses y todo lo que decía tenía sentido con lo que yo estaba viviendo. Cuando vi el caso de éxito del cliente de Madrid me convencí." },
      { question: "¿Qué te hizo elegirnos por encima de otras opciones?", answer: "La claridad del método. No es vago ni genérico. Hay pasos concretos." },
      { question: "¿Qué esperas lograr en los primeros 30 días?", answer: "Tener un sistema claro para crear contenido que traiga leads, no solo seguidores." },
    ],
  },
  {
    id: "resp_002",
    source: "typeform_onboarding",
    date: "11 mar 2026",
    name: "Sebastián T.",
    country: "España",
    sentiment: "positive",
    key_phrases: ["consistencia", "sistema probado", "confianza por el contenido"],
    answers: [
      { question: "¿Por qué decidiste trabajar con nosotros?", answer: "Lo que más me convenció fue la consistencia del mensaje en todas las plataformas. No es solo teoría, se ve que Francisco lo aplica él mismo." },
      { question: "¿Qué te hizo elegirnos por encima de otras opciones?", answer: "Otros coaches hablan mucho de marca personal de forma abstracta. Acá hay métricas concretas." },
      { question: "¿Qué esperas lograr en los primeros 30 días?", answer: "Subir de 3 a 5 publicaciones por semana sin perder calidad." },
    ],
  },
  {
    id: "resp_003",
    source: "typeform_onboarding",
    date: "9 mar 2026",
    name: "Laura M.",
    country: "Argentina",
    sentiment: "positive",
    key_phrases: ["me veía reflejada en el contenido", "ya probé otras herramientas", "resultados medibles"],
    answers: [
      { question: "¿Por qué decidiste trabajar con nosotros?", answer: "Me veía completamente reflejada en el contenido. Tenía una agencia, publicaba contenido, pero no podía explicar qué estaba funcionando. Eso me frustraba mucho." },
      { question: "¿Qué te hizo elegirnos por encima de otras opciones?", answer: "Probé dos herramientas de análisis de redes antes. Eran muy técnicas y no me daban insights accionables." },
      { question: "¿Qué esperas lograr en los primeros 30 días?", answer: "Saber exactamente qué tipo de contenido me genera leads de calidad." },
    ],
  },
  {
    id: "resp_004",
    source: "typeform_satisfaction",
    date: "8 mar 2026",
    name: "Roberto K.",
    country: "España",
    sentiment: "positive",
    key_phrases: ["resultados superaron expectativas", "el sistema funciona", "recomendaría sin dudar"],
    answers: [
      { question: "¿Cómo calificarías tu experiencia del 1 al 10?", answer: "9/10" },
      { question: "¿Qué fue lo más valioso del proceso?", answer: "El análisis de mis reels con insights concretos. Nunca había entendido por qué ciertos videos funcionaban y otros no." },
      { question: "¿Lo recomendarías? ¿A quién?", answer: "Sí, sin duda. A cualquier profesional o emprendedor que crea contenido y quiera entender qué está funcionando realmente." },
    ],
  },
  {
    id: "resp_005",
    source: "typeform_satisfaction",
    date: "6 mar 2026",
    name: "Valentina S.",
    country: "Uruguay",
    sentiment: "positive",
    key_phrases: ["claridad total", "el dashboard es increíble", "antes volaba a ciegas"],
    answers: [
      { question: "¿Cómo calificarías tu experiencia del 1 al 10?", answer: "10/10" },
      { question: "¿Qué fue lo más valioso del proceso?", answer: "Antes literalmente no sabía por qué un video tenía 50k views y otro 5k. Ahora lo entiendo." },
      { question: "¿Lo recomendarías? ¿A quién?", answer: "A todo el mundo que tenga una marca personal activa. Es como tener un analista de datos trabajando para vos." },
    ],
  },
  {
    id: "resp_006",
    source: "typeform_onboarding",
    date: "4 mar 2026",
    name: "Nicolás F.",
    country: "España",
    sentiment: "positive",
    key_phrases: ["cansado de adivinar", "quiero datos reales", "vi resultados en el contenido de Francisco"],
    answers: [
      { question: "¿Por qué decidiste trabajar con nosotros?", answer: "Llevo dos años creando contenido sin saber bien si funciona o no. Quería datos reales, no suposiciones." },
      { question: "¿Qué te hizo elegirnos por encima de otras opciones?", answer: "El hecho de que Francisco muestre sus propios datos. Si funciona para él, puede funcionar para mí." },
    ],
  },
  {
    id: "resp_007",
    source: "typeform_satisfaction",
    date: "2 mar 2026",
    name: "Ana G.",
    country: "México",
    sentiment: "neutral",
    key_phrases: ["buen producto", "podría tener más automatización", "mejoraría la parte de YouTube"],
    answers: [
      { question: "¿Cómo calificarías tu experiencia del 1 al 10?", answer: "7/10" },
      { question: "¿Qué mejorarías?", answer: "La integración con YouTube podría ser más profunda. En Instagram está todo perfecto pero YouTube me da menos insights." },
    ],
  },
  {
    id: "resp_008",
    source: "typeform_onboarding",
    date: "28 feb 2026",
    name: "Diego P.",
    country: "España",
    sentiment: "positive",
    key_phrases: ["inversionista en contenido", "ROI claro", "necesito saber qué funciona"],
    answers: [
      { question: "¿Por qué decidiste trabajar con nosotros?", answer: "Invierto mucho tiempo y dinero en contenido. Necesitaba saber qué parte de esa inversión está generando retorno real." },
      { question: "¿Qué esperas lograr en los primeros 30 días?", answer: "Identificar los dos o tres formatos de contenido que más leads me generan y doblar la apuesta ahí." },
    ],
  },
]

export const mockCallTranscripts: CallTranscript[] = [
  {
    id: "call_001",
    date: "13 mar 2026",
    duration_min: 42,
    outcome: "closed",
    summary: "Lead de España con agencia de servicios. Frustrado con la falta de visibilidad sobre qué contenido convierte. Cerró en la primera llamada.",
    pain_points: [
      "No sabe cuál de sus reels genera clientes reales",
      "Publica 4 veces por semana pero no puede justificar el ROI a su socio",
      "Ya intentó analizar los datos manualmente con spreadsheets y fue insostenible",
    ],
    objections: [
      "¿Por qué no uso simplemente los Analytics nativos de Instagram?",
    ],
    closing_phrases: [
      "Esto es exactamente lo que necesitaba",
      "Si puedo ver qué reel genera cada lead, esto paga solo",
      "No quiero esperar, arrancamos esta semana",
    ],
  },
  {
    id: "call_002",
    date: "10 mar 2026",
    duration_min: 35,
    outcome: "closed",
    summary: "Consultora independiente de España. Lleva 1 año creando contenido sin poder medir resultados cualitativos. Muy orientada a datos.",
    pain_points: [
      "Tiene las métricas de views y likes pero no entiende por qué un video funciona y otro no",
      "No puede escalar lo que funciona porque no sabe exactamente qué es lo que funciona",
      "Siente que compite con creadores más jóvenes y necesita diferenciarse",
    ],
    objections: [
      "¿Cuánto tiempo me va a llevar implementar esto?",
      "¿Funciona si tengo menos de 10k seguidores?",
    ],
    closing_phrases: [
      "Con esto puedo dejar de adivinar",
      "Me lo venían recomendando hace tiempo",
      "Quiero empezar ya",
    ],
  },
  {
    id: "call_003",
    date: "7 mar 2026",
    duration_min: 28,
    outcome: "follow_up",
    summary: "Emprendedor de Argentina. Interesado pero tiene objeciones de precio. Comparando opciones. Seguimiento programado para la semana próxima.",
    pain_points: [
      "Invierte mucho tiempo en contenido sin ver resultados en ventas",
      "Sus ads de Argentina no generan leads de calidad",
    ],
    objections: [
      "Es caro para mi mercado actual (Argentina)",
      "¿Cómo sé que funciona para mi nicho específico?",
      "Estoy evaluando otras herramientas más baratas",
    ],
    closing_phrases: [
      "Lo que mostraste tiene sentido",
      "Necesito pensarlo",
    ],
  },
]

export const voiceInsights = {
  top_motivations: [
    { phrase: "No saber qué contenido convierte en ventas reales", count: 7 },
    { phrase: "Cansado de adivinar y volar a ciegas", count: 6 },
    { phrase: "Ya probé otras herramientas y no funcionaron", count: 5 },
    { phrase: "Quiero datos reales, no métricas de vanidad", count: 5 },
    { phrase: "Vi resultados en el contenido de Francisco", count: 4 },
    { phrase: "Necesito justificar el ROI del contenido", count: 3 },
  ],
  top_objections: [
    { phrase: "¿Por qué no uso los Analytics nativos?", count: 4 },
    { phrase: "¿Cuánto tiempo lleva implementarlo?", count: 3 },
    { phrase: "El precio es alto para mi mercado", count: 2 },
  ],
  top_closing_phrases: [
    { phrase: "Esto es exactamente lo que necesitaba", count: 5 },
    { phrase: "Si puedo ver qué genera leads, esto paga solo", count: 4 },
    { phrase: "Quiero empezar ya / arrancamos", count: 4 },
    { phrase: "Me lo venían recomendando", count: 3 },
  ],
  nps: 9.1,
}
