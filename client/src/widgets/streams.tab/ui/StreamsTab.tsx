import React, { useEffect, useState } from 'react';
import { Table, Button, Space, Select } from 'antd';
import { useStreamStore } from '../../../app/stores/stream.store';
import {
  AddStreamModal,
  DeleteStreamModal,
  UpdateStreamModal,
  NewStream,
  Stream,
  UpdateStream,
} from '../../../entities/stream';
import { useRegionStore } from '../../../app/stores/region.store';
import {
  errorNotification,
  successNotification,
} from '../../../shared/notifications';

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
    successNotification(
      'Поток добавлен',
      `Поток "${value.location}" успешно добавлен.`,
    );
    setIsAddModalVisible(false);
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
      successNotification(
        'Поток обновлен',
        `Поток "${value.location}" успешно обновлен.`,
      );
      setIsUpdateModalVisible(false);
      setUpdatingStream(null);
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
      successNotification('Поток удален', `Поток успешно удален.`);
      setDeleteStreamId(null);
      setIsDeleteModalVisible(false);
    }
  };

  const filteredStreams = selectedRegionId
    ? streams.filter((stream) => stream.regionId === selectedRegionId)
    : streams;

  const columns = [
    {
      title: 'Местоположение',
      dataIndex: 'location',
      key: 'location',
    },
    {
      title: 'Статус',
      dataIndex: 'status',
      key: 'status',
    },
    {
      title: 'Видимость',
      dataIndex: 'isVisible',
      key: 'isVisible',
      render: (isVisible: boolean) => (isVisible ? 'Виден' : 'Скрыт'),
    },
    {
      title: 'Комментарий',
      dataIndex: 'comment',
      key: 'comment',
    },
    {
      title: 'Действия',
      key: 'actions',
      render: (text: string, record: Stream) => (
        <Space size="middle">
          <Button onClick={() => handleUpdate(record)}>Редактировать</Button>
          <Button danger onClick={() => showDeleteConfirm(record.id)}>
            Удалить
          </Button>
        </Space>
      ),
    },
  ];

  return (
    <>
      <h1>Управление потоками</h1>

      <Space style={{ marginBottom: 16 }}>
        <Button type="primary" onClick={handleAddStream}>
          Добавить стрим
        </Button>

        <Select
          placeholder="Выберите регион для фильтрации"
          style={{ width: 250 }}
          allowClear
          onChange={(value) => setSelectedRegionId(value || null)}
        >
          {regions.map((region) => (
            <Select.Option key={region.id} value={region.id}>
              {region.name}
            </Select.Option>
          ))}
        </Select>
      </Space>

      <Table dataSource={filteredStreams} columns={columns} rowKey="id" />

      <AddStreamModal
        visible={isAddModalVisible}
        regions={regions}
        onConfirm={handleSaveStream}
        onCancel={handleCancelAdd}
      />

      <UpdateStreamModal
        visible={isUpdateModalVisible}
        stream={updatingStream}
        regions={regions}
        onConfirm={handleSaveUpdate}
        onCancel={handleCancelUpdate}
      />

      <DeleteStreamModal
        visible={isDeleteModalVisible}
        onConfirm={handleDelete}
        onCancel={() => {
          setDeleteStreamId(null);
          setIsDeleteModalVisible(false);
        }}
      />
    </>
  );
};

export default StreamsTab;
