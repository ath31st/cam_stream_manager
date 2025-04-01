import axios from 'axios';
import type { Login, Tokens } from '../index';

const API_URL = process.env.REACT_APP_API_URL;

export const login = async (loginData: Login): Promise<Tokens> => {
  const response = await axios.post(`${API_URL}/login`, loginData);
  return response.data;
};

export const refreshAccessToken = async (
  refreshToken: string,
): Promise<string> => {
  const response = await axios.post(`${API_URL}/refresh-token`, {
    refreshToken: refreshToken,
  });
  return response.data.accessToken;
};

export const logout = async (refreshToken: string): Promise<void> => {
  await axios.post(`${API_URL}/logout`, { refreshToken: refreshToken });
};
