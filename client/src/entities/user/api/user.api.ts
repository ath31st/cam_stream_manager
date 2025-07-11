import axios from 'axios';
import type {
  NewUser,
  Page,
  UpdateUser,
  UpdateUserPassword,
  User,
} from '@/shared/api.types';

const API_URL = `${import.meta.env.VITE_API_URL}/users`;

export const fetchUsers = async (
  pageNumber?: number,
  pageSize?: number,
  searchTerm?: string,
): Promise<Page<User>> => {
  const params = {
    pageNumber,
    pageSize,
    searchTerm,
  };
  const response = await axios.get<Page<User>>(API_URL, { params });
  return response.data;
};

export const fetchUser = async (id: number): Promise<User> => {
  const response = await axios.get<User>(`${API_URL}/${id}`);
  return response.data;
};

export const createUser = async (newUser: NewUser): Promise<User> => {
  const response = await axios.post<User>(API_URL, newUser);
  return response.data;
};

export const updateUser = async (updateUser: UpdateUser): Promise<User> => {
  const response = await axios.put<User>(
    `${API_URL}/${updateUser.id}`,
    updateUser,
  );
  return response.data;
};

export const updateUserPassword = async (
  updateUserPassword: UpdateUserPassword,
): Promise<void> => {
  await axios.put(
    `${API_URL}/${updateUserPassword.id}/password`,
    updateUserPassword,
  );
};

export const deleteUser = async (id: number): Promise<void> => {
  await axios.delete(`${API_URL}/${id}`);
};
