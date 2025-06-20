import axios from 'axios';

const API_URL = `${import.meta.env.VITE_API_URL}/health-check`;

export const checkServerStatus = async (): Promise<boolean> => {
  try {
    const status = (await axios.get(API_URL)).status;
    return status === 200;
  } catch {
    return false;
  }
};
