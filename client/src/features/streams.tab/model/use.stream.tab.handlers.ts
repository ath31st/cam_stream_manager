import { useState, useEffect } from 'react';
import { usePlaylistStore } from '../../../entities/playlist';
import { useStreamStore } from '../../../entities/stream';
import type {
  NewStream,
  Stream,
  UpdateStream,
} from '../../../shared/api.types';
import {
  errorNotification,
  successNotification,
} from '../../../shared/notifications';

const useStreamTabHandlers = () => {
  const [isAddModalVisible, setIsAddModalVisible] = useState(false);
  const [isDeleteModalVisible, setIsDeleteModalVisible] = useState(false);
  const [isUpdateModalVisible, setIsUpdateModalVisible] = useState(false);
  const [deleteStreamId, setDeleteStreamId] = useState<number | null>(null);
  const [updatingStream, setUpdatingStream] = useState<Stream | null>(null);
  const [selectedPlaylistId, setSelectedPlaylistId] = useState<number | null>(
    null,
  );

  const {
    streams,
    fetchAllStreams,
    addStream,
    updateStream,
    removeStream,
    error,
    loading,
    clearError,
  } = useStreamStore();
  const { playlists, fetchAllPlaylists } = usePlaylistStore();

  useEffect(() => {
    if (error) {
      errorNotification('Ошибка в работе с потоками', clearError, error);
    }
  }, [error, clearError]);

  useEffect(() => {
    fetchAllStreams();
    fetchAllPlaylists();
  }, [fetchAllStreams, fetchAllPlaylists]);

  const showAddModal = () => {
    setIsAddModalVisible(true);
  };

  const closeAddModal = () => {
    setIsAddModalVisible(false);
  };

  const handleAdd = async (value: NewStream) => {
    await addStream(value);
    if (useStreamStore.getState().error === null) {
      successNotification(
        'Поток добавлен',
        `Поток "${value.name}" успешно добавлен.`,
      );
      setIsAddModalVisible(false);
    }
  };

  const showUpdateModal = (stream: Stream) => {
    setUpdatingStream(stream);
    setIsUpdateModalVisible(true);
  };

  const closeUpdateModal = () => {
    setIsUpdateModalVisible(false);
    setUpdatingStream(null);
  };

  const handleUpdate = async (value: UpdateStream) => {
    if (updatingStream) {
      await updateStream(updatingStream.id, value);
      if (useStreamStore.getState().error === null) {
        successNotification(
          'Поток обновлен',
          `Поток "${value.name}" успешно обновлен.`,
        );
        setIsUpdateModalVisible(false);
        setUpdatingStream(null);
      }
    }
  };

  const showDeleteModal = (id: number) => {
    setDeleteStreamId(id);
    setIsDeleteModalVisible(true);
  };

  const closeDeleteModal = () => {
    setIsDeleteModalVisible(false);
    setDeleteStreamId(null);
  };

  const handleDelete = async () => {
    if (deleteStreamId !== null) {
      await removeStream(deleteStreamId);
      if (useStreamStore.getState().error === null) {
        successNotification('Поток удален', 'Поток успешно удален.');
      }
      setDeleteStreamId(null);
      setIsDeleteModalVisible(false);
    }
  };

  const filteredStreams = selectedPlaylistId
    ? streams.filter((stream) => stream.playlistId === selectedPlaylistId)
    : streams;

  return {
    state: {
      deleteStreamId,
      updatingStream,
      selectedPlaylistId,
      filteredStreams,
      playlists,
      loading,
      error,
    },
    actions: {
      handleAdd,
      handleUpdate,
      handleDelete,
    },
    modals: {
      isAddModalVisible,
      showAddModal,
      closeAddModal,
      isDeleteModalVisible,
      showDeleteModal,
      closeDeleteModal,
      isUpdateModalVisible,
      showUpdateModal,
      closeUpdateModal,
    },
    setters: {
      setSelectedPlaylistId,
    },
  };
};

export default useStreamTabHandlers;
