import React from 'react';
import { Button } from 'antd';
import commonStyles from './CommonButton.module.css';
import styles from './NarrowButton.module.css';

interface NarrowButtonProps {
  onClick: () => void;
  children: React.ReactNode;
  type?: 'default' | 'primary' | 'dashed' | 'link' | 'text';
}

const NarrowButton: React.FC<NarrowButtonProps> = ({
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

export default NarrowButton;
