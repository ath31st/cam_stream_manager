import React, { useEffect, useState } from 'react';
import { useStreamStore } from '../../../app/stores/stream.store';
import { VideoPlayer } from '../../../shared/video.player';
import styles from './Player.module.css';
import { useResponsiblePersonStore } from '../../../app/stores/responsible.person.store';
import UnavailableStreamCard from './UnavailableStreamCard';
import { ResponsiblePersonModal } from '../../../entities/responsible.person';
import WelcomeCard from './WelcomeCard';
import WideButton from '../../../shared/ui/buttons/WideButton';

export const Player: React.FC = () => {
  const { selectedStream } = useStreamStore();
  const { fetchResponsiblePersonsByStream, responsiblePersonsByStream } =
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
              <VideoPlayer url={selectedStream.streamUrl} />
              <WideButton onClick={openModal}>
                Показать ответственных лиц
              </WideButton>
            </>
          ) : (
            <UnavailableStreamCard
              responsiblePersons={responsiblePersonsByStream}
            />
          )}

          <ResponsiblePersonModal
            onClose={closeModal}
            isOpen={isModalVisible}
            responsiblePersons={responsiblePersonsByStream}
          />
        </>
      ) : (
        <WelcomeCard />
      )}
    </div>
  );
};
