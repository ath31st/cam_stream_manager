import { Request, Response } from 'express';
import {
  NewResponsiblePersonDto,
  UpdateResponsiblePersonDto,
} from '@shared/types';
import { ResponsiblePersonService } from '../services/responsible.person.service';
import {
  newResponsiblePersonSchema,
  updateResponsiblePersonSchema,
} from '../validators/responsible.person.validator';

export class ResponsiblePersonController {
  private responsiblePersonService: ResponsiblePersonService;

  constructor(responsiblePersonService: ResponsiblePersonService) {
    this.responsiblePersonService = responsiblePersonService;
  }

  getResponsiblePerson = async (req: Request, res: Response) => {
    try {
      const personId = Number(req.params.id);
      const personDto =
        await this.responsiblePersonService.getResponsiblePersonDto(personId);
      res.status(200).json(personDto);
    } catch (error) {
      if (error instanceof Error) {
        res.status(404).json({
          message: 'Responsible person not found',
          error: error.message,
        });
      } else {
        res.status(500).json({
          message: 'Failed to get responsible person',
          error: 'Unknown error occurred',
        });
      }
    }
  };

  getAllResponsiblePersons = async (req: Request, res: Response) => {
    try {
      const personDtos =
        await this.responsiblePersonService.getAllResponsiblePersonsDtos();
      res.status(200).json(personDtos);
    } catch (error) {
      if (error instanceof Error) {
        res.status(500).json({
          message: 'Failed to get responsible persons',
          error: error.message,
        });
      } else {
        res.status(500).json({
          message: 'Failed to get responsible persons',
          error: 'Unknown error occurred',
        });
      }
    }
  };

  getResponsiblePersonsByStream = async (req: Request, res: Response) => {
    try {
      const streamId = Number(req.params.id);
      const personDtos =
        await this.responsiblePersonService.getResponsiblePersonsDtosByStream(
          streamId,
        );
      res.status(200).json(personDtos);
    } catch (error) {
      if (error instanceof Error) {
        res.status(500).json({
          message: 'Failed to get responsible persons',
          error: error.message,
        });
      } else {
        res.status(500).json({
          message: 'Failed to get responsible persons',
          error: 'Unknown error occurred',
        });
      }
    }
  };

  createResponsiblePerson = async (req: Request, res: Response) => {
    try {
      const { error, value } = newResponsiblePersonSchema.validate(req.body);
      if (error) {
        return res.status(400).json({
          message: 'Validation error',
          error: error.details[0].message,
        });
      }

      const dto: NewResponsiblePersonDto = value;
      const createdPerson =
        await this.responsiblePersonService.createResponsiblePerson(dto);
      res.status(201).json(createdPerson);
    } catch (error) {
      if (error instanceof Error) {
        res.status(400).json({
          message: 'Failed to create responsible person',
          error: error.message,
        });
      } else {
        res.status(500).json({
          message: 'Failed to create responsible person',
          error: 'Unknown error occurred',
        });
      }
    }
  };

  updateResponsiblePerson = async (req: Request, res: Response) => {
    try {
      const { error, value } = updateResponsiblePersonSchema.validate({
        id: Number(req.params.id),
        ...req.body,
      });
      if (error) {
        return res.status(400).json({
          message: 'Validation error',
          error: error.details[0].message,
        });
      }

      const dto: UpdateResponsiblePersonDto = value;
      const updatedPerson =
        await this.responsiblePersonService.updateResponsiblePerson(dto);
      res.status(200).json(updatedPerson);
    } catch (error) {
      if (error instanceof Error) {
        res.status(400).json({
          message: 'Failed to update responsible person',
          error: error.message,
        });
      } else {
        res.status(500).json({
          message: 'Failed to update responsible person',
          error: 'Unknown error occurred',
        });
      }
    }
  };

  deleteResponsiblePerson = async (req: Request, res: Response) => {
    try {
      const personId = Number(req.params.id);
      await this.responsiblePersonService.deleteResponsiblePerson(personId);
      res
        .status(200)
        .json({ message: 'Responsible person deleted successfully' });
    } catch (error) {
      if (error instanceof Error) {
        res.status(400).json({
          message: 'Failed to delete responsible person',
          error: error.message,
        });
      } else {
        res.status(500).json({
          message: 'Failed to delete responsible person',
          error: 'Unknown error occurred',
        });
      }
    }
  };
}
