import { Group } from '@prisma/client';
import { GroupDto } from '@shared/types';

export const toGroupDtos = (groups: Group[]): GroupDto[] => {
  return groups.map((group) => toGroupDto(group));
};

export const toGroupDto = (group: Group): GroupDto => {
  return {
    id: group.id,
    name: group.name,
  };
};
