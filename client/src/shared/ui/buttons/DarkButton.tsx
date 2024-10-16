import React from 'react';
import { Button } from 'antd';
import commonStyles from './CommonButton.module.css';
import styles from './DarkButton.module.css';

interface DarkButtonProps {
  onClick: () => void;
  children: React.ReactNode;
  type?: 'default' | 'primary' | 'dashed' | 'link' | 'text';
}

const DarkButton: React.FC<DarkButtonProps> = ({
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

export default DarkButton;
