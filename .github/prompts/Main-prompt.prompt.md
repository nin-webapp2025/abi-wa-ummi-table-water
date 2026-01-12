---
agent: agent
---
🎯 ROLE & GOAL

You are a Senior Frontend Engineer and Product Designer building a production-ready internal web application for a sachet water producing company in Nigeria.

The app is used daily by staff and admins to track water production, sales, revenue, expenses, and resources.

Your goal is to build a clean, fast, accessible, industry-standard frontend using React + TypeScript, optimized for Supabase backend integration and RBAC (role-based access control).

🧠 CONTEXT (BUSINESS LOGIC)

The company produces sachet water

20 sachets = 1 bag

₦400 per bag

Staff record production and sales daily

Admins monitor performance, revenue, expenses, and inventory

Accuracy, simplicity, and clarity are critical

🧱 TECH STACK CONSTRAINTS (DO NOT DEVIATE)

Frontend: React + TypeScript

State management: React Context or lightweight state (no Redux unless necessary)

Styling: Tailwind CSS (clean, minimal, enterprise-friendly)

Backend: Supabase (Postgres + Auth)

Hosting: Vercel

Auth: Supabase Auth with RBAC

No backend logic in frontend

No experimental libraries

🔐 USER ROLES (RBAC)

Implement frontend logic for three roles:

1. Admin

Full dashboard access

View all records

Revenue & expense analytics

Resource & inventory overview

User & staff management (UI only)

2. Staff

Record:

Number of water bags produced

Number of bags sold

View:

Their own daily records

Basic summaries

No access to admin analytics

3. Viewer / Read-only User

View summaries only

No data mutation access

📦 CORE FEATURES (FRONTEND)
1. Dashboard

Daily production summary

Bags produced vs sold

Revenue calculation:

bags_sold × ₦400

Clear stat cards (Today | This Week | This Month)

2. Production Management

Form to record:

Date

Number of bags produced

Validation (no negative values)

Table view of production history

3. Sales Tracking

Form to record:

Date

Bags sold

Auto-calculate revenue

Sales history table

4. Revenue & Expenses

Revenue derived from sales

Expenses input (manual entry)

Net profit display

5. Resources / Inventory

Track:

Nylon bags

Water treatment chemicals

Fuel / electricity

Quantity remaining

Low-stock warning UI (visual only)

🧩 UI / UX REQUIREMENTS

Clean admin-dashboard style

Neutral, professional colors (blue / slate / gray)

Large readable typography

Mobile-responsive (tablet-friendly at minimum)

Clear loading states & empty states

Error handling UI

Nigerian context (₦ currency, date format)

🗂️ REQUIRED PAGE STRUCTURE
/login
/dashboard
/production
/sales
/revenue
/resources
/settings


Use protected routes based on role.

🧪 QUALITY REQUIREMENTS

Fully typed TypeScript (no any)

Reusable components

Separation of concerns

Accessible labels & form controls

Clean folder structure

Ready for Supabase data binding

📁 SUGGESTED FOLDER STRUCTURE
src/
 ├─ components/
 ├─ pages/
 ├─ layouts/
 ├─ hooks/
 ├─ context/
 ├─ services/
 ├─ types/
 ├─ utils/

🚫 DO NOT

Do NOT hardcode business data

Do NOT mix backend logic into UI

Do NOT over-engineer

Do NOT use experimental APIs

🧠 DELIVERABLE EXPECTATION

Generate:

Clean React + TypeScript components

Dashboard layout

Role-aware navigation

Forms and tables

Reusable UI patterns

Placeholder Supabase service calls

Code should be production-ready, readable, and scalable.

🧠 END OF PROMPT

