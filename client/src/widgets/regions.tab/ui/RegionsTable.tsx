import React from 'react';
import { Table, Button, Space } from 'antd';
import { Region } from '../../../entities/region';

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
    isVisible: region.isVisible ? 'Да' : 'Нет',
  }));

  const columns = [
    {
      title: 'Название',
      dataIndex: 'name',
      key: 'name',
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
        <Space size={'middle'}>
          <Button
            onClick={() => onEdit(regions.find((r) => r.id === record.key)!)}
          >
            Редактировать
          </Button>
          <Button danger onClick={() => onDelete(record.key)}>
            Удалить
          </Button>
        </Space>
      ),
    },
  ];

  return <Table dataSource={dataSource} columns={columns} />;
};

export default RegionsTable;
