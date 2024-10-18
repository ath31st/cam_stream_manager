import React from 'react';
import { Table, Button, Space } from 'antd';
import { EditOutlined, DeleteOutlined } from '@ant-design/icons';
import { Region } from '../../../entities/region';
import { paginationConfig } from '../../../shared/pagination';

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
        <Space size={'middle'}>
          <Button
            icon={<EditOutlined />}
            onClick={() => onEdit(regions.find((r) => r.id === record.key)!)}
          />
          <Button
            danger
            icon={<DeleteOutlined />}
            onClick={() => onDelete(record.key)}
          />
        </Space>
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
