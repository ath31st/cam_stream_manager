import React, { useState } from 'react';
import { Button } from 'antd';
import { useAuthStore } from '../model/auth.store';
import {
  errorNotification,
  successNotification,
} from '../../../shared/notifications';
import AuthModals from './AuthModals';

const AuthModule: React.FC = () => {
  const { isAuthenticated, login, user, logout, clearError } = useAuthStore();
  const [isLoginModalVisible, setLoginModalVisible] = useState(false);
  const [isUserCardModalVisible, setUserCardModalVisible] = useState(false);
  const [isLogoutConfirmModalVisible, setLogoutConfirmModalVisible] =
    useState(false);

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

  return (
    <>
      {isAuthenticated ? (
        <>
          <Button onClick={() => setUserCardModalVisible(true)}>
            {user?.username}
          </Button>
          <Button onClick={() => setLogoutConfirmModalVisible(true)}>
            Выход
          </Button>
        </>
      ) : (
        <Button onClick={() => setLoginModalVisible(true)}>Войти</Button>
      )}

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
