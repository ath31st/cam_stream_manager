import React, { ReactNode } from 'react';
import { ConfigProvider } from 'antd';
import 'antd/dist/reset.css';
import '../styles/fonts.css';
import '../styles/global.css';
import '../styles/variables.css';

interface GlobalStyleProviderProps {
  children: ReactNode;
}

const GlobalStyleProvider: React.FC<GlobalStyleProviderProps> = ({
  children,
}) => {
  return (
    <ConfigProvider
      theme={{
        token: {
          colorPrimary: '#6d93b0',

          colorBgBase: '#2c3e50',
          colorBgContainer: '#34495e',
          colorTextBase: '#ecf0f1',
          colorBorder: '#84bec2',

          borderRadius: 0,
          fontFamily: 'Vollkorn',
          fontSize: 16,
        },
        components: {
          Layout: {
            siderBg: 'transparent',
          },
        },
      }}
    >
      {children}
    </ConfigProvider>
  );
};

export default GlobalStyleProvider;
