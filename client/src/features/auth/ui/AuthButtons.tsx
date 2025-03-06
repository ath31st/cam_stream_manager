import React from 'react';
import {
  UserOutlined,
  LoginOutlined,
  LogoutOutlined,
  ToolOutlined,
  PlayCircleOutlined,
} from '@ant-design/icons';
import styles from './AuthButtons.module.css';
import routes from '../../../shared/routes';
import { IconButton } from '../../../shared/ui';
import UserRoles from '../lib/user.roles';

interface AuthButtonsProps {
  isAuthenticated: boolean;
  userRole?: string;
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
  userRole,
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

          {userRole === UserRoles.ADMIN &&
            (currentPath === routes.ADMIN ? (
              <IconButton
                icon={<PlayCircleOutlined />}
                onClick={onPlayerPageNavigation}
              >
                Плеер
              </IconButton>
            ) : (
              <IconButton
                icon={<ToolOutlined />}
                onClick={onAdminPageNavigation}
              >
                Настройки
              </IconButton>
            ))}

          <IconButton icon={<LogoutOutlined />} onClick={onLogout}>
            Выход
          </IconButton>
        </>
      ) : (
        <IconButton icon={<LoginOutlined />} onClick={onLogin}>
          Вход
        </IconButton>
      )}
    </div>
  );
};

export default AuthButtons;
