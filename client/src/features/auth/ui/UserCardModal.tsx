import React from 'react';
import { Modal } from 'antd';
import { JwtUser } from '../model/auth.model';
import styles from '../../../shared/styles/CommonModalStyle.module.css';

interface UserCardModalProps {
  visible: boolean;
  onClose: () => void;
  user: JwtUser | null;
}

const UserCardModal: React.FC<UserCardModalProps> = ({
  visible,
  onClose,
  user,
}) => {
  return (
    <Modal
      title={<p className={styles['modal-title']}>Профиль пользователя</p>}
      open={visible}
      onCancel={onClose}
      footer={null}
      className={styles.modal}
    >
      <div className={styles['modal-body']}>
        {user ? (
          <div>
            <p>Логин: {user.username}</p>
            <p>ID пользователя: {user.userId}</p>
            <p>Электронная почта: {user.email ? user.email : 'не указана'}</p>
            <p>Роль: {user.role}</p>
          </div>
        ) : (
          <p>Информация о пользователе недоступна.</p>
        )}
      </div>
    </Modal>
  );
};

export default UserCardModal;
