import axios from 'axios';
import { NewUser, UpdateUser, UpdateUserPassword, User } from '../index';

const API_URL = process.env.REACT_APP_API_URL + '/users';

export const fetchUsers = async (): Promise<User[]> => {
  const response = await axios.get<User[]>(API_URL);
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
