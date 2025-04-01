import { ConfigProvider } from 'antd';
import ruRU from 'antd/lib/locale/ru_RU';
import type React from 'react';

interface LocaleProviderProps {
  children: React.ReactNode;
}

const LocaleProvider: React.FC<LocaleProviderProps> = ({ children }) => {
  return <ConfigProvider locale={ruRU}>{children}</ConfigProvider>;
};

export default LocaleProvider;
