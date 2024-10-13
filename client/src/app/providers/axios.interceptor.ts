import axios from 'axios';
import { LOCAL_STORAGE_KEY } from '../../features/auth/lib/auth.constants';

const setupAxiosInterceptor = (setServerStatus: (status: boolean) => void) => {
  axios.interceptors.response.use(
    (response) => {
      setServerStatus(true);
      return response;
    },
    (error) => {
      if (!error.response) {
        setServerStatus(false);
      } else {
        setServerStatus(true);
      }
      return Promise.reject(error);
    },
  );

  axios.interceptors.request.use(
    (config) => {
      const storedData = localStorage.getItem(LOCAL_STORAGE_KEY);
      if (storedData) {
        const { accessToken } = JSON.parse(storedData);
        if (accessToken) {
          config.headers['Authorization'] = `Bearer ${accessToken}`;
        }
      }
      return config;
    },
    (error) => {
      return Promise.reject(error);
    },
  );
};

export default setupAxiosInterceptor;
