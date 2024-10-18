import React from 'react';
import { Button, Space } from 'antd';
import { EditOutlined, DeleteOutlined } from '@ant-design/icons';

interface ActionButtonsProps {
  onEdit?: () => void;
  onDelete: () => void;
}

const ActionButtons: React.FC<ActionButtonsProps> = ({ onEdit, onDelete }) => {
  return (
    <Space size="middle">
      {onEdit && <Button icon={<EditOutlined />} onClick={onEdit} />}
      <Button danger icon={<DeleteOutlined />} onClick={onDelete} />
    </Space>
  );
};

export default ActionButtons;
