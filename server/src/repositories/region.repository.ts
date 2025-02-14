import { PrismaClient } from '@prisma/client';
import { NewRegionDto, UpdateRegionDto } from '@shared/types';
import { Logger } from '../utils/logger';
import { RegionWithGroups } from '../types/extended.types';

export class RegionRepository {
  private prismaClient: PrismaClient;

  constructor(prismaClient: PrismaClient) {
    this.prismaClient = prismaClient;
  }

  findRegion = async (id: number): Promise<RegionWithGroups> => {
    return await this.prismaClient.region.findUniqueOrThrow({
      where: { id: id },
      include: { groups: true },
    });
  };

  existsRegionByName = async (name: string): Promise<boolean> => {
    const region = await this.prismaClient.$queryRaw<
      { id: number }[]
    >`SELECT * FROM "Region" WHERE UPPER("name") = UPPER(${name}) LIMIT 1`;

    return region.length > 0;
  };

  findRegions = async (
    groupIds: number[],
    isVisible?: boolean,
  ): Promise<RegionWithGroups[]> => {
    const regionsWithGroups = await this.prismaClient.region.findMany({
      where: {
        ...(isVisible !== undefined && { isVisible: isVisible }),
        ...(groupIds.length > 0 && {
          groups: {
            some: {
              id: {
                in: groupIds,
              },
            },
          },
        }),
      },
      include: {
        groups: true,
      },
    });

    const regionsWithoutGroups = await this.prismaClient.region.findMany({
      where: {
        ...(isVisible !== undefined && { isVisible: isVisible }),
        groups: {
          none: {},
        },
      },
      include: {
        groups: true,
      },
    });

    const combinedRegions = [...regionsWithGroups, ...regionsWithoutGroups];

    const uniqueRegions = Array.from(
      new Map(combinedRegions.map((region) => [region.id, region])).values(),
    );

    return uniqueRegions;
  };

  findAllRegions = async (isVisible?: boolean): Promise<RegionWithGroups[]> => {
    return await this.prismaClient.region.findMany({
      where: {
        ...(isVisible !== undefined && { isVisible: isVisible }),
      },
      include: { groups: true },
    });
  };

  createRegion = async (dto: NewRegionDto): Promise<RegionWithGroups> => {
    const region = await this.prismaClient.region.create({
      data: {
        name: dto.name,
        isVisible: true,
        ...(dto.groupIds && {
          groups: {
            connect: dto.groupIds.map((id) => ({ id })),
          },
        }),
      },
      include: {
        groups: true,
      },
    });
    Logger.log(region);
    return region;
  };

  updateRegion = async (dto: UpdateRegionDto): Promise<RegionWithGroups> => {
    const region = await this.prismaClient.region.update({
      where: { id: dto.id },
      data: {
        name: dto.name,
        isVisible: dto.isVisible,
        ...(dto.groupIds !== undefined && {
          groups: {
            set: [],
            connect: dto.groupIds.map((id) => ({ id })),
          },
        }),
      },
      include: { groups: true },
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
