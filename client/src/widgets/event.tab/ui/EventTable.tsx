import { Table } from 'antd';
import type React from 'react';
import type { EventDto } from '../../../shared/api.types';
import { ActionButtons } from '../../../shared/ui';
import { LevelBadge } from '../../event';
import styles from './EventTable.module.css';
import { formatDate } from '../../../shared';

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
    date: formatDate(event.createdAt),
  }));

  const columns = [
    {
      title: 'Тип',
      dataIndex: 'type',
      key: 'type',
      render: (type: string) => (
        <div className={styles['type-column']} title={type}>
          {type}
        </div>
      ),
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
      render: (text: string) => (
        <div className={styles['ellipsis-message-column']} title={text}>
          {text}
        </div>
      ),
    },
    {
      title: 'Дата',
      dataIndex: 'date',
      key: 'date',
      render: (date: string) => (
        <div className={styles['date-column']} title={date}>
          {date}
        </div>
      ),
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

  return <Table dataSource={dataSource} columns={columns} pagination={false} />;
};

export default EventTable;
