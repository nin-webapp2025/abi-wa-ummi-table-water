import { MOCK_PRODUCTION } from './mockData';
import type { Production } from '../types';

// DEMO MODE: Using mock data instead of Supabase
export const productionService = {
  /**
   * Get all production records
   */
  async getAll(): Promise<Production[]> {
    await new Promise(resolve => setTimeout(resolve, 300));
    return [...MOCK_PRODUCTION].sort((a, b) => b.date.localeCompare(a.date));
  },

  /**
   * Get production records by date range
   */
  async getByDateRange(startDate: string, endDate: string): Promise<Production[]> {
    await new Promise(resolve => setTimeout(resolve, 300));
    return MOCK_PRODUCTION.filter(p => p.date >= startDate && p.date <= endDate)
      .sort((a, b) => b.date.localeCompare(a.date));
  },

  /**
   * Create new production record
   */
  async create(production: Omit<Production, 'id' | 'created_at'>): Promise<Production> {
    await new Promise(resolve => setTimeout(resolve, 500));
    const newRecord = {
      ...production,
      id: String(Date.now()),
      created_at: new Date().toISOString(),
    };
    MOCK_PRODUCTION.unshift(newRecord);
    return newRecord;
  },

  /**
   * Get total production for today
   */
  async getTodayTotal(): Promise<number> {
    await new Promise(resolve => setTimeout(resolve, 200));
    const today = new Date().toISOString().split('T')[0];
    return MOCK_PRODUCTION
      .filter(p => p.date === today)
      .reduce((sum, record) => sum + record.bags_produced, 0);
  },

  /**
   * Get total production for current month
   */
  async getMonthTotal(): Promise<number> {
    await new Promise(resolve => setTimeout(resolve, 200));
    const now = new Date();
    const monthStart = new Date(now.getFullYear(), now.getMonth(), 1)
      .toISOString()
      .split('T')[0];
    return MOCK_PRODUCTION
      .filter(p => p.date >= monthStart)
      .reduce((sum, record) => sum + record.bags_produced, 0);
  },
};
