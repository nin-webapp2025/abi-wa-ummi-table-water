import React, { useEffect, useState } from 'react';
import { MainLayout } from '../layouts/MainLayout';
import { DataTable } from '../components/DataTable';
import { Button } from '../components/Button';
import { Input } from '../components/Input';
import { LoadingSpinner } from '../components/LoadingSpinner';
import { salesService } from '../services/salesService';
import { useAuth } from '../hooks/useAuth';
import { formatDate, formatNaira, getTodayDate } from '../utils/helpers';
import type { Sales } from '../types';

export const SalesPage: React.FC = () => {
  const [sales, setSales] = useState<Sales[]>([]);
  const [loading, setLoading] = useState(true);
  const [showForm, setShowForm] = useState(false);
  const [formData, setFormData] = useState({
    date: getTodayDate(),
    bags_sold: '',
    customer_name: '',
    notes: '',
  });
  const [submitting, setSubmitting] = useState(false);

  const { user } = useAuth();

  useEffect(() => {
    fetchSales();
  }, []);

  const fetchSales = async () => {
    try {
      setLoading(true);
      const data = await salesService.getAll();
      setSales(data);
    } catch (error) {
      console.error('Error fetching sales:', error);
    } finally {
      setLoading(false);
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!user) return;

    const bagsSold = parseInt(formData.bags_sold);
    if (isNaN(bagsSold) || bagsSold < 0) {
      alert('Please enter a valid number of bags');
      return;
    }

    try {
      setSubmitting(true);
      await salesService.create({
        date: formData.date,
        bags_sold: bagsSold,
        staff_id: user.id,
        customer_name: formData.customer_name || undefined,
        notes: formData.notes || undefined,
      });

      setFormData({
        date: getTodayDate(),
        bags_sold: '',
        customer_name: '',
        notes: '',
      });
      setShowForm(false);
      fetchSales();
    } catch (error) {
      console.error('Error creating sales record:', error);
      alert('Failed to record sale');
    } finally {
      setSubmitting(false);
    }
  };

  const columns = [
    { key: 'date', header: 'Date', render: (row: Sales) => formatDate(row.date) },
    { key: 'bags_sold', header: 'Bags Sold' },
    { key: 'revenue', header: 'Revenue', render: (row: Sales) => formatNaira(row.revenue) },
    { key: 'customer_name', header: 'Customer' },
    { key: 'staff_name', header: 'Recorded By' },
    { key: 'notes', header: 'Notes' },
  ];

  return (
    <MainLayout>
      <div className="space-y-6">
        <div className="flex justify-between items-center">
          <h1 className="text-3xl font-bold text-gray-900">Sales Records</h1>
          <Button onClick={() => setShowForm(!showForm)}>
            {showForm ? 'Cancel' : 'Record Sale'}
          </Button>
        </div>

        {showForm && (
          <div className="bg-white p-6 rounded-lg shadow-md">
            <h2 className="text-xl font-semibold mb-4">Record New Sale</h2>
            <form onSubmit={handleSubmit} className="space-y-4">
              <Input
                label="Date"
                type="date"
                value={formData.date}
                onChange={(e) => setFormData({ ...formData, date: e.target.value })}
                required
              />
              <Input
                label="Bags Sold"
                type="number"
                min="0"
                value={formData.bags_sold}
                onChange={(e) => setFormData({ ...formData, bags_sold: e.target.value })}
                required
                placeholder="Enter number of bags sold"
              />
              <div className="text-sm text-gray-600">
                Revenue: {formData.bags_sold ? formatNaira(parseInt(formData.bags_sold) * 400) : '₦0.00'}
              </div>
              <Input
                label="Customer Name (Optional)"
                value={formData.customer_name}
                onChange={(e) => setFormData({ ...formData, customer_name: e.target.value })}
                placeholder="Enter customer name"
              />
              <Input
                label="Notes (Optional)"
                value={formData.notes}
                onChange={(e) => setFormData({ ...formData, notes: e.target.value })}
                placeholder="Any additional notes"
              />
              <Button type="submit" loading={submitting}>
                Submit
              </Button>
            </form>
          </div>
        )}

        {loading ? (
          <div className="flex justify-center py-12">
            <LoadingSpinner size="lg" />
          </div>
        ) : (
          <DataTable
            data={sales}
            columns={columns}
            emptyMessage="No sales records found. Start by recording your first sale!"
          />
        )}
      </div>
    </MainLayout>
  );
};
