// src/pages/Catalog.jsx
import { useState, useMemo } from 'react';
import { useSearchParams } from 'react-router-dom';
import { Search, SlidersHorizontal, X } from 'lucide-react';
import { useApp } from '../context/AppContext';
import ProductCard from '../components/shared/ProductCard';
import { categories } from '../data/products';

export default function Catalog() {
  const { products } = useApp();
  const [searchParams] = useSearchParams();
  const initCat = searchParams.get('cat') === 'new' ? 'New' : 'All';

  const [search, setSearch] = useState('');
  const [selectedCat, setSelectedCat] = useState(initCat);
  const [sortBy, setSortBy] = useState('default');
  const [showFilters, setShowFilters] = useState(false);

  const filtered = useMemo(() => {
    let list = [...products];
    if (selectedCat === 'New') list = list.filter(p => p.badge === 'NEW');
    else if (selectedCat !== 'All') list = list.filter(p => p.category === selectedCat);
    if (search) list = list.filter(p => p.name.toLowerCase().includes(search.toLowerCase()));
    if (sortBy === 'price-asc') list.sort((a, b) => a.price - b.price);
    if (sortBy === 'price-desc') list.sort((a, b) => b.price - a.price);
    if (sortBy === 'name') list.sort((a, b) => a.name.localeCompare(b.name));
    return list;
  }, [products, selectedCat, search, sortBy]);

  return (
    <div className="max-w-7xl mx-auto px-4 py-10 min-h-screen">
      {/* Header */}
      <div className="flex flex-col md:flex-row md:items-end justify-between gap-4 mb-8">
        <div>
          <div className="text-xs font-mono-custom text-[#C6F135] uppercase tracking-widest mb-1">Collection</div>
          <h1 className="font-display text-6xl text-white">CATALOG</h1>
          <div className="text-gray-500 text-sm mt-1">{filtered.length} products</div>
        </div>
        <div className="flex items-center gap-3">
          <div className="relative">
            <Search size={14} className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-500" />
            <input
              value={search}
              onChange={e => setSearch(e.target.value)}
              placeholder="Search products..."
              className="pl-9 pr-4 py-2 text-xs rounded-sm w-48 md:w-64"
            />
            {search && <button onClick={() => setSearch('')} className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-500"><X size={12} /></button>}
          </div>
          <select value={sortBy} onChange={e => setSortBy(e.target.value)} className="px-3 py-2 text-xs rounded-sm">
            <option value="default">Default</option>
            <option value="price-asc">Price: Low to High</option>
            <option value="price-desc">Price: High to Low</option>
            <option value="name">Name A-Z</option>
          </select>
          <button onClick={() => setShowFilters(!showFilters)} className="md:hidden btn-outline p-2 rounded-sm">
            <SlidersHorizontal size={16} />
          </button>
        </div>
      </div>

      <div className="flex gap-8">
        {/* Sidebar filters */}
        <aside className={`${showFilters ? 'block' : 'hidden'} md:block w-48 flex-shrink-0`}>
          <div className="sticky top-20">
            <div className="text-xs font-mono-custom uppercase tracking-widest text-[#C6F135] mb-4">Categories</div>
            {[...categories, 'New'].map(cat => (
              <button
                key={cat}
                onClick={() => setSelectedCat(cat)}
                className={`block w-full text-left px-3 py-2 text-sm mb-1 rounded-sm transition-all font-mono-custom
                  ${selectedCat === cat ? 'bg-[#C6F135] text-black font-bold' : 'text-gray-400 hover:text-white hover:bg-[#1a1a1a]'}`}
              >
                {cat}
              </button>
            ))}
          </div>
        </aside>

        {/* Grid */}
        <div className="flex-1">
          {filtered.length === 0 ? (
            <div className="text-center py-20 text-gray-500">
              <div className="font-display text-4xl mb-2">NO PRODUCTS FOUND</div>
              <div className="text-sm">Try a different search or filter</div>
            </div>
          ) : (
            <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-1">
              {filtered.map(p => <ProductCard key={p.id} product={p} />)}
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
