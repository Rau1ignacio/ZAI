# QA Phase 4 Checklist

## Public
- Topbar public visible in desktop and mobile.
- Footer columns render: Product, Support, Legal, Social.
- Theme toggle works in topbar.
- Main CTA links resolve correctly.

## App
- Sidebar collapse/expand works and persists across refresh.
- Mobile drawer opens from topbar menu and closes on overlay click.
- Topbar search shortcut `Ctrl/Cmd + K` focuses search.
- Budgets page loads without runtime errors.

## Admin
- Admin sidebar collapse/expand works.
- Admin mobile drawer opens from topbar menu.
- Dashboard/Admin/Analytics/Logs/Users/Categories/Benefits/Subscriptions pages render correctly.
- Status badges and KPI cards display expected styles.

## Core
- No mojibake characters (`Ã`, `â`, `�`) in user-facing UI copy.
- Route-level lazy loading works (no blank screens while loading).
- Global error boundary fallback renders on uncaught UI error.

## Smoke Commands
- `npm run build`
- `npm run test:e2e`
