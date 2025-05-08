import { Outlet, Navigate } from 'react-router-dom';
import { useAuth } from '../auth/AuthProvider';

interface ProtectedRouteProps {
  allowedRoleIds: number[]; // ahora usamos números
}

export default function ProtectedRoute({ allowedRoleIds }: ProtectedRouteProps) {
  const auth = useAuth();
  const user = auth.getUser?.();

  if (!auth.isAuthenticated) {
    return <Navigate to="/" replace />;
  }
  console.log('user', user);

  // Verifica si el rol_id está permitido
  if (!user || user.rol === undefined || !allowedRoleIds.includes(user.rol)) {
    return <Navigate to="/inicio" replace />;
  }

  return <Outlet />;
}