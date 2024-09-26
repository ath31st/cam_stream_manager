import React from 'react';
import { Layout } from 'antd';
import Header from '../../widgets/header';
import Footer from '../../widgets/footer';
import Sider from '../../widgets/sider';
import { Outlet } from 'react-router-dom';

const { Content } = Layout;

const MainLayout: React.FC = () => {
  return (
    <Layout>
      <Header />
      <Layout>
        <Sider />
        <Layout>
          <Content>
            <Outlet />
          </Content>
        </Layout>
      </Layout>
      <Footer />
    </Layout>
  );
};

export default MainLayout;
