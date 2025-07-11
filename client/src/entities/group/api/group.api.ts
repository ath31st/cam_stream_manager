import axios from 'axios';
import type { Group, NewGroup, UpdateGroup } from '@/shared/api.types';

const API_URL = `${import.meta.env.VITE_API_URL}/groups`;

export const fetchGroups = async (): Promise<Group[]> => {
  const response = await axios.get<Group[]>(API_URL);
  return response.data;
};

export const fetchGroup = async (id: number): Promise<Group> => {
  const response = await axios.get<Group>(`${API_URL}/${id}`);
  return response.data;
};

export const createGroup = async (group: NewGroup): Promise<Group> => {
  const response = await axios.post<Group>(API_URL, group);
  return response.data;
};

export const updateGroup = async (
  id: number,
  group: UpdateGroup,
): Promise<Group> => {
  const response = await axios.put<Group>(`${API_URL}/${id}`, group);
  return response.data;
};

export const deleteGroup = async (id: number): Promise<void> => {
  await axios.delete(`${API_URL}/${id}`);
};
