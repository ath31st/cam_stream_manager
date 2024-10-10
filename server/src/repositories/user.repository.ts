import { PrismaClient, User } from '@prisma/client';
import { Logger } from '../utils/logger';
import { NewUserDto, UpdateUserDto } from '@shared/types';

export class UserRepository {
  private prismaClient: PrismaClient;

  constructor(prismaClient: PrismaClient) {
    this.prismaClient = prismaClient;
  }

  findUser = async (id: number): Promise<User> => {
    return await this.prismaClient.user.findUniqueOrThrow({
      where: { id: id },
    });
  };

  findUserByUsername = async (username: string): Promise<User> => {
    return await this.prismaClient.user.findUniqueOrThrow({
      where: { username: username },
    });
  };

  findUserByEmail = async (email: string): Promise<User> => {
    return await this.prismaClient.user.findUniqueOrThrow({
      where: { email: email },
    });
  };

  findAllUsers = async (): Promise<User[]> => {
    return await this.prismaClient.user.findMany();
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

  createUser = async (dto: NewUserDto): Promise<User> => {
    const user = await this.prismaClient.user.create({
      data: {
        username: dto.username,
        email: dto.email,
        role: dto.role,
        password: dto.password,
        isLocked: false,
      },
    });
    Logger.log(user);
    return user;
  };

  updateUser = async (dto: UpdateUserDto): Promise<User> => {
    const user = await this.prismaClient.user.update({
      where: { id: dto.id },
      data: {
        username: dto.username,
        email: dto.email,
        role: dto.role,
        isLocked: dto.isLocked,
      },
    });
    Logger.log(user);
    return user;
  };

  changePassword = async (id: number, password: string): Promise<User> => {
    const user = await this.prismaClient.user.update({
      where: { id: id },
      data: {
        password: password,
      },
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
