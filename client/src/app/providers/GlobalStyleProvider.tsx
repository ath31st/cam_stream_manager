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
          colorPrimary: '#808080',
          colorBgBase: '#2c333a',
          colorBgContainer: '#3a3f45',
          colorTextBase: '#ffffff',
          colorBorder: '#9e9e9e',

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
