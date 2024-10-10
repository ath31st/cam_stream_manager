import { User } from '@prisma/client';
import { UserDto } from '@shared/types';

export const toUserDto = (user: User): UserDto => {
  return {
    id: user.id,
    username: user.username,
    email: user.email,
    role: user.role,
    registeredAt: user.createdAt,
    updatedAt: user.updatedAt,
  };
};

export const toUserDtos = (users: User[]): UserDto[] => {
  return users.map((user) => toUserDto(user));
};
