import { Table } from 'antd';
import type React from 'react';
import { paginationConfig } from '@/shared/pagination';
import { ActionButtons } from '@/shared/ui';
import styles from './GroupsTable.module.css';
import '@/shared/styles/CommonTabTableStyle.css';
import type { Group } from '@/shared/api.types';

interface GroupsTableProps {
  groups: Group[];
  onEdit: (group: Group) => void;
  onDelete: (id: number) => void;
}

const GroupsTable: React.FC<GroupsTableProps> = ({
  groups,
  onEdit,
  onDelete,
}) => {
  const dataSource = groups.map((group) => ({
    key: group.id,
    name: group.name,
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
      title: 'Действия',
      key: 'action',
      render: (_: unknown, record: { key: number }) => (
        <div className={styles['actions-column']}>
          <ActionButtons
            onEdit={() => {
              const groupToEdit = groups.find((g) => g.id === record.key);
              if (groupToEdit) {
                onEdit(groupToEdit);
              } else {
                console.error('Group not found for editing');
              }
            }}
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

export default GroupsTable;
