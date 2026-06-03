// src/components/shared/Navbar.jsx
import { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { ShoppingCart, Heart, User, Menu, X, Diamond, LogOut, LayoutDashboard } from 'lucide-react';
import { useApp } from '../../context/AppContext';


export default function Navbar() {
  const { currentUser, logout, cartCount, wishlist } = useApp();
  const [menuOpen, setMenuOpen] = useState(false);
  const [dropOpen, setDropOpen] = useState(false);
  const navigate = useNavigate();

  const handleLogout = () => { logout(); navigate('/'); setDropOpen(false); };

  return (
    <>
      {/* Marquee */}
      <div className="bg-[#C6F135] py-1.5 marquee-wrapper">
        <div className="marquee-track text-xs font-mono-custom font-bold text-black uppercase tracking-widest">
          {Array(10)
            .fill(null)
            .map((_, i) => (
              <span key={i} className="mx-6">
                +++ OPEN FOR NEW COLLECTION
              </span>
            ))}
        </div>
      </div>

      {/* Nav */}
      <nav className="bg-[#111] border-b border-[#222] sticky top-0 z-50">
        <div className="max-w-7xl mx-auto px-4 flex items-center justify-between h-14">
          {/* Logo */}
          <Link to="/" className="flex items-center gap-2">
            <Diamond size={18} className="text-[#C6F135]" />
            <span className="font-display text-2xl tracking-widest text-white">
              COLLUSION
            </span>
          </Link>

          {/* Desktop Nav Links */}
          <div className="hidden md:flex items-center gap-8 text-xs font-mono-custom uppercase tracking-widest text-gray-400">
            <Link
              to="/catalog"
              className="hover:text-[#C6F135] transition-colors"
            >
              Catalog
            </Link>
            <Link
              to="/catalog?cat=new"
              className="hover:text-[#C6F135] transition-colors"
            >
              New Collection
            </Link>
            <Link
              to="/about"
              className="hover:text-[#C6F135] transition-colors"
            >
              About Brand
            </Link>
          </div>

          {/* Icons */}
          <div className="flex items-center gap-4">
            {currentUser && (
              <>
                <Link to="/wishlist" className="relative hidden sm:block">
                  <Heart
                    size={20}
                    className="text-gray-300 hover:text-[#C6F135] transition-colors"
                  />
                  {wishlist.length > 0 && (
                    <span className="absolute -top-1.5 -right-1.5 bg-[#C6F135] text-black text-[9px] font-bold rounded-full w-4 h-4 flex items-center justify-center">
                      {wishlist.length}
                    </span>
                  )}
                </Link>
                <Link to="/cart" className="relative">
                  <ShoppingCart
                    size={20}
                    className="text-gray-300 hover:text-[#C6F135] transition-colors"
                  />
                  {cartCount > 0 && (
                    <span className="absolute -top-1.5 -right-1.5 bg-[#C6F135] text-black text-[9px] font-bold rounded-full w-4 h-4 flex items-center justify-center">
                      {cartCount}
                    </span>
                  )}
                </Link>
              </>
            )}

            {currentUser ? (
              <div className="relative">
                <button
                  onClick={() => setDropOpen(!dropOpen)}
                  className="flex items-center gap-2"
                >
                  <img
                    src={
                      currentUser?.avatar || "https://via.placeholder.com/40"
                    }
                    alt="Profile"
                    className="w-7 h-7 rounded-full border border-[#C6F135]"
                  />{" "}
                </button>
                {dropOpen && (
                  <div className="absolute right-0 top-10 w-48 bg-[#111] border border-[#333] rounded-lg overflow-hidden z-50 animate-fade-in shadow-2xl">
                    <div className="px-4 py-3 border-b border-[#222]">
                      <div className="text-xs text-[#C6F135] font-mono-custom truncate">
                        {currentUser.name}
                      </div>
                      <div className="text-[10px] text-gray-500 truncate">
                        {currentUser.email}
                      </div>
                    </div>
                    {currentUser.role === "admin" ? (
                      <Link
                        to="/admin"
                        onClick={() => setDropOpen(false)}
                        className="flex items-center gap-2 px-4 py-2.5 text-xs hover:bg-[#C6F135] hover:text-black transition-colors"
                      >
                        <LayoutDashboard size={14} /> Admin Dashboard
                      </Link>
                    ) : (
                      <>
                        <Link
                          to="/profile"
                          onClick={() => setDropOpen(false)}
                          className="flex items-center gap-2 px-4 py-2.5 text-xs hover:bg-[#222] transition-colors"
                        >
                          <User size={14} /> Profile
                        </Link>
                        <Link
                          to="/orders"
                          onClick={() => setDropOpen(false)}
                          className="flex items-center gap-2 px-4 py-2.5 text-xs hover:bg-[#222] transition-colors"
                        >
                          📦 My Orders
                        </Link>
                      </>
                    )}
                    <button
                      onClick={handleLogout}
                      className="flex items-center gap-2 px-4 py-2.5 text-xs text-red-400 hover:bg-[#222] w-full transition-colors"
                    >
                      <LogOut size={14} /> Logout
                    </button>
                  </div>
                )}
              </div>
            ) : (
              <Link
                to="/login"
                className="btn-lime px-4 py-1.5 text-xs font-mono-custom uppercase tracking-widest rounded-sm hidden sm:block"
              >
                Sign In
              </Link>
            )}

            <button
              className="md:hidden"
              onClick={() => setMenuOpen(!menuOpen)}
            >
              {menuOpen ? <X size={22} /> : <Menu size={22} />}
            </button>
          </div>
        </div>

        {/* Mobile Menu */}
        {menuOpen && (
          <div className="md:hidden border-t border-[#222] bg-[#111] pb-4 animate-fade-in">
            {["Catalog", "New Collection", "About Brand"].map((l) => (
              <Link
                key={l}
                to={
                  l === "Catalog"
                    ? "/catalog"
                    : l === "About Brand"
                      ? "/about"
                      : "/catalog?cat=new"
                }
                className="block px-6 py-3 text-sm text-gray-400 hover:text-[#C6F135] font-mono-custom uppercase tracking-widest"
                onClick={() => setMenuOpen(false)}
              >
                {l}
              </Link>
            ))}
            {!currentUser && (
              <Link
                to="/login"
                className="mx-6 mt-2 btn-lime block text-center py-2 text-xs font-mono-custom uppercase tracking-widest rounded-sm"
                onClick={() => setMenuOpen(false)}
              >
                Sign In
              </Link>
            )}
          </div>
        )}
      </nav>
    </>
  );
}
