// src/pages/Login.jsx
import { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { Diamond, Eye, EyeOff } from 'lucide-react';
import { useApp } from '../context/AppContext';
import { auth, googleProvider } from '../firebase';
import { signInWithPopup } from 'firebase/auth';

export default function Login() {
  const { login, loginWithGoogle, notify } = useApp();
  const navigate = useNavigate();
  const [form, setForm] = useState({ email: '', password: '' });
  const [showPass, setShowPass] = useState(false);
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);

  const handleSubmit = (e) => {
    e.preventDefault();
    setError('');
    const res = login(form.email, form.password);
    if (res.error) { setError(res.error); return; }
    navigate('/');
  };

 const handleGoogle = async () => {
   setLoading(true);
   setError("");

   try {
     const result = await signInWithPopup(auth, googleProvider);

     const user = result.user;

     // convert Firebase fields to your app fields
     const userData = {
       name: user.displayName || "User",
       email: user.email || "",
       avatar: user.photoURL || "",
       phone: user.phoneNumber || "",
       bio: "",
       role: "user",
       uid: user.uid,
     };

     console.log("Google User:", userData);

     loginWithGoogle(userData);

     navigate("/");
   } catch (err) {
     console.log(err);
     setError(err.message);
   }

   setLoading(false);
 };

  return (
    <div className="min-h-screen flex">
      {/* Left visual */}
      <div className="hidden md:block w-1/2 relative overflow-hidden">
        <img src="https://images.unsplash.com/photo-1529139574466-a303027c1d8b?w=800&q=80" alt="" className="w-full h-full object-cover" />
        <div className="absolute inset-0 bg-gradient-to-r from-[#0a0a0a] to-transparent" />
        <div className="absolute bottom-12 left-10">
          <div className="font-display text-7xl text-white leading-none">SIGN<br/>IN.</div>
          <div className="text-gray-400 text-sm mt-3">Welcome back to COLLUSION</div>
        </div>
      </div>

      {/* Right form */}
      <div className="w-full md:w-1/2 flex flex-col justify-center px-8 md:px-16 lg:px-24">
        <Link to="/" className="flex items-center gap-2 mb-12">
          <Diamond size={20} className="text-[#C6F135]" />
          <span className="font-display text-2xl tracking-widest">COLLUSION</span>
        </Link>

        <h2 className="font-display text-4xl mb-2">WELCOME BACK</h2>
        <p className="text-gray-500 text-sm mb-8">Sign in to your account</p>

        {/* Demo credentials */}
        <div className="bg-[#1a1a1a] border border-[#333] rounded-sm p-3 mb-6 text-xs font-mono-custom text-gray-400">
          <div className="text-[#C6F135] mb-1 font-bold">DEMO CREDENTIALS:</div>
          <div>Admin: admin@collusion.com / admin123</div>
          <div>Or register as a new user below</div>
        </div>

        {error && <div className="bg-red-500/10 border border-red-500/30 text-red-400 text-xs px-4 py-3 rounded-sm mb-4 font-mono-custom">{error}</div>}

        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label className="text-xs font-mono-custom uppercase tracking-widest text-gray-400 block mb-1.5">Email</label>
            <input type="email" value={form.email} onChange={e => setForm({...form, email: e.target.value})}
              placeholder="your@email.com" required className="w-full px-4 py-3 text-sm rounded-sm" />
          </div>
          <div>
            <label className="text-xs font-mono-custom uppercase tracking-widest text-gray-400 block mb-1.5">Password</label>
            <div className="relative">
              <input type={showPass ? 'text' : 'password'} value={form.password} onChange={e => setForm({...form, password: e.target.value})}
                placeholder="••••••••" required className="w-full px-4 py-3 text-sm rounded-sm pr-10" />
              <button type="button" onClick={() => setShowPass(!showPass)} className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-500">
                {showPass ? <EyeOff size={16} /> : <Eye size={16} />}
              </button>
            </div>
          </div>
          <button type="submit" className="w-full btn-lime py-3 text-xs font-mono-custom uppercase tracking-widest rounded-sm mt-2">
            Sign In
          </button>
        </form>

        <div className="flex items-center gap-4 my-6">
          <div className="flex-1 h-px bg-[#222]" />
          <span className="text-xs text-gray-500 font-mono-custom">OR</span>
          <div className="flex-1 h-px bg-[#222]" />
        </div>

        <button onClick={handleGoogle} disabled={loading}
          className="w-full btn-outline py-3 text-xs font-mono-custom uppercase tracking-widest rounded-sm flex items-center justify-center gap-3">
          <svg width="16" height="16" viewBox="0 0 24 24" fill="none">
            <path d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z" fill="#4285F4"/>
            <path d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z" fill="#34A853"/>
            <path d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z" fill="#FBBC05"/>
            <path d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z" fill="#EA4335"/>
          </svg>
          {loading ? 'Connecting...' : 'Continue with Google'}
        </button>

        <p className="text-center text-xs text-gray-500 mt-8 font-mono-custom">
          No account? <Link to="/signup" className="text-[#C6F135] hover:underline">CREATE ONE</Link>
        </p>
      </div>
    </div>
  );
}
