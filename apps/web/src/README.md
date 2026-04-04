# ZAI

Plataforma de inteligencia financiera personal para centralizar tu salud financiera en un solo lugar: dashboard en tiempo real, presupuestos, transacciones, metas e insights con IA.

## 1. 🚀 Título + Descripción

**ZAI** es una plataforma de inteligencia financiera personal diseñada para ayudarte a entender, planificar y optimizar tu dinero con una experiencia clara, moderna y accionable.

## 2. 🎯 Problema y Solución

### El problema
La mayoría de personas maneja su dinero en múltiples apps, planillas y bancos. Eso provoca:

- Falta de visibilidad del flujo real de dinero.
- Dificultad para anticipar sobreendeudamiento.
- Decisiones financieras reactivas en vez de estratégicas.

### La solución con ZAI
ZAI unifica la información financiera y la convierte en decisiones accionables mediante:

- Dashboard financiero consolidado.
- Control de presupuestos y alertas.
- Historial y gestión de transacciones.
- Inteligencia financiera con IA para insights, score y predicciones.

## 3. 🧠 Features Principales

- `Dashboard financiero`: resumen de cashflow, alertas clave y métricas accionables.
- `Presupuestos inteligentes`: definición de límites por categoría y seguimiento de cumplimiento.
- `Transacciones centralizadas`: registro, edición y visualización de movimientos financieros.
- `Metas financieras`: planificación de objetivos y seguimiento del progreso.
- `Activos, inversiones y deudas`: vista integral del patrimonio y compromisos.
- `Simulador de crédito`: escenarios "what-if" para decisiones de financiamiento.
- `Módulo de inteligencia`: score financiero, comparaciones, insights y predicciones.
- `AI Chat financiero`: capa conversacional para resolver dudas y orientar decisiones.
- `Panel administrativo`: usuarios, suscripciones, logs, categorías y analytics.

## 4. 🖼️ Previews

Para que el README destaque en GitHub, agrega capturas/GIFs reales de producto.

### Dónde guardar los assets

Recomendado: crear una carpeta `docs/previews/` dentro de `apps/web`.

Ejemplo:

```text
apps/web/
  docs/
    previews/
      dashboard-overview.png
      transactions-flow.gif
      budgets-tracking.png
      ai-insights.png
      admin-analytics.png
```

### Qué mostrar (orden recomendado)

1. `Dashboard principal`: score, cashflow, alertas y resumen general.
2. `Flujo de transacciones`: alta, edición y categorización.
3. `Presupuestos`: límites por categoría y porcentaje de uso.
4. `Inteligencia con IA`: insights/predicciones y AI Chat.
5. `Vista admin`: usuarios, suscripciones y analytics.

### Ejemplo de bloque en Markdown

```md
## Vista general
![Dashboard ZAI](../docs/previews/dashboard-overview.png)

## Gestión de transacciones
![Transacciones ZAI](../docs/previews/transactions-flow.gif)
```

## 5. 🏗️ Tecnologías

### Frontend

- `React 18` + `TypeScript`
- `Vite 5`
- `React Router DOM`
- `Tailwind CSS`
- `Framer Motion`
- `Recharts` (visualización de datos)
- `Zustand` (estado global)
- `@tanstack/react-query` (estado asíncrono y fetch)

### Backend / Integración API

- Cliente HTTP con `Axios`.
- `baseURL` configurable por entorno con `VITE_API_URL`.
- Fallback local definido en el cliente: `https://api.zai.local`.

### Testing

- `Playwright` para pruebas End-to-End (`e2e/smoke.spec.ts`).

### Base de datos

- No definida en este repositorio (frontend app).
- Diseñado para conectarse a una API externa (`VITE_API_URL`).

## 6. ⚙️ Instalación

### Requisitos

- `Node.js` 18+ (recomendado 20+)
- `npm` 9+

### Paso a paso

1. Clona el repositorio.
2. Entra al proyecto web.
3. Instala dependencias.
4. Configura variables de entorno.
5. Ejecuta en desarrollo.

```bash
git clone https://github.com/Rau1ignacio/ZAI.git
cd ZAI/apps/web
npm install
```

Crea `.env.local` (opcional pero recomendado):

```bash
VITE_API_URL=https://tu-api.com
```

Inicia el proyecto:

```bash
npm run dev
```

Build de producción:

```bash
npm run build
npm run preview
```

Pruebas E2E:

```bash
npm run test:e2e
```

## 7. 📁 Estructura del Proyecto

```text
apps/web
  src/
    app/         # bootstrap, providers y ruteo principal
    pages/       # páginas por dominio (dashboard, auth, admin, etc.)
    components/  # componentes UI reutilizables
    layouts/     # layouts público, app y admin
    features/    # lógica de negocio por feature
    services/    # clientes e integración API (Axios, servicios BI, etc.)
    store/       # estado global (Zustand)
    data/        # datos estáticos/mocks y contenido de sitio
    hooks/       # hooks personalizados
    shared/      # utilidades y tipos compartidos
    styles/      # estilos globales
    types/       # tipos de dominio
  e2e/           # pruebas end-to-end con Playwright
  docs/          # documentación de QA y recursos del proyecto
```

## 8. 🧪 Futuras Mejoras (Roadmap)

- Integración bancaria automática (Open Banking) para sincronización de cuentas.
- Motor de recomendaciones financieras personalizadas con modelos de IA.
- Alertas proactivas por riesgo de liquidez y sobreendeudamiento.
- Metas colaborativas y perfiles familiares.
- Exportación avanzada de reportes (PDF/CSV) por períodos y categorías.
- Observabilidad productiva (logs, métricas, trazas y alerting).

## 9. 🤝 Contribuciones

Las contribuciones son bienvenidas.

1. Haz un fork del repositorio.
2. Crea una rama de trabajo: `feature/nombre-feature`.
3. Realiza tus cambios y valida con tests.
4. Abre un Pull Request con contexto técnico claro.

Checklist sugerido para PR:

- Cambios acotados y bien documentados.
- Sin errores de lint/build.
- Flujo crítico validado con E2E cuando aplique.

## 10. 📄 Licencia

Actualmente este repositorio no incluye archivo de licencia (`LICENSE`).

Si planeas hacerlo público para colaboración abierta, recomendado:

- `MIT` para máxima adopción.
- `Apache-2.0` si necesitas protección explícita de patentes.

## 11. 👤 Autor

- Nombre: `Rau1ignacio`
- LinkedIn: `https://www.linkedin.com/in/raul-bustamante/` *(actualiza si cambia tu perfil)*
- GitHub: `https://github.com/Rau1ignacio`
