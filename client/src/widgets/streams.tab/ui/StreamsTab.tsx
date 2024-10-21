import React, { useEffect, useState } from 'react';
import { Space } from 'antd';
import { useStreamStore } from '../../../app/stores/stream.store';
import { useRegionStore } from '../../../app/stores/region.store';
import {
  errorNotification,
  successNotification,
} from '../../../shared/notifications';
import StreamsTable from './StreamsTable';
import StreamModals from './StreamsModals';
import { Stream, NewStream, UpdateStream } from '../../../entities/stream';
import TabContainer from '../../../shared/ui/containers/TabContainer';
import WideButton from '../../../shared/ui/buttons/WideButton';
import RegionSelect from '../../../shared/ui/selects/RegionSelect';
import LargeLoader from '../../../shared/ui/loaders/LargeLoader';

const StreamsTab: React.FC = () => {
  const [isAddModalVisible, setIsAddModalVisible] = useState(false);
  const [isDeleteModalVisible, setIsDeleteModalVisible] = useState(false);
  const [isUpdateModalVisible, setIsUpdateModalVisible] = useState(false);
  const [deleteStreamId, setDeleteStreamId] = useState<number | null>(null);
  const [updatingStream, setUpdatingStream] = useState<Stream | null>(null);
  const [selectedRegionId, setSelectedRegionId] = useState<number | null>(null);

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
  const { regions, fetchAllRegions } = useRegionStore();

  useEffect(() => {
    if (error) {
      errorNotification('Ошибка в работе с потоками', clearError, error);
    }
  }, [error, clearError]);

  useEffect(() => {
    fetchAllStreams();
    fetchAllRegions();
  }, [fetchAllStreams, fetchAllRegions]);

  const handleAddStream = () => {
    setIsAddModalVisible(true);
  };

  const handleSaveStream = async (value: NewStream) => {
    await addStream(value);
    if (useStreamStore.getState().error === null) {
      successNotification(
        'Поток добавлен',
        `Поток "${value.location}" успешно добавлен.`,
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
          `Поток "${value.location}" успешно обновлен.`,
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
        successNotification('Поток удален', `Поток успешно удален.`);
      }
      setDeleteStreamId(null);
      setIsDeleteModalVisible(false);
    }
  };

  const handleCancelDelete = () => {
    setIsDeleteModalVisible(false);
    setDeleteStreamId(null);
  };

  const filteredStreams = selectedRegionId
    ? streams.filter((stream) => stream.regionId === selectedRegionId)
    : streams;

  return (
    <TabContainer>
      <Space>
        <WideButton onClick={handleAddStream}>Добавить поток</WideButton>
        <RegionSelect regions={regions} onChange={setSelectedRegionId} />
      </Space>

      {loading ? (
        <LargeLoader />
      ) : (
        <StreamsTable
          streams={filteredStreams}
          regions={regions}
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
        regions={regions}
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
