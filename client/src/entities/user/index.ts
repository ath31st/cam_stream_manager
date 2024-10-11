import {
  UserDto,
  NewUserDto,
  UpdateUserDto,
  UpdateUserPasswordDto,
} from '@shared/types';
import {
  fetchUser,
  fetchUsers,
  createUser,
  updateUser,
  updateUserPassword,
} from './api/user.api';

export type User = UserDto;
export type NewUser = NewUserDto;
export type UpdateUser = UpdateUserDto;
export type UpdateUserPassword = UpdateUserPasswordDto;

export { fetchUser, fetchUsers, createUser, updateUser, updateUserPassword };
