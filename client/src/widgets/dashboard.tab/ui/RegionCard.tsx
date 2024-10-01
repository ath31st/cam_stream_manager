// RegionCard.tsx
import React, { useState } from 'react';
import { Stream } from '../../../entities/stream';

interface RegionCardProps {
  regionName: string;
  activeCount: number;
  noConnectionCount: number;
  badConnectionCount: number;
  streams: Stream[];
}

const RegionCard: React.FC<RegionCardProps> = ({
  regionName,
  activeCount,
  noConnectionCount,
  badConnectionCount,
  streams,
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
