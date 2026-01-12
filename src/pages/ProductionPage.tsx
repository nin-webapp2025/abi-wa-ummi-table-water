import React, { useEffect, useState } from 'react';
import { MainLayout } from '../layouts/MainLayout';
import { DataTable } from '../components/DataTable';
import { Button } from '../components/Button';
import { Input } from '../components/Input';
import { LoadingSpinner } from '../components/LoadingSpinner';
import { productionService } from '../services/productionService';
import { useAuth } from '../hooks/useAuth';
import { formatDate, getTodayDate } from '../utils/helpers';
import type { Production } from '../types';

export const ProductionPage: React.FC = () => {
  const [productions, setProductions] = useState<Production[]>([]);
  const [loading, setLoading] = useState(true);
  const [showForm, setShowForm] = useState(false);
  const [formData, setFormData] = useState({
    date: getTodayDate(),
    bags_produced: '',
    notes: '',
  });
  const [submitting, setSubmitting] = useState(false);

  const { user } = useAuth();

  useEffect(() => {
    fetchProductions();
  }, []);

  const fetchProductions = async () => {
    try {
      setLoading(true);
      const data = await productionService.getAll();
      setProductions(data);
    } catch (error) {
      console.error('Error fetching productions:', error);
    } finally {
      setLoading(false);
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!user) return;

    const bagsProduced = parseInt(formData.bags_produced);
    if (isNaN(bagsProduced) || bagsProduced < 0) {
      alert('Please enter a valid number of bags');
      return;
    }

    try {
      setSubmitting(true);
      await productionService.create({
        date: formData.date,
        bags_produced: bagsProduced,
        staff_id: user.id,
        notes: formData.notes || undefined,
      });

      setFormData({
        date: getTodayDate(),
        bags_produced: '',
        notes: '',
      });
      setShowForm(false);
      fetchProductions();
    } catch (error) {
      console.error('Error creating production record:', error);
      alert('Failed to record production');
    } finally {
      setSubmitting(false);
    }
  };

  const columns = [
    { key: 'date', header: 'Date', render: (row: Production) => formatDate(row.date) },
    { key: 'bags_produced', header: 'Bags Produced' },
    { key: 'staff_name', header: 'Recorded By' },
    { key: 'notes', header: 'Notes' },
  ];

  return (
    <MainLayout>
      <div className="space-y-6">
        <div className="flex justify-between items-center">
          <h1 className="text-3xl font-bold text-gray-900">Production Records</h1>
          <Button onClick={() => setShowForm(!showForm)}>
            {showForm ? 'Cancel' : 'Record Production'}
          </Button>
        </div>

        {showForm && (
          <div className="bg-white p-6 rounded-lg shadow-md">
            <h2 className="text-xl font-semibold mb-4">Record New Production</h2>
            <form onSubmit={handleSubmit} className="space-y-4">
              <Input
                label="Date"
                type="date"
                value={formData.date}
                onChange={(e) => setFormData({ ...formData, date: e.target.value })}
                required
              />
              <Input
                label="Bags Produced"
                type="number"
                min="0"
                value={formData.bags_produced}
                onChange={(e) => setFormData({ ...formData, bags_produced: e.target.value })}
                required
                placeholder="Enter number of bags produced"
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
            data={productions}
            columns={columns}
            emptyMessage="No production records found. Start by recording your first production!"
          />
        )}
      </div>
    </MainLayout>
  );
};
