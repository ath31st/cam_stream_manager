import React, { useEffect, useState } from 'react';
import { Row, Col } from 'antd';
import RegionCard from './RegionCard';
import { STREAMS_UPDATE_INTERVAL } from '../lib/dashboard.constants';
import { RegionInfo, fetchDashboardData } from '../../../entities/dashboard';
import { EventSidebar } from '../../event.sidebar';

const Dashboard: React.FC = () => {
  const [dashboardData, setDashboardData] = useState<RegionInfo[]>([]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const data = await fetchDashboardData();
        if (JSON.stringify(data) !== JSON.stringify(dashboardData)) {
          setDashboardData(data);
        }
      } catch (error) {
        console.error('Error fetching dashboard data:', error);
      }
    };

    fetchData();

    const intervalId = setInterval(() => {
      fetchData();
    }, STREAMS_UPDATE_INTERVAL);

    return () => clearInterval(intervalId);
  }, [dashboardData]);

  return (
    <Row gutter={16}>
      <Col span={18}>
        <Row gutter={[16, 22]}>
          {dashboardData.map((region) => (
            <Col key={region.regionName} xs={24} sm={12} lg={8}>
              <RegionCard {...region} />
            </Col>
          ))}
        </Row>
      </Col>
      <Col span={6}>
        <EventSidebar />
      </Col>
    </Row>
  );
};

export default Dashboard;
