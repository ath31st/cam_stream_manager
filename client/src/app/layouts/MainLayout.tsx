import React from 'react';
import { Layout } from 'antd';
import Header from '../../widgets/header';
import Footer from '../../widgets/footer';
import Sider from '../../widgets/sider';
import { Outlet } from 'react-router-dom';
import styles from './MainLayout.module.css';

const { Content } = Layout;

const MainLayout: React.FC = () => {
  return (
    <Layout className={styles.pageLayout}>
      <Header />
      <Layout className={styles.innerLayout}>
        <Sider />
        <Layout>
          <Content className={styles.content}>
            <Outlet />
          </Content>
        </Layout>
      </Layout>
      <Footer />
    </Layout>
  );
};

export default MainLayout;
