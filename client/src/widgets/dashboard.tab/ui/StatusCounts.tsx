import React from 'react';
import styles from './StatusCounts.module.css';

interface StatusCount {
  count: number;
  type: 'active' | 'noConnection' | 'badConnection';
}

interface StatusCountsProps {
  statusCounts: StatusCount[];
}

const StatusCounts: React.FC<StatusCountsProps> = ({ statusCounts }) => {
  const getColor = (type: 'active' | 'noConnection' | 'badConnection') => {
    switch (type) {
      case 'active':
        return 'var(--colorSuccess)';
      case 'noConnection':
        return 'var(--colorError)';
      case 'badConnection':
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
