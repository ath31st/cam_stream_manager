import React from 'react';
import {
  UserOutlined,
  LoginOutlined,
  LogoutOutlined,
  ToolOutlined,
  PlayCircleOutlined,
} from '@ant-design/icons';
import styles from './AuthButtons.module.css';
import routes from '../../../shared/routes/routes';
import IconButton from '../../../shared/ui/buttons/IconButton';

interface AuthButtonsProps {
  isAuthenticated: boolean;
  username?: string;
  onShowUserCardModal: () => void;
  onLogin: () => void;
  onLogout: () => void;
  onAdminPageNavigation: () => void;
  onPlayerPageNavigation: () => void;
  currentPath: string;
}

const AuthButtons: React.FC<AuthButtonsProps> = ({
  isAuthenticated,
  username,
  onShowUserCardModal,
  onLogin,
  onLogout,
  onAdminPageNavigation,
  onPlayerPageNavigation,
  currentPath,
}) => {
  return (
    <div className={styles.buttonContainer}>
      {isAuthenticated ? (
        <>
          <IconButton icon={<UserOutlined />} onClick={onShowUserCardModal}>
            {username}
          </IconButton>
          {currentPath === routes.ADMIN ? (
            <IconButton
              icon={<PlayCircleOutlined />}
              onClick={onPlayerPageNavigation}
            >
              Плеер
            </IconButton>
          ) : (
            <IconButton icon={<ToolOutlined />} onClick={onAdminPageNavigation}>
              Настройки
            </IconButton>
          )}
          <IconButton icon={<LogoutOutlined />} onClick={onLogout}>
            Выход
          </IconButton>
        </>
      ) : (
        <IconButton icon={<LoginOutlined />} onClick={onLogin}>
          Войти
        </IconButton>
      )}
    </div>
  );
};

export default AuthButtons;
