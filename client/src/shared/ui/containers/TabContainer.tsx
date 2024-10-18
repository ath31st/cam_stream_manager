import React from 'react';
import styles from './TabContainer.module.css';

interface TabContainerProps {
  children: React.ReactNode;
}

const TabContainer: React.FC<TabContainerProps> = ({ children }) => {
  return <div className={styles.container}>{children}</div>;
};

export default TabContainer;
