import React from 'react';
import { Alert } from 'antd'; 
import useServerStatusStore from '../../../app/stores/server.status.store';

const ServerStatusBanner: React.FC = () => {
  const { isServerUp } = useServerStatusStore();

  if (!isServerUp) {
    return (
      <Alert
        message="Сервер недоступен"
        description="Пожалуйста, проверьте соединение и повторите попытку позже."
        type="error"
        showIcon
      />
    );
  }

  return null;
};

export default ServerStatusBanner;
