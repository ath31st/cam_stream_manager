import {
  UserDto,
  NewUserDto,
  UpdateUserDto,
  UpdateUserPasswordDto,
} from '@shared/types';
import AddUserModal from './ui/AddUserModal';
import UpdateUserModal from './ui/UpdateUserModal';
import DeleteUserModal from './ui/DeleteUserModal';

export type User = UserDto;
export type NewUser = NewUserDto;
export type UpdateUser = UpdateUserDto;
export type UpdateUserPassword = UpdateUserPasswordDto;

export { AddUserModal, UpdateUserModal, DeleteUserModal };
export { useUserStore } from './model/user.store';
