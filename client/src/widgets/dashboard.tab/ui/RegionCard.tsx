import React, { useState } from 'react';
import { RegionInfo } from '../../../entities/dashboard';
import { useResponsiblePersonStore } from '../../../app/stores/responsible.person.store';
import { ResponsiblePersonModal } from '../../../entities/responsible.person';
import { Card } from 'antd';
import StatusCounts from './StatusCounts';
import { StreamStatus, StreamStatusType } from '../lib/stream.status';
import StreamItem from './StreamItem';
import styles from './RegionCard.module.css';

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

  const handleCardClick = () => {
    if (!isModalVisible) {
      toggleOpen();
    }
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
      onClick={handleCardClick}
      className={styles.card}
    >
      <StatusCounts statusCounts={statusCounts} />
      {isOpen && (
        <ul className={styles['card-list']}>
          {streams.map((stream) => (
            <StreamItem
              key={stream.id}
              location={stream.location}
              status={stream.status}
              onClick={() => openModal(stream.id)}
            />
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
