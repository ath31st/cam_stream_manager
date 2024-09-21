import React from 'react';
import { Layout } from 'antd';
import Header from '../../widgets/header';
import Footer from '../../widgets/footer';

const { Content } = Layout;

const MainLayout: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  return (
    <Layout>
      <Header />
      <Content>{children}</Content>
      <Footer />
    </Layout>
  );
};

export default MainLayout;
