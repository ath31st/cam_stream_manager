import { Modal } from 'antd';
import type React from 'react';
import styles from '../../../shared/styles/CommonModalStyle.module.css';
import { FooterModal } from '../../../shared/ui';

interface DeletePlaylistModalProps {
  visible: boolean;
  onConfirm: () => void;
  onCancel: () => void;
}

const DeletePlaylistModal: React.FC<DeletePlaylistModalProps> = ({
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
        <p>Вы уверены, что хотите удалить этот плейлист?</p>
        <p>Вместе с плейлистом будут удалены все потоки, относящиеся к нему.</p>
      </div>
    </Modal>
  );
};

export default DeletePlaylistModal;
