# Abi wa Ummi Table Water Database Schema

This document outlines the Supabase database schema for the water production management system.

## Tables

### users
```sql
CREATE TABLE users (
  id UUID PRIMARY KEY REFERENCES auth.users(id) ON DELETE CASCADE,
  email TEXT UNIQUE NOT NULL,
  full_name TEXT NOT NULL,
  role TEXT NOT NULL CHECK (role IN ('Admin', 'Staff', 'Viewer')),
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Enable RLS
ALTER TABLE users ENABLE ROW LEVEL SECURITY;

-- Policies
CREATE POLICY "Users can view their own profile" ON users
  FOR SELECT USING (auth.uid() = id);

CREATE POLICY "Admins can view all users" ON users
  FOR SELECT USING (
    EXISTS (
      SELECT 1 FROM users WHERE id = auth.uid() AND role = 'Admin'
    )
  );
```

### production
```sql
CREATE TABLE production (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  date DATE NOT NULL,
  bags_produced INTEGER NOT NULL CHECK (bags_produced >= 0),
  staff_id UUID NOT NULL REFERENCES users(id) ON DELETE CASCADE,
  notes TEXT,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Enable RLS
ALTER TABLE production ENABLE ROW LEVEL SECURITY;

-- Policies
CREATE POLICY "Staff can view all production records" ON production
  FOR SELECT USING (
    EXISTS (
      SELECT 1 FROM users WHERE id = auth.uid() AND role IN ('Admin', 'Staff', 'Viewer')
    )
  );

CREATE POLICY "Staff can insert production records" ON production
  FOR INSERT WITH CHECK (
    EXISTS (
      SELECT 1 FROM users WHERE id = auth.uid() AND role IN ('Admin', 'Staff')
    )
  );
```

### sales
```sql
CREATE TABLE sales (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  date DATE NOT NULL,
  bags_sold INTEGER NOT NULL CHECK (bags_sold >= 0),
  revenue NUMERIC(10, 2) NOT NULL CHECK (revenue >= 0),
  customer_name TEXT,
  staff_id UUID NOT NULL REFERENCES users(id) ON DELETE CASCADE,
  notes TEXT,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Enable RLS
ALTER TABLE sales ENABLE ROW LEVEL SECURITY;

-- Policies
CREATE POLICY "Staff can view all sales records" ON sales
  FOR SELECT USING (
    EXISTS (
      SELECT 1 FROM users WHERE id = auth.uid() AND role IN ('Admin', 'Staff', 'Viewer')
    )
  );

CREATE POLICY "Staff can insert sales records" ON sales
  FOR INSERT WITH CHECK (
    EXISTS (
      SELECT 1 FROM users WHERE id = auth.uid() AND role IN ('Admin', 'Staff')
    )
  );
```

### resources
```sql
CREATE TABLE resources (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  name TEXT NOT NULL,
  category TEXT NOT NULL CHECK (category IN ('nylon', 'chemical', 'fuel', 'other')),
  quantity NUMERIC(10, 2) NOT NULL CHECK (quantity >= 0),
  unit TEXT NOT NULL,
  cost_per_unit NUMERIC(10, 2) NOT NULL CHECK (cost_per_unit >= 0),
  last_restocked DATE NOT NULL,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Enable RLS
ALTER TABLE resources ENABLE ROW LEVEL SECURITY;

-- Policies
CREATE POLICY "Staff can view all resources" ON resources
  FOR SELECT USING (
    EXISTS (
      SELECT 1 FROM users WHERE id = auth.uid() AND role IN ('Admin', 'Staff', 'Viewer')
    )
  );

CREATE POLICY "Staff can manage resources" ON resources
  FOR ALL USING (
    EXISTS (
      SELECT 1 FROM users WHERE id = auth.uid() AND role IN ('Admin', 'Staff')
    )
  );
```

### expenses
```sql
CREATE TABLE expenses (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  date DATE NOT NULL,
  category TEXT NOT NULL,
  description TEXT NOT NULL,
  amount NUMERIC(10, 2) NOT NULL CHECK (amount >= 0),
  staff_id UUID NOT NULL REFERENCES users(id) ON DELETE CASCADE,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Enable RLS
ALTER TABLE expenses ENABLE ROW LEVEL SECURITY;

-- Policies
CREATE POLICY "Admin and Viewer can view expenses" ON expenses
  FOR SELECT USING (
    EXISTS (
      SELECT 1 FROM users WHERE id = auth.uid() AND role IN ('Admin', 'Viewer')
    )
  );

CREATE POLICY "Admin can insert expenses" ON expenses
  FOR INSERT WITH CHECK (
    EXISTS (
      SELECT 1 FROM users WHERE id = auth.uid() AND role = 'Admin'
    )
  );
```

## Setup Instructions

1. Create a new Supabase project
2. Run the SQL commands above in the Supabase SQL editor
3. Copy your project URL and anon key
4. Create a `.env` file in the project root:
   ```
   VITE_SUPABASE_URL=your_project_url
   VITE_SUPABASE_ANON_KEY=your_anon_key
   ```
5. Create initial users through the Supabase dashboard (Auth > Users > Invite User)
6. Insert user profiles in the `users` table with appropriate roles
