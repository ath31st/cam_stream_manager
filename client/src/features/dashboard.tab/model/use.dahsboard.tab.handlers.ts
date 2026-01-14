import { useEffect, useState } from 'react';
import { fetchDashboardData } from '@/entities/dashboard';
import type { PlaylistInfo } from '@/shared/api.types';
import { STREAMS_UPDATE_INTERVAL } from '../lib/dashboard.constants';

const useDashboardTabHandlers = (isActiveTab: boolean) => {
  const [dashboardData, setDashboardData] = useState<PlaylistInfo[]>([]);
  const [openPlaylist, setOpenPlaylist] = useState<string | null>(null);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const data = await fetchDashboardData();
        if (JSON.stringify(data) !== JSON.stringify(dashboardData)) {
          setDashboardData(data);
        }
        setIsLoading(false);
      } catch (error) {
        console.error('Error fetching dashboard data:', error);
        setIsLoading(false);
      }
    };

    if (isActiveTab) {
      fetchData();

      const intervalId = setInterval(() => {
        fetchData();
      }, STREAMS_UPDATE_INTERVAL);

      return () => clearInterval(intervalId);
    }
  }, [isActiveTab, dashboardData]);

  const togglePlaylist = (playlistName: string) => {
    setOpenPlaylist((prev) => (prev === playlistName ? null : playlistName));
  };

  const sortPlaylistsByName = (pl1: PlaylistInfo, pl2: PlaylistInfo) =>
    pl1.playlistName.localeCompare(pl2.playlistName);

  return {
    actions: {
      togglePlaylist,
      sortPlaylistsByName,
    },
    state: {
      dashboardData,
      openPlaylist,
      isLoading,
    },
  };
};

export default useDashboardTabHandlers;
