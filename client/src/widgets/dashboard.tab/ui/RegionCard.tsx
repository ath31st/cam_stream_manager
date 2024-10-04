import React, { useState } from 'react';
import { GroupedRegion } from '../model/dashboard.types';

const RegionCard: React.FC<GroupedRegion> = ({
  regionName,
  streams,
  activeCount,
  noConnectionCount,
  badConnectionCount,
}) => {
  const [isOpen, setIsOpen] = useState(false);

  const toggleOpen = () => setIsOpen((prev) => !prev);

  return (
    <div className="region-card">
      <h3 onClick={toggleOpen} style={{ cursor: 'pointer' }}>
        {regionName} ({activeCount} активных, {noConnectionCount} без
        соединения, {badConnectionCount} с плохим соединением)
      </h3>
      {isOpen && (
        <ul>
          {streams.map((stream) => (
            <li key={stream.id}>
              {stream.location}: {stream.status}
            </li>
          ))}
        </ul>
      )}
    </div>
  );
};

export default RegionCard;
