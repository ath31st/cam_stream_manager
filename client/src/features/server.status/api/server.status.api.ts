import axios from 'axios';

const API_URL = process.env.REACT_APP_API_URL + '/health-check';

export const checkServerStatus = async (): Promise<boolean> => {
  try {
    const status = (await axios.get(API_URL)).status;
    return status === 200;
  } catch {
    return false;
  }
};
