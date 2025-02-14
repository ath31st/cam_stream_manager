import { PrismaClient } from '@prisma/client';
import { Logger } from '../utils/logger';
import { NewUserDto, UpdateUserDto } from '@shared/types';
import { UserWithGroups } from '../types/extended.types';

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

  findAllUsers = async (): Promise<UserWithGroups[]> => {
    return await this.prismaClient.user.findMany({
      include: { groups: true },
    });
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
