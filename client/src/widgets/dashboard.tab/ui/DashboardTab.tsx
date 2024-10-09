import React, { useEffect, useState } from 'react';
import { Row, Col } from 'antd';
import { RegionCard } from '../../../entities/region';
import { STREAMS_UPDATE_INTERVAL } from '../lib/dashboard.constants';
import { RegionInfo, fetchDashboardData } from '../../../entities/dashboard';
import { EventSidebar } from '../../event.sidebar';

const Dashboard: React.FC = () => {
  const [dashboardData, setDashboardData] = useState<RegionInfo[]>([]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const data = await fetchDashboardData();
        setDashboardData(data);
      } catch (error) {
        console.error('Error fetching dashboard data:', error);
      }
    };

    fetchData();

    const intervalId = setInterval(() => {
      fetchData();
    }, STREAMS_UPDATE_INTERVAL);

    return () => clearInterval(intervalId);
  }, []);

  return (
    <Row gutter={10}>
      <Col span={18}>
        <div className="region-container">
          {dashboardData.map((region) => (
            <RegionCard key={region.regionName} {...region} />
          ))}
        </div>
      </Col>
      <Col span={6}>
        <EventSidebar />
      </Col>
    </Row>
  );
};

export default Dashboard;
