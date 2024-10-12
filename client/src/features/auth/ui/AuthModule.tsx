import React, { useState } from 'react';
import { Button } from 'antd';
import LoginModal from './LoginModal';
import UserCardModal from './UserCardModal';
import LogoutConfirmModal from './LogoutConfirmModal';
import { useAuthStore } from '../model/auth.store';

const AuthModule: React.FC = () => {
  const { isAuthenticated, login, user, logout } = useAuthStore();
  const [isLoginModalVisible, setLoginModalVisible] = useState(false);
  const [isUserCardModalVisible, setUserCardModalVisible] = useState(false);
  const [isLogoutConfirmModalVisible, setLogoutConfirmModalVisible] =
    useState(false);

  const handleLogin = async (username: string, password: string) => {
    await login(username, password);
    setLoginModalVisible(false);
  };

  const handleLogout = async () => {
    await logout();
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

      <LoginModal
        visible={isLoginModalVisible}
        onClose={() => setLoginModalVisible(false)}
        onLogin={handleLogin}
      />
      <UserCardModal
        visible={isUserCardModalVisible}
        onClose={() => setUserCardModalVisible(false)}
        user={user}
      />
      <LogoutConfirmModal
        visible={isLogoutConfirmModalVisible}
        onClose={() => setLogoutConfirmModalVisible(false)}
        onConfirm={handleLogout}
      />
    </>
  );
};

export default AuthModule;
