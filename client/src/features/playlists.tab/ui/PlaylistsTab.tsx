import type React from 'react';
import { useEffect, useState } from 'react';
import { useGroupStore } from '../../../entities/group';
import { usePlaylistStore } from '../../../entities/playlist';
import { useStreamStore } from '../../../entities/stream';
import type {
  NewPlaylist,
  Playlist,
  UpdatePlaylist,
} from '../../../shared/api.types';
import {
  errorNotification,
  successNotification,
} from '../../../shared/notifications';
import { LargeLoader, TabContainer, WideButton } from '../../../shared/ui';
import PlaylistsTable from './PlaylistsTable';
import PlaylistModals from './PlaylistModals';

const PlaylistsTab: React.FC = () => {
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

  return (
    <TabContainer>
      <>
        <WideButton onClick={() => setIsAddModalVisible(true)}>
          Добавить плейлист
        </WideButton>

        {loading ? (
          <LargeLoader />
        ) : (
          <PlaylistsTable
            groups={groups}
            playlists={playlists}
            onEdit={showUpdateModal}
            onDelete={showDeleteConfirm}
          />
        )}

        <PlaylistModals
          groups={groups}
          isAddModalVisible={isAddModalVisible}
          isDeleteModalVisible={isDeleteModalVisible}
          isUpdateModalVisible={isUpdateModalVisible}
          updatingPlaylist={updatingPlaylist}
          deletePlaylistId={deletePlaylistId}
          onAdd={handleAddPlaylist}
          onDelete={handleDelete}
          onUpdate={handleUpdatePlaylist}
          onCloseAdd={() => setIsAddModalVisible(false)}
          onCloseDelete={() => {
            setDeletePlaylistId(null);
            setIsDeleteModalVisible(false);
          }}
          onCloseUpdate={() => {
            setUpdatingPlaylist(null);
            setIsUpdateModalVisible(false);
          }}
        />
      </>
    </TabContainer>
  );
};

export default PlaylistsTab;
