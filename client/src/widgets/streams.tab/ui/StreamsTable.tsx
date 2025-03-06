import React from 'react';
import { Table } from 'antd';
import {
  CheckCircleOutlined,
  ExclamationCircleOutlined,
  CloseCircleOutlined,
  SyncOutlined,
  PlusCircleOutlined,
} from '@ant-design/icons';
import { Stream, Playlist } from '../../../shared/api.types';
import { paginationConfig } from '../../../shared/pagination';
import styles from './StreamsTable.module.css';
import { CommonTooltip, ActionButtons } from '../../../shared/ui';

interface StreamsTableProps {
  streams: Stream[];
  playlists: Playlist[];
  onEdit: (stream: Stream) => void;
  onDelete: (id: number) => void;
}

const statusIcons: Record<string, JSX.Element> = {
  Active: <CheckCircleOutlined style={{ color: 'green' }} />,
  'Bad connection': <ExclamationCircleOutlined style={{ color: 'orange' }} />,
  'No connection': <CloseCircleOutlined style={{ color: 'red' }} />,
  Updated: <SyncOutlined style={{ color: 'blue' }} />,
  Created: <PlusCircleOutlined style={{ color: 'purple' }} />,
};

const StreamsTable: React.FC<StreamsTableProps> = ({
  streams,
  playlists,
  onEdit,
  onDelete,
}) => {
  const columns = [
    {
      title: 'Название',
      dataIndex: 'name',
      key: 'name',
      sorter: (a: Stream, b: Stream) => a.name.localeCompare(b.name),
      render: (text: string) => (
        <div className={styles['ellipsis-name-column']} title={text}>
          {text}
        </div>
      ),
    },
    {
      title: 'Плейлист',
      dataIndex: 'playlistId',
      key: 'playlist',
      render: (playlistId: number) => {
        const playlist = playlists.find((r) => r.id === playlistId);
        const playlistName = playlist ? playlist.name : 'Неизвестно';
        return (
          <div
            className={styles['ellipsis-playlist-column']}
            title={playlistName}
          >
            {playlistName}
          </div>
        );
      },
    },
    {
      title: 'Статус',
      dataIndex: 'status',
      key: 'status',
      sorter: (a: Stream, b: Stream) => a.status.localeCompare(b.status),
      render: (status: string) => (
        <CommonTooltip title={status} placement="top">
          {statusIcons[status] || status}
        </CommonTooltip>
      ),
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
      render: (text: string) => (
        <div className={styles['ellipsis-comment-column']} title={text}>
          {text}
        </div>
      ),
    },
    {
      title: 'Действия',
      key: 'actions',
      render: (_: string, record: Stream) => (
        <div className={styles['actions-column']}>
          <ActionButtons
            onEdit={() => onEdit(record)}
            onDelete={() => onDelete(record.id)}
          />
        </div>
      ),
    },
  ];

  return (
    <Table
      dataSource={streams}
      columns={columns}
      rowKey="id"
      pagination={paginationConfig}
      showSorterTooltip={false}
    />
  );
};

export default StreamsTable;
