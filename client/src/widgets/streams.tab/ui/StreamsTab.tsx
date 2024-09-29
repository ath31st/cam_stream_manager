import React, { useEffect, useState } from 'react';
import { Table, Button, Space } from 'antd';
import { useStreamStore } from '../../../app/stores/stream.store';
import {
  AddStreamModal,
  DeleteStreamModal,
  NewStream,
  Stream,
} from '../../../entities/stream';
import { useRegionStore } from '../../../app/stores/region.store';

const StreamsTab: React.FC = () => {
  const [isAddModalVisible, setIsAddModalVisible] = useState(false);
  const [isDeleteModalVisible, setIsDeleteModalVisible] = useState(false);
  const [isUpdateModalVisible, setIsUpdateModalVisible] = useState(false);
  const [deleteStreamId, setDeleteStreamId] = useState<number | null>(null);
  const [updatingStream, setUpdatingStream] = useState<Stream | null>(null);
  const {
    streams,
    fetchAllStreams,
    addStream,
    removeStream,
    setSelectedStream,
  } = useStreamStore();
  const { regions, fetchAllRegions } = useRegionStore();

  useEffect(() => {
    fetchAllStreams();
    fetchAllRegions();
  }, [fetchAllStreams]);

  const handleAddStream = () => {
    setIsAddModalVisible(true);
  };

  const handleSaveStream = async (value: NewStream) => {
    await addStream(value);
    setIsAddModalVisible(false);
  };

  const handleCancelAdd = () => {
    setIsAddModalVisible(false);
  };

  const handleEdit = (stream: Stream) => {
    setSelectedStream(stream);
  };

  const showDeleteConfirm = (id: number) => {
    setDeleteStreamId(id);
    setIsDeleteModalVisible(true);
  };

  const handleDelete = async () => {
    if (deleteStreamId !== null) {
      await removeStream(deleteStreamId);
      setDeleteStreamId(null);
      setIsDeleteModalVisible(false);
    }
  };

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
          <Button onClick={() => handleEdit(record)}>Редактировать</Button>
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

      <Button type="primary" onClick={handleAddStream}>
        Добавить стрим
      </Button>

      <Table dataSource={streams} columns={columns} rowKey="id" />

      <AddStreamModal
        visible={isAddModalVisible}
        regions={regions}
        onConfirm={handleSaveStream}
        onCancel={handleCancelAdd}
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
