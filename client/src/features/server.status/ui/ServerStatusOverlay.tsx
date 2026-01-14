import type React from 'react';
import { CommonAlert } from '../../../shared/ui';
import { useServerStatusStore } from '..';
import styles from './ServerStatusOverlay.module.css';

const ServerStatusOverlay: React.FC = () => {
  const { isServerUp } = useServerStatusStore();

  if (!isServerUp) {
    return (
      <div className={styles.overlay}>
        <CommonAlert
          message="Сервер недоступен"
          description="Пожалуйста, проверьте соединение и повторите попытку позже."
        />
      </div>
    );
  }

  return null;
};

export default ServerStatusOverlay;
