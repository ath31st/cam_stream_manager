import { Space } from 'antd';
import type React from 'react';
import { useEffect, useState } from 'react';
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
import {
  LargeLoader,
  PlaylistSelect,
  TabContainer,
  WideButton,
} from '../../../shared/ui';
import StreamModals from './StreamsModals';
import StreamsTable from './StreamsTable';

const StreamsTab: React.FC = () => {
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

  const handleAddStream = () => {
    setIsAddModalVisible(true);
  };

  const handleSaveStream = async (value: NewStream) => {
    await addStream(value);
    if (useStreamStore.getState().error === null) {
      successNotification(
        'Поток добавлен',
        `Поток "${value.name}" успешно добавлен.`,
      );
      setIsAddModalVisible(false);
    }
  };

  const handleCancelAdd = () => {
    setIsAddModalVisible(false);
  };

  const handleUpdate = (stream: Stream) => {
    setUpdatingStream(stream);
    setIsUpdateModalVisible(true);
  };

  const handleSaveUpdate = async (value: UpdateStream) => {
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

  const handleCancelUpdate = () => {
    setIsUpdateModalVisible(false);
    setUpdatingStream(null);
  };

  const showDeleteConfirm = (id: number) => {
    setDeleteStreamId(id);
    setIsDeleteModalVisible(true);
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

  const handleCancelDelete = () => {
    setIsDeleteModalVisible(false);
    setDeleteStreamId(null);
  };

  const filteredStreams = selectedPlaylistId
    ? streams.filter((stream) => stream.playlistId === selectedPlaylistId)
    : streams;

  return (
    <TabContainer>
      <Space>
        <WideButton onClick={handleAddStream}>Добавить поток</WideButton>
        <PlaylistSelect
          playlists={playlists}
          onChange={setSelectedPlaylistId}
        />
      </Space>

      {loading ? (
        <LargeLoader />
      ) : (
        <StreamsTable
          streams={filteredStreams}
          playlists={playlists}
          onEdit={handleUpdate}
          onDelete={showDeleteConfirm}
        />
      )}

      <StreamModals
        isAddModalVisible={isAddModalVisible}
        isUpdateModalVisible={isUpdateModalVisible}
        isDeleteModalVisible={isDeleteModalVisible}
        updatingStream={updatingStream}
        deleteStreamId={deleteStreamId}
        playlists={playlists}
        handleSaveStream={handleSaveStream}
        handleSaveUpdate={handleSaveUpdate}
        handleCancelAdd={handleCancelAdd}
        handleCancelUpdate={handleCancelUpdate}
        handleDelete={handleDelete}
        handleCancelDelete={handleCancelDelete}
      />
    </TabContainer>
  );
};

export default StreamsTab;
