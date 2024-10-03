import { Stream } from '../../../entities/stream';
import { GroupedRegion } from './dashboard.types';

export const groupStreamsByRegion = (
  streams: Stream[],
  regions: { id: number; name: string }[],
): Record<string, GroupedRegion> => {
  return streams.reduce((acc: Record<string, GroupedRegion>, stream) => {
    const regionId = stream.regionId;
    const regionName =
      regions.find((region) => region.id === regionId)?.name ||
      'Неизвестный регион';

    if (!acc[regionId]) {
      acc[regionId] = {
        regionName,
        streams: [],
        activeCount: 0,
        noConnectionCount: 0,
        badConnectionCount: 0,
      };
    }

    acc[regionId].streams.push(stream);
    if (stream.status === 'Active') {
      acc[regionId].activeCount++;
    } else if (stream.status === 'No connection') {
      acc[regionId].noConnectionCount++;
    } else if (stream.status === 'Bad connection') {
      acc[regionId].badConnectionCount++;
    }

    return acc;
  }, {});
};
