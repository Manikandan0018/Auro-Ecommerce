// src/pages/admin/AdminLayout.jsx
import { Link, Outlet, useLocation, Navigate } from 'react-router-dom';
import { LayoutDashboard, Package, ShoppingBag, Users, Diamond, LogOut } from 'lucide-react';
import { useApp } from '../../context/AppContext';

const navItems = [
  { to: '/admin', label: 'Dashboard', icon: LayoutDashboard, exact: true },
  { to: '/admin/products', label: 'Products', icon: Package },
  { to: '/admin/orders', label: 'Orders', icon: ShoppingBag },
  { to: '/admin/users', label: 'Users', icon: Users },
];

export default function AdminLayout() {
  const { currentUser, logout } = useApp();
  const location = useLocation();

  if (!currentUser || currentUser.role !== 'admin') return <Navigate to="/login" />;

  return (
    <div className="flex min-h-screen bg-[#0a0a0a]">
      {/* Sidebar */}
      <aside className="w-56 bg-[#0d0d0d] border-r border-[#1a1a1a] flex flex-col fixed h-full z-40 hidden md:flex">
        <div className="p-5 border-b border-[#1a1a1a]">
          <Link to="/" className="flex items-center gap-2">
            <Diamond size={16} className="text-[#C6F135]" />
            <span className="font-display text-xl tracking-widest text-white">COLLUSION</span>
          </Link>
          <div className="text-[10px] font-mono-custom text-gray-600 mt-1 uppercase tracking-widest">Admin Panel</div>
        </div>

        <nav className="flex-1 p-3 space-y-1">
          {navItems.map(item => {
            const active = item.exact ? location.pathname === item.to : location.pathname.startsWith(item.to) && item.to !== '/admin';
            const exactActive = item.exact && location.pathname === item.to;
            const isActive = exactActive || (!item.exact && location.pathname.startsWith(item.to));
            return (
              <Link key={item.to} to={item.to}
                className={`flex items-center gap-3 px-3 py-2.5 rounded-sm text-xs font-mono-custom uppercase tracking-widest transition-all
                  ${isActive ? 'bg-[#C6F135] text-black font-bold' : 'text-gray-400 hover:text-white hover:bg-[#1a1a1a]'}`}>
                <item.icon size={14} />
                {item.label}
              </Link>
            );
          })}
        </nav>

        <div className="p-3 border-t border-[#1a1a1a]">
          <div className="flex items-center gap-3 p-2 mb-2">
            <img src={currentUser.avatar} alt="" className="w-7 h-7 rounded-full border border-[#333]" />
            <div className="min-w-0">
              <div className="text-xs text-white truncate">{currentUser.name}</div>
              <div className="text-[10px] text-gray-600">Admin</div>
            </div>
          </div>
          <button onClick={() => { logout(); window.location.href = '/'; }}
            className="flex items-center gap-2 px-3 py-2 text-xs font-mono-custom text-red-400 hover:bg-red-400/10 w-full rounded-sm transition-colors uppercase tracking-widest">
            <LogOut size={13} /> Logout
          </button>
        </div>
      </aside>

      {/* Mobile top bar */}
      <div className="md:hidden fixed top-0 left-0 right-0 z-50 bg-[#0d0d0d] border-b border-[#1a1a1a] px-4 py-3 flex items-center justify-between">
        <div className="flex items-center gap-2">
          <Diamond size={16} className="text-[#C6F135]" />
          <span className="font-display text-lg tracking-widest">ADMIN</span>
        </div>
        <div className="flex items-center gap-3">
          {navItems.map(item => (
            <Link key={item.to} to={item.to}
              className={`p-1.5 rounded-sm transition-colors ${location.pathname === item.to ? 'text-[#C6F135]' : 'text-gray-500'}`}>
              <item.icon size={16} />
            </Link>
          ))}
        </div>
      </div>

      {/* Content */}
      <main className="flex-1 md:ml-56 p-6 pt-16 md:pt-6 min-h-screen">
        <Outlet />
      </main>
    </div>
  );
}
