import { MainLayout } from '../layouts/MainLayout';
import { useAuth } from '../hooks/useAuth';

export const SettingsPage: React.FC = () => {
  const { user } = useAuth();

  return (
    <MainLayout>
      <div className="space-y-6">
        <h1 className="text-3xl font-bold text-gray-900">Settings</h1>

        <div className="bg-white p-6 rounded-lg shadow-md">
          <h2 className="text-xl font-semibold mb-4">User Profile</h2>
          <div className="space-y-3">
            <div>
              <span className="font-medium text-gray-700">Name:</span>
              <span className="ml-2 text-gray-900">{user?.full_name}</span>
            </div>
            <div>
              <span className="font-medium text-gray-700">Email:</span>
              <span className="ml-2 text-gray-900">{user?.email}</span>
            </div>
            <div>
              <span className="font-medium text-gray-700">Role:</span>
              <span className="ml-2 text-gray-900">{user?.role}</span>
            </div>
          </div>
        </div>

        <div className="bg-white p-6 rounded-lg shadow-md">
          <h2 className="text-xl font-semibold mb-4">About</h2>
          <p className="text-gray-700">
            Abi wa Ummi Table Water Management System
          </p>
          <p className="text-gray-600 text-sm mt-2">
            Version 1.0.0
          </p>
        </div>
      </div>
    </MainLayout>
  );
};
