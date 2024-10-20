import React from 'react';
import StreamItem from './StreamItem';
import styles from './StreamItemList.module.css';
import { StreamDashboard } from '../../../entities/dashboard';

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
          location={stream.location}
          status={stream.status}
          onClick={() => onItemClick(stream.id)}
        />
      ))}
    </ul>
  );
};

export default StreamItemList;
