import React from 'react';
import useServerStatusStore from '../../../app/stores/server.status.store';
import styles from './ServerStatusOverlay.module.css';
import CommonAlert from '../../../shared/ui/alerts/CommonAlert';

const ServerStatusOverlay: React.FC = () => {
  const { isServerUp } = useServerStatusStore();

  if (!isServerUp) {
    return (
      <div className={styles.overlay}>
        <CommonAlert
          message="Сервер недоступен"
          description="Пожалуйста, проверьте соединение и повторите попытку позже."
        ></CommonAlert>
      </div>
    );
  }

  return null;
};

export default ServerStatusOverlay;
