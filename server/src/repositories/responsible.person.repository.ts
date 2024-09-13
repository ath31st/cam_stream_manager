import { PrismaClient, ResponsiblePerson } from '@prisma/client';
import {
  NewResponsiblePersonDto,
  UpdateResponsiblePersonDto,
} from '../types/types';

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

  createResponsiblePerson = async (dto: NewResponsiblePersonDto) => {
    const person = await this.prismaClient.responsiblePerson.create({
      data: {
        name: dto.name,
        phone: dto.phone,
        streamId: dto.streamId,
      },
    });
    console.log(person);
  };

  updateResponsiblePerson = async (dto: UpdateResponsiblePersonDto) => {
    const person = await this.prismaClient.responsiblePerson.update({
      where: { id: dto.id },
      data: {
        name: dto.name,
        phone: dto.phone,
      },
    });
    console.log(person);
  };

  deleteResponsiblePerson = async (id: number) => {
    await this.prismaClient.responsiblePerson.delete({
      where: { id: id },
    });
    console.log(`Responsible person with id ${id} has been deleted.`);
  };
}
