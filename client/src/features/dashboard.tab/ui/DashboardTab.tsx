import { Col, Row } from 'antd';
import type React from 'react';
import { useEffect, useState } from 'react';
import { fetchDashboardData } from '../../../entities/dashboard';
import type { PlaylistInfo } from '../../../shared/api.types';
import { LargeLoader } from '../../../shared/ui';
import { STREAMS_UPDATE_INTERVAL } from '../lib/dashboard.constants';
import PlaylistCard from './PlaylistCard';
import EventSidebar from './EventSidebar';

interface DashboardProps {
  isActiveTab: boolean;
}

const Dashboard: React.FC<DashboardProps> = ({ isActiveTab }) => {
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

  return (
    <Row gutter={16}>
      <Col span={18}>
        {isLoading ? (
          <LargeLoader />
        ) : (
          <Row gutter={[16, 22]}>
            {dashboardData
              .sort((a, b) => a.playlistName.localeCompare(b.playlistName))
              .map((playlist) => (
                <Col key={playlist.playlistName} xs={24} sm={12} lg={8}>
                  <PlaylistCard
                    {...playlist}
                    isOpen={openPlaylist === playlist.playlistName}
                    onToggle={togglePlaylist}
                  />
                </Col>
              ))}
          </Row>
        )}
      </Col>
      <Col span={6}>
        <EventSidebar isActiveTab={isActiveTab} />
      </Col>
    </Row>
  );
};

export default Dashboard;
