import { ResponsiblePerson } from '@prisma/client';
import { ResponsiblePersonRepository } from '../repositories/responsible.person.repository';
import {
  NewResponsiblePersonDto,
  ResponsiblePersonDto,
  UpdateResponsiblePersonDto,
} from '@shared/types';
import { toRpDto, toRpDtos } from '../mappers/responsible.person.mapper';
import { Logger } from '../utils/logger';
import { EventLevel, EventType, NewEvent } from '../types/event.types';
import { EventService } from './event.service';

export class ResponsiblePersonService {
  private responsiblePersonRepository: ResponsiblePersonRepository;
  private eventService: EventService;

  constructor(
    responsiblePersonRepository: ResponsiblePersonRepository,
    eventService: EventService,
  ) {
    this.eventService = eventService;
    this.responsiblePersonRepository = responsiblePersonRepository;
  }

  getResponsiblePerson = async (id: number): Promise<ResponsiblePerson> => {
    try {
      return await this.responsiblePersonRepository.findResponsiblePerson(id);
    } catch (error) {
      Logger.error(`Error finding responsible person with id ${id}:`, error);
      throw new Error('Responsible person not found');
    }
  };

  getAllResponsiblePersonsDtos = async (): Promise<ResponsiblePersonDto[]> => {
    try {
      return await this.responsiblePersonRepository
        .findAllResponsiblePersons()
        .then(toRpDtos);
    } catch (error) {
      Logger.error('Error getting responsible persons:', error);
      throw new Error('Cannot get all responsible persons');
    }
  };

  getResponsiblePersonsDtosByStream = async (
    streamId: number,
  ): Promise<ResponsiblePersonDto[]> => {
    try {
      return await this.responsiblePersonRepository
        .findResponsiblePersonByStream(streamId)
        .then(toRpDtos);
    } catch (error) {
      Logger.error('Error getting responsible persons:', error);
      throw new Error('Cannot get all responsible persons');
    }
  };

  getResponsiblePersonDto = async (
    id: number,
  ): Promise<ResponsiblePersonDto> => {
    return this.getResponsiblePerson(id).then(toRpDto);
  };

  createResponsiblePerson = async (
    dto: NewResponsiblePersonDto,
  ): Promise<ResponsiblePersonDto> => {
    try {
      const rp = await this.responsiblePersonRepository
        .createResponsiblePerson(dto)
        .then(toRpDto);

      await this.logRpEvent(
        EventLevel.INFO,
        `Created responsible person ${rp.name}`,
      );

      return rp;
    } catch (error) {
      Logger.error('Error creating responsible person:', error);
      throw new Error('Could not create responsible person');
    }
  };

  updateResponsiblePerson = async (
    dto: UpdateResponsiblePersonDto,
  ): Promise<ResponsiblePersonDto> => {
    try {
      const updatedRp = await this.responsiblePersonRepository
        .updateResponsiblePerson(dto)
        .then(toRpDto);

      await this.logRpEvent(
        EventLevel.INFO,
        `Updated responsible person ${updatedRp.name}`,
      );

      return updatedRp;
    } catch (error) {
      Logger.error('Error updating responsible person:', error);
      throw new Error('Could not update responsible person');
    }
  };

  deleteResponsiblePerson = async (personId: number) => {
    try {
      await this.responsiblePersonRepository.deleteResponsiblePerson(personId);

      await this.logRpEvent(
        EventLevel.INFO,
        `Deleted responsible person ${personId}`,
      );
    } catch (error) {
      Logger.error('Error deleting responsible person:', error);
      throw new Error('Could not delete responsible person');
    }
  };

  private logRpEvent = async (level: EventLevel, info: string) => {
    const event: NewEvent = { type: EventType.RP, level, info };
    await this.eventService.createEvent(event);
  };
}
