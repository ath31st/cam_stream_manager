import { Button } from 'antd';
import type React from 'react';
import commonStyles from './CommonButton.module.css';
import styles from './IconButton.module.css';

interface IconButtonProps {
  onClick: () => void;
  children: React.ReactNode;
  icon?: React.ReactNode;
}

const IconButton: React.FC<IconButtonProps> = ({ onClick, children, icon }) => {
  return (
    <Button
      onClick={onClick}
      className={`${styles.btn} ${commonStyles['btn-one']}`}
      icon={icon}
    >
      <span>{children}</span>
    </Button>
  );
};

export default IconButton;
