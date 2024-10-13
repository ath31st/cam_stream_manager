import React, { useEffect } from 'react';
import { useAuthStore } from '../../features/auth/model/auth.store';

interface AuthProviderProps {
  children: React.ReactNode;
}

const AuthProvider: React.FC<AuthProviderProps> = ({ children }) => {
  const { hydrate, isLoading } = useAuthStore();

  useEffect(() => {
    hydrate();
  }, [hydrate]);

  if (isLoading) {
    return null;
  }

  return <>{children}</>;
};

export default AuthProvider;
