import React from 'react';
import { Modal } from 'antd';
import styles from '../../../shared/styles/CommonModalStyle.module.css';
import NarrowButton from '../../../shared/ui/buttons/NarrowButton';

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
      title={<p className={styles['modal-title']}>Подтвердите удаление</p>}
      open={visible}
      onOk={onConfirm}
      onCancel={onCancel}
      footer={[
        <NarrowButton key="cancel" onClick={onCancel}>
          Отмена
        </NarrowButton>,
        <NarrowButton key="submit" onClick={onConfirm}>
          Удалить
        </NarrowButton>,
      ]}
    >
      <div className={styles['modal-body']}>
        <p>Вы уверены, что хотите удалить этот поток?</p>
      </div>
    </Modal>
  );
};

export default DeleteStreamModal;
