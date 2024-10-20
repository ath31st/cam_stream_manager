import React, { useState } from 'react';
import { RegionInfo } from '../../../entities/dashboard';
import { useResponsiblePersonStore } from '../../../app/stores/responsible.person.store';
import { ResponsiblePersonModal } from '../../../entities/responsible.person';
import { Card } from 'antd';
import StatusCounts from './StatusCounts';
import { StreamStatus, StreamStatusType } from '../lib/stream.status';
import styles from './RegionCard.module.css';
import StreamItemList from './StreamItemList';

interface RegionCardProps extends RegionInfo {
  isOpen: boolean;
  onToggle: (regionName: string) => void;
}

const RegionCard: React.FC<RegionCardProps> = ({
  regionName,
  streams,
  activeCount,
  noConnectionCount,
  badConnectionCount,
  isOpen,
  onToggle,
}) => {
  const [isModalVisible, setIsModalVisible] = useState(false);
  const { fetchResponsiblePersonsByStream, responsiblePersons } =
    useResponsiblePersonStore();

  const openModal = async (streamId: number) => {
    fetchResponsiblePersonsByStream(streamId);
    setIsModalVisible(true);
  };

  const closeModal = () => {
    setIsModalVisible(false);
  };

  const statusCounts: {
    count: number;
    type: StreamStatusType;
  }[] = [
    { count: activeCount, type: StreamStatus.Active },
    { count: noConnectionCount, type: StreamStatus.NoConnection },
    { count: badConnectionCount, type: StreamStatus.BadConnection },
  ];

  return (
    <Card
      title={<span className={styles['card-title']}>{regionName}</span>}
      onClick={() => onToggle(regionName)}
      className={styles.card}
    >
      <StatusCounts statusCounts={statusCounts} />
      {isOpen && streams.length > 0 && (
        <StreamItemList streams={streams} onItemClick={openModal} />
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
