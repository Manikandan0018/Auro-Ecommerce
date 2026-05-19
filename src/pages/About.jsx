// src/pages/About.jsx
export default function About() {
  return (
    <div className="max-w-7xl mx-auto px-4 py-16 min-h-screen">
      <div className="grid md:grid-cols-2 gap-0 mb-16">
        <div className="aspect-square overflow-hidden">
          <img src="https://images.unsplash.com/photo-1558769132-cb1aea458c5e?w=700&q=80" alt="" className="w-full h-full object-cover" />
        </div>
        <div className="bg-[#111] p-10 md:p-16 flex flex-col justify-center">
          <div className="text-xs font-mono-custom text-[#C6F135] uppercase tracking-widest mb-4">Our Story</div>
          <h1 className="font-display text-6xl text-white leading-none mb-6">ABOUT<br/>COLLUSION</h1>
          <p className="text-gray-400 text-sm leading-relaxed mb-4">
            Born on the streets, refined in the studio. COLLUSION is a fashion brand that bridges the gap between underground culture and high fashion.
          </p>
          <p className="text-gray-500 text-sm leading-relaxed">
            We create pieces that tell stories — each garment is a statement, a conversation starter, a work of art meant to be worn.
          </p>
        </div>
      </div>

      <div className="grid md:grid-cols-3 gap-1 mb-16">
        {[
          { n: '01', t: 'VISION', d: "Our relentless pursuit of a shared vision fuels creativity. We craft strategies that align with clients' goals and aspirations, transforming dreams into reality." },
          { n: '02', t: 'INNOVATION', d: "Innovation is at the core of everything we do. We embrace curiosity, explore uncharted territories, and challenge the status quo to create groundbreaking solutions." },
          { n: '03', t: 'CONNECTION', d: "We believe in the power of connection, building bridges between brands and their audiences through compelling storytelling and meaningful interactions." },
        ].map(item => (
          <div key={item.n} className="bg-[#111] p-8">
            <div className="text-xs font-mono-custom text-gray-600 mb-3">{item.n}</div>
            <h3 className="font-display text-3xl text-white mb-4 tracking-widest">{item.t}</h3>
            <p className="text-gray-500 text-sm leading-relaxed">{item.d}</p>
          </div>
        ))}
      </div>
    </div>
  );
}
