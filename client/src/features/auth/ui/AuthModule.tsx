import type React from 'react';
import { useState } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import { resetStores } from '../../../app';
import { usePlaylistStore } from '../../../entities/playlist';
import {
  errorNotification,
  successNotification,
} from '../../../shared/notifications';
import routes from '../../../shared/routes';
import { useAuthStore } from '../model/auth.store';
import AuthButtons from './AuthButtons';
import AuthModals from './AuthModals';

const AuthModule: React.FC = () => {
  const { isAuthenticated, login, user, logout, clearError } = useAuthStore();
  const [isLoginModalVisible, setLoginModalVisible] = useState(false);
  const [isUserCardModalVisible, setUserCardModalVisible] = useState(false);
  const [isLogoutConfirmModalVisible, setLogoutConfirmModalVisible] =
    useState(false);

  const navigate = useNavigate();
  const location = useLocation();
  const playlistStore = usePlaylistStore();

  const handleLogin = async (username: string, password: string) => {
    clearError();

    await login(username, password);
    const currentError = useAuthStore.getState().error;
    if (currentError) {
      errorNotification('Неавторизованный доступ', clearError, currentError);
    } else {
      successNotification('Успешный вход', 'Вы вошли в систему');
    }
    await playlistStore.fetchAllPlaylists(true);
    setLoginModalVisible(false);
  };

  const handleLogout = async () => {
    await logout();
    resetStores();
    await playlistStore.fetchAllPlaylists(true);
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
