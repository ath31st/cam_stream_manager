import React from 'react';
import styles from './LargeLoader.module.css';

const LargeLoader: React.FC = () => {
  return (
    <div className={styles['loader-container']}>
      <span className={styles.loader}></span>
    </div>
  );
};

export default LargeLoader;
