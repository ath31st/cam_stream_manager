import React from 'react';
import { Layout } from 'antd';
import styles from './Footer.module.css';
import footerBannerImage from '../../../shared/ui/assets/images/bottom_banner.png';

const { Footer } = Layout;

export const AppFooter: React.FC = () => {
  return (
    <Footer className={styles.footer}>
      <img src={footerBannerImage} alt="banner"></img>
    </Footer>
  );
};
