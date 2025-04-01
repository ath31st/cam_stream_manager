import type { PrismaClient, ResponsiblePerson } from '@prisma/client';
import type {
  NewResponsiblePersonDto,
  UpdateResponsiblePersonDto,
} from '@shared/types';
import Logger from '../utils/logger';

export class ResponsiblePersonRepository {
  private prismaClient: PrismaClient;

  constructor(prismaClient: PrismaClient) {
    this.prismaClient = prismaClient;
  }

  findResponsiblePerson = async (id: number): Promise<ResponsiblePerson> => {
    return await this.prismaClient.responsiblePerson.findUniqueOrThrow({
      where: { id: id },
    });
  };

  findResponsiblePersonByStream = async (
    streamId: number,
  ): Promise<ResponsiblePerson[]> => {
    return await this.prismaClient.responsiblePerson.findMany({
      where: { streamId: streamId },
    });
  };

  findAllResponsiblePersons = async (): Promise<ResponsiblePerson[]> => {
    return await this.prismaClient.responsiblePerson.findMany();
  };

  createResponsiblePerson = async (
    dto: NewResponsiblePersonDto,
  ): Promise<ResponsiblePerson> => {
    const person = await this.prismaClient.responsiblePerson.create({
      data: {
        name: dto.name,
        phone: dto.phone,
        streamId: dto.streamId,
      },
    });
    Logger.log(person);
    return person;
  };

  updateResponsiblePerson = async (
    dto: UpdateResponsiblePersonDto,
  ): Promise<ResponsiblePerson> => {
    const person = await this.prismaClient.responsiblePerson.update({
      where: { id: dto.id },
      data: {
        name: dto.name,
        phone: dto.phone,
      },
    });
    Logger.log(person);
    return person;
  };

  deleteResponsiblePerson = async (id: number) => {
    await this.prismaClient.responsiblePerson.delete({
      where: { id: id },
    });
    Logger.log(`Responsible person with id ${id} has been deleted.`);
  };
}
