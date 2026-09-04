# CLAUDE.md — Content OS

Este archivo le da contexto a Claude Code sobre este proyecto. Se carga automáticamente al inicio de cada sesión.

---

## Qué Es Esto

**Content OS** es un sistema de inteligencia de contenido para tu marca personal. Centraliza los datos de tus redes sociales (Instagram, YouTube) en un dashboard con análisis impulsado por IA.

El sistema:
- Se conecta a la API de Instagram y trae las métricas reales de cada video
- Transcribe y analiza el contenido de cada reel con IA (Gemini 2.5 Flash)
- Limpia las transcripciones con Groq LLaMA (gratis, ultrarápido)
- Guarda todo en Supabase con embeddings para búsqueda semántica
- Permite chatear con un agente que conoce todo tu historial de contenido

---

## Tu Rol y el Rol de Claude

Vos definís qué querés construir. Claude diseña, planifica e implementa.

No necesitás saber programar. Describile lo que querés en lenguaje natural y Claude lo construye paso a paso, pidiéndote confirmación antes de hacer cambios importantes.

---

## Estructura del Workspace

```
.
├── CLAUDE.md                  # Este archivo — siempre cargado
├── .claude/
│   └── commands/
│       ├── iniciar.md         # /iniciar — inicialización de sesión (wizard primera vez)
│       ├── crear-plan.md      # /crear-plan — planes de implementación
│       └── implementar.md     # /implementar — ejecutar planes
├── contexto/                  # Tu información: marca, negocio, métricas
├── planes/                    # Planes de implementación generados por Claude
├── salidas/                   # Entregables, notas, documentos
├── backups/                   # Snapshots antes de cambios importantes
├── referencia/                # Guías técnicas de APIs y herramientas
└── dashboard/                 # La app Next.js (tu dashboard real)
```

---

## Pipeline del Sistema

```
Instagram Graph API
     ↓ fetch paginado + cache local JSON (6h)
instagramClient.ts
     ↓
Gemini 2.5 Flash
     ↓ transcripción de video (audio → texto)
Groq LLaMA 3.1 8B Instant
     ↓ limpieza de transcripción (STT errors → texto limpio)
Supabase
     ↓ posts + metrics + transcriptions + embeddings (pgvector)
Dashboard (Next.js)
     ↓ visualización de métricas
AI Chat con RAG
     ↓ búsqueda semántica en pgvector → respuestas con data real
```

---

## Módulos del Dashboard

| Módulo | Ruta | Descripción |
|--------|------|-------------|
| Dashboard | `/dashboard` | Overview: KPIs, gráfica de reach mes a mes, top contenidos, objetivos |
| Instagram Intelligence | `/instagram` | Feed de reels con métricas, transcripciones e insights IA |
| AI Chat | `/chat` | Chat con agente que tiene contexto de todo tu contenido |
| Settings | `/settings` | Estado de conexión de cada módulo |

---

## Stack Técnico

| Capa | Tecnología |
|------|-----------|
| Framework | Next.js 15 (App Router) |
| Lenguaje | TypeScript (strict) |
| Estilos | Tailwind CSS v4 + shadcn/ui |
| IA — transcripciones | Gemini 2.5 Flash |
| IA — limpieza STT | Groq LLaMA 3.1 8B Instant (gratis) |
| IA — chat | Groq LLaMA 3.3 70B (gratis) |
| Base de datos | Supabase (PostgreSQL + pgvector) |
| APIs externas | Instagram Graph API |
| Cache | Archivos JSON locales en `/tmp/` |

---

## Modelos de IA por Tarea

| Tarea | Modelo | Costo |
|-------|--------|-------|
| Transcribir videos | Gemini 2.5 Flash | Gratis (1M tokens/mes) |
| Limpiar transcripciones | Groq LLaMA 3.1 8B Instant | Gratis |
| Chat con datos | Groq LLaMA 3.3 70B | Gratis |
| Embeddings semánticos | Gemini text-embedding-004 | Gratis |
| Ideas de contenido | Claude Sonnet 4.6 (opcional) | ~$3/1M tokens |

Ver tabla completa con instrucciones en `referencia/modelos-ia.md`.

---

## Variables de Entorno

Se guardan en `dashboard/.env.local`. Ver `dashboard/.env.local.example` para el formato completo.

| Variable | Para qué | Gratis/Pago |
|----------|----------|-------------|
| `GEMINI_API_KEY` | Transcripciones + embeddings | Gratis |
| `GROQ_API_KEY` | Limpieza STT + chat | Gratis |
| `INSTAGRAM_ACCESS_TOKEN` | Pull de reels y métricas | Gratis |
| `INSTAGRAM_USER_ID` | ID de tu cuenta de IG | Gratis |
| `SUPABASE_URL` | Base de datos | Gratis (tier generoso) |
| `SUPABASE_ANON_KEY` | Autenticación Supabase | Gratis |

**Nunca compartir `.env.local`. Está excluido del control de versiones.**

---

## Personalización Visual

Claude lee `contexto/mi-marca.md` para conocer tu marca. Al definir tu identidad visual (colores, logo, nombre), Claude aplica los cambios directamente en `dashboard/app/globals.css` y los componentes de layout.

El tema base es oscuro/premium. Podés pedirle a Claude que lo cambie a claro, que aplique tu color de acento, o que ajuste cualquier aspecto visual.

---

## Comandos Disponibles

| Comando | Qué hace |
|---------|----------|
| `/iniciar` | Inicializa la sesión — wizard de primera vez o resumen para sesiones posteriores |
| `/crear-plan [pedido]` | Crea un plan detallado antes de implementar algo |
| `/implementar [ruta-plan]` | Ejecuta un plan paso a paso |

---

## Instrucción Importante

Cada vez que se agregue un módulo nuevo o cambie la estructura del proyecto, actualizar las secciones relevantes de este archivo para mantenerlo al día.
