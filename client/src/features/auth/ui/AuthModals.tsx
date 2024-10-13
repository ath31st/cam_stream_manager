import React from 'react';
import { JwtUser } from '../model/auth.model';
import LoginModal from './LoginModal';
import LogoutConfirmModal from './LogoutConfirmModal';
import UserCardModal from './UserCardModal';

interface AuthModalProps {
  isLoginModalVisible: boolean;
  isUserCardModalVisible: boolean;
  isLogoutConfirmModalVisible: boolean;
  onCloseLoginModal: () => void;
  onCloseUserCardModal: () => void;
  onCloseLogoutConfirmModal: () => void;
  user: JwtUser | null;
  onLogin: (username: string, password: string) => Promise<void>;
  onConfirmLogout: () => Promise<void>;
}

const AuthModals: React.FC<AuthModalProps> = ({
  isLoginModalVisible,
  isUserCardModalVisible,
  isLogoutConfirmModalVisible,
  onCloseLoginModal,
  onCloseUserCardModal,
  onCloseLogoutConfirmModal,
  user,
  onLogin,
  onConfirmLogout,
}) => {
  return (
    <>
      <LoginModal
        visible={isLoginModalVisible}
        onClose={onCloseLoginModal}
        onLogin={onLogin}
      />
      <UserCardModal
        visible={isUserCardModalVisible}
        onClose={onCloseUserCardModal}
        user={user}
      />
      <LogoutConfirmModal
        visible={isLogoutConfirmModalVisible}
        onClose={onCloseLogoutConfirmModal}
        onConfirm={onConfirmLogout}
      />
    </>
  );
};

export default AuthModals;
