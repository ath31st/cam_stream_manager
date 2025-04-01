import { Modal } from 'antd';
import type React from 'react';
import styles from '../../../shared/styles/CommonModalStyle.module.css';
import { FooterModal } from '../../../shared/ui';

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
        <p>Вы уверены, что хотите удалить этот поток?</p>
        <p>
          Вместе с потоком будут удалены все отвественные лица, относящиеся к
          нему.
        </p>
      </div>
    </Modal>
  );
};

export default DeleteStreamModal;
