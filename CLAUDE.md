# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Commands

```bash
npm run dev      # Start dev server on http://localhost:3000
npm run build    # Static export to out/ directory
npm run start    # Serve production build
```

## Architecture

**Single-page SPA inside Next.js static export.** No server-side rendering — all routing is client-side React state.

**Page navigation model:** `page.tsx` holds `activeSection` state. Sidebar clicks call `handleNavigate(sectionId)` which switches visible content via `<SectionContent>` switch-case. TagsView maintains open tab list with close/reorder.

**No real API calls.** All data lives in `src/lib/mock-data.ts` as exported constants and functions (`formatPrice`, `formatPriceFull`). Every page component imports data directly — no fetch, no useEffect for data loading.

**Design system** reference: `dvadmin` Vue.js project at `../web`. Primary color `#003889`, layout is sidebar (220px) + header (50px) + tagsview (34px) + scrollable white card body.

### Component conventions

| Pattern | Usage |
|---------|-------|
| `MetricCard` | Dashboard stat cards — takes `icon` (ReactNode), `title`, `value`, `subtitle`, optional `children` for breakdown rows |
| `ChartCard` | ECharts container — takes `title`, `chartId`, `height`, `option` (ECharts option object), optional `meta` (header right slot) and `children` (body above chart) |
| `Icons.tsx` | 16 Feather-style SVG icon components. All use `stroke="currentColor"`. Exported individually + `getMenuIcon(name, size)` map for sidebar |
| `Tables.tsx` | Shared table page components: `AppOverview`, `ProductManage`, `CloudAccount`, `CloudSecret`, `AlertManage`, `AutoTagging`, `UserManage`, `RoleManage`, `MenuManage`. Local helpers `Th`, `Td`, `Badge`, `Card`, `CardHeader`, `FilterSelect` |
| `globals.css` | Only what Tailwind can't do: CSS variables for primary color, scrollbar styling, `.table-header` / `.table-striped` table styles, `.menu-active-bar` left indicator, `.submenu-enter` animation, provider dot colors |

### Styling rules

- Prefer Tailwind utility classes. Inline `style={{}}` only for dynamic values or CSS-variable references.
- Charts use ECharts `option` objects built with `useMemo` — color palette `['#003889', '#ff6a00', '#0078d4', '#326ce5']`.
- Badges use `bg-[#fef0f0] text-[#f56c6c]` pattern (red), `bg-[#f0f9eb] text-[#67c23a]` (green), `bg-[#fdf6ec] text-[#e6a23c]` (orange).

### Build output

`static export` to `out/` directory. Deployed to Vercel via `vercel.json` with `outputDirectory: "out"`.

### Backend reference

Real backend at `../softwareone-finops-backend` (Django REST Framework). API prefixes:
- `/api/cloud_services/` — billing, dashboard, K8s cost, auto-tagging
- `/api/prediction/` — cost prediction, trend analysis
- `/api/budget/` — budget management
- `/api/cost_optimization/` — optimization suggestions
- `/api/appmgmt/` — application management
- `/api/entity_management/` — cloud accounts, credentials
- `/api/alert/` — alert rules, contacts
- `/api/system/` — users, roles, menus (dvadmin)
- `/api/contracts/` — contracts