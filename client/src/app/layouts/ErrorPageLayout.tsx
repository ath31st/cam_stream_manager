import { Layout } from 'antd';
import { Header, Footer } from 'antd/es/layout/layout';
import { Outlet } from 'react-router-dom';
import styles from './ErrorPageLayout.module.css';

const { Content } = Layout;

const ErrorPageLayout: React.FC = () => {
  return (
    <Layout className={styles.pageLayout}>
      <Layout className={styles.innerLayout}>
        <Content className={styles.content}>
          <Outlet />
        </Content>
      </Layout>
    </Layout>
  );
};

export default ErrorPageLayout;
