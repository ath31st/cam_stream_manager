import { Event } from '@prisma/client';
import { EventDto } from '@shared/types';

export const toEventDto = (event: Event): EventDto => {
  return {
    id: event.id,
    type: event.type,
    level: event.level,
    info: event.info,
    createdAt: event.createdAt,
  };
};

export const toEventDtos = (events: Event[]): EventDto[] => {
  return events.map(toEventDto);
};
