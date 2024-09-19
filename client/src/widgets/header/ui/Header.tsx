import React from 'react';
import { Layout } from 'antd';
import styles from './Header.module.css';

const { Header } = Layout;

export const AppHeader: React.FC = () => {
  return (
    <Header className={styles.header}>
      <div className={styles.logo} />
    </Header>
  );
};
