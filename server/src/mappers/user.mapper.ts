import { UserDto } from '@shared/types';
import { UserWithGroups } from '../types/extended.types';

export const toUserDto = (user: UserWithGroups): UserDto => {
  return {
    id: user.id,
    username: user.username,
    email: user.email,
    role: user.role,
    isLocked: user.isLocked,
    registeredAt: user.createdAt,
    updatedAt: user.updatedAt,
    groupIds: user.groups.map((group) => group.id),
  };
};

export const toUserDtos = (users: UserWithGroups[]): UserDto[] => {
  return users.map((user) => toUserDto(user));
};
