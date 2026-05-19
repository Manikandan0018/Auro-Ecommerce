// src/context/AppContext.jsx
import { createContext, useContext, useState, useEffect } from 'react';
import { initialProducts } from '../data/products';

const AppContext = createContext();

const getLS = (key, fallback) => {
  try { const v = localStorage.getItem(key); return v ? JSON.parse(v) : fallback; }
  catch { return fallback; }
};

export function AppProvider({ children }) {
  const [products, setProducts] = useState(() => getLS('products', initialProducts));
  const [cart, setCart] = useState(() => getLS('cart', []));
  const [wishlist, setWishlist] = useState(() => getLS('wishlist', []));
  const [orders, setOrders] = useState(() => getLS('orders', []));
  const [users, setUsers] = useState(() => getLS('users', []));
  const [currentUser, setCurrentUser] = useState(() => getLS('currentUser', null));
  const [notification, setNotification] = useState(null);

  useEffect(() => { localStorage.setItem('products', JSON.stringify(products)); }, [products]);
  useEffect(() => { localStorage.setItem('cart', JSON.stringify(cart)); }, [cart]);
  useEffect(() => { localStorage.setItem('wishlist', JSON.stringify(wishlist)); }, [wishlist]);
  useEffect(() => { localStorage.setItem('orders', JSON.stringify(orders)); }, [orders]);
  useEffect(() => { localStorage.setItem('users', JSON.stringify(users)); }, [users]);
  useEffect(() => { localStorage.setItem('currentUser', JSON.stringify(currentUser)); }, [currentUser]);

  const notify = (msg, type = 'success') => {
    setNotification({ msg, type });
    setTimeout(() => setNotification(null), 2500);
  };

  // Auth
  const signup = (name, email, password) => {
    if (users.find(u => u.email === email)) return { error: 'Email already exists' };
    const user = { id: Date.now().toString(), name, email, password, role: 'user', avatar: `https://ui-avatars.com/api/?name=${encodeURIComponent(name)}&background=C6F135&color=000` };
    setUsers(prev => [...prev, user]);
    setCurrentUser(user);
    return { success: true };
  };

  const login = (email, password) => {
    const admins = [{ email: 'admin@collusion.com', password: 'admin123', role: 'admin', id: 'admin1', name: 'Admin', avatar: 'https://ui-avatars.com/api/?name=Admin&background=C6F135&color=000' }];
    const admin = admins.find(a => a.email === email && a.password === password);
    if (admin) { setCurrentUser(admin); return { success: true }; }
    const user = users.find(u => u.email === email && u.password === password);
    if (!user) return { error: 'Invalid credentials' };
    setCurrentUser(user);
    return { success: true };
  };

  const loginWithGoogle = (profile) => {
    let user = users.find(u => u.email === profile.email);
    if (!user) {
      user = { id: profile.uid || Date.now().toString(), name: profile.displayName, email: profile.email, role: 'user', avatar: profile.photoURL || `https://ui-avatars.com/api/?name=${encodeURIComponent(profile.displayName)}&background=C6F135&color=000` };
      setUsers(prev => [...prev, user]);
    }
    setCurrentUser(user);
  };

  const logout = () => { setCurrentUser(null); setCart([]); setWishlist([]); };

  const updateProfile = (data) => {
    const updated = { ...currentUser, ...data };
    setCurrentUser(updated);
    setUsers(prev => prev.map(u => u.id === updated.id ? updated : u));
    notify('Profile updated!');
  };

  // Cart
  const addToCart = (product, qty = 1) => {
    setCart(prev => {
      const existing = prev.find(i => i.id === product.id);
      if (existing) return prev.map(i => i.id === product.id ? { ...i, qty: i.qty + qty } : i);
      return [...prev, { ...product, qty }];
    });
    notify(`${product.name} added to cart!`);
  };

  const removeFromCart = (id) => setCart(prev => prev.filter(i => i.id !== id));
  const updateCartQty = (id, qty) => {
    if (qty < 1) { removeFromCart(id); return; }
    setCart(prev => prev.map(i => i.id === id ? { ...i, qty } : i));
  };
  const clearCart = () => setCart([]);
  const cartTotal = cart.reduce((s, i) => s + i.price * i.qty, 0);
  const cartCount = cart.reduce((s, i) => s + i.qty, 0);

  // Wishlist
  const toggleWishlist = (product) => {
    const inWish = wishlist.find(i => i.id === product.id);
    if (inWish) { setWishlist(prev => prev.filter(i => i.id !== product.id)); notify('Removed from wishlist'); }
    else { setWishlist(prev => [...prev, product]); notify('Added to wishlist ❤️'); }
  };
  const isWishlisted = (id) => wishlist.some(i => i.id === id);

  // Orders
  const placeOrder = (address) => {
    const order = {
      id: 'ORD-' + Date.now(),
      userId: currentUser?.id,
      userName: currentUser?.name,
      userEmail: currentUser?.email,
      items: [...cart],
      total: cartTotal,
      address,
      status: 'Processing',
      date: new Date().toISOString(),
    };
    setOrders(prev => [order, ...prev]);
    clearCart();
    notify('Order placed successfully! 🎉');
    return order;
  };

  const updateOrderStatus = (orderId, status) => {
    setOrders(prev => prev.map(o => o.id === orderId ? { ...o, status } : o));
    notify('Order status updated');
  };

  const getUserOrders = () => orders.filter(o => o.userId === currentUser?.id);

  // Admin: Products
  const addProduct = (product) => {
    const newP = { ...product, id: 'p' + Date.now(), price: parseFloat(product.price), stock: parseInt(product.stock) };
    setProducts(prev => [newP, ...prev]);
    notify('Product added!');
  };

  const updateProduct = (id, data) => {
    setProducts(prev => prev.map(p => p.id === id ? { ...p, ...data, price: parseFloat(data.price), stock: parseInt(data.stock) } : p));
    notify('Product updated!');
  };

  const deleteProduct = (id) => {
    setProducts(prev => prev.filter(p => p.id !== id));
    notify('Product deleted');
  };

  // Admin: Users control
  const getAllOrders = () => orders;
  const getAllUsers = () => users;

  return (
    <AppContext.Provider value={{
      products, cart, wishlist, orders, currentUser, users, notification,
      signup, login, loginWithGoogle, logout, updateProfile,
      addToCart, removeFromCart, updateCartQty, clearCart, cartTotal, cartCount,
      toggleWishlist, isWishlisted,
      placeOrder, updateOrderStatus, getUserOrders,
      addProduct, updateProduct, deleteProduct,
      getAllOrders, getAllUsers,
    }}>
      {children}
    </AppContext.Provider>
  );
}

export const useApp = () => useContext(AppContext);
