import { Routes, Route, Navigate } from 'react-router-dom';
import Login from '../pages/Login';
import Dashboard from '../pages/Dashboard';
import Products from '../pages/Products';
import Customers from '../pages/Customers';
import Prescriptions from '../pages/Prescriptions';
import Orders from '../pages/Orders';
import Reports from '../pages/Reports';
import MainLayout from '../layouts/MainLayout';
import { useAuth } from '../context/AuthContext';

function PrivateRoute({ children }: { children: React.ReactNode }) {
  const { user } = useAuth();
  return user ? <>{children}</> : <Navigate to="/login" replace />;
}

export default function AppRoutes() {
  return (
    <Routes>
      <Route path="/login" element={<Login />} />
      <Route
        path="/"
        element={
          <PrivateRoute>
            <MainLayout />
          </PrivateRoute>
        }
      >
        <Route index element={<Dashboard />} />
        <Route path="products" element={<Products />} />
        <Route path="customers" element={<Customers />} />
        <Route path="prescriptions" element={<Prescriptions />} />
        <Route path="orders" element={<Orders />} />
        <Route path="reports" element={<Reports />} />
      </Route>
      <Route path="*" element={<Navigate to="/" replace />} />
    </Routes>
  );
}
