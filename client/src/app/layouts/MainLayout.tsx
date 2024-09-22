import React from 'react';
import { Layout } from 'antd';
import Header from '../../widgets/header';
import Footer from '../../widgets/footer';
import Sider from '../../widgets/sider';

const { Content } = Layout;

const MainLayout: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  return (
    <Layout>
      <Header />
      <Layout>
        <Sider />
        <Layout>
          <Content>{children}</Content>
        </Layout>
      </Layout>
      <Footer />
    </Layout>
  );
};

export default MainLayout;
