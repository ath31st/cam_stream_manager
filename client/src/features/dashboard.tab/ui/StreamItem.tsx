import type React from 'react';
import useStreamItemHandlers from '../model/use.stream.item.handlers';
import styles from './StreamItem.module.css';

interface StreamItemProps {
  name: string;
  status: string;
  onClick: () => void;
}

const StreamItem: React.FC<StreamItemProps> = ({ name, status, onClick }) => {
  const { actions } = useStreamItemHandlers(status, onClick);

  return (
    <div
      className={styles.streamItem}
      onClick={actions.handleClick}
      onKeyDown={actions.handleKeyDown}
    >
      <span className={actions.handleStatusColor()}>{name}</span>
    </div>
  );
};

export default StreamItem;
