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
import AddUserModal from './ui/AddUserModal';
import UpdateUserModal from './ui/UpdateUserModal';
import DeleteUserModal from './ui/DeleteUserModal';

export type User = UserDto;
export type NewUser = NewUserDto;
export type UpdateUser = UpdateUserDto;
export type UpdateUserPassword = UpdateUserPasswordDto;

export { fetchUser, fetchUsers, createUser, updateUser, updateUserPassword };
export { AddUserModal, UpdateUserModal, DeleteUserModal };
