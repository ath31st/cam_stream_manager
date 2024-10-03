import React, { useEffect } from 'react';
import { useStreamStore } from '../../../app/stores/stream.store';
import RegionCard from './RegionCard';
import { useRegionStore } from '../../../app/stores/region.store';
import { GroupedRegion } from '../model/dashboard.types';

const Dashboard: React.FC = () => {
  const { streams, fetchAllStreams } = useStreamStore();
  const { regions, fetchAllRegions } = useRegionStore();

  useEffect(() => {
    fetchAllRegions();
    fetchAllStreams();

    const intervalId = setInterval(() => {
      fetchAllStreams();
    }, 10000);

    return () => clearInterval(intervalId);
  }, [fetchAllRegions, fetchAllStreams]);

  const groupedRegions: Record<string, GroupedRegion> = streams.reduce(
    (acc: Record<string, GroupedRegion>, stream) => {
      const regionId = stream.regionId;
      const regionName =
        regions.find((region) => region.id === regionId)?.name ||
        'Неизвестный регион';

      if (!acc[regionId]) {
        acc[regionId] = {
          regionName,
          streams: [],
          activeCount: 0,
          noConnectionCount: 0,
          badConnectionCount: 0,
        };
      }

      acc[regionId].streams.push(stream);
      if (stream.status === 'Active') {
        acc[regionId].activeCount++;
      } else if (stream.status === 'No connection') {
        acc[regionId].noConnectionCount++;
      } else if (stream.status === 'Bad connection') {
        acc[regionId].badConnectionCount++;
      }

      return acc;
    },
    {},
  );

  return (
    <div>
      <h1>Дашборд</h1>
      <div className="region-container">
        {Object.values(groupedRegions).map((region) => (
          <RegionCard key={region.regionName} {...region} />
        ))}
      </div>
    </div>
  );
};

export default Dashboard;
