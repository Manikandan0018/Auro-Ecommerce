// src/App.jsx
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import { AppProvider } from './context/AppContext';
import Navbar from './components/shared/Navbar';
import Footer from './components/shared/Footer';
import Toast from './components/shared/Toast';
import ProtectedRoute from './components/shared/ProtectedRoute';

import Home from './pages/Home';
import Catalog from './pages/Catalog';
import ProductDetail from './pages/ProductDetail';
import Login from './pages/Login';
import Signup from './pages/Signup';
import Cart from './pages/Cart';
import Wishlist from './pages/Wishlist';
import Orders from './pages/Orders';
import Profile from './pages/Profile';
import About from './pages/About';

import AdminLayout from './pages/admin/AdminLayout';
import AdminDashboard from './pages/admin/AdminDashboard';
import AdminProducts from './pages/admin/AdminProducts';
import AdminOrders from './pages/admin/AdminOrders';
import AdminUsers from './pages/admin/AdminUsers';

function UserLayout({ children }) {
  return (
    <div className="flex flex-col min-h-screen">
      <Navbar />
      <main className="flex-1">{children}</main>
      <Footer />
      <Toast />
    </div>
  );
}

export default function App() {
  return (
    <AppProvider>
      <BrowserRouter>
        <Routes>
          {/* User routes */}
          <Route path="/" element={<UserLayout><Home /></UserLayout>} />
          <Route path="/catalog" element={<UserLayout><Catalog /></UserLayout>} />
          <Route path="/product/:id" element={<UserLayout><ProductDetail /></UserLayout>} />
          <Route path="/login" element={<Login />} />
          <Route path="/signup" element={<Signup />} />
          <Route path="/about" element={<UserLayout><About /></UserLayout>} />
          <Route path="/cart" element={<UserLayout><ProtectedRoute><Cart /></ProtectedRoute></UserLayout>} />
          <Route path="/wishlist" element={<UserLayout><ProtectedRoute><Wishlist /></ProtectedRoute></UserLayout>} />
          <Route path="/orders" element={<UserLayout><ProtectedRoute><Orders /></ProtectedRoute></UserLayout>} />
          <Route path="/profile" element={<UserLayout><ProtectedRoute><Profile /></ProtectedRoute></UserLayout>} />

          {/* Admin routes */}
          <Route path="/admin" element={<AdminLayout />}>
            <Route index element={<AdminDashboard />} />
            <Route path="products" element={<AdminProducts />} />
            <Route path="orders" element={<AdminOrders />} />
            <Route path="users" element={<AdminUsers />} />
          </Route>
        </Routes>
      </BrowserRouter>
    </AppProvider>
  );
}
