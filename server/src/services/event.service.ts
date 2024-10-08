import { Event } from '@prisma/client';
import { EventRepository } from '../repositories/event.repository';
import { EventDto } from '@shared/types';
import { toEventDto, toEventDtos } from '../mappers/event.mapper';
import { Logger } from '../utils/logger';
import { EventLevel, EventType, NewEvent } from '../types/event.types';

export class EventService {
  private eventRepository: EventRepository;

  constructor(eventRepository: EventRepository) {
    this.eventRepository = eventRepository;
  }

  getEvent = async (id: number): Promise<Event> => {
    try {
      return await this.eventRepository.findEvent(id);
    } catch (error) {
      Logger.error(`Error finding event with id ${id}:`, error);
      throw new Error('Event not found');
    }
  };

  getEventDto = async (id: number): Promise<EventDto> => {
    return this.getEvent(id).then(toEventDto);
  };

  getEventDtos = async (
    page?: number,
    pageSize?: number,
    filterByType?: EventType,
    filterByLevel?: EventLevel,
  ): Promise<EventDto[]> => {
    try {
      const events = await this.eventRepository.findEvents(
        page,
        pageSize,
        filterByType,
        filterByLevel,
      );

      return toEventDtos(events);
    } catch (error) {
      Logger.error('Error getting events:', error);
      throw new Error('Cannot get all events');
    }
  };

  createEvent = async (dto: NewEvent): Promise<EventDto> => {
    try {
      return await this.eventRepository
        .createEvent(dto.type, dto.level, dto.info)
        .then(toEventDto);
    } catch (error) {
      Logger.error('Error creating event:', error);
      throw new Error('Could not create event');
    }
  };

  deleteEvent = async (eventId: number) => {
    try {
      await this.eventRepository.deleteEvent(eventId);
    } catch (error) {
      Logger.error('Error deleting event:', error);
      throw new Error('Could not delete event');
    }
  };
}
