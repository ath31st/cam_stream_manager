import React from 'react';
import { Layout } from 'antd';
import Header from '../../widgets/header';
import Footer from '../../widgets/footer';
import { Outlet } from 'react-router-dom';

const { Content } = Layout;

const AdminLayout: React.FC = () => {
  return (
    <Layout>
      <Header />
      <Layout>
        <Content>
          <Outlet />
        </Content>
      </Layout>
      <Footer />
    </Layout>
  );
};

export default AdminLayout;
