import { Region } from '@prisma/client';
import { RegionDto } from '@shared/types';

export const toRegionDto = (region: Region): RegionDto => {
  return {
    id: region.id,
    name: region.name,
    isVisible: region.isVisible,
  };
};

export const toRegionDtos = (regions: Region[]): RegionDto[] => {
  return regions.map(toRegionDto);
};
