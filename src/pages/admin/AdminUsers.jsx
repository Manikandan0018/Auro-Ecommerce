// src/pages/admin/AdminUsers.jsx
import { useApp } from '../../context/AppContext';

export default function AdminUsers() {
  const { getAllUsers, getAllOrders } = useApp();
  const users = getAllUsers();
  const orders = getAllOrders();

  const getUserOrderCount = (userId) => orders.filter(o => o.userId === userId).length;
  const getUserRevenue = (userId) => orders.filter(o => o.userId === userId).reduce((s, o) => s + o.total, 0);

  return (
    <div>
      <div className="mb-8">
        <div className="text-xs font-mono-custom text-[#C6F135] uppercase tracking-widest mb-1">Members</div>
        <h1 className="font-display text-5xl text-white">USERS</h1>
        <div className="text-gray-500 text-sm mt-1">{users.length} registered users</div>
      </div>

      {users.length === 0 ? (
        <div className="text-center py-16">
          <div className="font-display text-3xl text-gray-600 mb-2">NO USERS YET</div>
          <div className="text-gray-500 text-sm">Users who sign up will appear here</div>
        </div>
      ) : (
        <div className="bg-[#111] border border-[#222] overflow-hidden">
          <div className="overflow-x-auto">
            <table className="w-full text-sm">
              <thead>
                <tr className="border-b border-[#222]">
                  {['User', 'Email', 'Orders', 'Spent', 'Role'].map(h => (
                    <th key={h} className="text-left px-5 py-3 text-[10px] font-mono-custom uppercase tracking-widest text-gray-500">{h}</th>
                  ))}
                </tr>
              </thead>
              <tbody>
                {users.map(user => (
                  <tr key={user.id} className="border-b border-[#1a1a1a] hover:bg-[#1a1a1a] transition-colors">
                    <td className="px-5 py-3">
                      <div className="flex items-center gap-3">
                        <img src={user.avatar} alt="" className="w-8 h-8 rounded-full border border-[#333]" />
                        <span className="text-xs text-white font-medium">{user.name}</span>
                      </div>
                    </td>
                    <td className="px-5 py-3 text-xs text-gray-400 font-mono-custom">{user.email}</td>
                    <td className="px-5 py-3 text-xs text-white font-mono-custom">{getUserOrderCount(user.id)}</td>
                    <td className="px-5 py-3 text-xs text-[#C6F135] font-mono-custom font-bold">${getUserRevenue(user.id).toFixed(2)}</td>
                    <td className="px-5 py-3">
                      <span className={`text-[10px] font-mono-custom px-2 py-0.5 uppercase tracking-widest
                        ${user.role === 'admin' ? 'bg-[#C6F135]/10 text-[#C6F135]' : 'bg-[#222] text-gray-400'}`}>
                        {user.role || 'user'}
                      </span>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      )}
    </div>
  );
}
