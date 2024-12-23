import React from 'react';
import {
  AddUserModal,
  DeleteUserModal,
  NewUser,
  UpdateUser,
  UpdateUserModal,
  User,
} from '../../../entities/user';

interface UserTabModalsProps {
  isAddModalVisible: boolean;
  isUpdateModalVisible: boolean;
  isDeleteModalVisible: boolean;
  updatingUser: User | null;
  deleteUserId: number | null;
  handleSaveUser: (value: NewUser) => void;
  handleSaveUpdate: (value: UpdateUser) => void;
  handleCancelAdd: () => void;
  handleCancelUpdate: () => void;
  handleDelete: () => void;
  handleCancelDelete: () => void;
}

const UserTabModals: React.FC<UserTabModalsProps> = ({
  isAddModalVisible,
  isUpdateModalVisible,
  isDeleteModalVisible,
  updatingUser,
  handleSaveUser,
  handleSaveUpdate,
  handleCancelAdd,
  handleCancelUpdate,
  handleDelete,
  handleCancelDelete,
}) => {
  return (
    <>
      <AddUserModal
        visible={isAddModalVisible}
        onConfirm={handleSaveUser}
        onCancel={handleCancelAdd}
      />

      <UpdateUserModal
        visible={isUpdateModalVisible}
        user={updatingUser}
        onConfirm={handleSaveUpdate}
        onCancel={handleCancelUpdate}
      />

      <DeleteUserModal
        visible={isDeleteModalVisible}
        onConfirm={handleDelete}
        onCancel={handleCancelDelete}
      />
    </>
  );
};

export default UserTabModals;
