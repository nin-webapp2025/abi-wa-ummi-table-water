import { MOCK_EXPENSES } from './mockData';
import type { Expense } from '../types';

// DEMO MODE: Using mock data
export const expenseService = {
  /**
   * Get all expenses
   */
  async getAll(): Promise<Expense[]> {
    await new Promise(resolve => setTimeout(resolve, 300));
    return [...MOCK_EXPENSES].sort((a, b) => b.date.localeCompare(a.date));
  },

  /**
   * Get expenses by date range
   */
  async getByDateRange(startDate: string, endDate: string): Promise<Expense[]> {
    await new Promise(resolve => setTimeout(resolve, 300));
    return MOCK_EXPENSES.filter(e => e.date >= startDate && e.date <= endDate)
      .sort((a, b) => b.date.localeCompare(a.date));
  },

  /**
   * Create new expense
   */
  async create(expense: Omit<Expense, 'id' | 'created_at'>): Promise<Expense> {
    await new Promise(resolve => setTimeout(resolve, 500));
    const newExpense = {
      ...expense,
      id: String(Date.now()),
      recorded_by_name: 'Staff Member',
      created_at: new Date().toISOString(),
    };
    MOCK_EXPENSES.unshift(newExpense);
    return newExpense;
  },

  /**
   * Get total expenses for today
   */
  async getTodayTotal(): Promise<number> {
    await new Promise(resolve => setTimeout(resolve, 200));
    const today = new Date().toISOString().split('T')[0];
    return MOCK_EXPENSES
      .filter(e => e.date === today)
      .reduce((sum, record) => sum + record.amount, 0);
  },

  /**
   * Get total expenses for current month
   */
  async getMonthTotal(): Promise<number> {
    await new Promise(resolve => setTimeout(resolve, 200));
    const now = new Date();
    const monthStart = new Date(now.getFullYear(), now.getMonth(), 1)
      .toISOString()
      .split('T')[0];
    return MOCK_EXPENSES
      .filter(e => e.date >= monthStart)
      .reduce((sum, record) => sum + record.amount, 0);
  },
};
