import { Stream } from '@prisma/client';
import { StreamRepository } from '../repositories/stream.repository';
import { NewStreamDto, StreamDto, UpdateStreamDto } from '@shared/types';
import axios from 'axios';
import { StreamStatus } from '../utils/stream.status';
import { toStreamDto, toStreamDtos } from '../mappers/stream.mapper';
import { Logger } from '../utils/logger';
import { EventService } from './event.service';
import { EventLevel, EventType, NewEvent } from '../types/event.types';

export class StreamService {
  private streamRepository: StreamRepository;
  private eventService: EventService;

  constructor(streamRepository: StreamRepository, eventService: EventService) {
    this.eventService = eventService;
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

  getStreams = async (isVisible?: boolean): Promise<Stream[]> => {
    try {
      return await this.streamRepository.findStreams(isVisible);
    } catch (error) {
      Logger.error('Error getting streams:', error);
      throw new Error('Cannot get all streams');
    }
  };

  getStreamDtos = async (isVisible?: boolean): Promise<StreamDto[]> => {
    return this.getStreams(isVisible).then(toStreamDtos);
  };

  getStreamsByPlaylist = async (playlistId: number): Promise<StreamDto[]> => {
    try {
      return await this.streamRepository
        .findStreamsByPlaylist(playlistId)
        .then(toStreamDtos);
    } catch (error) {
      Logger.error('Error getting streams by playlist:', error);
      throw new Error('Cannot get streams by playlist');
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

      const stream = await this.streamRepository
        .createStream(dto)
        .then(toStreamDto);

      await this.logStreamEvent(
        EventLevel.INFO,
        `Created stream with loacation: ${stream.location}`,
      );

      return stream;
    } catch (error) {
      Logger.error('Error creating stream:', error);
      throw new Error('Could not create stream');
    }
  };

  updateStream = async (dto: UpdateStreamDto): Promise<StreamDto> => {
    try {
      const stream = await this.getStream(dto.id);
      const streamUrlExists = await this.streamRepository.existsStreamByUrl(
        dto.streamUrl,
      );

      if (streamUrlExists && stream.streamUrl !== dto.streamUrl) {
        throw new Error('Stream with that url already exists');
      }

      const updatedStream = await this.streamRepository
        .updateStream(dto)
        .then(toStreamDto);

      await this.logStreamEvent(
        EventLevel.INFO,
        `Updated stream with loacation: ${updatedStream.location}`,
      );

      return updatedStream;
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

      await this.logStreamEvent(
        EventLevel.INFO,
        `Deleted stream with id: ${streamId}`,
      );
    } catch (error) {
      Logger.error('Error deleting stream:', error);
      throw new Error('Could not delete stream');
    }
  };

  private async pingStreamsInBatches(
    streams: Stream[],
    batchSize: number,
  ): Promise<void> {
    for (let i = 0; i < streams.length; i += batchSize) {
      const batch = streams.slice(i, i + batchSize);

      await Promise.all(batch.map((stream) => this.pingStream(stream)));
    }
  }

  pingAllStreams = async (): Promise<void> => {
    try {
      const streams = await this.streamRepository.findStreams();
      const batchSize = 5;

      await this.pingStreamsInBatches(streams, batchSize);
      Logger.info('All streams have been pinged');
    } catch (error) {
      Logger.error('Error retrieving streams:', error);
    }
  };

  private pingStream = async (stream: Stream): Promise<void> => {
    const timeoutDuration = parseInt(
      process.env.STREAM_PING_TIMEOUT || '5000',
      10,
    );
    const source = axios.CancelToken.source();
    const timeoutId = setTimeout(
      () => source.cancel('Ping request timed out'),
      timeoutDuration,
    );

    try {
      const response = await axios.get(stream.streamUrl, {
        cancelToken: source.token,
      });

      if (response.status === 200) {
        await this.handleActiveStream(stream);
      } else {
        await this.handleBadConnection(stream, response.status);
      }
    } catch (error: unknown) {
      if (axios.isCancel(error)) {
        Logger.error(`Ping stream ${stream.id} canceled due to timeout`);
        await this.handleBadConnection(stream, 408);
      } else if (error instanceof Error) {
        Logger.error(`Error pinging stream ${stream.id}:`, error.message);
        await this.handleNoConnection(stream);
      } else {
        Logger.error(`Error pinging stream ${stream.id}:`, error);
      }
    } finally {
      clearTimeout(timeoutId);
    }
  };

  private handleActiveStream = async (stream: Stream): Promise<void> => {
    if (stream.status !== StreamStatus.Active) {
      Logger.log(`Stream ${stream.id} is reachable`);
      await this.updateStreamStatus(stream.id, StreamStatus.Active);
      await this.logStreamEvent(
        EventLevel.INFO,
        `Stream ${stream.location} is reachable`,
      );
    }
  };

  private handleBadConnection = async (
    stream: Stream,
    status: number,
  ): Promise<void> => {
    Logger.error(`Stream ${stream.id} returned status ${status}`);
    if (stream.status !== StreamStatus.BadConnection) {
      await this.updateStreamStatus(stream.id, StreamStatus.BadConnection);
      await this.logStreamEvent(
        EventLevel.WARNING,
        `Stream ${stream.location} returned status ${status}`,
      );
    }
  };

  private handleNoConnection = async (stream: Stream): Promise<void> => {
    Logger.error(`Stream ${stream.id} is not reachable`);
    if (stream.status !== StreamStatus.NoConnection) {
      await this.updateStreamStatus(stream.id, StreamStatus.NoConnection);
      await this.logStreamEvent(
        EventLevel.ERROR,
        `Stream ${stream.location} is not reachable`,
      );
    }
  };

  private logStreamEvent = async (level: EventLevel, info: string) => {
    const event: NewEvent = { type: EventType.STREAM, level, info };
    await this.eventService.createEvent(event);
  };
}
