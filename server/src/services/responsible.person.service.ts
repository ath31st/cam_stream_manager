import { ResponsiblePerson } from '@prisma/client';
import { ResponsiblePersonRepository } from '../repositories/responsible.person.repository';
import {
  NewResponsiblePersonDto,
  ResponsiblePersonDto,
  UpdateResponsiblePersonDto,
} from '@shared/types';
import { toRpDto } from '../mappers/responsible.person.mapper';
import { Logger } from '../utils/logger';

export class ResponsiblePersonService {
  private responsiblePersonRepository: ResponsiblePersonRepository;

  constructor(responsiblePersonRepository: ResponsiblePersonRepository) {
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

  getResponsiblePersonDto = async (
    id: number,
  ): Promise<ResponsiblePersonDto> => {
    return this.getResponsiblePerson(id).then(toRpDto);
  };

  createResponsiblePerson = async (dto: NewResponsiblePersonDto) => {
    try {
      await this.responsiblePersonRepository.createResponsiblePerson(dto);
    } catch (error) {
      Logger.error('Error creating responsible person:', error);
      throw new Error('Could not create responsible person');
    }
  };

  updateResponsiblePerson = async (dto: UpdateResponsiblePersonDto) => {
    try {
      await this.responsiblePersonRepository.updateResponsiblePerson(dto);
    } catch (error) {
      Logger.error('Error updating responsible person:', error);
      throw new Error('Could not update responsible person');
    }
  };

  deleteResponsiblePerson = async (personId: number) => {
    try {
      await this.responsiblePersonRepository.deleteResponsiblePerson(personId);
    } catch (error) {
      Logger.error('Error deleting responsible person:', error);
      throw new Error('Could not delete responsible person');
    }
  };
}
