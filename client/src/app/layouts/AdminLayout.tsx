import { Layout } from 'antd';
import type React from 'react';
import { Outlet } from 'react-router-dom';
import Footer from '@/widgets/footer';
import Header from '@/widgets/header';
import styles from './AdminLayout.module.css';

const { Content } = Layout;

const AdminLayout: React.FC = () => {
  return (
    <Layout className={styles.pageLayout}>
      <Header />
      <Layout className={styles.innerLayout}>
        <Content className={styles.content}>
          <Outlet />
        </Content>
      </Layout>
      <Footer />
    </Layout>
  );
};

export default AdminLayout;
