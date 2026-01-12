# Copilot Instructions - Abi wa Ummi Table Water

## Project Overview
Internal web application for a Nigerian sachet water production company. Staff and admins use this daily to track production, sales, revenue, expenses, and resources.

## Tech Stack (DO NOT DEVIATE)
- **Frontend**: React 18 + TypeScript (strict mode)
- **Build Tool**: Vite
- **Styling**: Tailwind CSS (neutral, professional design)
- **Backend**: Supabase (Postgres + Auth)
- **Routing**: React Router v6
- **Hosting**: Vercel
- **State**: React Context (no Redux unless necessary)

## Business Logic
- **Product**: Sachet water in bags (20 sachets = 1 bag)
- **Pricing**: ₦400 per bag
- **Users**: Admin (full access), Staff (record production/sales), Viewer (read-only)
- **Key Metrics**: Daily production, bags sold, revenue (bags_sold × ₦400), expenses, net profit

## Project Structure
```
src/
├─ components/     # Reusable UI components (StatCard, DataTable, Button, etc.)
├─ pages/          # Route pages (Dashboard, Production, Sales, Revenue, etc.)
├─ layouts/        # Layout wrappers with navigation
├─ hooks/          # Custom React hooks
├─ context/        # AuthContext with RBAC
├─ services/       # Supabase API calls (auth, production, sales, resources)
├─ types/          # TypeScript interfaces (User, Production, Sales, etc.)
└─ utils/          # Helpers (currency formatting, date utils)
```

## Coding Standards
- **TypeScript**: Fully typed, no `any` types
- **Components**: Functional components with proper prop typing
- **Separation**: No backend logic in frontend, use service layer
- **Accessibility**: Proper labels, ARIA attributes, semantic HTML
- **Nigerian Context**: Use ₦ symbol, local date formats

## RBAC Implementation
- Admin: Full dashboard, analytics, user management UI
- Staff: Record production/sales, view own records only
- Viewer: Read-only access to summaries
- Protect routes using role checks in `ProtectedRoute` component

## Key Routes
```
/login          # Supabase Auth UI
/dashboard      # Main dashboard with stats
/production     # Record/view production data
/sales          # Record/view sales data
/revenue        # Revenue vs expenses analytics
/resources      # Inventory tracking (nylon, chemicals, fuel)
/settings       # User profile and preferences
```

## Common Patterns
- Use `useAuth()` hook to access user role and auth state
- Wrap forms with loading states and validation
- Currency formatting: `formatNaira(amount)` helper
- Empty states with helpful messages
- Mobile-first responsive design (min-width breakpoints)

## Development Commands
```bash
npm install          # Install dependencies
npm run dev          # Start dev server (localhost:5173)
npm run build        # Production build
npm run preview      # Preview production build
npm run lint         # ESLint check
```

## Environment Variables
```
VITE_SUPABASE_URL=your_supabase_url
VITE_SUPABASE_ANON_KEY=your_supabase_anon_key
```

## Notes for AI Agents
- Prioritize clarity and simplicity over complexity
- All monetary values in Naira (₦), formatted with commas
- Forms must validate (no negative values for quantities)
- Show loading states during async operations
- Handle errors gracefully with user-friendly messages
- Code should be production-ready and maintainable
