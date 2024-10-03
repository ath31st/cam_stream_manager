import { Stream } from '../../../entities/stream';

export interface GroupedRegion {
  regionName: string;
  streams: Stream[];
  activeCount: number;
  noConnectionCount: number;
  badConnectionCount: number;
}
