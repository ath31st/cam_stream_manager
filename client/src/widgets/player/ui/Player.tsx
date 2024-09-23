import React from 'react';
import { useStreamStore } from '../../../app/stores/stream.store';
import HLSPlayer from '../../../shared/HLSPlayer';
import styles from './Player.module.css';

export const Player: React.FC = () => {
  const { selectedStream } = useStreamStore();

  return (
    <div className={styles['player-container']}>
      {selectedStream ? (
        selectedStream.status === 'Active' ? (
          <HLSPlayer url={selectedStream.streamUrl} />
        ) : (
          <div className="placeholder">Стрим недоступен</div>
        )
      ) : (
        <div className="placeholder">Выберите стрим из списка</div>
      )}
    </div>
  );
};
