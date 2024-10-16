import React, { useEffect, useState } from 'react';
import { useStreamStore } from '../../../app/stores/stream.store';
import { HLSPlayer } from '../../../shared/hls.player';
import styles from './Player.module.css';
import { useResponsiblePersonStore } from '../../../app/stores/responsible.person.store';
import UnavailableStreamCard from './UnavailableStreamCard';
import { ResponsiblePersonModal } from '../../../entities/responsible.person';
import WelcomeCard from './WelcomeCard';

export const Player: React.FC = () => {
  const { selectedStream } = useStreamStore();
  const { fetchResponsiblePersonsByStream, responsiblePersons } =
    useResponsiblePersonStore();

  const [isModalVisible, setIsModalVisible] = useState(false);

  useEffect(() => {
    if (selectedStream) {
      fetchResponsiblePersonsByStream(selectedStream.id);
    }
  }, [selectedStream, fetchResponsiblePersonsByStream]);

  const openModal = () => {
    setIsModalVisible(true);
  };

  const closeModal = () => {
    setIsModalVisible(false);
  };

  return (
    <div className={styles['player-container']}>
      {selectedStream ? (
        <>
          {selectedStream.status === 'Active' ? (
            <>
              <HLSPlayer url={selectedStream.streamUrl} />
              <button onClick={openModal}>Показать ответственных лиц</button>
            </>
          ) : (
            <UnavailableStreamCard responsiblePersons={responsiblePersons} />
          )}

          <ResponsiblePersonModal
            onClose={closeModal}
            isOpen={isModalVisible}
            responsiblePersons={responsiblePersons}
          />
        </>
      ) : (
        <WelcomeCard />
      )}
    </div>
  );
};
