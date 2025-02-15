import axios from 'axios';
import { PlaylistInfo } from '../index';

const API_URL = process.env.REACT_APP_API_URL + '/dashboard';

export const fetchDashboardData = async (): Promise<PlaylistInfo[]> => {
  const response = await axios.get<PlaylistInfo[]>(API_URL);
  return response.data;
};
