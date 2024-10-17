import React from 'react';
import styles from './StreamItem.module.css';

interface StreamItemProps {
  location: string;
  status: string;
  onClick: () => void;
}

const StreamItem: React.FC<StreamItemProps> = ({
  location,
  status,
  onClick,
}) => {
  const handleClick = (event: React.MouseEvent) => {
    event.stopPropagation();
    onClick();
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
    <div className={styles.streamItem} onClick={handleClick}>
      <span className={getStatusColor()}>{location}</span>
    </div>
  );
};

export default StreamItem;
