import type React from 'react';
import styles from './StreamItem.module.css';

interface StreamItemProps {
  name: string;
  status: string;
  onClick: () => void;
}

const StreamItem: React.FC<StreamItemProps> = ({ name, status, onClick }) => {
  const handleClick = (event: React.MouseEvent) => {
    event.stopPropagation();
    onClick();
  };

  const handleKeyDown = (event: React.KeyboardEvent) => {
    if (event.key === 'Enter' || event.key === ' ') {
      event.stopPropagation();
      onClick();
    }
  };

  const getStatusColor = () => {
    switch (status) {
      case 'Active':
        return styles.active;
      case 'No connection':
        return styles.noConnection;
      case 'Bad connection':
        return styles.badConnection;
      default:
        return '';
    }
  };

  return (
    <div
      className={styles.streamItem}
      onClick={handleClick}
      onKeyDown={handleKeyDown}
    >
      <span className={getStatusColor()}>{name}</span>
    </div>
  );
};

export default StreamItem;
