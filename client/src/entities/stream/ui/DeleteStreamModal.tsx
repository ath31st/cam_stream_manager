import React from 'react';
import { Modal } from 'antd';

interface DeleteStreamModalProps {
  visible: boolean;
  onConfirm: () => void;
  onCancel: () => void;
}

const DeleteStreamModal: React.FC<DeleteStreamModalProps> = ({
  visible,
  onConfirm,
  onCancel,
}) => {
  return (
    <Modal
      title="Подтвердите удаление"
      open={visible}
      onOk={onConfirm}
      onCancel={onCancel}
    >
      <p>Вы уверены, что хотите удалить этот поток?</p>
    </Modal>
  );
};

export default DeleteStreamModal;
