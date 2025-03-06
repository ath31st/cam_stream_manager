import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import MainPage from '../../pages/main';
import MainLayout from '../layouts/MainLayout';
import AdminPage from '../../pages/admin';
import AdminLayout from '../layouts/AdminLayout';
import UnauthorizedPage from '../../pages/401';
import PrivateRoute from './PrivateRoute';
import routes from '../../shared/routes';
import AccessDeniedPage from '../../pages/403';

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
