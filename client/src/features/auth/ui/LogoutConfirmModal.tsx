import React from 'react';
import { Modal, Button } from 'antd';

interface LogoutConfirmModalProps {
  visible: boolean;
  onClose: () => void;
  onConfirm: () => void;
}

const LogoutConfirmModal: React.FC<LogoutConfirmModalProps> = ({
  visible,
  onClose,
  onConfirm,
}) => {
  return (
    <Modal
      title="Подтверждение выхода"
      open={visible}
      onCancel={onClose}
      footer={[
        <Button key="cancel" onClick={onClose}>
          Отмена
        </Button>,
        <Button key="confirm" type="primary" onClick={onConfirm}>
          Да, выйти
        </Button>,
      ]}
    >
      <p>Вы уверены, что хотите выйти?</p>
    </Modal>
  );
};

export default LogoutConfirmModal;
