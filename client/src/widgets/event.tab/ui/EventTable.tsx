import { Table } from 'antd';
import { EventDto } from '../../../entities/event';
import React from 'react';
import { paginationConfig } from '../../../shared/pagination';
import LevelBadge from '../../../entities/event/ui/LevelBadge';
import styles from './EventTable.module.css';
import ActionButtons from '../../../shared/ui/buttons/ActionButtons';

interface EventsTableProps {
  events: EventDto[];
  onDelete: (id: number) => void;
}

const EventTable: React.FC<EventsTableProps> = ({ events, onDelete }) => {
  const dataSource = events.map((event) => ({
    key: event.id,
    type: event.type,
    level: event.level,
    message: event.info,
    date: new Date(event.createdAt).toLocaleString(),
  }));

  const columns = [
    {
      title: 'Тип',
      dataIndex: 'type',
      key: 'type',
    },
    {
      title: 'Уровень',
      dataIndex: 'level',
      key: 'level',
      render: (level: string) => (
        <div className={styles['level-badge']}>
          <LevelBadge level={level} />
        </div>
      ),
    },
    {
      title: 'Сообщение',
      dataIndex: 'message',
      key: 'message',
    },
    {
      title: 'Дата',
      dataIndex: 'date',
      key: 'date',
    },
    {
      title: 'Действия',
      key: 'action',
      render: (_: unknown, record: { key: number }) => (
        <div className={styles['actions-column']}>
          <ActionButtons onDelete={() => onDelete(record.key)} />
        </div>
      ),
    },
  ];

  return (
    <Table
      dataSource={dataSource}
      columns={columns}
      pagination={paginationConfig}
    />
  );
};

export default EventTable;
