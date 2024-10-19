import React from 'react';
import { Button } from 'antd';
import commonStyles from './CommonButton.module.css';
import styles from './WideButton.module.css';

interface WideButtonProps {
  onClick: () => void;
  children: React.ReactNode;
  type?: 'default' | 'primary' | 'dashed' | 'link' | 'text';
}

const WideButton: React.FC<WideButtonProps> = ({
  onClick,
  children,
  type = 'default',
}) => {
  return (
    <Button
      onClick={onClick}
      type={type}
      className={`${styles.btn} ${commonStyles['btn-one']}`}
    >
      {children}
    </Button>
  );
};

export default WideButton;
