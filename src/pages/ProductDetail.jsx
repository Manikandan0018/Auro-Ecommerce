// src/pages/ProductDetail.jsx
import { useState } from 'react';
import { useParams, Link } from 'react-router-dom';
import { Heart, ShoppingCart, ArrowLeft, Package, RefreshCw, Shield } from 'lucide-react';
import { useApp } from '../context/AppContext';
import ProductCard from '../components/shared/ProductCard';

export default function ProductDetail() {
  const { id } = useParams();
  const { products, addToCart, toggleWishlist, isWishlisted, currentUser } = useApp();
  const [qty, setQty] = useState(1);

  const product = products.find(p => p.id === id);
  if (!product) return (
    <div className="text-center py-32">
      <div className="font-display text-5xl mb-4">PRODUCT NOT FOUND</div>
      <Link to="/catalog" className="btn-lime px-6 py-3 text-xs font-mono-custom uppercase tracking-widest">Back to Catalog</Link>
    </div>
  );

  const related = products.filter(p => p.category === product.category && p.id !== product.id).slice(0, 4);
  const wished = isWishlisted(product.id);

  const handleCart = () => {
    if (!currentUser) { window.location.href = '/login'; return; }
    addToCart(product, qty);
  };

  const handleWishlist = () => {
    if (!currentUser) { window.location.href = '/login'; return; }
    toggleWishlist(product);
  };

  return (
    <div className="max-w-7xl mx-auto px-4 py-10 min-h-screen">
      <Link to="/catalog" className="flex items-center gap-2 text-xs font-mono-custom text-gray-500 hover:text-[#C6F135] transition-colors mb-8 uppercase tracking-widest">
        <ArrowLeft size={14} /> Back to Catalog
      </Link>

      <div className="grid md:grid-cols-2 gap-10 mb-20">
        {/* Image */}
        <div className="relative">
          <div className="aspect-[3/4] overflow-hidden bg-[#1a1a1a]">
            <img src={product.image} alt={product.name} className="w-full h-full object-cover" />
          </div>
          {product.badge && (
            <span className={`absolute top-4 left-4 text-xs font-mono-custom font-bold px-3 py-1 tracking-widest
              ${product.badge === 'SALE' ? 'bg-red-500 text-white' : 'bg-[#C6F135] text-black'}`}>
              {product.badge}
            </span>
          )}
        </div>

        {/* Info */}
        <div className="flex flex-col justify-between py-4">
          <div>
            <div className="text-xs font-mono-custom text-[#C6F135] uppercase tracking-widest mb-2">{product.category}</div>
            <h1 className="font-display text-5xl text-white leading-tight mb-4">{product.name.toUpperCase()}</h1>
            <div className="text-3xl font-mono-custom text-[#C6F135] font-bold mb-6">${product.price.toFixed(2)}</div>
            <p className="text-gray-400 text-sm leading-relaxed mb-8">{product.description}</p>

            {/* Stock */}
            <div className={`text-xs font-mono-custom mb-6 ${product.stock <= 5 ? 'text-orange-400' : 'text-green-400'}`}>
              {product.stock > 0 ? `✓ ${product.stock} in stock` : '✗ OUT OF STOCK'}
            </div>

            {/* Qty */}
            <div className="flex items-center gap-4 mb-6">
              <div className="text-xs font-mono-custom uppercase tracking-widest text-gray-400">Quantity</div>
              <div className="flex items-center border border-[#333]">
                <button onClick={() => setQty(Math.max(1, qty - 1))} className="px-3 py-2 hover:bg-[#222] transition-colors text-sm">−</button>
                <span className="px-4 text-sm font-mono-custom">{qty}</span>
                <button onClick={() => setQty(Math.min(product.stock, qty + 1))} className="px-3 py-2 hover:bg-[#222] transition-colors text-sm">+</button>
              </div>
            </div>

            {/* CTA */}
            <div className="flex gap-3 mb-8">
              <button
                onClick={handleCart}
                disabled={product.stock === 0}
                className="flex-1 btn-lime py-3 text-xs font-mono-custom uppercase tracking-widest flex items-center justify-center gap-2 disabled:opacity-50"
              >
                <ShoppingCart size={16} /> Add to Cart
              </button>
              <button
                onClick={handleWishlist}
                className={`p-3 border transition-colors ${wished ? 'border-[#C6F135] bg-[#C6F135] text-black' : 'border-[#333] hover:border-[#C6F135] hover:text-[#C6F135]'}`}
              >
                <Heart size={18} fill={wished ? 'currentColor' : 'none'} />
              </button>
            </div>
          </div>

          {/* Features */}
          <div className="grid grid-cols-3 gap-4 border-t border-[#1a1a1a] pt-6">
            {[
              { icon: Package, label: 'Free Shipping', sub: 'On orders $100+' },
              { icon: RefreshCw, label: 'Easy Returns', sub: '30-day policy' },
              { icon: Shield, label: 'Secure Pay', sub: '100% protected' },
            ].map(f => (
              <div key={f.label} className="text-center">
                <f.icon size={18} className="text-[#C6F135] mx-auto mb-2" />
                <div className="text-xs font-bold text-white">{f.label}</div>
                <div className="text-[10px] text-gray-500 mt-0.5">{f.sub}</div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Related */}
      {related.length > 0 && (
        <div className="border-t border-[#1a1a1a] pt-14">
          <h2 className="font-display text-4xl text-white mb-6">Related Products</h2>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-1">
            {related.map(p => <ProductCard key={p.id} product={p} />)}
          </div>
        </div>
      )}
    </div>
  );
}
