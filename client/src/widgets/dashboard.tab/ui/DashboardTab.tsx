import React, { useEffect, useState } from 'react';
import { Row, Col } from 'antd';
import PlaylistCard from './PlaylistCard';
import { STREAMS_UPDATE_INTERVAL } from '../lib/dashboard.constants';
import { PlaylistInfo, fetchDashboardData } from '../../../entities/dashboard';
import { EventSidebar } from '../../event.sidebar';
import LargeLoader from '../../../shared/ui/loaders/LargeLoader';

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
            {dashboardData.map((playlist) => (
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
