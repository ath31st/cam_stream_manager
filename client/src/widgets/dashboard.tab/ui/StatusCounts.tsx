import React from 'react';
import styles from './StatusCounts.module.css';
import { StreamStatus, StreamStatusType } from '../lib/stream.status';

interface StatusCount {
  count: number;
  type: StreamStatusType;
}

interface StatusCountsProps {
  statusCounts: StatusCount[];
}

const StatusCounts: React.FC<StatusCountsProps> = ({ statusCounts }) => {
  const getColor = (type: StreamStatusType) => {
    switch (type) {
      case StreamStatus.Active:
        return 'var(--colorSuccess)';
      case StreamStatus.NoConnection:
        return 'var(--colorError)';
      case StreamStatus.BadConnection:
        return 'var(--colorWarning)';
      default:
        return 'var(--colorPrimary)';
    }
  };

  return (
    <div className={styles.statusCounts}>
      {statusCounts.map((status, index) => (
        <React.Fragment key={index}>
          <span
            className={`${styles.statusCount} ${status.type === 'noConnection' && status.count > 0 ? styles.pulsating : ''}`}
            style={{ color: getColor(status.type) }}
          >
            {status.count}
          </span>
          {index < statusCounts.length - 1 && (
            <span className={styles.slash}> / </span>
          )}
        </React.Fragment>
      ))}
    </div>
  );
};

export default StatusCounts;
