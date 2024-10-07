import axios from 'axios';
import { RegionInfo } from '../index';

const API_URL = process.env.REACT_APP_API_URL + '/dashboard';

export const fetchDashboardData = async (): Promise<RegionInfo[]> => {
  const response = await axios.get<RegionInfo[]>(API_URL);
  return response.data;
};
