import React from 'react';
import { Table } from 'antd';
import {
  CheckCircleOutlined,
  ExclamationCircleOutlined,
  CloseCircleOutlined,
  SyncOutlined,
  PlusCircleOutlined,
} from '@ant-design/icons';
import { Stream } from '../../../entities/stream';
import { paginationConfig } from '../../../shared/pagination';
import styles from './StreamsTable.module.css';
import CommonTooltip from '../../../shared/ui/tooltips/CommonTooltip';
import ActionButtons from '../../../shared/ui/buttons/ActionButtons';
import { Playlist } from '../../../entities/playlist';

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
      title: 'Местоположение',
      dataIndex: 'location',
      key: 'location',
      sorter: (a: Stream, b: Stream) => a.location.localeCompare(b.location),
      render: (text: string) => (
        <div className={styles['ellipsis-location-column']} title={text}>
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
          <div className={styles['ellipsis-playlist-column']} title={playlistName}>
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
