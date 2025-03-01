import React from 'react';
import styles from './LevelBadge.module.css';

interface LevelBadgeProps {
  level: string;
}

const LevelBadge: React.FC<LevelBadgeProps> = ({ level }) => {
  const getBadgeStyle = () => {
    switch (level) {
      case 'ERROR':
        return styles.error;
      case 'WARNING':
        return styles.warning;
      case 'INFO':
        return styles.info;
      default:
        return styles.default;
    }
  };

  return <span className={`${styles.badge} ${getBadgeStyle()}`}>{level}</span>;
};

export default LevelBadge;
