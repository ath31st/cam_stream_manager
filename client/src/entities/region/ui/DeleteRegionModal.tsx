import React from 'react';
import { Modal } from 'antd';

interface DeleteRegionModalProps {
  visible: boolean;
  onConfirm: () => void;
  onCancel: () => void;
}

const DeleteRegionModal: React.FC<DeleteRegionModalProps> = ({
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
      <p>Вы уверены, что хотите удалить этот регион?</p>
    </Modal>
  );
};

export default DeleteRegionModal;
