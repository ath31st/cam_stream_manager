import {
  UserDto,
  NewUserDto,
  UpdateUserDto,
  UpdateUserPasswordDto,
} from '@shared/types';

export type User = UserDto;
export type NewUser = NewUserDto;
export type UpdateUser = UpdateUserDto;
export type UpdateUserPassword = UpdateUserPasswordDto;

export { useUserStore } from './model/user.store';
