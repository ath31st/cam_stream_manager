import type React from 'react';
import styles from './MediumLoader.module.css';

const MediumLoader: React.FC = () => {
  return (
    <div className={styles['loader-container']}>
      <span className={styles.loader} />
    </div>
  );
};

export default MediumLoader;
