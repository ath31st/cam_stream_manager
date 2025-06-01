import { useState, useEffect } from 'react';
import { useGroupStore } from '../../../entities/group';
import { usePlaylistStore } from '../../../entities/playlist';
import { useStreamStore } from '../../../entities/stream';
import type {
  Playlist,
  NewPlaylist,
  UpdatePlaylist,
} from '../../../shared/api.types';
import {
  errorNotification,
  successNotification,
} from '../../../shared/notifications';

const usePlaylistTabHandlers = () => {
  const [isAddModalVisible, setIsAddModalVisible] = useState(false);
  const [isDeleteModalVisible, setIsDeleteModalVisible] = useState(false);
  const [isUpdateModalVisible, setIsUpdateModalVisible] = useState(false);
  const [deletePlaylistId, setDeletePlaylistId] = useState<number | null>(null);
  const [updatingPlaylist, setUpdatingPlaylist] = useState<Playlist | null>(
    null,
  );

  const { groups, fetchAllGroups } = useGroupStore();

  useEffect(() => {
    fetchAllGroups();
  }, [fetchAllGroups]);

  const {
    playlists,
    fetchAllPlaylists,
    loading,
    error,
    addPlaylist,
    updatePlaylist,
    removePlaylist,
    clearError,
  } = usePlaylistStore();
  const { fetchAllStreams } = useStreamStore();

  useEffect(() => {
    if (error) {
      errorNotification('Ошибка в работе с плейлистами', clearError, error);
    }
  }, [error, clearError]);

  useEffect(() => {
    fetchAllPlaylists();
  }, [fetchAllPlaylists]);

  const showAddModal = () => {
    setIsAddModalVisible(true);
  };

  const closeAddModal = () => {
    setIsAddModalVisible(false);
  };

  const handleAddPlaylist = async (newPlaylist: NewPlaylist) => {
    const playlist = await addPlaylist(newPlaylist);
    if (usePlaylistStore.getState().error === null) {
      successNotification(
        'Плейлист добавлен',
        `Плейлист "${playlist?.name}" успешно добавлен.`,
      );
      setIsAddModalVisible(false);
    }
  };

  const showDeleteConfirm = (id: number) => {
    setDeletePlaylistId(id);
    setIsDeleteModalVisible(true);
  };

  const closeDeleteModal = () => {
    setDeletePlaylistId(null);
    setIsDeleteModalVisible(false);
  };

  const handleDelete = async () => {
    if (deletePlaylistId !== null) {
      await removePlaylist(deletePlaylistId);
      await fetchAllStreams();
      if (usePlaylistStore.getState().error === null) {
        successNotification('Плейлист удален', 'Плейлист успешно удален.');
      }
      setDeletePlaylistId(null);
      setIsDeleteModalVisible(false);
    }
  };

  const showUpdateModal = (playlist: Playlist) => {
    setUpdatingPlaylist(playlist);
    setIsUpdateModalVisible(true);
  };

  const closeUpdateModal = () => {
    setUpdatingPlaylist(null);
    setIsUpdateModalVisible(false);
  };

  const handleUpdatePlaylist = async (updatedPlaylist: UpdatePlaylist) => {
    if (updatingPlaylist) {
      await updatePlaylist(updatingPlaylist.id, updatedPlaylist);
      if (usePlaylistStore.getState().error === null) {
        successNotification(
          'Плейлист обновлен',
          `Плейлист "${updatedPlaylist.name}" успешно обновлен.`,
        );
        setUpdatingPlaylist(null);
        setIsUpdateModalVisible(false);
      }
    }
  };

  return {
    state: {
      playlists,
      loading,
      groups,
      deletePlaylistId,
      updatingPlaylist,
    },
    actions: {
      handleDelete,
      handleAddPlaylist,
      handleUpdatePlaylist,
    },
    modals: {
      isAddModalVisible,
      showAddModal,
      closeAddModal,
      isDeleteModalVisible,
      showDeleteConfirm,
      closeDeleteModal,
      isUpdateModalVisible,
      showUpdateModal,
      closeUpdateModal,
    },
  };
};

export default usePlaylistTabHandlers;
