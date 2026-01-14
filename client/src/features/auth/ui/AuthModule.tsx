import type React from 'react';
import useAuthModuleHandlers from '../model/use.auth.module.handlers';
import AuthButtons from './AuthButtons';
import AuthModals from './AuthModals';

const AuthModule: React.FC = () => {
  const { actions, state, modals } = useAuthModuleHandlers();

  return (
    <>
      <AuthButtons
        isAuthenticated={state.isAuthenticated}
        userRole={state.user?.role}
        username={state.user?.username}
        onShowUserCardModal={modals.showUserCardModal}
        onLogin={modals.showLoginModal}
        onLogout={modals.showLogoutConfirmModal}
        onAdminPageNavigation={actions.handleAdminPageNavigation}
        onPlayerPageNavigation={actions.handlePlayerPageNavigation}
        currentPath={state.location.pathname}
      />
      <AuthModals
        isLoginModalVisible={modals.isLoginModalVisible}
        isUserCardModalVisible={modals.isUserCardModalVisible}
        isLogoutConfirmModalVisible={modals.isLogoutConfirmModalVisible}
        onCloseLoginModal={modals.closeLoginModal}
        onCloseUserCardModal={modals.closeUserCardModal}
        onCloseLogoutConfirmModal={modals.closeLogoutConfirmModal}
        user={state.user}
        onLogin={actions.handleLogin}
        onConfirmLogout={actions.handleLogout}
      />
    </>
  );
};

export default AuthModule;
