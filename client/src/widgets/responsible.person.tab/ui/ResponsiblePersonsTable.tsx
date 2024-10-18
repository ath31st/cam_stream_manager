import React from 'react';
import { Table } from 'antd';
import { ResponsiblePerson } from '../../../entities/responsible.person';
import { Stream } from '../../../entities/stream';
import { paginationConfig } from '../../../shared/pagination';
import styles from './ResponsiblePersonsTable.module.css';
import ActionButtons from '../../../shared/ui/buttons/ActionButtons';

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
      width: '25%',
      render: (text: string) => (
        <div className={styles['ellipsis-rp-name-cell']} title={text}>
          {text}
        </div>
      ),
    },
    { title: 'Телефон', dataIndex: 'phone', key: 'phone', width: '25%' },
    {
      title: 'Местоположение',
      dataIndex: 'streamId',
      key: 'streamId',
      filters: streams.map((stream) => ({
        text: stream.location,
        value: stream.id,
      })),
      width: '40%',
      onFilter: (value: unknown, record: ResponsiblePerson) =>
        record.streamId === value,
      render: (streamId: number) => {
        const stream = streams.find((s) => s.id === streamId);
        const locationText = stream ? stream.location : 'Неизвестный поток';

        return (
          <div
            className={styles['ellipsis-location-cell']}
            title={locationText}
          >
            {locationText}
          </div>
        );
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
      width: '15%',
      render: (_: string, record: ResponsiblePerson) => (
        <ActionButtons
          onEdit={() => onEdit(record)}
          onDelete={() => onDelete(record)}
        />
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
