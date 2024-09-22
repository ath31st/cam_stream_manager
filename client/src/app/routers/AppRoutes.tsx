import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import MainPage from '../../pages/main';
import MainLayout from '../layouts/MainLayout';

const AppRoutes: React.FC = () => {
  return (
    <Router>
      <MainLayout>
        <Routes>
          <Route path="/" element={<MainPage />} />
        </Routes>
      </MainLayout>
    </Router>
  );
};

export default AppRoutes;
