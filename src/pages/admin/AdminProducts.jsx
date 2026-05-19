// src/pages/admin/AdminProducts.jsx
import { useState } from 'react';
import { Plus, Pencil, Trash2, X, Check } from 'lucide-react';
import { useApp } from '../../context/AppContext';
import { categories } from '../../data/products';

const emptyForm = { name: '', price: '', category: 'Tops', image: '', description: '', stock: '', badge: '' };

export default function AdminProducts() {
  const { products, addProduct, updateProduct, deleteProduct } = useApp();
  const [showForm, setShowForm] = useState(false);
  const [editId, setEditId] = useState(null);
  const [form, setForm] = useState(emptyForm);
  const [confirmDel, setConfirmDel] = useState(null);
  const [search, setSearch] = useState('');

  const filtered = products.filter(p => p.name.toLowerCase().includes(search.toLowerCase()));

  const openAdd = () => { setForm(emptyForm); setEditId(null); setShowForm(true); };
  const openEdit = (p) => { setForm({ ...p, price: p.price.toString(), stock: p.stock.toString() }); setEditId(p.id); setShowForm(true); };
  const closeForm = () => { setShowForm(false); setEditId(null); };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (editId) updateProduct(editId, form);
    else addProduct(form);
    closeForm();
  };

  const handleDelete = (id) => {
    deleteProduct(id);
    setConfirmDel(null);
  };

  return (
    <div>
      <div className="flex items-end justify-between mb-8">
        <div>
          <div className="text-xs font-mono-custom text-[#C6F135] uppercase tracking-widest mb-1">Inventory</div>
          <h1 className="font-display text-5xl text-white">PRODUCTS</h1>
        </div>
        <button onClick={openAdd} className="btn-lime px-4 py-2.5 text-xs font-mono-custom uppercase tracking-widest flex items-center gap-2">
          <Plus size={14} /> Add Product
        </button>
      </div>

      {/* Search */}
      <div className="mb-4">
        <input value={search} onChange={e => setSearch(e.target.value)} placeholder="Search products..."
          className="px-4 py-2.5 text-sm rounded-sm w-full md:w-72" />
      </div>

      {/* Table */}
      <div className="bg-[#111] border border-[#222] overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full text-sm">
            <thead>
              <tr className="border-b border-[#222]">
                {['Product', 'Category', 'Price', 'Stock', 'Badge', 'Actions'].map(h => (
                  <th key={h} className="text-left px-5 py-3 text-[10px] font-mono-custom uppercase tracking-widest text-gray-500">{h}</th>
                ))}
              </tr>
            </thead>
            <tbody>
              {filtered.map(p => (
                <tr key={p.id} className="border-b border-[#1a1a1a] hover:bg-[#1a1a1a] transition-colors">
                  <td className="px-5 py-3">
                    <div className="flex items-center gap-3">
                      <img src={p.image} alt="" className="w-10 h-12 object-cover flex-shrink-0" />
                      <div>
                        <div className="font-medium text-white text-xs">{p.name}</div>
                        <div className="text-[10px] text-gray-600 mt-0.5">ID: {p.id}</div>
                      </div>
                    </div>
                  </td>
                  <td className="px-5 py-3 text-xs text-gray-400 font-mono-custom">{p.category}</td>
                  <td className="px-5 py-3 text-xs text-[#C6F135] font-mono-custom font-bold">${p.price.toFixed(2)}</td>
                  <td className="px-5 py-3">
                    <span className={`text-xs font-mono-custom ${p.stock <= 5 ? 'text-orange-400' : 'text-green-400'}`}>{p.stock}</span>
                  </td>
                  <td className="px-5 py-3">
                    {p.badge && <span className="text-[10px] font-mono-custom bg-[#C6F135]/10 text-[#C6F135] px-2 py-0.5">{p.badge}</span>}
                  </td>
                  <td className="px-5 py-3">
                    <div className="flex items-center gap-2">
                      <button onClick={() => openEdit(p)} className="p-1.5 hover:bg-[#222] rounded transition-colors text-gray-400 hover:text-[#C6F135]">
                        <Pencil size={13} />
                      </button>
                      {confirmDel === p.id ? (
                        <div className="flex items-center gap-1">
                          <button onClick={() => handleDelete(p.id)} className="p-1.5 bg-red-500/20 text-red-400 rounded hover:bg-red-500/40 transition-colors"><Check size={13} /></button>
                          <button onClick={() => setConfirmDel(null)} className="p-1.5 hover:bg-[#222] rounded transition-colors text-gray-500"><X size={13} /></button>
                        </div>
                      ) : (
                        <button onClick={() => setConfirmDel(p.id)} className="p-1.5 hover:bg-red-500/20 rounded transition-colors text-gray-400 hover:text-red-400">
                          <Trash2 size={13} />
                        </button>
                      )}
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      {/* Modal */}
      {showForm && (
        <div className="fixed inset-0 bg-black/80 z-50 flex items-center justify-center p-4">
          <div className="bg-[#111] border border-[#333] w-full max-w-lg max-h-[90vh] overflow-y-auto animate-fade-in">
            <div className="flex items-center justify-between p-5 border-b border-[#222]">
              <div className="font-display text-2xl">{editId ? 'EDIT PRODUCT' : 'ADD PRODUCT'}</div>
              <button onClick={closeForm} className="text-gray-500 hover:text-white"><X size={18} /></button>
            </div>
            <form onSubmit={handleSubmit} className="p-5 space-y-4">
              {[
                { key: 'name', label: 'Product Name', type: 'text' },
                { key: 'price', label: 'Price ($)', type: 'number', step: '0.01' },
                { key: 'stock', label: 'Stock Qty', type: 'number' },
                { key: 'image', label: 'Image URL', type: 'url' },
              ].map(f => (
                <div key={f.key}>
                  <label className="text-[10px] font-mono-custom uppercase tracking-widest text-gray-400 block mb-1.5">{f.label}</label>
                  <input type={f.type} step={f.step} value={form[f.key]} onChange={e => setForm({...form, [f.key]: e.target.value})}
                    required className="w-full px-4 py-2.5 text-sm rounded-sm" />
                </div>
              ))}
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="text-[10px] font-mono-custom uppercase tracking-widest text-gray-400 block mb-1.5">Category</label>
                  <select value={form.category} onChange={e => setForm({...form, category: e.target.value})}
                    className="w-full px-4 py-2.5 text-sm rounded-sm">
                    {categories.filter(c => c !== 'All').map(c => <option key={c}>{c}</option>)}
                  </select>
                </div>
                <div>
                  <label className="text-[10px] font-mono-custom uppercase tracking-widest text-gray-400 block mb-1.5">Badge</label>
                  <select value={form.badge} onChange={e => setForm({...form, badge: e.target.value})}
                    className="w-full px-4 py-2.5 text-sm rounded-sm">
                    {['', 'NEW', 'HOT', 'SALE'].map(b => <option key={b} value={b}>{b || 'None'}</option>)}
                  </select>
                </div>
              </div>
              <div>
                <label className="text-[10px] font-mono-custom uppercase tracking-widest text-gray-400 block mb-1.5">Description</label>
                <textarea value={form.description} onChange={e => setForm({...form, description: e.target.value})}
                  rows={3} className="w-full px-4 py-2.5 text-sm rounded-sm resize-none" />
              </div>
              <div className="flex gap-3 pt-2">
                <button type="button" onClick={closeForm} className="btn-outline px-5 py-2.5 text-xs font-mono-custom uppercase tracking-widest border border-[#333] rounded-sm">Cancel</button>
                <button type="submit" className="flex-1 btn-lime py-2.5 text-xs font-mono-custom uppercase tracking-widest rounded-sm">
                  {editId ? 'Update Product' : 'Add Product'}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}
