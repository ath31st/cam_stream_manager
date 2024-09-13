import { NewStreamDto, UpdateStreamDto } from '../types/types';
import { StreamStatus } from '../utils/stream.status';
import { PrismaClient, Stream } from '@prisma/client';

export class StreamRepository {
  private prismaClient: PrismaClient;

  constructor(prismaClient: PrismaClient) {
    this.prismaClient = prismaClient;
  }

  findStream = async (id: number): Promise<Stream> => {
    return await this.prismaClient.stream.findUniqueOrThrow({
      where: { id: id },
    });
  };

  findAllStreams = async (): Promise<Stream[]> => {
    return await this.prismaClient.stream.findMany();
  };

  createStream = async (dto: NewStreamDto) => {
    const status = StreamStatus.Created;
    const stream = await this.prismaClient.stream.create({
      data: {
        regionId: dto.regionId,
        location: dto.location,
        isVisible: true,
        streamUrl: dto.streamUrl,
        status: status,
        comment: dto.comment,
      },
    });
    console.log(stream);
  };

  updateStream = async (dto: UpdateStreamDto) => {
    const stream = await this.prismaClient.stream.update({
      where: { id: dto.id },
      data: {
        regionId: dto.regionId,
        location: dto.location,
        isVisible: dto.isVisible,
        streamUrl: dto.streamUrl,
        status: StreamStatus.Updated,
        comment: dto.comment,
      },
    });
    console.log(stream);
  };

  updateStreamStatus = async (streamId: number, newStatus: StreamStatus) => {
    await this.prismaClient.stream.update({
      where: { id: streamId },
      data: {
        status: newStatus,
        updatedAt: new Date(),
      },
    });
  };

  deleteStream = async (id: number) => {
    await this.prismaClient.stream.delete({
      where: { id: id },
      include: { responsiblePersons: true },
    });
    console.log(`Stream with id ${id} has been deleted.`);
  };
}
