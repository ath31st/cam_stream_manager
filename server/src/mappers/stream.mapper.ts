import type { Stream } from '@prisma/client';
import type { StreamDto } from '@shared/types';

export const toStreamDto = (stream: Stream): StreamDto => {
  return {
    id: stream.id,
    playlistId: stream.playlistId,
    name: stream.name,
    isVisible: stream.isVisible,
    streamUrl: stream.streamUrl,
    status: stream.status,
    comment: stream.comment,
  };
};

export const toStreamDtos = (streams: Stream[]): StreamDto[] => {
  return streams.map((stream) => toStreamDto(stream));
};
