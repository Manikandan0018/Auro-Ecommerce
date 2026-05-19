// src/pages/Wishlist.jsx
import { Link } from 'react-router-dom';
import { Heart } from 'lucide-react';
import { useApp } from '../context/AppContext';
import ProductCard from '../components/shared/ProductCard';

export default function Wishlist() {
  const { wishlist } = useApp();

  return (
    <div className="max-w-7xl mx-auto px-4 py-10 min-h-screen">
      <div className="flex items-end justify-between mb-10">
        <div>
          <div className="text-xs font-mono-custom text-[#C6F135] uppercase tracking-widest mb-1">Saved Items</div>
          <h1 className="font-display text-5xl text-white">WISHLIST</h1>
        </div>
        <div className="text-gray-400 text-sm font-mono-custom">{wishlist.length} items</div>
      </div>

      {wishlist.length === 0 ? (
        <div className="text-center py-20">
          <Heart size={48} className="mx-auto text-gray-700 mb-4" />
          <div className="font-display text-4xl text-gray-600 mb-4">NO SAVED ITEMS</div>
          <p className="text-gray-500 text-sm mb-8">Tap the heart on any product to save it here</p>
          <Link to="/catalog" className="btn-lime px-6 py-3 text-xs font-mono-custom uppercase tracking-widest inline-block">
            Browse Catalog
          </Link>
        </div>
      ) : (
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-1">
          {wishlist.map(p => <ProductCard key={p.id} product={p} />)}
        </div>
      )}
    </div>
  );
}
