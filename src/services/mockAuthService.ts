import type { User } from '../types';

// Mock user data for demo
const MOCK_USERS = {
  admin: {
    id: '1',
    email: 'admin@abiwaumi.com',
    full_name: 'Admin User',
    role: 'Admin' as const,
    created_at: new Date().toISOString(),
    updated_at: new Date().toISOString(),
  },
  staff: {
    id: '2',
    email: 'staff@abiwaumi.com',
    full_name: 'Staff Member',
    role: 'Staff' as const,
    created_at: new Date().toISOString(),
    updated_at: new Date().toISOString(),
  },
  viewer: {
    id: '3',
    email: 'viewer@abiwaumi.com',
    full_name: 'Viewer User',
    role: 'Viewer' as const,
    created_at: new Date().toISOString(),
    updated_at: new Date().toISOString(),
  },
};

// Demo mode - accepts any password
export const mockAuthService = {
  async signIn(email: string, _password: string) {
    // Simulate API delay
    await new Promise(resolve => setTimeout(resolve, 500));
    
    // Find user by email or default to admin
    const user = Object.values(MOCK_USERS).find(u => u.email === email) || MOCK_USERS.admin;
    
    return { user, session: { user } };
  },

  async signOut() {
    await new Promise(resolve => setTimeout(resolve, 200));
  },

  async getSession() {
    // Return admin session by default for demo
    return { user: MOCK_USERS.admin };
  },

  async getUserProfile(_userId: string): Promise<User | null> {
    await new Promise(resolve => setTimeout(resolve, 100));
    return MOCK_USERS.admin;
  },

  onAuthStateChange(callback: (user: User | null) => void) {
    // Immediately call with admin user
    setTimeout(() => callback(MOCK_USERS.admin), 0);
    return { data: { subscription: { unsubscribe: () => {} } } };
  },
};
