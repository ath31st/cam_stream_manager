import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import MainPage from '../../pages/main';
import MainLayout from '../layouts/MainLayout';
import AdminPage from '../../pages/admin';
import AdminLayout from '../layouts/AdminLayout';
import UnauthorizedPage from '../../pages/401';
import PrivateRoute from './PrivateRoute';
import routes from '../../shared/routes/routes';

const AppRoutes: React.FC = () => {
  return (
    <Router>
      <Routes>
        <Route element={<MainLayout />}>
          <Route path={routes.HOME} element={<MainPage />} />
        </Route>

        <Route element={<PrivateRoute />}>
          <Route element={<AdminLayout />}>
            <Route path={routes.ADMIN} element={<AdminPage />} />
          </Route>
        </Route>

        <Route path={routes.UNAUTHORIZED_PAGE} element={<UnauthorizedPage />} />
      </Routes>
    </Router>
  );
};

export default AppRoutes;
