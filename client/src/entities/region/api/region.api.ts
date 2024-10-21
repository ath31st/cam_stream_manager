import axios from 'axios';
import { Region, NewRegion, UpdateRegion } from '../index';

const API_URL = process.env.REACT_APP_API_URL + '/regions';

export const fetchRegions = async (isVisible?: boolean): Promise<Region[]> => {
  const response = await axios.get<Region[]>(API_URL, {
    params: { isVisible },
  });
  return response.data;
};

export const fetchRegion = async (id: number): Promise<Region> => {
  const response = await axios.get<Region>(`${API_URL}/${id}`);
  return response.data;
};

export const createRegion = async (region: NewRegion): Promise<Region> => {
  const response = await axios.post<Region>(API_URL, region);
  return response.data;
};

export const updateRegion = async (
  id: number,
  region: UpdateRegion,
): Promise<Region> => {
  const response = await axios.put<Region>(`${API_URL}/${id}`, region);
  return response.data;
};

export const deleteRegion = async (id: number): Promise<void> => {
  await axios.delete(`${API_URL}/${id}`);
};
