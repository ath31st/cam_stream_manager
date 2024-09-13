import { ResponsiblePerson } from '@prisma/client';
import { ResponsiblePersonRepository } from '../repositories/responsible.person.repository';
import {
  NewResponsiblePersonDto,
  UpdateResponsiblePersonDto,
} from '../types/types';

export class ResponsiblePersonService {
  private responsiblePersonRepository: ResponsiblePersonRepository;

  constructor(responsiblePersonRepository: ResponsiblePersonRepository) {
    this.responsiblePersonRepository = responsiblePersonRepository;
  }

  getResponsiblePerson = async (id: number): Promise<ResponsiblePerson> => {
    try {
      return await this.responsiblePersonRepository.findResponsiblePerson(id);
    } catch (error) {
      console.error(`Error finding responsible person with id ${id}:`, error);
      throw new Error('Responsible person not found');
    }
  };

  createResponsiblePerson = async (dto: NewResponsiblePersonDto) => {
    try {
      await this.responsiblePersonRepository.createResponsiblePerson(dto);
    } catch (error) {
      console.error('Error creating responsible person:', error);
      throw new Error('Could not create responsible person');
    }
  };

  updateResponsiblePerson = async (dto: UpdateResponsiblePersonDto) => {
    try {
      await this.responsiblePersonRepository.updateResponsiblePerson(dto);
    } catch (error) {
      console.error('Error updating responsible person:', error);
      throw new Error('Could not update responsible person');
    }
  };

  deleteResponsiblePerson = async (personId: number) => {
    try {
      await this.responsiblePersonRepository.deleteResponsiblePerson(personId);
    } catch (error) {
      console.error('Error deleting responsible person:', error);
      throw new Error('Could not delete responsible person');
    }
  };
}
