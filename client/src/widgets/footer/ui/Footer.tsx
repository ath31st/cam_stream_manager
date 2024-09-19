import React from 'react';
import { Layout } from 'antd';
import styles from './Footer.module.css';

const { Footer } = Layout;

export const AppFooter: React.FC = () => {
  return (
    <Footer className={styles.footer}>
      Ant Design ©2024 Created by Ant UED
    </Footer>
  );
};
