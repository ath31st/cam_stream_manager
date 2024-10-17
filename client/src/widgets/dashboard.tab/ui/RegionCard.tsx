import React, { useState } from 'react';
import { RegionInfo } from '../../../entities/dashboard';
import { useResponsiblePersonStore } from '../../../app/stores/responsible.person.store';
import { ResponsiblePersonModal } from '../../../entities/responsible.person';
import { Card } from 'antd';
import StatusCounts from './StatusCounts';

const RegionCard: React.FC<RegionInfo> = ({
  regionName,
  streams,
  activeCount,
  noConnectionCount,
  badConnectionCount,
}) => {
  const [isModalVisible, setIsModalVisible] = useState(false);
  const [isOpen, setIsOpen] = useState(false);
  const { fetchResponsiblePersonsByStream, responsiblePersons } =
    useResponsiblePersonStore();

  const toggleOpen = () => setIsOpen((prev) => !prev);

  const openModal = async (streamId: number) => {
    fetchResponsiblePersonsByStream(streamId);
    setIsModalVisible(true);
  };

  const closeModal = () => {
    setIsModalVisible(false);
  };

  const statusCounts: {
    count: number;
    type: 'active' | 'noConnection' | 'badConnection';
  }[] = [
    { count: activeCount, type: 'active' },
    { count: noConnectionCount, type: 'noConnection' },
    { count: badConnectionCount, type: 'badConnection' },
  ];

  return (
    <Card
      title={regionName}
      onClick={toggleOpen}
      style={{ cursor: 'pointer', marginBottom: 16 }}
    >
      <StatusCounts statusCounts={statusCounts} />
      {isOpen && (
        <ul style={{ marginTop: 10 }}>
          {streams.map((stream) => (
            <li
              key={stream.id}
              style={{ cursor: 'pointer' }}
              onClick={() => openModal(stream.id)}
            >
              {stream.location}: {stream.status}
            </li>
          ))}
        </ul>
      )}

      <ResponsiblePersonModal
        onClose={closeModal}
        isOpen={isModalVisible}
        responsiblePersons={responsiblePersons}
      />
    </Card>
  );
};

export default RegionCard;
