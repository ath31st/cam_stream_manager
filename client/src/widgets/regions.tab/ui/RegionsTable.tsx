import React from 'react';
import { Table } from 'antd';
import { Region } from '../../../entities/region';
import { paginationConfig } from '../../../shared/pagination';
import ActionButtons from '../../../shared/ui/buttons/ActionButtons';
import styles from './RegionsTable.module.css';
import '../../../shared/styles/CommonTabTableStyle.css';
import { Group } from '../../../entities/group';

interface RegionsTableProps {
  groups: Group[];
  regions: Region[];
  onEdit: (region: Region) => void;
  onDelete: (id: number) => void;
}

const RegionsTable: React.FC<RegionsTableProps> = ({
  groups,
  regions,
  onEdit,
  onDelete,
}) => {
  const dataSource = regions.map((region) => ({
    key: region.id,
    name: region.name,
    isVisible: region.isVisible ? 'Виден' : 'Скрыт',
    groups:
      region.groupIds
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
            onEdit={() => onEdit(regions.find((r) => r.id === record.key)!)}
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

export default RegionsTable;
