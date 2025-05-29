import { Card } from 'antd';
import type React from 'react';
import type { PlaylistInfo } from '../../../shared/api.types';
import styles from './PlaylistCard.module.css';
import StatusCounts from './StatusCounts';
import StreamItemList from './StreamItemList';
import { ResponsiblePersonModal } from '../../../widgets/responsible.person';
import usePlaylistCardHandlers from '../model/use.playlist.card.handlers';

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
  const { state, modals, types } = usePlaylistCardHandlers(
    activeCount,
    noConnectionCount,
    badConnectionCount,
  );

  return (
    <Card
      title={<span className={styles['card-title']}>{playlistName}</span>}
      onClick={() => onToggle(playlistName)}
      className={styles.card}
    >
      <StatusCounts statusCounts={types.statusCounts} />
      {isOpen && streams.length > 0 && (
        <StreamItemList streams={streams} onItemClick={modals.openModal} />
      )}

      <ResponsiblePersonModal
        onClose={modals.closeModal}
        isOpen={modals.isModalVisible}
        responsiblePersons={state.responsiblePersonsByStream}
      />
    </Card>
  );
};

export default PlaylistCard;
