import React from 'react';
import { Modal } from 'antd';
import { JwtUser } from '../model/auth.model';

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
      title="Профиль пользователя"
      open={visible}
      onCancel={onClose}
      footer={null}
    >
      {user ? (
        <div>
          <p>Имя: {user.username}</p>
          <p>ID пользователя: {user.userId}</p>
          <p>Роли: {user.roles}</p>
        </div>
      ) : (
        <p>Информация о пользователе недоступна.</p>
      )}
    </Modal>
  );
};

export default UserCardModal;
