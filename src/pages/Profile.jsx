// src/pages/Profile.jsx
import { useState } from 'react';
import { useApp } from '../context/AppContext';
import { Camera, User } from 'lucide-react';

export default function Profile() {
  const { currentUser, updateProfile } = useApp();
  const [form, setForm] = useState({ name: currentUser?.name || '', email: currentUser?.email || '', phone: currentUser?.phone || '', bio: currentUser?.bio || '' });
  const [saved, setSaved] = useState(false);

  const handleSave = (e) => {
    e.preventDefault();
    updateProfile(form);
    setSaved(true);
    setTimeout(() => setSaved(false), 2000);
  };

  return (
    <div className="max-w-2xl mx-auto px-4 py-10 min-h-screen">
      <div className="mb-10">
        <div className="text-xs font-mono-custom text-[#C6F135] uppercase tracking-widest mb-1">
          Account
        </div>
        <h1 className="font-display text-5xl text-white">MY PROFILE</h1>
      </div>

      {/* Avatar */}
      <div className="flex items-center gap-6 mb-10 bg-[#111] p-6">
        <div className="relative">
          <img
            src={currentUser?.avatar || "https://via.placeholder.com/80"}
            alt="Profile"
            className="w-20 h-20 rounded-full border-2 border-[#C6F135]"
          />{" "}
          <div className="absolute -bottom-1 -right-1 w-7 h-7 bg-[#C6F135] rounded-full flex items-center justify-center cursor-pointer">
            <Camera size={12} className="text-black" />
          </div>
        </div>
        <div>
          <div className="font-display text-2xl text-white">
            {currentUser?.name}
          </div>
          <div className="text-xs text-gray-500 font-mono-custom mt-0.5">
            {currentUser?.email}
          </div>
          <div className="mt-2 inline-flex items-center gap-1.5 px-2 py-0.5 bg-[#C6F135]/10 border border-[#C6F135]/30 rounded-sm">
            <User size={10} className="text-[#C6F135]" />
            <span className="text-[10px] font-mono-custom text-[#C6F135] uppercase tracking-widest">
              {currentUser?.role}
            </span>
          </div>
        </div>
      </div>

      {/* Form */}
      <form onSubmit={handleSave} className="space-y-5">
        <div className="grid sm:grid-cols-2 gap-5">
          <div>
            <label className="text-xs font-mono-custom uppercase tracking-widest text-gray-400 block mb-1.5">
              Full Name
            </label>
            <input
              value={form.name}
              onChange={(e) => setForm({ ...form, name: e.target.value })}
              className="w-full px-4 py-3 text-sm rounded-sm"
            />
          </div>
          <div>
            <label className="text-xs font-mono-custom uppercase tracking-widest text-gray-400 block mb-1.5">
              Email
            </label>
            <input
              value={form.email}
              onChange={(e) => setForm({ ...form, email: e.target.value })}
              type="email"
              className="w-full px-4 py-3 text-sm rounded-sm"
            />
          </div>
          <div>
            <label className="text-xs font-mono-custom uppercase tracking-widest text-gray-400 block mb-1.5">
              Phone
            </label>
            <input
              value={form.phone}
              onChange={(e) => setForm({ ...form, phone: e.target.value })}
              placeholder="+1 (555) 000-0000"
              className="w-full px-4 py-3 text-sm rounded-sm"
            />
          </div>
        </div>
        <div>
          <label className="text-xs font-mono-custom uppercase tracking-widest text-gray-400 block mb-1.5">
            Bio
          </label>
          <textarea
            value={form.bio}
            onChange={(e) => setForm({ ...form, bio: e.target.value })}
            rows={3}
            placeholder="Tell us about yourself..."
            className="w-full px-4 py-3 text-sm rounded-sm resize-none"
          />
        </div>

        <button
          type="submit"
          className={`btn-lime px-8 py-3 text-xs font-mono-custom uppercase tracking-widest rounded-sm ${saved ? "opacity-70" : ""}`}
        >
          {saved ? "✓ Saved!" : "Save Changes"}
        </button>
      </form>
    </div>
  );
}
