import React from 'react';
import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';
import { AuthProvider } from './context/AuthContext';
import { ProtectedRoute } from './layouts/ProtectedRoute';
import { LoginPage } from './pages/LoginPage';
import { DashboardPage } from './pages/DashboardPage';
import { ProductionPage } from './pages/ProductionPage';
import { SalesPage } from './pages/SalesPage';
import { RevenuePage } from './pages/RevenuePage';
import { ResourcesPage } from './pages/ResourcesPage';
import { SettingsPage } from './pages/SettingsPage';

function App() {
  return (
    <AuthProvider>
      <BrowserRouter>
        <Routes>
          <Route path="/login" element={<LoginPage />} />
          
          <Route
            path="/dashboard"
            element={
              <ProtectedRoute allowedRoles={['Admin', 'Staff', 'Viewer']}>
                <DashboardPage />
              </ProtectedRoute>
            }
          />
          
          <Route
            path="/production"
            element={
              <ProtectedRoute allowedRoles={['Admin', 'Staff']}>
                <ProductionPage />
              </ProtectedRoute>
            }
          />
          
          <Route
            path="/sales"
            element={
              <ProtectedRoute allowedRoles={['Admin', 'Staff']}>
                <SalesPage />
              </ProtectedRoute>
            }
          />
          
          <Route
            path="/revenue"
            element={
              <ProtectedRoute allowedRoles={['Admin', 'Viewer']}>
                <RevenuePage />
              </ProtectedRoute>
            }
          />
          
          <Route
            path="/resources"
            element={
              <ProtectedRoute allowedRoles={['Admin', 'Staff']}>
                <ResourcesPage />
              </ProtectedRoute>
            }
          />
          
          <Route
            path="/settings"
            element={
              <ProtectedRoute allowedRoles={['Admin', 'Staff', 'Viewer']}>
                <SettingsPage />
              </ProtectedRoute>
            }
          />
          
          <Route path="/" element={<Navigate to="/dashboard" replace />} />
          <Route path="*" element={<Navigate to="/dashboard" replace />} />
        </Routes>
      </BrowserRouter>
    </AuthProvider>
  );
}

export default App;
