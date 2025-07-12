import { useState } from 'react';
import { useResponsiblePersonStore } from '@/entities/responsible.person';
import { StreamStatus, type StreamStatusType } from '../lib/stream.status';

const usePlaylistCardHandlers = (
  activeCount: number,
  noConnectionCount: number,
  badConnectionCount: number,
) => {
  const [isModalVisible, setIsModalVisible] = useState(false);
  const { fetchResponsiblePersonsByStream, responsiblePersonsByStream } =
    useResponsiblePersonStore();

  const openModal = async (streamId: number) => {
    fetchResponsiblePersonsByStream(streamId);
    setIsModalVisible(true);
  };

  const closeModal = () => {
    setIsModalVisible(false);
  };

  const statusCounts: {
    count: number;
    type: StreamStatusType;
  }[] = [
    { count: activeCount, type: StreamStatus.Active },
    { count: noConnectionCount, type: StreamStatus.NoConnection },
    { count: badConnectionCount, type: StreamStatus.BadConnection },
  ];

  return {
    types: {
      statusCounts,
    },
    modals: { openModal, closeModal, isModalVisible },
    state: {
      responsiblePersonsByStream,
    },
  };
};

export default usePlaylistCardHandlers;
