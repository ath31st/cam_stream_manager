import { NewStreamDto, UpdateStreamDto } from '@shared/types';
import { StreamStatus } from '../utils/stream.status';
import { PrismaClient, Stream } from '@prisma/client';
import { Logger } from '../utils/logger';

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

  findStreams = async (isVisible?: boolean): Promise<Stream[]> => {
    return await this.prismaClient.stream.findMany({
      where: {
        ...(isVisible !== undefined && { isVisible: isVisible }),
      },
    });
  };

  findStreamsByRegion = async (regionId: number): Promise<Stream[]> => {
    return await this.prismaClient.stream.findMany({
      where: { regionId: regionId, isVisible: true },
    });
  };

  existsStreamByUrl = async (streamUrl: string): Promise<boolean> => {
    const stream = await this.prismaClient.$queryRaw<
      { id: number }[]
    >`SELECT * FROM "Stream" WHERE UPPER("streamUrl") = UPPER(${streamUrl}) LIMIT 1`;

    return stream.length > 0;
  };

  createStream = async (dto: NewStreamDto): Promise<Stream> => {
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
    Logger.log(stream);
    return stream;
  };

  updateStream = async (dto: UpdateStreamDto): Promise<Stream> => {
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
    Logger.log(stream);
    return stream;
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
    });
    Logger.log(`Stream with id ${id} has been deleted.`);
  };
}
