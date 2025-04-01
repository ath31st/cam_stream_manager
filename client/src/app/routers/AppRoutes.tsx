import type React from 'react';
import { Route, BrowserRouter as Router, Routes } from 'react-router-dom';
import UnauthorizedPage from '../../pages/401';
import AccessDeniedPage from '../../pages/403';
import AdminPage from '../../pages/admin';
import MainPage from '../../pages/main';
import routes from '../../shared/routes';
import AdminLayout from '../layouts/AdminLayout';
import MainLayout from '../layouts/MainLayout';
import PrivateRoute from './PrivateRoute';

const AppRoutes: React.FC = () => {
  return (
    <Router>
      <Routes>
        <Route element={<MainLayout />}>
          <Route path={routes.HOME} element={<MainPage />} />
        </Route>

        <Route element={<PrivateRoute requiredRole="ADMIN" />}>
          <Route element={<AdminLayout />}>
            <Route path={routes.ADMIN} element={<AdminPage />} />
          </Route>
        </Route>

        <Route path={routes.UNAUTHORIZED_PAGE} element={<UnauthorizedPage />} />
        <Route
          path={routes.ACCESS_DENIED_PAGE}
          element={<AccessDeniedPage />}
        />
      </Routes>
    </Router>
  );
};

export default AppRoutes;
