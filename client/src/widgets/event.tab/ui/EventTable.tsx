import { Table } from 'antd';
import { EventDto } from '../../../entities/event';
import React from 'react';
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
