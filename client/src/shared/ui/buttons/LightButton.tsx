import React from 'react';
import { Button } from 'antd';
import styles from './LightButton.module.css';

interface LightButtonProps {
  onClick: () => void;
  children: React.ReactNode;
  type?: 'default' | 'primary' | 'dashed' | 'link' | 'text';
}

const LightButton: React.FC<LightButtonProps> = ({
  onClick,
  children,
  type = 'default',
}) => {
  return (
    <Button onClick={onClick} type={type} className={styles.customButton}>
      {children}
    </Button>
  );
};

export default LightButton;
