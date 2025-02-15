import { PlaylistService } from './playlist.service';
import { StreamService } from './stream.service';
import { PlaylistInfoDto, StreamDashboardDto } from '@shared/types';

export class DashboardService {
  private playlistService: PlaylistService;
  private streamService: StreamService;

  constructor(playlistService: PlaylistService, streamService: StreamService) {
    this.playlistService = playlistService;
    this.streamService = streamService;
  }

  async getDashboardData(): Promise<PlaylistInfoDto[]> {
    const isVisible = true;
    const playlists = await this.playlistService.getAllPlaylists(isVisible);
    const dashboardData: PlaylistInfoDto[] = [];

    for (const playlist of playlists) {
      const playlistInfo: PlaylistInfoDto = {
        playlistName: playlist.name,
        streams: [],
        activeCount: 0,
        noConnectionCount: 0,
        badConnectionCount: 0,
      };

      const streams = await this.streamService.getStreamsByPlaylist(playlist.id);

      streams.forEach((stream) => {
        const streamDashboard: StreamDashboardDto = {
          id: stream.id,
          playlistId: stream.playlistId,
          location: stream.location,
          status: stream.status,
        };

        playlistInfo.streams.push(streamDashboard);

        if (stream.status === 'Active') {
          playlistInfo.activeCount++;
        } else if (stream.status === 'No connection') {
          playlistInfo.noConnectionCount++;
        } else if (stream.status === 'Bad connection') {
          playlistInfo.badConnectionCount++;
        }
      });

      dashboardData.push(playlistInfo);
    }

    return dashboardData;
  }
}
