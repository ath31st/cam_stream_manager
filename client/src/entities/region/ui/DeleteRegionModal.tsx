import React from 'react';
import { Modal } from 'antd';
import styles from '../../../shared/styles/CommonModalStyle.module.css';
import FooterModal from '../../../shared/ui/buttons/FooterModal';

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
        <p>Вы уверены, что хотите удалить этот регион?</p>
      </div>
    </Modal>
  );
};

export default DeleteRegionModal;
