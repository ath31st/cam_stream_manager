import type React from 'react';
import type { StreamDashboard } from '../../../shared/api.types';
import StreamItem from './StreamItem';
import styles from './StreamItemList.module.css';

interface StreamItemListProps {
  streams: StreamDashboard[];
  onItemClick: (streamId: number) => void;
}

const StreamItemList: React.FC<StreamItemListProps> = ({
  streams,
  onItemClick,
}) => {
  return (
    <ul className={styles['stream-item-list']}>
      {streams.map((stream) => (
        <StreamItem
          key={stream.id}
          name={stream.name}
          status={stream.status}
          onClick={() => onItemClick(stream.id)}
        />
      ))}
    </ul>
  );
};

export default StreamItemList;
