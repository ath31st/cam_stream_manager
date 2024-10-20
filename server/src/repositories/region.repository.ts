import { PrismaClient, Region } from '@prisma/client';
import { NewRegionDto, UpdateRegionDto } from '@shared/types';
import { Logger } from '../utils/logger';

export class RegionRepository {
  private prismaClient: PrismaClient;

  constructor(prismaClient: PrismaClient) {
    this.prismaClient = prismaClient;
  }

  findRegion = async (id: number): Promise<Region> => {
    return await this.prismaClient.region.findUniqueOrThrow({
      where: { id: id },
    });
  };

  existsRegionByName = async (name: string): Promise<boolean> => {
    const region = await this.prismaClient.$queryRaw<
      { id: number }[]
    >`SELECT * FROM "Region" WHERE UPPER("name") = UPPER(${name}) LIMIT 1`;

    return region.length > 0;
  };

  findRegions = async (isVisible: boolean): Promise<Region[]> => {
    return await this.prismaClient.region.findMany({
      where: { isVisible: isVisible },
    });
  };

  createRegion = async (dto: NewRegionDto): Promise<Region> => {
    const region = await this.prismaClient.region.create({
      data: {
        name: dto.name,
        isVisible: true,
      },
    });
    Logger.log(region);
    return region;
  };

  updateRegion = async (dto: UpdateRegionDto): Promise<Region> => {
    const region = await this.prismaClient.region.update({
      where: { id: dto.id },
      data: {
        name: dto.name,
        isVisible: dto.isVisible,
      },
    });
    Logger.log(region);
    return region;
  };

  deleteRegion = async (id: number) => {
    await this.prismaClient.region.delete({
      where: { id: id },
    });
    Logger.log(`Region with id ${id} has been deleted.`);
  };
}
