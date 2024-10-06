import { Stream } from '@prisma/client';
import { StreamRepository } from '../repositories/stream.repository';
import { NewStreamDto, StreamDto, UpdateStreamDto } from '@shared/types';
import axios from 'axios';
import { StreamStatus } from '../utils/stream.status';
import { toStreamDto, toStreamDtos } from '../mappers/stream.mapper';
import { Logger } from '../utils/logger';

export class StreamService {
  private streamRepository: StreamRepository;

  constructor(streamRepository: StreamRepository) {
    this.streamRepository = streamRepository;
  }

  getStream = async (id: number): Promise<Stream> => {
    try {
      return await this.streamRepository.findStream(id);
    } catch (error) {
      Logger.error(`Error finding stream with id ${id}:`, error);
      throw new Error('Stream not found');
    }
  };

  getStreamDto = async (id: number): Promise<StreamDto> => {
    return this.getStream(id).then(toStreamDto);
  };

  getAllStreams = async (): Promise<Stream[]> => {
    try {
      return await this.streamRepository.findAllStreams();
    } catch (error) {
      Logger.error('Error getting streams:', error);
      throw new Error('Cannot get all streams');
    }
  };

  getAllStreamDtos = async (): Promise<StreamDto[]> => {
    return this.getAllStreams().then(toStreamDtos);
  };

  getStreamsByRegion = async (regionId: number): Promise<StreamDto[]> => {
    try {
      return await this.streamRepository
        .findStreamsByRegion(regionId)
        .then(toStreamDtos);
    } catch (error) {
      Logger.error('Error getting streams by region:', error);
      throw new Error('Cannot get streams by region');
    }
  };

  existsStreamByUrl = async (url: string): Promise<void> => {
    const streamExists = await this.streamRepository.existsStreamByUrl(url);
    if (streamExists) {
      throw new Error('Stream with that url already exists');
    }
  };

  createStream = async (dto: NewStreamDto): Promise<StreamDto> => {
    try {
      await this.existsStreamByUrl(dto.streamUrl);

      return await this.streamRepository.createStream(dto).then(toStreamDto);
    } catch (error) {
      Logger.error('Error creating stream:', error);
      throw new Error('Could not create stream');
    }
  };

  updateStream = async (dto: UpdateStreamDto): Promise<StreamDto> => {
    try {
      await this.existsStreamByUrl(dto.streamUrl);

      return await this.streamRepository.updateStream(dto).then(toStreamDto);
    } catch (error) {
      Logger.error('Error updating stream:', error);
      throw new Error('Could not update stream');
    }
  };

  updateStreamStatus = async (streamId: number, newStatus: StreamStatus) => {
    try {
      await this.streamRepository.updateStreamStatus(streamId, newStatus);
    } catch (error) {
      Logger.error('Error updating stream status:', error);
    }
  };

  deleteStream = async (streamId: number) => {
    try {
      await this.streamRepository.deleteStream(streamId);
    } catch (error) {
      Logger.error('Error deleting stream:', error);
      throw new Error('Could not delete stream');
    }
  };

  pingAllStreams = async (): Promise<void> => {
    try {
      const streams = await this.streamRepository.findAllStreams();

      for (const stream of streams) {
        await this.pingStream(stream);
      }
    } catch (error) {
      Logger.error('Error retrieving streams:', error);
    }
  };

  private pingStream = async (stream: Stream): Promise<void> => {
    try {
      const response = await axios.get(stream.streamUrl);

      if (response.status === 200) {
        await this.handleActiveStream(stream);
      } else {
        await this.handleBadConnection(stream, response.status);
      }
    } catch (error) {
      if (error instanceof Error) {
        Logger.error(`Error pinging stream ${stream.id}:`, error.message);
      } else {
        Logger.error(`Error pinging stream ${stream.id}:`, error);
      }
      await this.handleNoConnection(stream);
    }
  };

  private handleActiveStream = async (stream: Stream): Promise<void> => {
    if (stream.status !== StreamStatus.Active) {
      Logger.log(`Stream ${stream.id} is reachable`);
      await this.updateStreamStatus(stream.id, StreamStatus.Active);
    }
  };

  private handleBadConnection = async (
    stream: Stream,
    status: number,
  ): Promise<void> => {
    Logger.error(`Stream ${stream.id} returned status ${status}`);
    if (stream.status !== StreamStatus.BadConnection) {
      await this.updateStreamStatus(stream.id, StreamStatus.BadConnection);
    }
  };

  private handleNoConnection = async (stream: Stream): Promise<void> => {
    Logger.error(`Stream ${stream.id} is not reachable`);
    if (stream.status !== StreamStatus.NoConnection) {
      await this.updateStreamStatus(stream.id, StreamStatus.NoConnection);
    }
  };
}
