import type {
  NewResponsiblePersonDto,
  NewStreamDto,
  UpdateStreamDto,
} from '@shared/types';
import type { Request, Response } from 'express';
import type { ResponsiblePersonService } from '../services/responsible.person.service';
import type { StreamService } from '../services/stream.service';
import { trimObjectValues } from '../utils/trim.utils';
import {
  newStreamSchema,
  updateStreamSchema,
} from '../validators/stream.validator';

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

  getStreams = async (req: Request, res: Response) => {
    try {
      const isVisible =
        req.query?.isVisible !== undefined
          ? req.query.isVisible === 'true'
          : undefined;
      const streamDtos = await this.streamService.getStreamDtos(isVisible);
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

  getStreamsByPlaylist = async (req: Request, res: Response) => {
    try {
      const playlistId = Number(req.params.id);
      const streamDtos =
        await this.streamService.getStreamsByPlaylist(playlistId);
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
      const trimmedBody = trimObjectValues(req.body);

      const { error, value } = newStreamSchema.validate(trimmedBody);
      if (error) {
        return res.status(400).json({ message: error.details[0].message });
      }

      const dto: NewStreamDto = value;
      const createdStream = await this.streamService.createStream(dto);
      if (dto.responsiblePerson && dto.responsiblePhone) {
        const rpDto: NewResponsiblePersonDto = {
          name: dto.responsiblePerson,
          phone: dto.responsiblePhone,
          streamId: createdStream.id,
        };
        await this.rpService.createResponsiblePerson(rpDto);
      }
      res.status(201).json(createdStream);
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
      const trimmedBody = trimObjectValues(req.body);

      const { error, value } = updateStreamSchema.validate({
        id: Number(req.params.id),
        ...trimmedBody,
      });
      if (error) {
        return res.status(400).json({ message: error.details[0].message });
      }

      const dto: UpdateStreamDto = value;
      const updatedStream = await this.streamService.updateStream(dto);
      res.status(200).json(updatedStream);
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
