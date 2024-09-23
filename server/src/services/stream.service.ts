import { Stream } from '@prisma/client';
import { StreamRepository } from '../repositories/stream.repository';
import { NewStreamDto, StreamDto, UpdateStreamDto } from '@shared/types';
import axios from 'axios';
import { StreamStatus } from '../utils/stream.status';
import { toStreamDto, toStreamDtos } from '../mappers/stream.mapper';

export class StreamService {
  private streamRepository: StreamRepository;

  constructor(streamRepository: StreamRepository) {
    this.streamRepository = streamRepository;
  }

  getStream = async (id: number): Promise<Stream> => {
    try {
      return await this.streamRepository.findStream(id);
    } catch (error) {
      console.error(`Error finding stream with id ${id}:`, error);
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
      console.error('Error getting streams:', error);
      throw new Error('Cannot get all streams');
    }
  };

  getAllStreamDtos = async (): Promise<StreamDto[]> => {
    return this.getAllStreams().then(toStreamDtos);
  };

  getStreamsByRegion = async (regionId: number): Promise<Stream[]> => {
    try {
      return await this.streamRepository.findStreamsByRegion(regionId);
    } catch (error) {
      console.error('Error getting streams by region:', error);
      throw new Error('Cannot get streams by region');
    }
  };

  createStream = async (dto: NewStreamDto): Promise<Stream> => {
    try {
      return await this.streamRepository.createStream(dto);
    } catch (error) {
      console.error('Error creating stream:', error);
      throw new Error('Could not create stream');
    }
  };

  updateStream = async (dto: UpdateStreamDto) => {
    try {
      await this.streamRepository.updateStream(dto);
    } catch (error) {
      console.error('Error updating stream:', error);
      throw new Error('Could not update stream');
    }
  };

  updateStreamStatus = async (streamId: number, newStatus: StreamStatus) => {
    try {
      await this.streamRepository.updateStreamStatus(streamId, newStatus);
    } catch (error) {
      console.error('Error updating stream status:', error);
    }
  };

  deleteStream = async (streamId: number) => {
    try {
      await this.streamRepository.deleteStream(streamId);
    } catch (error) {
      console.error('Error deleting stream:', error);
      throw new Error('Could not delete stream');
    }
  };

  pingAllStreams = async (): Promise<void> => {
    try {
      const streams = await this.streamRepository.findAllStreams();

      for (const stream of streams) {
        try {
          const response = await axios.get(stream.streamUrl);
          console.log(response.status + ' ' + stream.status);

          if (response.status === 200) {
            if (stream.status !== StreamStatus.Active) {
              console.log(`Stream ${stream.id} is reachable`);
              await this.updateStreamStatus(stream.id, StreamStatus.Active);
            }
          } else {
            console.error(
              `Stream ${stream.id} returned status ${response.status}`,
            );
            if (stream.status !== StreamStatus.BadConnection) {
              await this.updateStreamStatus(
                stream.id,
                StreamStatus.BadConnection,
              );
            }
          }
        } catch (error) {
          console.error(`Stream ${stream.id} is not reachable:`, error);
          if (stream.status !== StreamStatus.NoConnection) {
            await this.updateStreamStatus(stream.id, StreamStatus.NoConnection);
          }
        }
      }
    } catch (error) {
      console.error('Error retrieving streams:', error);
    }
  };
}
