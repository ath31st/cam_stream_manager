import React from 'react';
import { Button } from 'antd';
import styles from './IconButton.module.css';

interface IconButtonProps {
  onClick: () => void;
  children: React.ReactNode;
  icon?: React.ReactNode;
}

const IconButton: React.FC<IconButtonProps> = ({ onClick, children, icon }) => {
  return (
    <Button onClick={onClick} className={styles.customButton} icon={icon}>
      {children}
    </Button>
  );
};

export default IconButton;
