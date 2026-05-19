// src/pages/Cart.jsx
import { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { Trash2, Plus, Minus, ShoppingBag, ArrowRight } from 'lucide-react';
import { useApp } from '../context/AppContext';

export default function Cart() {
  const { cart, removeFromCart, updateCartQty, cartTotal, placeOrder } = useApp();
  const [step, setStep] = useState('cart'); // cart | checkout | success
  const [lastOrder, setLastOrder] = useState(null);
  const [address, setAddress] = useState({ name: '', email: '', phone: '', street: '', city: '', zip: '', country: '' });
  const navigate = useNavigate();

  const handleOrder = (e) => {
    e.preventDefault();
    const order = placeOrder(address);
    setLastOrder(order);
    setStep('success');
  };

  if (step === 'success') return (
    <div className="max-w-lg mx-auto px-4 py-24 text-center min-h-screen">
      <div className="text-6xl mb-6">🎉</div>
      <div className="font-display text-5xl text-[#C6F135] mb-3">ORDER PLACED!</div>
      <div className="text-gray-400 text-sm mb-2">Order ID: <span className="font-mono-custom text-white">{lastOrder?.id}</span></div>
      <div className="text-gray-400 text-sm mb-8">Total: <span className="text-[#C6F135] font-bold">${lastOrder?.total.toFixed(2)}</span></div>
      <div className="flex gap-4 justify-center">
        <Link to="/orders" className="btn-lime px-6 py-3 text-xs font-mono-custom uppercase tracking-widest">Track Order</Link>
        <Link to="/catalog" className="btn-outline px-6 py-3 text-xs font-mono-custom uppercase tracking-widest border border-[#333] rounded-sm">Continue Shopping</Link>
      </div>
    </div>
  );

  if (cart.length === 0) return (
    <div className="max-w-lg mx-auto px-4 py-24 text-center min-h-screen">
      <ShoppingBag size={48} className="mx-auto text-gray-700 mb-6" />
      <div className="font-display text-4xl text-gray-500 mb-4">YOUR CART IS EMPTY</div>
      <Link to="/catalog" className="btn-lime px-6 py-3 text-xs font-mono-custom uppercase tracking-widest inline-block">Shop Now</Link>
    </div>
  );

  return (
    <div className="max-w-6xl mx-auto px-4 py-10 min-h-screen">
      <h1 className="font-display text-5xl text-white mb-10">
        {step === 'cart' ? 'YOUR CART' : 'CHECKOUT'}
      </h1>

      {step === 'cart' ? (
        <div className="grid lg:grid-cols-3 gap-8">
          {/* Cart Items */}
          <div className="lg:col-span-2 space-y-1">
            {cart.map(item => (
              <div key={item.id} className="flex gap-4 bg-[#111] p-4">
                <img src={item.image} alt={item.name} className="w-20 h-24 object-cover flex-shrink-0" />
                <div className="flex-1 min-w-0">
                  <div className="text-xs font-mono-custom text-gray-500 uppercase tracking-wide">{item.category}</div>
                  <div className="font-semibold text-sm text-white mt-0.5">{item.name}</div>
                  <div className="text-[#C6F135] font-mono-custom text-sm font-bold mt-1">${item.price.toFixed(2)}</div>
                  <div className="flex items-center gap-3 mt-3">
                    <button onClick={() => updateCartQty(item.id, item.qty - 1)} className="w-7 h-7 border border-[#333] flex items-center justify-center hover:border-[#C6F135] transition-colors">
                      <Minus size={12} />
                    </button>
                    <span className="font-mono-custom text-sm w-6 text-center">{item.qty}</span>
                    <button onClick={() => updateCartQty(item.id, item.qty + 1)} className="w-7 h-7 border border-[#333] flex items-center justify-center hover:border-[#C6F135] transition-colors">
                      <Plus size={12} />
                    </button>
                    <button onClick={() => removeFromCart(item.id)} className="ml-2 text-gray-600 hover:text-red-400 transition-colors">
                      <Trash2 size={14} />
                    </button>
                  </div>
                </div>
                <div className="text-right">
                  <div className="font-mono-custom font-bold text-white">${(item.price * item.qty).toFixed(2)}</div>
                </div>
              </div>
            ))}
          </div>

          {/* Summary */}
          <div className="bg-[#111] p-6 h-fit">
            <div className="font-display text-2xl mb-6">ORDER SUMMARY</div>
            <div className="space-y-3 mb-6 text-sm">
              {cart.map(item => (
                <div key={item.id} className="flex justify-between text-gray-400">
                  <span>{item.name} × {item.qty}</span>
                  <span>${(item.price * item.qty).toFixed(2)}</span>
                </div>
              ))}
            </div>
            <div className="border-t border-[#222] pt-4 mb-6">
              <div className="flex justify-between">
                <span className="font-mono-custom text-sm uppercase tracking-widest">Subtotal</span>
                <span className="font-mono-custom font-bold text-[#C6F135]">${cartTotal.toFixed(2)}</span>
              </div>
              <div className="flex justify-between text-xs text-gray-500 mt-2">
                <span>Shipping</span>
                <span>{cartTotal >= 100 ? 'FREE' : '$9.99'}</span>
              </div>
            </div>
            <button onClick={() => setStep('checkout')} className="w-full btn-lime py-3 text-xs font-mono-custom uppercase tracking-widest flex items-center justify-center gap-2">
              Proceed to Checkout <ArrowRight size={14} />
            </button>
          </div>
        </div>
      ) : (
        /* Checkout form */
        <div className="grid lg:grid-cols-3 gap-8">
          <form onSubmit={handleOrder} className="lg:col-span-2 space-y-4">
            <div className="font-display text-2xl text-white mb-2">SHIPPING DETAILS</div>
            <div className="grid sm:grid-cols-2 gap-4">
              {[
                { key: 'name', label: 'Full Name', type: 'text' },
                { key: 'email', label: 'Email', type: 'email' },
                { key: 'phone', label: 'Phone', type: 'tel' },
                { key: 'zip', label: 'Zip Code', type: 'text' },
              ].map(f => (
                <div key={f.key}>
                  <label className="text-xs font-mono-custom uppercase tracking-widest text-gray-400 block mb-1.5">{f.label}</label>
                  <input type={f.type} value={address[f.key]} onChange={e => setAddress({...address, [f.key]: e.target.value})}
                    required className="w-full px-4 py-3 text-sm rounded-sm" />
                </div>
              ))}
              <div className="sm:col-span-2">
                <label className="text-xs font-mono-custom uppercase tracking-widest text-gray-400 block mb-1.5">Street Address</label>
                <input type="text" value={address.street} onChange={e => setAddress({...address, street: e.target.value})}
                  required className="w-full px-4 py-3 text-sm rounded-sm" />
              </div>
              {[{ key: 'city', label: 'City' }, { key: 'country', label: 'Country' }].map(f => (
                <div key={f.key}>
                  <label className="text-xs font-mono-custom uppercase tracking-widest text-gray-400 block mb-1.5">{f.label}</label>
                  <input type="text" value={address[f.key]} onChange={e => setAddress({...address, [f.key]: e.target.value})}
                    required className="w-full px-4 py-3 text-sm rounded-sm" />
                </div>
              ))}
            </div>

            <div className="border-t border-[#222] pt-6">
              <div className="font-display text-2xl text-white mb-4">PAYMENT</div>
              <div className="bg-[#1a1a1a] border border-[#333] p-4 rounded-sm">
                <div className="text-xs font-mono-custom text-[#C6F135] mb-1">Demo Mode</div>
                <div className="text-xs text-gray-500">Payment is simulated. No real charge will be made.</div>
              </div>
            </div>

            <div className="flex gap-4 mt-6">
              <button type="button" onClick={() => setStep('cart')} className="btn-outline px-6 py-3 text-xs font-mono-custom uppercase tracking-widest border border-[#333] rounded-sm">
                Back
              </button>
              <button type="submit" className="flex-1 btn-lime py-3 text-xs font-mono-custom uppercase tracking-widest">
                Place Order — ${cartTotal.toFixed(2)}
              </button>
            </div>
          </form>

          {/* Order summary sidebar */}
          <div className="bg-[#111] p-6 h-fit">
            <div className="font-display text-xl mb-4">YOUR ORDER</div>
            {cart.map(item => (
              <div key={item.id} className="flex gap-3 mb-3">
                <img src={item.image} alt="" className="w-14 h-16 object-cover" />
                <div>
                  <div className="text-xs text-white">{item.name}</div>
                  <div className="text-xs text-gray-500">× {item.qty}</div>
                  <div className="text-xs text-[#C6F135] font-bold">${(item.price * item.qty).toFixed(2)}</div>
                </div>
              </div>
            ))}
            <div className="border-t border-[#222] pt-4 mt-4">
              <div className="flex justify-between font-mono-custom text-sm">
                <span>Total</span>
                <span className="text-[#C6F135] font-bold">${cartTotal.toFixed(2)}</span>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
