// src/components/shared/ProductCard.jsx
import { Heart, ShoppingCart } from 'lucide-react';
import { Link } from 'react-router-dom';
import { useApp } from '../../context/AppContext';

export default function ProductCard({ product }) {
  const { addToCart, toggleWishlist, isWishlisted, currentUser } = useApp();
  const wished = isWishlisted(product.id);

  const handleCart = (e) => {
    e.preventDefault();
    if (!currentUser) { window.location.href = '/login'; return; }
    addToCart(product);
  };

  const handleWishlist = (e) => {
    e.preventDefault();
    if (!currentUser) { window.location.href = '/login'; return; }
    toggleWishlist(product);
  };

  return (
    <Link to={`/product/${product.id}`} className="product-card block group cursor-pointer">
      <div className="relative overflow-hidden bg-[#1a1a1a] aspect-[3/4]">
        <img src={product.image} alt={product.name} className="product-img w-full h-full object-cover" />
        {product.badge && (
          <span className={`absolute top-2 left-2 text-[10px] font-mono-custom font-bold px-2 py-0.5 tracking-widest
            ${product.badge === 'SALE' ? 'bg-red-500 text-white' : 'bg-[#C6F135] text-black'}`}>
            {product.badge}
          </span>
        )}
        {/* Hover overlay */}
        <div className="absolute inset-0 bg-black/60 opacity-0 group-hover:opacity-100 transition-opacity flex items-end p-3 gap-2">
          <button onClick={handleCart} className="flex-1 btn-lime py-2 text-xs font-mono-custom uppercase tracking-widest rounded-sm flex items-center justify-center gap-2">
            <ShoppingCart size={14} /> Add to Cart
          </button>
          <button onClick={handleWishlist} className={`p-2 rounded-sm transition-colors ${wished ? 'bg-[#C6F135] text-black' : 'bg-[#222] text-white hover:bg-[#333]'}`}>
            <Heart size={14} fill={wished ? 'currentColor' : 'none'} />
          </button>
        </div>
        {product.stock <= 5 && product.stock > 0 && (
          <span className="absolute bottom-2 right-2 bg-orange-500/80 text-white text-[9px] font-mono-custom px-1.5 py-0.5">
            {product.stock} LEFT
          </span>
        )}
      </div>
      <div className={`p-3 transition-colors ${wished ? 'bg-[#C6F135]/10' : 'bg-transparent'}`}>
        <div className="text-xs text-gray-400 mb-0.5 font-mono-custom uppercase tracking-wide">{product.category}</div>
        <div className="font-semibold text-sm text-white group-hover:text-[#C6F135] transition-colors leading-tight">{product.name}</div>
        <div className="text-[#C6F135] font-mono-custom font-bold mt-1">${product.price.toFixed(2)}</div>
      </div>
    </Link>
  );
}
