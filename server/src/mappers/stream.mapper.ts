import { Stream } from '@prisma/client';
import { StreamDto } from '@shared/types';

export const toStreamDto = (stream: Stream): StreamDto => {
  return {
    id: stream.id,
    regionId: stream.regionId,
    location: stream.location,
    isVisible: stream.isVisible,
    streamUrl: stream.streamUrl,
    status: stream.status,
    comment: stream.comment,
  };
};

export const toStreamDtos = (streams: Stream[]): StreamDto[] => {
  return streams.map((stream) => toStreamDto(stream));
};
