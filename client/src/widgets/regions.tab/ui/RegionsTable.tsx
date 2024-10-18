import React from 'react';
import { Table } from 'antd';
import { Region } from '../../../entities/region';
import { paginationConfig } from '../../../shared/pagination';
import ActionButtons from '../../../shared/ui/buttons/ActionButtons';

interface RegionsTableProps {
  regions: Region[];
  onEdit: (region: Region) => void;
  onDelete: (id: number) => void;
}

const RegionsTable: React.FC<RegionsTableProps> = ({
  regions,
  onEdit,
  onDelete,
}) => {
  const dataSource = regions.map((region) => ({
    key: region.id,
    name: region.name,
    isVisible: region.isVisible ? 'Виден' : 'Скрыт',
  }));

  const columns = [
    {
      title: 'Название',
      dataIndex: 'name',
      key: 'name',
      sorter: (a: { name: string }, b: { name: string }) =>
        a.name.localeCompare(b.name),
      width: '60%',
    },
    {
      title: 'Видимость',
      dataIndex: 'isVisible',
      key: 'isVisible',
      width: '20%',
    },
    {
      title: 'Действия',
      key: 'action',
      width: '20%',
      render: (_: unknown, record: { key: number }) => (
        <ActionButtons
          onEdit={() => onEdit(regions.find((r) => r.id === record.key)!)}
          onDelete={() => onDelete(record.key)}
        />
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

export default RegionsTable;
