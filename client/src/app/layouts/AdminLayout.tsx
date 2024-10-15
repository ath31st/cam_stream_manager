import React from 'react';
import { Layout } from 'antd';
import Header from '../../widgets/header';
import Footer from '../../widgets/footer';
import { Outlet } from 'react-router-dom';
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
