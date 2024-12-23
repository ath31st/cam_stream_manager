import React from 'react';
import { Modal } from 'antd';
import styles from '../../../shared/styles/CommonModalStyle.module.css';
import FooterModal from '../../../shared/ui/buttons/FooterModal';

interface DeleteUserModalProps {
  visible: boolean;
  onConfirm: () => void;
  onCancel: () => void;
}

const DeleteUserModal: React.FC<DeleteUserModalProps> = ({
  visible,
  onConfirm,
  onCancel,
}) => {
  return (
    <Modal
      className={styles.modal}
      title={<p className={styles['modal-title']}>Подтверждение удаления</p>}
      open={visible}
      onOk={onConfirm}
      onCancel={onCancel}
      footer={
        <FooterModal onCancel={onCancel} onOk={onConfirm} okText="Удалить" />
      }
    >
      <div className={styles['modal-body']}>
        <p>Вы уверены, что хотите удалить этого пользователя?</p>
      </div>
    </Modal>
  );
};

export default DeleteUserModal;