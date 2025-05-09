import type React from 'react';
import { useEffect, useState } from 'react';
import { useResponsiblePersonStore } from '../../../entities/responsible.person';
import { useStreamStore } from '../../../entities/stream';
import { WideButton } from '../../../shared/ui';
import { VideoPlayer } from '../../../shared/video.player';
import { ResponsiblePersonModal } from '../../../widgets/responsible.person';
import styles from './Player.module.css';
import UnavailableStreamCard from './UnavailableStreamCard';
import WelcomeCard from './WelcomeCard';

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
              <WideButton onClick={openModal}>Ответственные лица</WideButton>
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
