import { PlaylistInfoDto, StreamDashboardDto } from '@shared/types';

export type PlaylistInfo = PlaylistInfoDto;
export type StreamDashboard = StreamDashboardDto;

export { fetchDashboardData } from './api/dashboard.api';