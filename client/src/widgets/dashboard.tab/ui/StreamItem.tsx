import React from 'react';
import styles from './StreamItem.module.css';

interface StreamItemProps {
  name: string;
  status: string;
  onClick: () => void;
}

const StreamItem: React.FC<StreamItemProps> = ({
  name,
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
      <span className={getStatusColor()}>{name}</span>
    </div>
  );
};

export default StreamItem;
