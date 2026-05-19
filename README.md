# COLLUSION — E-Commerce Fashion Store

A full-featured React e-commerce app inspired by the COLLUSION brand aesthetic.

## Tech Stack
- **React 18** + **Vite**
- **Tailwind CSS**
- **React Router DOM v6**
- **Firebase** (Google Sign-In)
- **LocalStorage** for all data persistence

---

## Setup Instructions

### 1. Install dependencies
```bash
npm install
```

### 2. Configure Firebase (for Google Sign-In)

1. Go to https://console.firebase.google.com
2. Create a new project (or use existing)
3. Go to **Project Settings → Your Apps → Web App**
4. Copy the `firebaseConfig` object
5. Open `src/firebase.js` and replace the placeholder values:

```js
const firebaseConfig = {
  apiKey: "your-actual-api-key",
  authDomain: "your-project.firebaseapp.com",
  projectId: "your-project-id",
  storageBucket: "your-project.appspot.com",
  messagingSenderId: "123456789",
  appId: "1:123456789:web:abc123"
};
```

6. In Firebase Console → **Authentication → Sign-in method → Google** → Enable it
7. Add `localhost` to **Authorized domains**

> **Note:** Email/password login and all other features work WITHOUT Firebase setup.

### 3. Run the development server
```bash
npm run dev
```

### 4. Build for production
```bash
npm run build
```

---

## Demo Credentials

| Role  | Email                    | Password   |
|-------|--------------------------|------------|
| Admin | admin@collusion.com      | admin123   |
| User  | Register a new account   | Any 6+ chars |

---

## Features

### User
- ✅ Register / Login (Email + Google)
- ✅ Browse products with search & category filters
- ✅ Product detail page
- ✅ Add to Cart, update quantity, remove
- ✅ Wishlist (toggle heart)
- ✅ Checkout with address form
- ✅ Order history with expandable details
- ✅ User profile edit

### Admin (admin@collusion.com / admin123)
- ✅ Dashboard with stats (revenue, orders, users, products)
- ✅ Products: Add, Edit, Delete with image preview
- ✅ Orders: View all, filter by status, update order status
- ✅ Users: View registered users with order count & total spent

---

## Project Structure
```
src/
  components/
    shared/        # Navbar, Footer, Toast, ProductCard, ProtectedRoute
  context/
    AppContext.jsx  # Global state (auth, cart, wishlist, orders)
  data/
    products.js     # Initial product seed data
  pages/
    Home.jsx
    Catalog.jsx
    ProductDetail.jsx
    Cart.jsx
    Wishlist.jsx
    Orders.jsx
    Profile.jsx
    Login.jsx
    Signup.jsx
    About.jsx
    admin/
      AdminLayout.jsx
      AdminDashboard.jsx
      AdminProducts.jsx
      AdminOrders.jsx
      AdminUsers.jsx
  firebase.js
  App.jsx
  main.jsx
  index.css
```
