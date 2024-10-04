import { RegionService } from './region.service';
import { StreamService } from './stream.service';
import { RegionInfoDto, StreamDashboardDto } from '@shared/types';

export class DashboardService {
  private regionService: RegionService;
  private streamService: StreamService;

  constructor(regionService: RegionService, streamService: StreamService) {
    this.regionService = regionService;
    this.streamService = streamService;
  }

  async getDashboardData(): Promise<RegionInfoDto[]> {
    const regions = await this.regionService.getAllRegions();
    const dashboardData: RegionInfoDto[] = [];

    for (const region of regions) {
      const regionInfo: RegionInfoDto = {
        regionName: region.name,
        streams: [],
        activeCount: 0,
        noConnectionCount: 0,
        badConnectionCount: 0,
      };

      const streams = await this.streamService.getStreamsByRegion(region.id);

      streams.forEach((stream) => {
        const streamDashboard: StreamDashboardDto = {
          id: stream.id,
          regionId: stream.regionId,
          location: stream.location,
          status: stream.status,
        };

        regionInfo.streams.push(streamDashboard);

        if (stream.status === 'Active') {
          regionInfo.activeCount++;
        } else if (stream.status === 'No connection') {
          regionInfo.noConnectionCount++;
        } else if (stream.status === 'Bad connection') {
          regionInfo.badConnectionCount++;
        }
      });

      dashboardData.push(regionInfo);
    }

    return dashboardData;
  }
}
