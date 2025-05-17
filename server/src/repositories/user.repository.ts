import type { PrismaClient } from '@prisma/client';
import type { NewUserDto, UpdateUserDto } from '@shared/types';
import type { UserWithGroups } from '../types/extended.types';
import Logger from '../utils/logger';

export class UserRepository {
  private prismaClient: PrismaClient;

  constructor(prismaClient: PrismaClient) {
    this.prismaClient = prismaClient;
  }

  findUser = async (id: number): Promise<UserWithGroups> => {
    return await this.prismaClient.user.findUniqueOrThrow({
      where: { id: id },
      include: { groups: true },
    });
  };

  findUserByUsername = async (username: string): Promise<UserWithGroups> => {
    return await this.prismaClient.user.findUniqueOrThrow({
      where: { username: username },
      include: { groups: true },
    });
  };

  findUserByEmail = async (email: string): Promise<UserWithGroups> => {
    return await this.prismaClient.user.findUniqueOrThrow({
      where: { email: email },
      include: { groups: true },
    });
  };

  findPageableUsers = async (
    pageNumber: number,
    pageSize: number,
    sortOrder: 'asc' | 'desc',
    searchTerm?: string,
  ): Promise<UserWithGroups[]> => {
    const skip = (pageNumber - 1) * pageSize;

    const users = await this.prismaClient.user.findMany({
      take: pageSize,
      skip,
      orderBy: { username: sortOrder },
      where: searchTerm ? { username: { contains: searchTerm } } : undefined,
      include: { groups: true },
    });
    return users;
  };

  countUsers = async (searchTerm?: string): Promise<number> => {
    const count = await this.prismaClient.user.count({
      where: searchTerm ? { username: { contains: searchTerm } } : undefined,
    });
    return count;
  };

  existsUserByUsername = async (username: string): Promise<boolean> => {
    const user = await this.prismaClient.$queryRaw<
      { id: number }[]
    >`SELECT * FROM "User" WHERE UPPER("username") = UPPER(${username}) LIMIT 1`;

    return user.length > 0;
  };

  existsUserByEmail = async (email: string): Promise<boolean> => {
    const user = await this.prismaClient.$queryRaw<
      { id: number }[]
    >`SELECT * FROM "User" WHERE UPPER("email") = UPPER(${email}) LIMIT 1`;

    return user.length > 0;
  };

  createUser = async (dto: NewUserDto): Promise<UserWithGroups> => {
    const user = await this.prismaClient.user.create({
      data: {
        username: dto.username,
        email: dto.email,
        role: dto.role,
        password: dto.password,
        isLocked: false,
        ...(dto.groupIds && {
          groups: {
            connect: dto.groupIds.map((id) => ({ id })),
          },
        }),
      },
      include: {
        groups: true,
      },
    });
    Logger.log(user);
    return user;
  };

  updateUser = async (dto: UpdateUserDto): Promise<UserWithGroups> => {
    const user = await this.prismaClient.user.update({
      where: { id: dto.id },
      data: {
        username: dto.username,
        email: dto.email,
        role: dto.role,
        isLocked: dto.isLocked,
        ...(dto.groupIds !== undefined && {
          groups: {
            set: [],
            connect: dto.groupIds.map((id) => ({ id })),
          },
        }),
      },
      include: { groups: true },
    });

    Logger.log(user);
    return user;
  };

  changePassword = async (
    id: number,
    password: string,
  ): Promise<UserWithGroups> => {
    const user = await this.prismaClient.user.update({
      where: { id: id },
      data: {
        password: password,
      },
      include: { groups: true },
    });

    Logger.log(user);
    return user;
  };

  deleteUser = async (id: number) => {
    await this.prismaClient.user.delete({
      where: { id: id },
    });
    Logger.log(`User with id ${id} has been deleted.`);
  };
}
