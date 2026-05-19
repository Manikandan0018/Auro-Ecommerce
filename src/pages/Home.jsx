// src/pages/Home.jsx
import { Link } from 'react-router-dom';
import { ArrowRight } from 'lucide-react';
import { useApp } from '../context/AppContext';
import ProductCard from '../components/shared/ProductCard';

export default function Home() {
  const { products } = useApp();
  const featured = products.slice(0, 4);
  const newArrivals = products.filter(p => p.badge === 'NEW').slice(0, 4);

  return (
    <div className="min-h-screen">
      {/* Hero */}
      <section className="grid md:grid-cols-2 min-h-[80vh]">
        {/* Left */}
        <div className="relative overflow-hidden bg-[#111]">
          <img
            src="https://images.unsplash.com/photo-1529139574466-a303027c1d8b?w=800&q=80"
            alt="hero"
            className="w-full h-full object-cover object-top opacity-80 min-h-[50vh]"
          />
          <div className="absolute inset-0 flex flex-col justify-end p-8 pb-12">
            <Link to="/catalog?cat=new" className="inline-block btn-lime px-6 py-3 text-xs font-mono-custom uppercase tracking-widest mb-4 self-start">
              CHECK NEW ARRIVALS
            </Link>
          </div>
        </div>

        {/* Right */}
        <div className="bg-[#f0f0f0] flex flex-col justify-center p-8 md:p-12 relative overflow-hidden">
          <div className="text-xs font-mono-custom text-gray-500 mb-4 tracking-widest uppercase">— Summer 2024</div>
          <h1 className="font-display text-6xl md:text-8xl text-black leading-none mb-6">
            Creating<br />Unique<br />Style.
          </h1>
          <p className="text-gray-600 text-sm max-w-xs mb-8 leading-relaxed">
            From concept to execution, we craft timeless identities that resonate with your audience.
          </p>
          <Link to="/catalog" className="flex items-center gap-2 text-xs font-mono-custom uppercase tracking-widest text-black hover:gap-4 transition-all">
            SCROLL DOWN <ArrowRight size={14} />
          </Link>

          {/* Big bg text */}
          <div className="absolute -bottom-4 left-0 right-0 overflow-hidden">
            <div className="font-display text-[100px] text-black/5 whitespace-nowrap leading-none select-none">
              COLLUSION RAYAN
            </div>
          </div>
        </div>
      </section>

      {/* Bottom banner */}
      <div className="bg-black py-3 overflow-hidden">
        <div className="marquee-track font-display text-4xl text-white whitespace-nowrap">
          {Array(6).fill(null).map((_, i) => (
            <span key={i} className="mx-6">COLLUSION X RAYAN <span className="text-gray-600">SELECTED</span> SUMMER / 2024 ✦ </span>
          ))}
        </div>
      </div>

      {/* Ready to Wear */}
      <section className="max-w-7xl mx-auto px-4 py-16">
        <div className="flex items-center justify-between mb-8">
          <h2 className="font-display text-5xl text-white">Ready to wear</h2>
          <Link to="/catalog" className="text-xs font-mono-custom uppercase tracking-widest text-gray-400 hover:text-[#C6F135] transition-colors flex items-center gap-2">
            SEE ALL <ArrowRight size={12} />
          </Link>
        </div>
        <div className="grid grid-cols-2 md:grid-cols-4 gap-1">
          {featured.map(p => <ProductCard key={p.id} product={p} />)}
        </div>
      </section>

      {/* About Brand */}
      <section className="max-w-7xl mx-auto px-4 py-16 border-t border-[#1a1a1a]">
        <div className="flex items-center justify-between mb-10">
          <h2 className="font-display text-5xl text-white">About Our Brand</h2>
          <Link to="/about" className="text-xs font-mono-custom uppercase tracking-widest text-gray-400 hover:text-[#C6F135] transition-colors flex items-center gap-2">
            SEE ALL <ArrowRight size={12} />
          </Link>
        </div>
        <div className="grid md:grid-cols-2 gap-0">
          <div className="aspect-[4/5] overflow-hidden">
            <img src="https://images.unsplash.com/photo-1558769132-cb1aea458c5e?w=700&q=80" alt="about" className="w-full h-full object-cover" />
          </div>
          <div className="bg-[#111] p-8 md:p-14 flex flex-col justify-center gap-10">
            {[
              { n: '01', t: 'VISION', d: "Our relentless pursuit of a shared vision fuels our creativity and propels us forward. With clarity and foresight, we craft strategies that align with clients' goals and aspirations." },
              { n: '02', t: 'INNOVATION', d: "Innovation is at the core of everything we do. We embrace curiosity, explore uncharted territories, and challenge the status quo to create groundbreaking solutions." },
              { n: '03', t: 'CONNECTION', d: "We believe in the power of connection. We strive to build bridges between brands and their audiences, fostering genuine and lasting relationships." },
            ].map(item => (
              <div key={item.n} className="border-b border-[#222] pb-8 last:border-0 last:pb-0">
                <div className="flex items-center gap-4 mb-3">
                  <span className="text-xs font-mono-custom text-gray-600">{item.n}</span>
                  <h3 className="font-display text-2xl tracking-widest text-white">{item.t}</h3>
                </div>
                <p className="text-gray-500 text-sm leading-relaxed">{item.d}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* New Arrivals */}
      {newArrivals.length > 0 && (
        <section className="max-w-7xl mx-auto px-4 py-16 border-t border-[#1a1a1a]">
          <div className="flex items-center justify-between mb-8">
            <h2 className="font-display text-5xl text-white">New Arrivals</h2>
            <Link to="/catalog?cat=new" className="text-xs font-mono-custom uppercase tracking-widest text-gray-400 hover:text-[#C6F135] transition-colors flex items-center gap-2">
              SEE ALL <ArrowRight size={12} />
            </Link>
          </div>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-1">
            {newArrivals.map(p => <ProductCard key={p.id} product={p} />)}
          </div>
        </section>
      )}
    </div>
  );
}
