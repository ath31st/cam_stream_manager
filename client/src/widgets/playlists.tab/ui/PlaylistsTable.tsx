import React from 'react';
import { Table } from 'antd';
import { Playlist, Group } from '../../../shared/api.types';
import { paginationConfig } from '../../../shared/pagination';
import { ActionButtons } from '../../../shared';
import styles from './PlaylistsTable.module.css';
import '../../../shared/styles/CommonTabTableStyle.css';

interface PlaylistsTableProps {
  groups: Group[];
  playlists: Playlist[];
  onEdit: (playlist: Playlist) => void;
  onDelete: (id: number) => void;
}

const PlaylistsTable: React.FC<PlaylistsTableProps> = ({
  groups,
  playlists,
  onEdit,
  onDelete,
}) => {
  const dataSource = playlists.map((playlist) => ({
    key: playlist.id,
    name: playlist.name,
    isVisible: playlist.isVisible ? 'Виден' : 'Скрыт',
    groups:
      playlist.groupIds
        .map((id) => groups.find((g) => g.id === id)?.name)
        .join(', ') || '—',
  }));

  const columns = [
    {
      title: 'Название',
      dataIndex: 'name',
      key: 'name',
      sorter: (a: { name: string }, b: { name: string }) =>
        a.name.localeCompare(b.name),
    },
    {
      title: 'Группы',
      dataIndex: 'groups',
      key: 'groups',
    },
    {
      title: 'Видимость',
      dataIndex: 'isVisible',
      key: 'isVisible',
    },
    {
      title: 'Действия',
      key: 'action',
      render: (_: unknown, record: { key: number }) => (
        <div className={styles['actions-column']}>
          <ActionButtons
            onEdit={() => onEdit(playlists.find((r) => r.id === record.key)!)}
            onDelete={() => onDelete(record.key)}
          />
        </div>
      ),
    },
  ];

  return (
    <Table
      className={styles.table}
      dataSource={dataSource}
      columns={columns}
      pagination={paginationConfig}
      showSorterTooltip={false}
    />
  );
};

export default PlaylistsTable;
