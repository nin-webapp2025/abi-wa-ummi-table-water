import { MOCK_SALES } from './mockData';
import type { Sales } from '../types';

// DEMO MODE: Using mock data
export const salesService = {
  /**
   * Get all sales records
   */
  async getAll(): Promise<Sales[]> {
    await new Promise(resolve => setTimeout(resolve, 300));
    return [...MOCK_SALES].sort((a, b) => b.date.localeCompare(a.date));
  },

  /**
   * Get sales records by date range
   */
  async getByDateRange(startDate: string, endDate: string): Promise<Sales[]> {
    await new Promise(resolve => setTimeout(resolve, 300));
    return MOCK_SALES.filter(s => s.date >= startDate && s.date <= endDate)
      .sort((a, b) => b.date.localeCompare(a.date));
  },

  /**
   * Create new sales record
   */
  async create(sales: Omit<Sales, 'id' | 'created_at' | 'revenue'>): Promise<Sales> {
    await new Promise(resolve => setTimeout(resolve, 500));
    const revenue = sales.bags_sold * 400;
    const newRecord = {
      ...sales,
      id: String(Date.now()),
      revenue,
      staff_name: 'Staff Member',
      created_at: new Date().toISOString(),
    };
    MOCK_SALES.unshift(newRecord);
    return newRecord;
  },

  /**
   * Get total sales and revenue for today
   */
  async getTodayTotal(): Promise<{ bags: number; revenue: number }> {
    await new Promise(resolve => setTimeout(resolve, 200));
    const today = new Date().toISOString().split('T')[0];
    const todaySales = MOCK_SALES.filter(s => s.date === today);
    const bags = todaySales.reduce((sum, record) => sum + record.bags_sold, 0);
    const revenue = todaySales.reduce((sum, record) => sum + record.revenue, 0);
    return { bags, revenue };
  },

  /**
   * Get total sales and revenue for current month
   */
  async getMonthTotal(): Promise<{ bags: number; revenue: number }> {
    await new Promise(resolve => setTimeout(resolve, 200));
    const now = new Date();
    const monthStart = new Date(now.getFullYear(), now.getMonth(), 1)
      .toISOString()
      .split('T')[0];
    const monthSales = MOCK_SALES.filter(s => s.date >= monthStart);
    const bags = monthSales.reduce((sum, record) => sum + record.bags_sold, 0);
    const revenue = monthSales.reduce((sum, record) => sum + record.revenue, 0);
    return { bags, revenue };
  },
};
