import React, { useEffect, useState } from 'react';
import { MainLayout } from '../layouts/MainLayout';
import { StatCard } from '../components/StatCard';
import { SimpleChart } from '../components/SimpleChart';
import { LoadingSpinner } from '../components/LoadingSpinner';
import { productionService } from '../services/productionService';
import { salesService } from '../services/salesService';
import { expenseService } from '../services/expenseService';
import { formatNaira } from '../utils/helpers';

export const DashboardPage: React.FC = () => {
  const [loading, setLoading] = useState(true);
  const [stats, setStats] = useState({
    productionToday: 0,
    salesToday: 0,
    revenueToday: 0,
    expensesToday: 0,
    netProfitToday: 0,
    productionMonth: 0,
    salesMonth: 0,
    revenueMonth: 0,
  });

  // Mock weekly revenue data for chart
  const weeklyRevenueData = [
    { label: 'Monday', value: 120000 },
    { label: 'Tuesday', value: 160000 },
    { label: 'Wednesday', value: 140000 },
    { label: 'Thursday', value: 180000 },
    { label: 'Friday', value: 200000 },
    { label: 'Saturday', value: 168000 },
    { label: 'Sunday', value: 95000 },
  ];

  useEffect(() => {
    const fetchDashboardData = async () => {
      try {
        setLoading(true);

        const [
          productionToday,
          salesToday,
          expensesToday,
          productionMonth,
          salesMonth,
        ] = await Promise.all([
          productionService.getTodayTotal(),
          salesService.getTodayTotal(),
          expenseService.getTodayTotal(),
          productionService.getMonthTotal(),
          salesService.getMonthTotal(),
        ]);

        setStats({
          productionToday,
          salesToday: salesToday.bags,
          revenueToday: salesToday.revenue,
          expensesToday,
          netProfitToday: salesToday.revenue - expensesToday,
          productionMonth,
          salesMonth: salesMonth.bags,
          revenueMonth: salesMonth.revenue,
        });
      } catch (error) {
        console.error('Error fetching dashboard data:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchDashboardData();
  }, []);

  if (loading) {
    return (
      <MainLayout>
        <div className="flex justify-center items-center h-64">
          <LoadingSpinner size="lg" />
        </div>
      </MainLayout>
    );
  }

  return (
    <MainLayout>
      <div className="space-y-8">
        {/* Header with Welcome */}
        <div className="bg-gradient-to-r from-primary-600 to-primary-700 rounded-lg shadow-lg p-8 text-white">
          <h1 className="text-4xl font-bold mb-2">Welcome Back! 👋</h1>
          <p className="text-primary-100">Here's what's happening with your water production today</p>
        </div>

        {/* Quick Actions */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <button className="bg-white border-2 border-primary-600 text-primary-600 hover:bg-primary-50 font-semibold py-4 px-6 rounded-lg shadow-sm transition-all duration-200 hover:shadow-md">
            <div className="flex items-center justify-center space-x-2">
              <span className="text-2xl">📦</span>
              <span>Record Production</span>
            </div>
          </button>
          <button className="bg-white border-2 border-green-600 text-green-600 hover:bg-green-50 font-semibold py-4 px-6 rounded-lg shadow-sm transition-all duration-200 hover:shadow-md">
            <div className="flex items-center justify-center space-x-2">
              <span className="text-2xl">💰</span>
              <span>Record Sales</span>
            </div>
          </button>
          <button className="bg-white border-2 border-red-600 text-red-600 hover:bg-red-50 font-semibold py-4 px-6 rounded-lg shadow-sm transition-all duration-200 hover:shadow-md">
            <div className="flex items-center justify-center space-x-2">
              <span className="text-2xl">📝</span>
              <span>Add Expense</span>
            </div>
          </button>
        </div>

        {/* Today's Stats */}
        <div>
          <h2 className="text-2xl font-bold text-gray-900 mb-6 flex items-center">
            <span className="text-3xl mr-3">📊</span>
            Today's Performance
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            <StatCard
              title="Production (Bags)"
              value={stats.productionToday}
              className="bg-gradient-to-br from-blue-50 to-blue-100 border-2 border-blue-200"
              icon={
                <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M20 7l-8-4-8 4m16 0l-8 4m8-4v10l-8 4m0-10L4 7m8 4v10M4 7v10l8 4" />
                </svg>
              }
              trend={{ value: '+12%', isPositive: true }}
            />
            <StatCard
              title="Sales (Bags)"
              value={stats.salesToday}
              className="bg-gradient-to-br from-green-50 to-green-100 border-2 border-green-200"
              icon={
                <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M16 11V7a4 4 0 00-8 0v4M5 9h14l1 12H4L5 9z" />
                </svg>
              }
              trend={{ value: '+8%', isPositive: true }}
            />
            <StatCard
              title="Revenue"
              value={formatNaira(stats.revenueToday)}
              className="bg-gradient-to-br from-emerald-50 to-emerald-100 border-2 border-emerald-200"
              icon={
                <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8c-1.657 0-3 .895-3 2s1.343 2 3 2 3 .895 3 2-1.343 2-3 2m0-8c1.11 0 2.08.402 2.599 1M12 8V7m0 1v8m0 0v1m0-1c-1.11 0-2.08-.402-2.599-1M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                </svg>
              }
              trend={{ value: '+15%', isPositive: true }}
            />
            <StatCard
              title="Net Profit"
              value={formatNaira(stats.netProfitToday)}
              className="bg-gradient-to-br from-purple-50 to-purple-100 border-2 border-purple-200"
              icon={
                <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z" />
                </svg>
              }
              trend={{ value: '+22%', isPositive: true }}
            />
          </div>
        </div>

        {/* Monthly Stats */}
        <div>
          <h2 className="text-2xl font-bold text-gray-900 mb-6 flex items-center">
            <span className="text-3xl mr-3">📅</span>
            This Month's Summary
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <StatCard
              title="Total Production (Bags)"
              value={stats.productionMonth}
              className="bg-gradient-to-br from-indigo-50 to-indigo-100 border-2 border-indigo-200"
              icon={
                <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M7 12l3-3 3 3 4-4M8 21l4-4 4 4M3 4h18M4 4h16v12a1 1 0 01-1 1H5a1 1 0 01-1-1V4z" />
                </svg>
              }
              trend={{ value: '+18%', isPositive: true }}
            />
            <StatCard
              title="Total Sales (Bags)"
              value={stats.salesMonth}
              className="bg-gradient-to-br from-teal-50 to-teal-100 border-2 border-teal-200"
              icon={
                <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 7h8m0 0v8m0-8l-8 8-4-4-6 6" />
                </svg>
              }
              trend={{ value: '+14%', isPositive: true }}
            />
            <StatCard
              title="Total Revenue"
              value={formatNaira(stats.revenueMonth)}
              className="bg-gradient-to-br from-amber-50 to-amber-100 border-2 border-amber-200"
              icon={
                <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8c-1.657 0-3 .895-3 2s1.343 2 3 2 3 .895 3 2-1.343 2-3 2m0-8c1.11 0 2.08.402 2.599 1M12 8V7m0 1v8m0 0v1m0-1c-1.11 0-2.08-.402-2.599-1M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                </svg>
              }
              trend={{ value: '+25%', isPositive: true }}
            />
          </div>
        </div>

        {/* Revenue Chart */}
        <div className="mt-8">
          <SimpleChart
            data={weeklyRevenueData}
            color="#10b981"
            title="📈 Weekly Revenue Trend"
          />
        </div>

        {/* Business Insights */}
        <div className="bg-gradient-to-r from-indigo-500 to-purple-600 rounded-lg shadow-lg p-6 text-white">
          <h3 className="text-2xl font-bold mb-3 flex items-center">
            <span className="text-3xl mr-2">💡</span>
            Business Insights
          </h3>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mt-4">
            <div className="bg-white bg-opacity-20 rounded-lg p-4 backdrop-blur-sm">
              <p className="font-semibold mb-1">Best Selling Day</p>
              <p className="text-2xl font-bold">Friday</p>
              <p className="text-sm opacity-90">₦200,000 revenue</p>
            </div>
            <div className="bg-white bg-opacity-20 rounded-lg p-4 backdrop-blur-sm">
              <p className="font-semibold mb-1">Average Daily Sales</p>
              <p className="text-2xl font-bold">420 bags</p>
              <p className="text-sm opacity-90">₦168,000 revenue</p>
            </div>
            <div className="bg-white bg-opacity-20 rounded-lg p-4 backdrop-blur-sm">
              <p className="font-semibold mb-1">Profit Margin</p>
              <p className="text-2xl font-bold">84%</p>
              <p className="text-sm opacity-90">Excellent performance!</p>
            </div>
          </div>
        </div>
      </div>
    </MainLayout>
  );
};

