import { DeleteOutlined, EditOutlined } from '@ant-design/icons';
import { Button, Space } from 'antd';
import type React from 'react';

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
