import type React from 'react';
import { useEffect } from 'react';
import { useServerStatusStore } from '../../features/server.status';
import setupAxiosInterceptor from '../providers/axios.interceptor';

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
