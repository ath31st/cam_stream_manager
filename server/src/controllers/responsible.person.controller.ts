import { Request, Response } from 'express';
import {
  NewResponsiblePersonDto,
  UpdateResponsiblePersonDto,
} from '@shared/types';
import { ResponsiblePersonService } from '../services/responsible.person.service';

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

  createResponsiblePerson = async (req: Request, res: Response) => {
    try {
      const dto: NewResponsiblePersonDto = req.body;
      await this.responsiblePersonService.createResponsiblePerson(dto);
      res
        .status(201)
        .json({ message: 'Responsible person created successfully' });
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
      const dto: UpdateResponsiblePersonDto = {
        id: Number(req.params.id),
        ...req.body,
      };
      await this.responsiblePersonService.updateResponsiblePerson(dto);
      res
        .status(200)
        .json({ message: 'Responsible person updated successfully' });
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
