import React from 'react';
import { Layout } from 'antd';
import styles from './Header.module.css';
import { AuthModule } from '../../../features/auth';
import bannerImage from '../../../shared/ui/assets/images/banner.png';

const { Header } = Layout;

export const AppHeader: React.FC = () => {
  return (
    <Header className={styles.header}>
      <img src={bannerImage} alt="banner"></img>
      <div className={styles['auth-module']}>
        <AuthModule />
      </div>
    </Header>
  );
};
