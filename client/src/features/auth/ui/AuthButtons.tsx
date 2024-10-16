import React from 'react';
import { Button } from 'antd';
import {
  UserOutlined,
  LoginOutlined,
  LogoutOutlined,
  ToolOutlined,
  PlayCircleOutlined,
} from '@ant-design/icons';
import styles from './AuthButtons.module.css';
import routes from '../../../shared/routes/routes';

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
          <Button
            className={styles.fixedWidthButton}
            icon={<UserOutlined />}
            onClick={onShowUserCardModal}
          >
            {username}
          </Button>
          {currentPath === routes.ADMIN ? (
            <Button
              className={styles.fixedWidthButton}
              icon={<PlayCircleOutlined />}
              onClick={onPlayerPageNavigation}
            >
              Плеер
            </Button>
          ) : (
            <Button
              className={styles.fixedWidthButton}
              icon={<ToolOutlined />}
              onClick={onAdminPageNavigation}
            >
              Настройки
            </Button>
          )}
          <Button
            className={styles.fixedWidthButton}
            icon={<LogoutOutlined />}
            onClick={onLogout}
          >
            Выход
          </Button>
        </>
      ) : (
        <Button
          className={styles.fixedWidthButton}
          icon={<LoginOutlined />}
          onClick={onLogin}
        >
          Войти
        </Button>
      )}
    </div>
  );
};

export default AuthButtons;
