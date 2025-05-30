import axios from 'axios';
import { resetStores } from '../';
import {
  LOCAL_STORAGE_KEY,
  isTokenExpired,
  useAuthStore,
} from '../../features/auth';

const setupAxiosInterceptor = (setServerStatus: (status: boolean) => void) => {
  axios.interceptors.response.use(
    (response) => {
      setServerStatus(true);
      return response;
    },
    async (error) => {
      const originalRequest = error.config;
      const { status } = error.response;

      if (status === 401 && !originalRequest._retry) {
        originalRequest._retry = true;

        const refreshToken = useAuthStore.getState().refreshToken;
        if (refreshToken && !isTokenExpired(refreshToken)) {
          try {
            await useAuthStore.getState().refreshAccessToken();
            const newAccessToken = useAuthStore.getState().accessToken;
            originalRequest.headers.Authorization = `Bearer ${newAccessToken}`;
            return await axios(originalRequest);
          } catch (refreshError) {
            console.error('Error refreshing access token:', refreshError);
          }
        }
        await useAuthStore.getState().logout();
        resetStores();
        return Promise.reject(error);
      }

      if (!error.response) {
        setServerStatus(false);
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
          config.headers.Authorization = `Bearer ${accessToken}`;
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
