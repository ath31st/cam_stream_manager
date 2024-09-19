import { ResponsiblePerson } from '@prisma/client';
import { ResponsiblePersonDto } from '@shared/types';

export const toRpDto = (rp: ResponsiblePerson): ResponsiblePersonDto => {
  return {
    id: rp.id,
    name: rp.name,
    phone: rp.phone,
    streamId: rp.streamId,
  };
};

export const toRpDtos = (rps: ResponsiblePerson[]): ResponsiblePersonDto[] => {
  return rps.map(toRpDto);
};
