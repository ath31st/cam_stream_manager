import React, { useEffect } from 'react';
import setupAxiosInterceptor from '../providers/axios.interceptor';
import useServerStatusStore from '../stores/server.status.store';

interface AxiosInterceptorProviderProps {
  children: React.ReactNode;
}

const AxiosInterceptorProvider: React.FC<AxiosInterceptorProviderProps> = ({
  children,
}) => {
  const { setServerStatus, startHealthCheck, stopHealthCheck } =
    useServerStatusStore();

  useEffect(() => {
    setupAxiosInterceptor(setServerStatus);
    startHealthCheck();

    return () => {
      stopHealthCheck();
    };
  }, [setServerStatus, startHealthCheck, stopHealthCheck]);

  return <>{children}</>;
};

export default AxiosInterceptorProvider;
