import React, { useEffect, useState } from 'react';
import { MainLayout } from '../layouts/MainLayout';
import { DataTable } from '../components/DataTable';
import { Button } from '../components/Button';
import { Input } from '../components/Input';
import { Select } from '../components/Select';
import { LoadingSpinner } from '../components/LoadingSpinner';
import { AlertBanner } from '../components/AlertBanner';
import { resourceService } from '../services/resourceService';
import { formatDate, formatNaira } from '../utils/helpers';
import type { Resource } from '../types';

export const ResourcesPage: React.FC = () => {
  const [resources, setResources] = useState<Resource[]>([]);
  const [loading, setLoading] = useState(true);
  const [showForm, setShowForm] = useState(false);
  const [formData, setFormData] = useState({
    name: '',
    category: '',
    quantity: '',
    unit: '',
    cost_per_unit: '',
  });
  const [submitting, setSubmitting] = useState(false);

  const lowStockThreshold = 100; // Define threshold for low stock
  const lowStockItems = resources.filter(r => r.quantity < lowStockThreshold);

  useEffect(() => {
    fetchResources();
  }, []);

  const fetchResources = async () => {
    try {
      setLoading(true);
      const data = await resourceService.getAll();
      setResources(data);
    } catch (error) {
      console.error('Error fetching resources:', error);
    } finally {
      setLoading(false);
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    const quantity = parseFloat(formData.quantity);
    const costPerUnit = parseFloat(formData.cost_per_unit);

    if (isNaN(quantity) || quantity < 0 || isNaN(costPerUnit) || costPerUnit < 0) {
      alert('Please enter valid numbers for quantity and cost');
      return;
    }

    try {
      setSubmitting(true);
      await resourceService.create({
        name: formData.name,
        category: formData.category as 'nylon' | 'chemical' | 'fuel' | 'other',
        quantity,
        unit: formData.unit,
        cost_per_unit: costPerUnit,
        last_restocked: new Date().toISOString().split('T')[0],
      });

      setFormData({
        name: '',
        category: '',
        quantity: '',
        unit: '',
        cost_per_unit: '',
      });
      setShowForm(false);
      fetchResources();
    } catch (error) {
      console.error('Error creating resource:', error);
      alert('Failed to add resource');
    } finally {
      setSubmitting(false);
    }
  };

  const categoryOptions = [
    { value: 'nylon', label: 'Nylon' },
    { value: 'chemical', label: 'Chemicals' },
    { value: 'fuel', label: 'Fuel' },
    { value: 'other', label: 'Other' },
  ];

  const columns = [
    { key: 'name', header: 'Resource Name' },
    { key: 'category', header: 'Category' },
    { 
      key: 'quantity', 
      header: 'Quantity', 
      render: (row: Resource) => (
        <span className={row.quantity < lowStockThreshold ? 'text-red-600 font-bold' : ''}>
          {row.quantity} {row.unit}
          {row.quantity < lowStockThreshold && ' ⚠️'}
        </span>
      )
    },
    { 
      key: 'cost_per_unit', 
      header: 'Cost Per Unit', 
      render: (row: Resource) => formatNaira(row.cost_per_unit) 
    },
    { 
      key: 'last_restocked', 
      header: 'Last Restocked', 
      render: (row: Resource) => formatDate(row.last_restocked) 
    },
  ];

  return (
    <MainLayout>
      <div className="space-y-6">
        <div className="flex justify-between items-center">
          <h1 className="text-3xl font-bold text-gray-900">Resources & Inventory</h1>
          <Button onClick={() => setShowForm(!showForm)}>
            {showForm ? 'Cancel' : 'Add Resource'}
          </Button>
        </div>

        {/* Low Stock Alert */}
        {lowStockItems.length > 0 && (
          <AlertBanner
            type="warning"
            title="Low Stock Alert!"
            message={`${lowStockItems.length} item(s) are running low: ${lowStockItems.map(i => i.name).join(', ')}. Please restock soon to avoid production delays.`}
          />
        )}

        {showForm && (
          <div className="bg-white p-6 rounded-lg shadow-md">
            <h2 className="text-xl font-semibold mb-4">Add New Resource</h2>
            <form onSubmit={handleSubmit} className="space-y-4">
              <Input
                label="Resource Name"
                value={formData.name}
                onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                required
                placeholder="e.g., Sachet Film Roll"
              />
              <Select
                label="Category"
                options={categoryOptions}
                value={formData.category}
                onChange={(e: React.ChangeEvent<HTMLSelectElement>) => setFormData({ ...formData, category: e.target.value })}
                required
              />
              <Input
                label="Quantity"
                type="number"
                min="0"
                step="0.01"
                value={formData.quantity}
                onChange={(e) => setFormData({ ...formData, quantity: e.target.value })}
                required
                placeholder="Enter quantity"
              />
              <Input
                label="Unit"
                value={formData.unit}
                onChange={(e) => setFormData({ ...formData, unit: e.target.value })}
                required
                placeholder="e.g., kg, liters, rolls"
              />
              <Input
                label="Cost Per Unit"
                type="number"
                min="0"
                step="0.01"
                value={formData.cost_per_unit}
                onChange={(e) => setFormData({ ...formData, cost_per_unit: e.target.value })}
                required
                placeholder="Enter cost per unit"
              />
              <Button type="submit" loading={submitting}>
                Add Resource
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
            data={resources}
            columns={columns}
            emptyMessage="No resources found. Start by adding your first resource!"
          />
        )}
      </div>
    </MainLayout>
  );
};
