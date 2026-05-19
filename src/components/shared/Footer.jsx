// src/components/shared/Footer.jsx
import { Diamond } from 'lucide-react';
import { Link } from 'react-router-dom';

export default function Footer() {
  return (
    <footer className="bg-[#0a0a0a] border-t border-[#1a1a1a] mt-20">
      {/* Big marquee */}
      <div className="border-y border-[#1a1a1a] overflow-hidden py-4">
        <div className="marquee-track text-[60px] md:text-[90px] font-display text-[#1a1a1a] whitespace-nowrap">
          {Array(4).fill(null).map((_, i) => (
            <span key={i}>COLLUSION ✦ COLLUSION ✦ </span>
          ))}
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 py-10 grid grid-cols-2 md:grid-cols-4 gap-8">
        <div>
          <div className="flex items-center gap-2 mb-4">
            <Diamond size={16} className="text-[#C6F135]" />
            <span className="font-display text-xl tracking-widest">COLLUSION</span>
          </div>
          <p className="text-gray-500 text-xs leading-relaxed">Creating unique style since 2020. Fashion that speaks louder than words.</p>
        </div>
        <div>
          <div className="text-xs font-mono-custom uppercase tracking-widest text-[#C6F135] mb-4">Shop</div>
          {['New Collection', 'Tops', 'Bottoms', 'Jackets', 'Shoes'].map(l => (
            <Link key={l} to="/catalog" className="block text-xs text-gray-500 hover:text-white mb-2 transition-colors">{l}</Link>
          ))}
        </div>
        <div>
          <div className="text-xs font-mono-custom uppercase tracking-widest text-[#C6F135] mb-4">Info</div>
          {['About Brand', 'Blog', 'Contact Us', 'Size Guide'].map(l => (
            <div key={l} className="text-xs text-gray-500 mb-2">{l}</div>
          ))}
        </div>
        <div>
          <div className="text-xs font-mono-custom uppercase tracking-widest text-[#C6F135] mb-4">Contact</div>
          <div className="text-xs text-gray-500 mb-2">hello@collusion.com</div>
          <div className="text-xs text-gray-500 mb-2">+1 (555) 000-1234</div>
          <div className="flex gap-3 mt-4">
            {['IG', 'TW', 'TK'].map(s => (
              <div key={s} className="w-8 h-8 border border-[#333] flex items-center justify-center text-[10px] font-mono-custom text-gray-400 hover:border-[#C6F135] hover:text-[#C6F135] cursor-pointer transition-colors">{s}</div>
            ))}
          </div>
        </div>
      </div>
      <div className="border-t border-[#1a1a1a] text-center py-4 text-[10px] text-gray-600 font-mono-custom">
        © 2024 COLLUSION — ALL RIGHTS RESERVED
      </div>
    </footer>
  );
}
