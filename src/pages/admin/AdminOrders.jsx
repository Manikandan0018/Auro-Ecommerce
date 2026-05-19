// src/pages/admin/AdminOrders.jsx
import { useState } from 'react';
import { useApp } from '../../context/AppContext';

const STATUSES = ['Processing', 'Shipped', 'Delivered', 'Cancelled'];
const statusColor = {
  Processing: 'text-yellow-400 bg-yellow-400/10 border-yellow-400/20',
  Shipped: 'text-blue-400 bg-blue-400/10 border-blue-400/20',
  Delivered: 'text-green-400 bg-green-400/10 border-green-400/20',
  Cancelled: 'text-red-400 bg-red-400/10 border-red-400/20',
};

export default function AdminOrders() {
  const { getAllOrders, updateOrderStatus } = useApp();
  const orders = getAllOrders();
  const [expanded, setExpanded] = useState(null);
  const [filter, setFilter] = useState('All');
  const [search, setSearch] = useState('');

  const filtered = orders.filter(o => {
    const matchStatus = filter === 'All' || o.status === filter;
    const matchSearch = !search || o.id.toLowerCase().includes(search.toLowerCase()) || (o.userEmail || '').toLowerCase().includes(search.toLowerCase());
    return matchStatus && matchSearch;
  });

  return (
    <div>
      <div className="mb-8">
        <div className="text-xs font-mono-custom text-[#C6F135] uppercase tracking-widest mb-1">Management</div>
        <h1 className="font-display text-5xl text-white">ORDERS</h1>
        <div className="text-gray-500 text-sm mt-1">{orders.length} total orders</div>
      </div>

      {/* Filters */}
      <div className="flex flex-wrap gap-3 mb-6">
        <input value={search} onChange={e => setSearch(e.target.value)} placeholder="Search by order ID or email..."
          className="px-4 py-2 text-xs rounded-sm w-60" />
        {['All', ...STATUSES].map(s => (
          <button key={s} onClick={() => setFilter(s)}
            className={`px-3 py-1.5 text-xs font-mono-custom uppercase tracking-widest rounded-sm transition-colors
              ${filter === s ? 'bg-[#C6F135] text-black font-bold' : 'border border-[#333] text-gray-400 hover:border-[#C6F135] hover:text-white'}`}>
            {s}
          </button>
        ))}
      </div>

      {filtered.length === 0 ? (
        <div className="text-center py-16 text-gray-500 font-mono-custom">No orders found</div>
      ) : (
        <div className="space-y-2">
          {filtered.map(order => (
            <div key={order.id} className="bg-[#111] border border-[#222] overflow-hidden">
              <button
                onClick={() => setExpanded(expanded === order.id ? null : order.id)}
                className="w-full flex flex-wrap items-center gap-4 p-4 text-left hover:bg-[#1a1a1a] transition-colors"
              >
                <div className="flex-1 min-w-0">
                  <div className="font-mono-custom text-xs text-white">{order.id}</div>
                  <div className="text-[10px] text-gray-500 mt-0.5">{order.userName} • {order.userEmail}</div>
                  <div className="text-[10px] text-gray-600 mt-0.5">{new Date(order.date).toLocaleString()}</div>
                </div>
                <div className="text-xs text-gray-400">{order.items?.length} items</div>
                <div className={`text-[10px] font-mono-custom px-2 py-1 border uppercase tracking-widest ${statusColor[order.status] || 'text-gray-400 bg-gray-400/10'}`}>
                  {order.status}
                </div>
                <div className="font-mono-custom text-sm font-bold text-[#C6F135]">${order.total.toFixed(2)}</div>
                <div className="text-gray-500">{expanded === order.id ? '−' : '+'}</div>
              </button>

              {expanded === order.id && (
                <div className="border-t border-[#222] p-5 animate-fade-in">
                  <div className="grid md:grid-cols-3 gap-6">
                    {/* Items */}
                    <div>
                      <div className="text-[10px] font-mono-custom uppercase tracking-widest text-gray-500 mb-3">Items</div>
                      <div className="space-y-2">
                        {order.items?.map(item => (
                          <div key={item.id} className="flex gap-2">
                            <img src={item.image} alt="" className="w-10 h-12 object-cover" />
                            <div>
                              <div className="text-xs text-white leading-tight">{item.name}</div>
                              <div className="text-[10px] text-gray-500">× {item.qty} — ${(item.price * item.qty).toFixed(2)}</div>
                            </div>
                          </div>
                        ))}
                      </div>
                    </div>

                    {/* Shipping */}
                    <div>
                      <div className="text-[10px] font-mono-custom uppercase tracking-widest text-gray-500 mb-3">Shipping</div>
                      <div className="text-xs text-gray-300 leading-relaxed space-y-0.5">
                        <div>{order.address?.name}</div>
                        <div>{order.address?.street}</div>
                        <div>{order.address?.city}, {order.address?.zip}</div>
                        <div>{order.address?.country}</div>
                        <div className="text-gray-500 pt-1">{order.address?.phone}</div>
                      </div>
                    </div>

                    {/* Status control */}
                    <div>
                      <div className="text-[10px] font-mono-custom uppercase tracking-widest text-gray-500 mb-3">Update Status</div>
                      <div className="space-y-2">
                        {STATUSES.map(s => (
                          <button key={s}
                            onClick={() => updateOrderStatus(order.id, s)}
                            className={`w-full py-2 text-xs font-mono-custom uppercase tracking-widest rounded-sm border transition-colors
                              ${order.status === s ? 'bg-[#C6F135] text-black border-[#C6F135] font-bold' : 'border-[#333] text-gray-400 hover:border-[#C6F135] hover:text-white'}`}>
                            {s}
                          </button>
                        ))}
                      </div>
                    </div>
                  </div>
                </div>
              )}
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
