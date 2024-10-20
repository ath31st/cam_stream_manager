import React, { useEffect, useState } from 'react';
import { Row, Col } from 'antd';
import RegionCard from './RegionCard';
import { STREAMS_UPDATE_INTERVAL } from '../lib/dashboard.constants';
import { RegionInfo, fetchDashboardData } from '../../../entities/dashboard';
import { EventSidebar } from '../../event.sidebar';
import LargeLoader from '../../../shared/ui/loaders/LargeLoader';

interface DashboardProps {
  isActiveTab: boolean;
}

const Dashboard: React.FC<DashboardProps> = ({ isActiveTab }) => {
  const [dashboardData, setDashboardData] = useState<RegionInfo[]>([]);
  const [openRegion, setOpenRegion] = useState<string | null>(null);
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

  const toggleRegion = (regionName: string) => {
    setOpenRegion((prev) => (prev === regionName ? null : regionName));
  };

  return (
    <Row gutter={16}>
      <Col span={18}>
        {isLoading ? (
          <LargeLoader />
        ) : (
          <Row gutter={[16, 22]}>
            {dashboardData.map((region) => (
              <Col key={region.regionName} xs={24} sm={12} lg={8}>
                <RegionCard
                  {...region}
                  isOpen={openRegion === region.regionName}
                  onToggle={toggleRegion}
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
