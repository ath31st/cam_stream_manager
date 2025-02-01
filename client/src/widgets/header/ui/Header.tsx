import React from 'react';
import { Layout } from 'antd';
import styles from './Header.module.css';
import { AuthModule } from '../../../features/auth';

const { Header } = Layout;

export const AppHeader: React.FC = () => {
  return (
    <Header className={styles.header}>
      <div className={styles.authModule}>
        <AuthModule />
      </div>

      <div className={styles.contentWrapper}>
        <div className={styles.binaryAnimation}>
          <div className={styles.binaryColumn}>
            <span>01010110</span>
            <span>11001011</span>
            <span>00110101</span>
            <span>10101010</span>
          </div>
          <div className={styles.binaryColumn}>
            <span>11100011</span>
            <span>00110011</span>
            <span>10101010</span>
            <span>01010101</span>
          </div>
          <div className={styles.binaryColumn}>
            <span>00011100</span>
            <span>11001100</span>
            <span>01010101</span>
            <span>11110000</span>
          </div>
          <div className={styles.binaryColumn}>
            <span>10100101</span>
            <span>01011010</span>
            <span>11001100</span>
            <span>00110011</span>
          </div>
          <div className={styles.binaryColumn}>
            <span>11110000</span>
            <span>00001111</span>
            <span>10101010</span>
            <span>01010101</span>
          </div>
        </div>
      </div>
    </Header>
  );
};
