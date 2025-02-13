import { RegionDto } from '@shared/types';
import { RegionWithGroups } from '../types/extended.types';

export const toRegionDto = (region: RegionWithGroups): RegionDto => {
  return {
    id: region.id,
    name: region.name,
    isVisible: region.isVisible,
    groupIds: region.groups.map((group) => group.id),
  };
};

export const toRegionDtos = (regions: RegionWithGroups[]): RegionDto[] => {
  return regions.map(toRegionDto);
};
