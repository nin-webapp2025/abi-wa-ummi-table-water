import { MOCK_RESOURCES } from './mockData';
import type { Resource } from '../types';

// DEMO MODE: Using mock data
export const resourceService = {
  /**
   * Get all resources
   */
  async getAll(): Promise<Resource[]> {
    await new Promise(resolve => setTimeout(resolve, 300));
    return [...MOCK_RESOURCES];
  },

  /**
   * Get resources by category
   */
  async getByCategory(category: string): Promise<Resource[]> {
    await new Promise(resolve => setTimeout(resolve, 300));
    return MOCK_RESOURCES.filter(r => r.category === category);
  },

  /**
   * Create new resource
   */
  async create(resource: Omit<Resource, 'id' | 'created_at' | 'updated_at'>): Promise<Resource> {
    await new Promise(resolve => setTimeout(resolve, 500));
    const newResource = {
      ...resource,
      id: String(Date.now()),
      created_at: new Date().toISOString(),
      updated_at: new Date().toISOString(),
    };
    MOCK_RESOURCES.push(newResource);
    return newResource;
  },

  /**
   * Update resource
   */
  async update(id: string, updates: Partial<Resource>): Promise<Resource> {
    await new Promise(resolve => setTimeout(resolve, 500));
    const index = MOCK_RESOURCES.findIndex(r => r.id === id);
    if (index === -1) throw new Error('Resource not found');
    MOCK_RESOURCES[index] = {
      ...MOCK_RESOURCES[index],
      ...updates,
      updated_at: new Date().toISOString(),
    };
    return MOCK_RESOURCES[index];
  },

  /**
   * Delete resource
   */
  async delete(id: string): Promise<void> {
    await new Promise(resolve => setTimeout(resolve, 400));
    const index = MOCK_RESOURCES.findIndex(r => r.id === id);
    if (index !== -1) {
      MOCK_RESOURCES.splice(index, 1);
    }
  },
};
