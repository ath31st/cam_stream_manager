import React, { useEffect } from 'react';
import { Table, Button, Modal, Space } from 'antd';
import { useStreamStore } from '../../../app/stores/stream.store';
import { Stream } from '../../../entities/stream';

const StreamsPage: React.FC = () => {
  const { streams, fetchAllStreams, removeStream, setSelectedStream } =
    useStreamStore();

  useEffect(() => {
    fetchAllStreams();
  }, [fetchAllStreams]);

  const handleEdit = (stream: Stream) => {
    setSelectedStream(stream);
  };

  const handleDelete = (id: number) => {
    Modal.confirm({
      title: 'Вы уверены, что хотите удалить стрим?',
      onOk: () => removeStream(id),
    });
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
          <Button danger onClick={() => handleDelete(record.id)}>
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
    </>
  );
};

export default StreamsPage;
