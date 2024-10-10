import React from 'react';
import { Alert } from 'antd';
import useServerStatusStore from '../../../app/stores/server.status.store';
import styles from './ServerStatusOverlay.module.css';

const ServerStatusOverlay: React.FC = () => {
  const { isServerUp } = useServerStatusStore();

  if (!isServerUp) {
    return (
      <div className={styles.overlay}>
        <div className={styles.alertContainer}>
          <Alert
            message="Сервер недоступен"
            description="Пожалуйста, проверьте соединение и повторите попытку позже."
            type="error"
            showIcon
          />
        </div>
      </div>
    );
  }

  return null;
};

export default ServerStatusOverlay;
