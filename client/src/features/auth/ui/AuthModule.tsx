import React, { useState } from 'react';
import { useAuthStore } from '../model/auth.store';
import { useNavigate, useLocation } from 'react-router-dom';
import {
  errorNotification,
  successNotification,
} from '../../../shared/notifications';
import AuthModals from './AuthModals';
import routes from '../../../shared/routes/routes';
import AuthButtons from './AuthButtons';

const AuthModule: React.FC = () => {
  const { isAuthenticated, login, user, logout, clearError } = useAuthStore();
  const [isLoginModalVisible, setLoginModalVisible] = useState(false);
  const [isUserCardModalVisible, setUserCardModalVisible] = useState(false);
  const [isLogoutConfirmModalVisible, setLogoutConfirmModalVisible] =
    useState(false);

  const navigate = useNavigate();
  const location = useLocation();

  const handleLogin = async (username: string, password: string) => {
    clearError();

    await login(username, password);
    const currentError = useAuthStore.getState().error;
    if (currentError) {
      errorNotification('Неавторизованный доступ', clearError, currentError);
    } else {
      successNotification('Успешный вход', 'Вы вошли в систему');
    }

    setLoginModalVisible(false);
  };

  const handleLogout = async () => {
    await logout();
    successNotification('Успешный выход', 'Вы вышли из системы');
    setLogoutConfirmModalVisible(false);
  };

  const handleAdminPageNavigation = () => {
    navigate(routes.ADMIN);
  };

  const handlePlayerPageNavigation = () => {
    navigate(routes.HOME);
  };

  return (
    <>
      <AuthButtons
        isAuthenticated={isAuthenticated}
        userRole={user?.role}
        username={user?.username}
        onShowUserCardModal={() => setUserCardModalVisible(true)}
        onLogin={() => setLoginModalVisible(true)}
        onLogout={() => setLogoutConfirmModalVisible(true)}
        onAdminPageNavigation={handleAdminPageNavigation}
        onPlayerPageNavigation={handlePlayerPageNavigation}
        currentPath={location.pathname}
      />
      <AuthModals
        isLoginModalVisible={isLoginModalVisible}
        isUserCardModalVisible={isUserCardModalVisible}
        isLogoutConfirmModalVisible={isLogoutConfirmModalVisible}
        onCloseLoginModal={() => setLoginModalVisible(false)}
        onCloseUserCardModal={() => setUserCardModalVisible(false)}
        onCloseLogoutConfirmModal={() => setLogoutConfirmModalVisible(false)}
        user={user}
        onLogin={handleLogin}
        onConfirmLogout={handleLogout}
      />
    </>
  );
};

export default AuthModule;
