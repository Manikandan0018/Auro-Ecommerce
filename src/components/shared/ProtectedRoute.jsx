// src/components/shared/ProtectedRoute.jsx
import { Navigate } from 'react-router-dom';
import { useApp } from '../../context/AppContext';

export default function ProtectedRoute({ children }) {
  const { currentUser } = useApp();
  if (!currentUser) return <Navigate to="/login" />;
  return children;
}
