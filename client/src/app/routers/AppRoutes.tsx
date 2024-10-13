import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import MainPage from '../../pages/main';
import MainLayout from '../layouts/MainLayout';
import AdminPage from '../../pages/admin';
import AdminLayout from '../layouts/AdminLayout';
import UnauthorizedPage from '../../pages/401';
import PrivateRoute from './PrivateRoute';

const AppRoutes: React.FC = () => {
  return (
    <Router>
      <Routes>
        <Route element={<MainLayout />}>
          <Route path="/" element={<MainPage />} />
        </Route>

        <Route element={<PrivateRoute />}>
          <Route element={<AdminLayout />}>
            <Route path="/admin" element={<AdminPage />} />
          </Route>
        </Route>

        <Route path="/401" element={<UnauthorizedPage />} />
      </Routes>
    </Router>
  );
};

export default AppRoutes;
