import { Alert } from 'antd';
import type React from 'react';
import styles from './CommonAlert.module.css';

interface CommonAlertProps {
  message: string;
  description: string;
}

const CommonAlert: React.FC<CommonAlertProps> = ({ message, description }) => {
  return (
    <Alert
      className={styles.alert}
      message={message}
      description={description}
      type="error"
      showIcon
    />
  );
};

export default CommonAlert;
