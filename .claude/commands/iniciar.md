# Iniciar

> Comando de inicialización. Primera vez: wizard completo. Sesiones posteriores: resumen de estado.

## Ejecutar

### BLOQUE A — Detección de primera vez

Verificar si existe el archivo `.claude/.initialized` en este workspace.

- Si **NO existe** → ejecutar BLOQUE B (wizard de primera vez)
- Si **existe** → saltar a BLOQUE D (resumen normal)

---

### BLOQUE B — Wizard de primera vez

**B1. Mensaje de bienvenida:**

```
────────────────────────────────────────────────
Bienvenido a tu Content OS.

Este workspace contiene el sistema listo para personalizar.
Claude Code se encarga del código — vos definís tu marca
y configurás tus accesos.

Vamos a hacer 4 preguntas rápidas para dejarlo listo.
────────────────────────────────────────────────
```

**B2. Personalización de marca (4 preguntas — hacer de a una, esperar respuesta):**

P1: "¿Cuál es tu handle o nombre de marca? (ej. @tunombre, Tu Nombre, Marca X)"
→ Guardar en `contexto/mi-marca.md`

P2: "¿Cuál es tu nicho en una oración? (ej. 'ayudo a clínicas a automatizar sus reservas con IA', 'implemento agentes de IA para agencias de marketing', 'enseño a emprendedores a automatizar su negocio con IA')"
→ Guardar en `contexto/mi-marca.md`

P3: "¿Qué estilo visual querés para tu dashboard?
   A) Oscuro y minimalista — ya está configurado, es el estilo base
   B) Claro y limpio — fondo blanco/gris, tipografía oscura
   C) Personalizado — describime qué imaginás"

→ Si A: no hay cambios en el CSS, ya está
→ Si B: Claude modifica las CSS variables en `dashboard/app/globals.css` para modo claro
→ Si C: Claude toma nota, pregunta detalles y aplica los cambios

P4: "¿Tenés un logo?
   Si sí → copialo a `dashboard/public/` con el nombre `logo.png`
   Si no → lo dejamos así, podés agregarlo después"

→ Actualizar `contexto/mi-marca.md` con todas las respuestas
→ Si P3 fue B o C, aplicar los cambios de estilos en `dashboard/app/globals.css`
→ También actualizar el nombre en `dashboard/components/layout/Sidebar.tsx` y `dashboard/components/shared/SplashScreen.tsx`

**B3. Configuración de APIs:**

Mostrar este texto:

```
────────────────────────────────────────────────
Ahora configuremos las APIs.

APIS NECESARIAS — todas gratuitas:

1. GEMINI_API_KEY
   Modelo: Gemini 2.5 Flash
   Para qué: transcribir tus videos (audio → texto)
   Cómo obtenerla: aistudio.google.com → Get API key

2. GROQ_API_KEY
   Modelos: LLaMA 3.1 8B (limpiar texto) + LLaMA 3.3 70B (chat)
   Para qué: corregir transcripciones y potenciar el chat
   Cómo obtenerla: console.groq.com → API Keys → Create

3. INSTAGRAM_ACCESS_TOKEN + INSTAGRAM_USER_ID
   Para qué: traer tus reels reales con métricas
   Guía completa: referencia/ig-api-guide.md

4. SUPABASE_URL + SUPABASE_ANON_KEY
   Para qué: guardar todos tus datos y hacer el chat semántico posible
   Guía completa: referencia/supabase-setup.md

OPCIONALES (de pago — mejoran análisis y creatividad):

5. ANTHROPIC_API_KEY → Claude Sonnet 4.6
   Para qué: ideas de contenido creativas, análisis estratégico
   Cómo obtenerla: console.anthropic.com → API Keys
────────────────────────────────────────────────
```

Preguntar: "¿Cuáles de estas ya tenés? Para las que falten, te ayudo a obtenerlas."

Asistir con las que falten, una por una. Al terminar:
"Guardá todas las keys en `dashboard/.env.local` — usá el formato de `dashboard/.env.local.example`"

**B4. Próximos pasos:**

```
────────────────────────────────────────────────
Todo listo. Tu Content OS está configurado con:
- Marca: [lo que respondió]
- Estilo: [el que eligió]
- APIs: [lista las que tiene]

Próximos pasos:
1. cd dashboard && npm install
2. npm run dev
3. Abrí http://localhost:3000 — vas a ver el sistema con datos de ejemplo
4. Para conectar tu Instagram real: hacé POST /api/sync desde la app (botón en Settings)

Cuando el dashboard esté listo para publicar:
→ Ver: referencia/deploy-vercel.md
────────────────────────────────────────────────
```

Crear el archivo `.claude/.initialized` con contenido `initialized`.

---

### BLOQUE D — Resumen normal (sesiones posteriores)

Leer: `CLAUDE.md`, `contexto/mi-marca.md`, `contexto/mis-datos.md`, `contexto/mi-negocio.md`

Proporcionar:
1. Resumen del estado actual del proyecto (módulos activos, APIs configuradas)
2. Qué hay pendiente según los archivos de contexto
3. Sugerencias de próximos pasos
4. Confirmación de disposición para trabajar
