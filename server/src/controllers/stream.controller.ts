import { Request, Response } from 'express';
import { StreamService } from '../services/stream.service';
import {
  NewResponsiblePersonDto,
  NewStreamDto,
  UpdateStreamDto,
} from '@shared/types';
import { ResponsiblePersonService } from '../services/responsible.person.service';

export class StreamController {
  private streamService: StreamService;
  private rpService: ResponsiblePersonService;

  constructor(
    streamService: StreamService,
    rpService: ResponsiblePersonService,
  ) {
    this.streamService = streamService;
    this.rpService = rpService;
  }

  getStream = async (req: Request, res: Response) => {
    try {
      const streamId = Number(req.params.id);
      const streamDto = await this.streamService.getStreamDto(streamId);
      res.status(200).json(streamDto);
    } catch (error) {
      if (error instanceof Error) {
        res.status(404).json({ message: error.message });
      } else {
        res.status(500).json({
          message: 'Failed to get stream',
          error: 'Unknown error occurred',
        });
      }
    }
  };

  getAllStreams = async (req: Request, res: Response) => {
    try {
      const streamDtos = await this.streamService.getAllStreamDtos();
      res.status(200).json(streamDtos);
    } catch (error) {
      if (error instanceof Error) {
        res.status(404).json({
          message: 'Failed to retrieve streams',
          error: error.message,
        });
      } else {
        res.status(500).json({
          message: 'Failed to retrieve streams',
          error: 'Unknown error occurred',
        });
      }
    }
  };

  createStream = async (req: Request, res: Response) => {
    try {
      const dto: NewStreamDto = req.body;
      const stream = await this.streamService.createStream(dto);
      if (dto.responsiblePerson && dto.responsiblePhone) {
        const rpDto: NewResponsiblePersonDto = {
          name: dto.responsiblePerson,
          phone: dto.responsiblePhone,
          streamId: stream.id,
        };
        await this.rpService.createResponsiblePerson(rpDto);
      }
      res.status(201).json({ message: 'Stream created successfully' });
    } catch (error) {
      if (error instanceof Error) {
        res
          .status(400)
          .json({ message: 'Failed to create stream', error: error.message });
      } else {
        res.status(500).json({
          message: 'Failed to create stream',
          error: 'Unknown error occurred',
        });
      }
    }
  };

  updateStream = async (req: Request, res: Response) => {
    try {
      const dto: UpdateStreamDto = { id: Number(req.params.id), ...req.body };
      await this.streamService.updateStream(dto);
      res.status(200).json({ message: 'Stream updated successfully' });
    } catch (error) {
      if (error instanceof Error) {
        res
          .status(400)
          .json({ message: 'Failed to update stream', error: error.message });
      } else {
        res.status(500).json({
          message: 'Failed to update stream',
          error: 'Unknown error occurred',
        });
      }
    }
  };

  deleteStream = async (req: Request, res: Response) => {
    try {
      const streamId = Number(req.params.id);
      await this.streamService.deleteStream(streamId);
      res.status(200).json({ message: 'Stream deleted successfully' });
    } catch (error) {
      if (error instanceof Error) {
        res
          .status(400)
          .json({ message: 'Failed to delete stream', error: error.message });
      } else {
        res.status(500).json({
          message: 'Failed to delete stream',
          error: 'Unknown error occurred',
        });
      }
    }
  };
}
