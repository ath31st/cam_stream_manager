import { useState } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import { resetStores } from '@/app';
import { usePlaylistStore } from '@/entities/playlist';
import { errorNotification, successNotification } from '@/shared/notifications';
import routes from '@/shared/routes';
import { useAuthStore } from './auth.store';

const useAuthModuleHandlers = () => {
  const { isAuthenticated, login, user, logout, clearError } = useAuthStore();
  const [isLoginModalVisible, setLoginModalVisible] = useState(false);
  const [isUserCardModalVisible, setUserCardModalVisible] = useState(false);
  const [isLogoutConfirmModalVisible, setLogoutConfirmModalVisible] =
    useState(false);

  const navigate = useNavigate();
  const location = useLocation();
  const playlistStore = usePlaylistStore();

  const showLoginModal = () => {
    setLoginModalVisible(true);
  };

  const closeLoginModal = () => {
    setLoginModalVisible(false);
  };

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

  const showLogoutConfirmModal = () => {
    setLogoutConfirmModalVisible(true);
  };

  const closeLogoutConfirmModal = () => {
    setLogoutConfirmModalVisible(false);
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

  const showUserCardModal = () => {
    setUserCardModalVisible(true);
  };

  const closeUserCardModal = () => {
    setUserCardModalVisible(false);
  };

  return {
    state: {
      user,
      isAuthenticated,
      location,
    },
    actions: {
      handleLogin,
      handleLogout,
      handleAdminPageNavigation,
      handlePlayerPageNavigation,
    },
    modals: {
      showLoginModal,
      closeLoginModal,
      showLogoutConfirmModal,
      closeLogoutConfirmModal,
      showUserCardModal,
      closeUserCardModal,
      isLoginModalVisible,
      isUserCardModalVisible,
      isLogoutConfirmModalVisible,
    },
  };
};

export default useAuthModuleHandlers;
