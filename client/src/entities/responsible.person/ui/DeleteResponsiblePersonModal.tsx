import React from 'react';
import { Modal, Button } from 'antd';

interface DeleteResponsiblePersonModalProps {
  visible: boolean;
  onConfirm: () => void;
  onCancel: () => void;
}

const DeleteResponsiblePersonModal: React.FC<
  DeleteResponsiblePersonModalProps
> = ({ visible, onConfirm, onCancel }) => {
  return (
    <Modal
      open={visible}
      title="Удалить ответственное лицо"
      onCancel={onCancel}
      footer={[
        <Button key="cancel" onClick={onCancel}>
          Отмена
        </Button>,
        <Button key="delete" type="primary" danger onClick={onConfirm}>
          Удалить
        </Button>,
      ]}
    >
      <p>Вы уверены, что хотите удалить этого ответственного?</p>
    </Modal>
  );
};

export default DeleteResponsiblePersonModal;
