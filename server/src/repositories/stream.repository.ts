import { NewStreamDto, UpdateStreamDto } from '../utils/types';
import { StreamStatus } from '../utils/stream.status';
import { PrismaClient } from '@prisma/client';

class StreamRepository {
  private prismaClient: PrismaClient;

  constructor(prismaClient: PrismaClient) {
    this.prismaClient = prismaClient;
  }

  createStream = async (dto: NewStreamDto) => {
    const status = StreamStatus.Created;
    const stream = await this.prismaClient.stream.create({
      data: {
        location: dto.location,
        isVisible: true,
        streamUrl: dto.streamUrl,
        status: status,
        comment: dto.comment,
        responsiblePerson: dto.responsiblePerson,
        responsiblePhone: dto.responsiblePhone,
      },
    });
    console.log(stream);
  };

  updateStream = async (dto: UpdateStreamDto) => {
    const stream = await this.prismaClient.stream.update({
      where: { id: dto.id },
      data: {
        location: dto.location,
        isVisible: dto.isVisible,
        streamUrl: dto.streamUrl,
        status: StreamStatus.Updated,
        comment: dto.comment,
        responsiblePerson: dto.responsiblePerson,
        responsiblePhone: dto.responsiblePhone,
      },
    });
    console.log(stream);
  };

  deleteStream = async (id: number) => {
    await this.prismaClient.stream.delete({
      where: { id: id },
    });
    console.log(`Stream with id ${id} has been deleted.`);
  };
}

export { StreamRepository };
