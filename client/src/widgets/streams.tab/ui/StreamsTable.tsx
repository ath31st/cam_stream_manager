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
import { Region } from '../../../entities/region';

interface StreamsTableProps {
  streams: Stream[];
  regions: Region[];
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
  regions,
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
        <div className={styles['ellipsis-location-cell']} title={text}>
          {text}
        </div>
      ),
    },
    {
      title: 'Регион',
      dataIndex: 'regionId',
      key: 'region',
      render: (regionId: number) => {
        const region = regions.find((r) => r.id === regionId);
        const regionName = region ? region.name : 'Неизвестно';
        return (
          <div className={styles['ellipsis-region-cell']} title={regionName}>
            {regionName}
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
        <div className={styles['ellipsis-comment-cell']} title={text}>
          {text}
        </div>
      ),
    },
    {
      title: 'Действия',
      key: 'actions',
      render: (_: string, record: Stream) => (
        <div className={styles['actions-cell']}>
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
