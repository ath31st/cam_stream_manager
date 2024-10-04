import { RegionInfoDto, StreamDashboardDto } from '@shared/types';

export type RegionInfo = RegionInfoDto;
export type StreamDashboard = StreamDashboardDto;

export { fetchDashboardData } from './api/dashboard.api';