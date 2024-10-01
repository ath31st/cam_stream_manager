import React, { useEffect } from 'react';
import { useStreamStore } from '../../../app/stores/stream.store';
import { HLSPlayer } from '../../../shared/HLSPlayer';
import styles from './Player.module.css';
import { useResponsiblePersonStore } from '../../../app/stores/responsible.person.store';
import ResponsiblePersons from './ResponsiblePersons';

export const Player: React.FC = () => {
  const { selectedStream } = useStreamStore();
  const { fetchResponsiblePersonsByStream, responsiblePersons } =
    useResponsiblePersonStore();

  useEffect(() => {
    if (selectedStream) {
      fetchResponsiblePersonsByStream(selectedStream.id);
    }
  }, [selectedStream, fetchResponsiblePersonsByStream]);

  return (
    <div className={styles['player-container']}>
      {selectedStream ? (
        <>
          {selectedStream.status === 'Active' ? (
            <HLSPlayer url={selectedStream.streamUrl} />
          ) : (
            <div className="placeholder">Стрим недоступен</div>
          )}
          <ResponsiblePersons responsiblePersons={responsiblePersons} />
        </>
      ) : (
        <div className="placeholder">Выберите стрим из списка</div>
      )}
    </div>
  );
};
