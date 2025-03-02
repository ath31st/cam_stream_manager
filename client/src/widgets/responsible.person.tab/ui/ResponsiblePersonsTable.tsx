import React from 'react';
import { Table } from 'antd';
import { ResponsiblePerson, Stream } from '../../../shared/types';
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
      render: (text: string) => (
        <div className={styles['ellipsis-rp-name-cell']} title={text}>
          {text}
        </div>
      ),
    },
    {
      title: 'Телефон',
      dataIndex: 'phone',
      key: 'phone',
      render: (text: string) => (
        <div className={styles['rp-phone-cell']} title={text}>
          {text}
        </div>
      ),
    },
    {
      title: 'Название',
      dataIndex: 'streamId',
      key: 'streamId',
      filters: streams.map((stream) => ({
        text: stream.name,
        value: stream.id,
      })),
      onFilter: (value: unknown, record: ResponsiblePerson) =>
        record.streamId === value,
      render: (streamId: number) => {
        const stream = streams.find((s) => s.id === streamId);
        const nameText = stream ? stream.name : 'Неизвестный поток';

        return (
          <div className={styles['ellipsis-name-cell']} title={nameText}>
            {nameText}
          </div>
        );
      },
      sorter: (a: ResponsiblePerson, b: ResponsiblePerson) => {
        const nameA = streams.find((s) => s.id === a.streamId)?.name || '';
        const nameB = streams.find((s) => s.id === b.streamId)?.name || '';
        return nameA.localeCompare(nameB);
      },
    },
    {
      title: 'Действия',
      key: 'actions',
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
      className={styles.table}
      dataSource={persons}
      columns={columns}
      rowKey="id"
      pagination={paginationConfig}
      showSorterTooltip={false}
    />
  );
};

export default ResponsiblePersonsTable;
