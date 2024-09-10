import { StreamRepository } from '../repositories/stream.repository';
import { NewStreamDto, UpdateStreamDto } from '../utils/types';

export class StreamService {
  private streamRepository: StreamRepository;

  constructor(streamRepository: StreamRepository) {
    this.streamRepository = streamRepository;
  }

  createStream = async (dto: NewStreamDto) => {
    try {
      await this.streamRepository.createStream(dto);
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

  deleteStream = async (streamId: number) => {
    try {
      await this.streamRepository.deleteStream(streamId);
    } catch (error) {
      console.error('Error deleting stream:', error);
      throw new Error('Could not delete stream');
    }
  };
}
