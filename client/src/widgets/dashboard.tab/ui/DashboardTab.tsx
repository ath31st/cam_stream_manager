import React, { useEffect, useState } from 'react';
import RegionCard from './RegionCard';
import { STREAMS_UPDATE_INTERVAL } from '../lib/dashboardConstants';
import { RegionInfo, fetchDashboardData } from '../../../entities/dashboard';

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
    <div>
      <h1>Дашборд</h1>
      <div className="region-container">
        {dashboardData.map((region) => (
          <RegionCard key={region.regionName} {...region} />
        ))}
      </div>
    </div>
  );
};

export default Dashboard;
