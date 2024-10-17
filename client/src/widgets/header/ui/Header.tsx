import React from 'react';
import { Layout } from 'antd';
import styles from './Header.module.css';
import { AuthModule } from '../../../features/auth';

const { Header } = Layout;

export const AppHeader: React.FC = () => {
  return (
    <Header className={styles.header}>
      <div className={`${styles.waveWrapper} ${styles.waveAnimation}`}>
        <div className={`${styles.waveWrapperInner} ${styles.bgTop}`}>
          <div className={`${styles.wave} ${styles.waveTop}`} />
        </div>
        <div className={`${styles.waveWrapperInner} ${styles.bgMiddle}`}>
          <div className={`${styles.wave} ${styles.waveMiddle}`} />
        </div>
        <div className={`${styles.waveWrapperInner} ${styles.bgBottom}`}>
          <div className={`${styles.wave} ${styles.waveBottom}`} />
        </div>
      </div>
      <div className={styles.authModule}>
        <AuthModule />
      </div>
    </Header>
  );
};
