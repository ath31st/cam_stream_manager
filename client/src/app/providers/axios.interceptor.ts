import axios from 'axios';

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
};

export default setupAxiosInterceptor;
