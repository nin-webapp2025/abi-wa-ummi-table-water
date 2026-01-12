# Abi wa Ummi Table Water - Management System

A modern web application for managing production, sales, revenue, and resources for a Nigerian sachet water production company.

## 🚀 Features

- **Dashboard**: Real-time metrics for daily and monthly performance
- **Production Tracking**: Record and monitor daily water bag production
- **Sales Management**: Track sales with automatic revenue calculations
- **Revenue Analytics**: View revenue vs expenses with net profit calculations
- **Resource Management**: Monitor inventory (nylon, chemicals, fuel)
- **Role-Based Access Control**: Admin, Staff, and Viewer roles with different permissions

## 🛠️ Tech Stack

- **Frontend**: React 19 + TypeScript
- **Build Tool**: Vite
- **Styling**: Tailwind CSS
- **Backend**: Supabase (PostgreSQL + Authentication)
- **Routing**: React Router v6
- **Hosting**: Vercel-ready

## 📋 Prerequisites

- Node.js 18+ and npm
- Supabase account
- Modern web browser

## 🏗️ Setup Instructions

### 1. Clone and Install

```bash
cd "abi wa ummi table water"
npm install
```

### 2. Configure Supabase

1. Create a new project at [supabase.com](https://supabase.com)
2. Run the SQL schema from `DATABASE_SCHEMA.md` in the Supabase SQL editor
3. Copy your Project URL and Anon Key from Settings > API

### 3. Environment Variables

Create a `.env` file in the project root:

```bash
VITE_SUPABASE_URL=your_supabase_project_url
VITE_SUPABASE_ANON_KEY=your_supabase_anon_key
```

### 4. Create Initial Users

1. Go to Supabase Dashboard > Authentication > Users
2. Click "Invite User" to create user accounts
3. Insert user profiles in the `users` table with appropriate roles

### 5. Run Development Server

```bash
npm run dev
```

Visit http://localhost:5173 and log in with your created user credentials.

## 📁 Project Structure

```
src/
├── components/        # Reusable UI components
├── pages/            # Route pages
├── layouts/          # Layout components
├── context/          # React Context (AuthContext)
├── services/         # Supabase API services
├── types/            # TypeScript definitions
├── utils/            # Helper functions
└── App.tsx           # Main app component
```

## 👥 User Roles

### Admin
- Full access to all features
- View all analytics and reports
- Manage resources and expenses

### Staff
- Record production and sales
- View own records
- Manage resources

### Viewer
- Read-only access
- View dashboard and revenue reports

## 🎨 Design Principles

- **Mobile-First**: Responsive design for all devices
- **Nigerian Context**: Naira (₦) currency, local date formats
- **Accessibility**: Semantic HTML, ARIA labels
- **Professional**: Clean, neutral design

## 🚢 Deployment

### Build for Production

```bash
npm run build
```

### Deploy to Vercel

1. Push code to GitHub
2. Import project in Vercel dashboard
3. Add environment variables
4. Deploy!

## 📝 Business Logic

- **Product**: Sachet water in bags (20 sachets per bag)
- **Pricing**: ₦400 per bag (fixed)
- **Revenue**: Automatically calculated as `bags_sold × ₦400`
- **Net Profit**: `total_revenue - total_expenses`

## 📖 Additional Documentation

- [DATABASE_SCHEMA.md](DATABASE_SCHEMA.md) - Complete database schema
- [.github/copilot-instructions.md](.github/copilot-instructions.md) - AI agent guidelines

## 📄 License

Proprietary - © 2026 Abi wa Ummi Table Water
      reactDom.configs.recommended,
    ],
    languageOptions: {
      parserOptions: {
        project: ['./tsconfig.node.json', './tsconfig.app.json'],
        tsconfigRootDir: import.meta.dirname,
      },
      // other options...
    },
  },
])
```
