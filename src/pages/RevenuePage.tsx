import React, { useEffect, useState } from 'react';
import { MainLayout } from '../layouts/MainLayout';
import { StatCard } from '../components/StatCard';
import { DataTable } from '../components/DataTable';
import { LoadingSpinner } from '../components/LoadingSpinner';
import { salesService } from '../services/salesService';
import { expenseService } from '../services/expenseService';
import { formatDate, formatNaira, getMonthStart } from '../utils/helpers';
import type { Sales, Expense } from '../types';

export const RevenuePage: React.FC = () => {
  const [loading, setLoading] = useState(true);
  const [sales, setSales] = useState<Sales[]>([]);
  const [expenses, setExpenses] = useState<Expense[]>([]);
  const [summary, setSummary] = useState({
    totalRevenue: 0,
    totalExpenses: 0,
    netProfit: 0,
  });

  useEffect(() => {
    fetchRevenueData();
  }, []);

  const fetchRevenueData = async () => {
    try {
      setLoading(true);
      const monthStart = getMonthStart();
      const today = new Date().toISOString().split('T')[0];

      const [salesData, expensesData] = await Promise.all([
        salesService.getByDateRange(monthStart, today),
        expenseService.getByDateRange(monthStart, today),
      ]);

      setSales(salesData);
      setExpenses(expensesData);

      const totalRevenue = salesData.reduce((sum, sale) => sum + sale.revenue, 0);
      const totalExpenses = expensesData.reduce((sum, expense) => sum + expense.amount, 0);

      setSummary({
        totalRevenue,
        totalExpenses,
        netProfit: totalRevenue - totalExpenses,
      });
    } catch (error) {
      console.error('Error fetching revenue data:', error);
    } finally {
      setLoading(false);
    }
  };

  const salesColumns = [
    { key: 'date', header: 'Date', render: (row: Sales) => formatDate(row.date) },
    { key: 'bags_sold', header: 'Bags Sold' },
    { key: 'revenue', header: 'Revenue', render: (row: Sales) => formatNaira(row.revenue) },
    { key: 'customer_name', header: 'Customer' },
  ];

  const expenseColumns = [
    { key: 'date', header: 'Date', render: (row: Expense) => formatDate(row.date) },
    { key: 'category', header: 'Category' },
    { key: 'description', header: 'Description' },
    { key: 'amount', header: 'Amount', render: (row: Expense) => formatNaira(row.amount) },
  ];

  if (loading) {
    return (
      <MainLayout>
        <div className="flex justify-center py-12">
          <LoadingSpinner size="lg" />
        </div>
      </MainLayout>
    );
  }

  return (
    <MainLayout>
      <div className="space-y-6">
        <h1 className="text-3xl font-bold text-gray-900">Revenue & Expenses</h1>

        {/* Summary Cards */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <StatCard
            title="Total Revenue (This Month)"
            value={formatNaira(summary.totalRevenue)}
          />
          <StatCard
            title="Total Expenses (This Month)"
            value={formatNaira(summary.totalExpenses)}
          />
          <StatCard
            title="Net Profit (This Month)"
            value={formatNaira(summary.netProfit)}
          />
        </div>

        {/* Sales Table */}
        <div>
          <h2 className="text-xl font-semibold text-gray-800 mb-4">Sales This Month</h2>
          <DataTable
            data={sales}
            columns={salesColumns}
            emptyMessage="No sales recorded this month"
          />
        </div>

        {/* Expenses Table */}
        <div>
          <h2 className="text-xl font-semibold text-gray-800 mb-4">Expenses This Month</h2>
          <DataTable
            data={expenses}
            columns={expenseColumns}
            emptyMessage="No expenses recorded this month"
          />
        </div>
      </div>
    </MainLayout>
  );
};
