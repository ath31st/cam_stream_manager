import React, { useEffect, useState } from 'react';
import { useStreamStore } from '../../../entities/stream';
import { VideoPlayer } from '../../../shared/video.player';
import styles from './Player.module.css';
import { useResponsiblePersonStore } from '../../../entities/responsible.person';
import UnavailableStreamCard from './UnavailableStreamCard';
import { ResponsiblePersonModal } from '../../../widgets/responsible.person';
import WelcomeCard from './WelcomeCard';
import { WideButton } from '../../../shared';

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
