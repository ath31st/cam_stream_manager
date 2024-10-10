import React from 'react';
import { Modal } from 'antd';

interface DeleteEventModalProps {
  visible: boolean;
  onConfirm: () => void;
  onCancel: () => void;
}

const DeleteEventModal: React.FC<DeleteEventModalProps> = ({
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
      <p>Вы уверены, что хотите удалить это событие?</p>
    </Modal>
  );
};

export default DeleteEventModal;
