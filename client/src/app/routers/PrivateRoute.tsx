import type React from 'react';
import { Navigate, Outlet } from 'react-router-dom';
import { useAuthStore } from '@/features/auth';
import routes from '@/shared/routes';

interface PrivateRouteProps {
  requiredRole?: string;
}

const PrivateRoute: React.FC<PrivateRouteProps> = ({ requiredRole }) => {
  const { isAuthenticated, user } = useAuthStore();

  if (!isAuthenticated) {
    return <Navigate to={routes.UNAUTHORIZED_PAGE} replace />;
  }

  if (requiredRole && user?.role !== requiredRole) {
    return <Navigate to={routes.ACCESS_DENIED_PAGE} replace />;
  }

  return <Outlet />;
};

export default PrivateRoute;
