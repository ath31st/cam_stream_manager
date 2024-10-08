// components/StreamsTable.tsx
import React from 'react';
import { Table, Button, Space } from 'antd';
import { Stream } from '../../../entities/stream';

interface StreamsTableProps {
  streams: Stream[];
  onEdit: (stream: Stream) => void;
  onDelete: (id: number) => void;
}

const StreamsTable: React.FC<StreamsTableProps> = ({
  streams,
  onEdit,
  onDelete,
}) => {
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
          <Button onClick={() => onEdit(record)}>Редактировать</Button>
          <Button danger onClick={() => onDelete(record.id)}>
            Удалить
          </Button>
        </Space>
      ),
    },
  ];

  return <Table dataSource={streams} columns={columns} rowKey="id" />;
};

export default StreamsTable;
