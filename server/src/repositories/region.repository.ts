import { PrismaClient, Region } from '@prisma/client';
import { NewRegionDto, UpdateRegionDto } from '../types/types';

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

  createRegion = async (dto: NewRegionDto) => {
    const region = await this.prismaClient.region.create({
      data: {
        name: dto.name,
        isVisible: true,
      },
    });
    console.log(region);
  };

  updateRegion = async (dto: UpdateRegionDto) => {
    const region = await this.prismaClient.region.update({
      where: { id: dto.id },
      data: {
        name: dto.name,
        isVisible: dto.isVisible,
      },
    });
    console.log(region);
  };
}
