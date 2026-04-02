# ZAI

Controla tu dinero. Crece con claridad.

## Estado actual

Frontend web en React + TypeScript + Vite, con Tailwind CSS y estructura modular por dominios.

## Estructura principal

```
ZAI/
  apps/
    web/
      src/
        app/
        modules/
          dashboard/
          transactions/
          budgets/
          goals/
          auth/
        components/
          ui/
          charts/
        services/
          api/
        hooks/
        types/
```

## Requisitos

- Node.js 18+

## Desarrollo local

```
cd apps/web
npm install
npm run dev
```

## Scripts principales

Desde `apps/web`:

- `npm run dev` - servidor de desarrollo
- `npm run build` - build de produccion
- `npm run preview` - vista previa del build

## Tecnologias

- Vite
- React
- TypeScript
- Tailwind CSS
- React Router
- TanStack Query
- Zustand
- Axios
