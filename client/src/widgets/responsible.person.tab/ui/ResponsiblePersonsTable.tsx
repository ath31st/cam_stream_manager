import React from 'react';
import { Table, Button, Space } from 'antd';
import { ResponsiblePerson } from '../../../entities/responsible.person';
import { Stream } from '../../../entities/stream';

interface ResponsiblePersonsTableProps {
  persons: ResponsiblePerson[];
  streams: Stream[];
  onEdit: (person: ResponsiblePerson) => void;
  onDelete: (person: ResponsiblePerson) => void;
}

const ResponsiblePersonsTable: React.FC<ResponsiblePersonsTableProps> = ({
  persons,
  streams,
  onEdit,
  onDelete,
}) => {
  const columns = [
    { title: 'Имя', dataIndex: 'name', key: 'name' },
    { title: 'Телефон', dataIndex: 'phone', key: 'phone' },
    {
      title: 'Местоположение',
      dataIndex: 'streamId',
      key: 'streamId',
      render: (streamId: number) => {
        const stream = streams.find((s) => s.id === streamId);
        return stream ? stream.location : 'Неизвестный стрим';
      },
    },
    {
      title: 'Действия',
      key: 'actions',
      render: (text: string, record: ResponsiblePerson) => (
        <Space size="middle">
          <Button onClick={() => onEdit(record)}>Редактировать</Button>
          <Button danger onClick={() => onDelete(record)}>
            Удалить
          </Button>
        </Space>
      ),
    },
  ];

  return <Table dataSource={persons} columns={columns} rowKey="id" />;
};

export default ResponsiblePersonsTable;
