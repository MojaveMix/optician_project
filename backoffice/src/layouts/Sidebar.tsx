import { Link, useLocation } from 'react-router-dom';
import {
  LayoutDashboard,
  Package,
  Users,
  FileText,
  ShoppingCart,
  BarChart3,
  Eye,
} from 'lucide-react';

const menuItems = [
  { path: '/', label: 'Dashboard', icon: LayoutDashboard },
  { path: '/products', label: 'Products', icon: Package },
  { path: '/customers', label: 'Customers', icon: Users },
  { path: '/prescriptions', label: 'Prescriptions', icon: FileText },
  { path: '/orders', label: 'Orders', icon: ShoppingCart },
  { path: '/reports', label: 'Reports', icon: BarChart3 },
];

export default function Sidebar() {
  const location = useLocation();

  return (
    <aside className="w-64 bg-[#1E3A8A] text-white min-h-screen fixed left-0 top-0">
      <div className="p-6 border-b border-blue-700">
        <div className="flex items-center gap-3">
          <Eye className="w-8 h-8" />
          <div>
            <h1 className="text-xl font-bold">OptiVision</h1>
            <p className="text-xs text-blue-200">Management System</p>
          </div>
        </div>
      </div>
      <nav className="p-4">
        <ul className="space-y-2">
          {menuItems.map((item) => {
            const Icon = item.icon;
            const isActive = location.pathname === item.path;
            return (
              <li key={item.path}>
                <Link
                  to={item.path}
                  className={`flex items-center gap-3 px-4 py-3 rounded-lg transition-colors ${
                    isActive
                      ? 'bg-blue-700 text-white'
                      : 'text-blue-100 hover:bg-blue-800'
                  }`}
                >
                  <Icon className="w-5 h-5" />
                  <span className="font-medium">{item.label}</span>
                </Link>
              </li>
            );
          })}
        </ul>
      </nav>
    </aside>
  );
}
