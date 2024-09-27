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

  findAllRegions = async (): Promise<Region[]> => {
    return await this.prismaClient.region.findMany();
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

  updateRegion = async (dto: UpdateRegionDto) => {
    const region = await this.prismaClient.region.update({
      where: { id: dto.id },
      data: {
        name: dto.name,
        isVisible: dto.isVisible,
      },
    });
    Logger.log(region);
  };

  deleteRegion = async (id: number) => {
    await this.prismaClient.region.delete({
      where: { id: id },
    });
    Logger.log(`Region with id ${id} has been deleted.`);
  };
}
