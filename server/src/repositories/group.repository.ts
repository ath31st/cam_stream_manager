import { Group, PrismaClient } from '@prisma/client';
import { Logger } from '../utils/logger';
import { NewGroupDto, UpdateGroupDto } from '@shared/types';

export class GroupRepository {
  private prismaClient: PrismaClient;

  constructor(prismaClient: PrismaClient) {
    this.prismaClient = prismaClient;
  }

  findGroup = async (id: number): Promise<Group> => {
    return await this.prismaClient.group.findUniqueOrThrow({
      where: { id: id },
    });
  };

  findGroups = async (): Promise<Group[]> => {
    return await this.prismaClient.group.findMany();
  };

  createGroup = async (dto: NewGroupDto): Promise<Group> => {
    const group = await this.prismaClient.group.create({
      data: {
        name: dto.name,
      },
    });
    Logger.log(group);
    return group;
  };

  updateGroup = async (id: number, dto: UpdateGroupDto): Promise<Group> => {
    const group = await this.prismaClient.group.update({
      where: { id },
      data: {
        name: dto.name,
      },
    });
    Logger.log('Updated group', group);
    return group;
  };

  deleteGroup = async (id: number) => {
    await this.prismaClient.group.delete({
      where: { id },
    });
    Logger.log(`Deleted group with id ${id}`);
  };
}
