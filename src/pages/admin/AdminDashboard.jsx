// src/pages/admin/AdminDashboard.jsx
import { Link } from 'react-router-dom';
import { Package, Users, ShoppingBag, TrendingUp, ArrowRight } from 'lucide-react';
import { useApp } from '../../context/AppContext';

export default function AdminDashboard() {
  const { products, getAllOrders, getAllUsers } = useApp();
  const orders = getAllOrders();
  const users = getAllUsers();

  const totalRevenue = orders.reduce((s, o) => s + o.total, 0);
  const statusCounts = orders.reduce((acc, o) => { acc[o.status] = (acc[o.status] || 0) + 1; return acc; }, {});

  const stats = [
    { icon: Package, label: 'Total Products', value: products.length, color: 'text-blue-400', bg: 'bg-blue-400/10' },
    { icon: ShoppingBag, label: 'Total Orders', value: orders.length, color: 'text-[#C6F135]', bg: 'bg-[#C6F135]/10' },
    { icon: Users, label: 'Registered Users', value: users.length, color: 'text-purple-400', bg: 'bg-purple-400/10' },
    { icon: TrendingUp, label: 'Total Revenue', value: `$${totalRevenue.toFixed(0)}`, color: 'text-green-400', bg: 'bg-green-400/10' },
  ];

  const recentOrders = orders.slice(0, 5);

  return (
    <div>
      <div className="mb-8">
        <div className="text-xs font-mono-custom text-[#C6F135] uppercase tracking-widest mb-1">Overview</div>
        <h1 className="font-display text-5xl text-white">DASHBOARD</h1>
      </div>

      {/* Stats */}
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 mb-8">
        {stats.map(s => (
          <div key={s.label} className={`p-5 bg-[#111] border border-[#222]`}>
            <div className={`w-10 h-10 rounded-sm ${s.bg} flex items-center justify-center mb-3`}>
              <s.icon size={18} className={s.color} />
            </div>
            <div className={`font-display text-3xl ${s.color}`}>{s.value}</div>
            <div className="text-xs font-mono-custom text-gray-500 mt-1 uppercase tracking-widest">{s.label}</div>
          </div>
        ))}
      </div>

      <div className="grid lg:grid-cols-3 gap-6">
        {/* Recent Orders */}
        <div className="lg:col-span-2 bg-[#111] border border-[#222] p-6">
          <div className="flex items-center justify-between mb-5">
            <div className="font-display text-2xl text-white">RECENT ORDERS</div>
            <Link to="/admin/orders" className="text-xs font-mono-custom text-[#C6F135] hover:underline flex items-center gap-1">
              View All <ArrowRight size={12} />
            </Link>
          </div>
          {recentOrders.length === 0 ? (
            <div className="text-gray-500 text-sm text-center py-8">No orders yet</div>
          ) : (
            <div className="space-y-1">
              {recentOrders.map(o => (
                <div key={o.id} className="flex items-center gap-4 py-3 border-b border-[#1a1a1a] last:border-0">
                  <div className="flex-1 min-w-0">
                    <div className="text-xs font-mono-custom text-white">{o.id}</div>
                    <div className="text-[10px] text-gray-500">{o.userName || o.userEmail}</div>
                  </div>
                  <div className={`text-[10px] font-mono-custom px-2 py-0.5 uppercase tracking-wide
                    ${o.status === 'Delivered' ? 'text-green-400 bg-green-400/10' :
                      o.status === 'Shipped' ? 'text-blue-400 bg-blue-400/10' :
                      o.status === 'Cancelled' ? 'text-red-400 bg-red-400/10' : 'text-yellow-400 bg-yellow-400/10'}`}>
                    {o.status}
                  </div>
                  <div className="font-mono-custom text-xs text-white">${o.total.toFixed(2)}</div>
                </div>
              ))}
            </div>
          )}
        </div>

        {/* Order Status Breakdown */}
        <div className="bg-[#111] border border-[#222] p-6">
          <div className="font-display text-2xl text-white mb-5">ORDER STATUS</div>
          {Object.entries(statusCounts).length === 0 ? (
            <div className="text-gray-500 text-sm text-center py-8">No data yet</div>
          ) : (
            <div className="space-y-3">
              {Object.entries(statusCounts).map(([status, count]) => (
                <div key={status}>
                  <div className="flex justify-between text-xs font-mono-custom mb-1">
                    <span className="text-gray-400 uppercase tracking-widest">{status}</span>
                    <span className="text-white">{count}</span>
                  </div>
                  <div className="h-1.5 bg-[#1a1a1a] rounded-full overflow-hidden">
                    <div
                      className="h-full bg-[#C6F135] rounded-full"
                      style={{ width: `${(count / orders.length) * 100}%` }}
                    />
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
