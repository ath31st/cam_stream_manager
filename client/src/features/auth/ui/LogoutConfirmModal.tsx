import { Modal } from 'antd';
import type React from 'react';
import styles from '../../../shared/styles/CommonModalStyle.module.css';
import { FooterModal } from '../../../shared/ui';

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
      className={styles.modal}
      title={<p className={styles['modal-title']}>Подтверждение выхода</p>}
      open={visible}
      onCancel={onClose}
      footer={
        <FooterModal onCancel={onClose} onOk={onConfirm} okText="Выйти" />
      }
    >
      <div className={styles['modal-body']}>
        <p>Вы уверены, что хотите выйти?</p>
      </div>
    </Modal>
  );
};

export default LogoutConfirmModal;
