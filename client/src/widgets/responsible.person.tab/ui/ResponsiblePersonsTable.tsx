import React from 'react';
import { Table, Button, Space } from 'antd';
import { ResponsiblePerson } from '../../../entities/responsible.person';
import { Stream } from '../../../entities/stream';
import { paginationConfig } from '../../../shared/pagination';

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
    {
      title: 'Имя',
      dataIndex: 'name',
      key: 'name',
      sorter: (a: ResponsiblePerson, b: ResponsiblePerson) =>
        a.name.localeCompare(b.name),
    },
    { title: 'Телефон', dataIndex: 'phone', key: 'phone' },
    {
      title: 'Местоположение',
      dataIndex: 'streamId',
      key: 'streamId',
      filters: streams.map((stream) => ({
        text: stream.location,
        value: stream.id,
      })),
      onFilter: (value: unknown, record: ResponsiblePerson) =>
        record.streamId === value,
      render: (streamId: number) => {
        const stream = streams.find((s) => s.id === streamId);
        return stream ? stream.location : 'Неизвестный поток';
      },
      sorter: (a: ResponsiblePerson, b: ResponsiblePerson) => {
        const locationA =
          streams.find((s) => s.id === a.streamId)?.location || '';
        const locationB =
          streams.find((s) => s.id === b.streamId)?.location || '';
        return locationA.localeCompare(locationB);
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

  return (
    <Table
      dataSource={persons}
      columns={columns}
      rowKey="id"
      pagination={paginationConfig}
    />
  );
};

export default ResponsiblePersonsTable;
