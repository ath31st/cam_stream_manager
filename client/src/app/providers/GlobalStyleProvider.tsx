// AppProvider.tsx
import React, { ReactNode } from 'react';
import { ConfigProvider } from 'antd';
import 'antd/dist/reset.css';
import '../styles/fonts.css';
import '../styles/global.css';

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
          colorPrimary: '#00b96b',
          borderRadius: 6,
          fontFamily: 'Vollkorn',
          fontSize: 15,
          colorBgContainer: '#f6ffed',
        },
      }}
    >
      {children}
    </ConfigProvider>
  );
};

export default GlobalStyleProvider;
