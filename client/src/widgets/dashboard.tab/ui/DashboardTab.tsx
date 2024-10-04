import React, { useEffect } from 'react';
import { useStreamStore } from '../../../app/stores/stream.store';
import RegionCard from './RegionCard';
import { useRegionStore } from '../../../app/stores/region.store';
import { groupStreamsByRegion } from '../model/group.streams.by.region';
import { STREAMS_UPDATE_INTERVAL } from '../lib/dashboard.constants';

const Dashboard: React.FC = () => {
  const { streams, fetchAllStreams } = useStreamStore();
  const { regions, fetchAllRegions } = useRegionStore();

  useEffect(() => {
    fetchAllRegions();
    fetchAllStreams();

    const intervalId = setInterval(() => {
      fetchAllStreams();
    }, STREAMS_UPDATE_INTERVAL);

    return () => clearInterval(intervalId);
  }, [fetchAllRegions, fetchAllStreams]);

  const groupedRegions = groupStreamsByRegion(streams, regions);

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
