import React, { useEffect } from 'react';
import setupAxiosInterceptor from '../providers/axios.interceptor';
import useServerStatusStore from '../stores/server.status.store';

interface AxiosInterceptorProviderProps {
  children: React.ReactNode;
}

const AxiosInterceptorProvider: React.FC<AxiosInterceptorProviderProps> = ({
  children,
}) => {
  const { setServerStatus } = useServerStatusStore();

  useEffect(() => {
    setupAxiosInterceptor(setServerStatus);
  }, [setServerStatus]);

  return <>{children}</>;
};

export default AxiosInterceptorProvider;
