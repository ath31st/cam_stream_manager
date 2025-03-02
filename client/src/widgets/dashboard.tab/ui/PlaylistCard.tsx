import React, { useState } from 'react';
import { PlaylistInfo } from '../../../entities/dashboard';
import { useResponsiblePersonStore } from '../../../entities/responsible.person';
import { ResponsiblePersonModal } from '../../responsible.person';
import { Card } from 'antd';
import StatusCounts from './StatusCounts';
import { StreamStatus, StreamStatusType } from '../lib/stream.status';
import styles from './PlaylistCard.module.css';
import StreamItemList from './StreamItemList';

interface PlaylistCardProps extends PlaylistInfo {
  isOpen: boolean;
  onToggle: (playlistName: string) => void;
}

const PlaylistCard: React.FC<PlaylistCardProps> = ({
  playlistName,
  streams,
  activeCount,
  noConnectionCount,
  badConnectionCount,
  isOpen,
  onToggle,
}) => {
  const [isModalVisible, setIsModalVisible] = useState(false);
  const { fetchResponsiblePersonsByStream, responsiblePersonsByStream } =
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
      title={<span className={styles['card-title']}>{playlistName}</span>}
      onClick={() => onToggle(playlistName)}
      className={styles.card}
    >
      <StatusCounts statusCounts={statusCounts} />
      {isOpen && streams.length > 0 && (
        <StreamItemList streams={streams} onItemClick={openModal} />
      )}

      <ResponsiblePersonModal
        onClose={closeModal}
        isOpen={isModalVisible}
        responsiblePersons={responsiblePersonsByStream}
      />
    </Card>
  );
};

export default PlaylistCard;
