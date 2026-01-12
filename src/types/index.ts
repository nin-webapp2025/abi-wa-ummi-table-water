export type UserRole = 'Admin' | 'Staff' | 'Viewer';

export interface User {
  id: string;
  email: string;
  full_name: string;
  role: UserRole;
  created_at: string;
  updated_at: string;
}

export interface Production {
  id: string;
  date: string;
  bags_produced: number;
  staff_id: string;
  staff_name?: string;
  notes?: string;
  created_at: string;
}

export interface Sales {
  id: string;
  date: string;
  bags_sold: number;
  revenue: number; // bags_sold * 400
  customer_name?: string;
  staff_id: string;
  staff_name?: string;
  notes?: string;
  created_at: string;
}

export interface Resource {
  id: string;
  name: string;
  category: 'nylon' | 'chemical' | 'fuel' | 'other';
  quantity: number;
  unit: string;
  cost_per_unit: number;
  last_restocked: string;
  created_at: string;
  updated_at: string;
}

export interface Expense {
  id: string;
  date: string;
  category: string;
  description: string;
  amount: number;
  staff_id: string;
  staff_name?: string;
  created_at: string;
}

export interface DashboardStats {
  total_production_today: number;
  total_sales_today: number;
  total_revenue_today: number;
  total_expenses_today: number;
  net_profit_today: number;
  total_production_month: number;
  total_sales_month: number;
  total_revenue_month: number;
}
