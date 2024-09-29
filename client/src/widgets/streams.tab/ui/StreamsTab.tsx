import React, { useEffect, useState } from 'react';
import { Table, Button, Space } from 'antd';
import { useStreamStore } from '../../../app/stores/stream.store';
import { DeleteStreamModal, Stream } from '../../../entities/stream';

const StreamsTab: React.FC = () => {
  const [isAddModalVisible, setIsAddModalVisible] = useState(false);
  const [isDeleteModalVisible, setIsDeleteModalVisible] = useState(false);
  const [isUpdateModalVisible, setIsUpdateModalVisible] = useState(false);
  const [deleteStreamId, setDeleteStreamId] = useState<number | null>(null);
  const [updatingStream, setUpdatingStream] = useState<Stream | null>(null);
  const { streams, fetchAllStreams, removeStream, setSelectedStream } =
    useStreamStore();

  useEffect(() => {
    fetchAllStreams();
  }, [fetchAllStreams]);

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

      <Button type="primary" onClick={() => setSelectedStream(null)}>
        Добавить стрим
      </Button>
      <Table dataSource={streams} columns={columns} rowKey="id" />

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
