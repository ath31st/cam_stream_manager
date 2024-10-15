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
          colorPrimary: '#5138f2',

          colorBgBase: '#e0dfe8',
          colorBgContainer: '#e0dfe8',
          colorTextBase: '#001f3f',
          colorBorder: '#343a40',

          colorSuccess: '#28a745',
          colorWarning: '#ff8800',
          colorError: '#dc3545',
          colorInfo: '#007bff',

          borderRadius: 6,
          fontFamily: 'Vollkorn',
          fontSize: 15,
        },
      }}
    >
      {children}
    </ConfigProvider>
  );
};

export default GlobalStyleProvider;
