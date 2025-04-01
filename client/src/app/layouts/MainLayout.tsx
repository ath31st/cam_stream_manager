import { Layout } from 'antd';
import type React from 'react';
import { Outlet } from 'react-router-dom';
import Footer from '../../widgets/footer';
import Header from '../../widgets/header';
import Sider from '../../widgets/sider';
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
