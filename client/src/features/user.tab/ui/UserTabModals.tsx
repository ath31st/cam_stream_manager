import type React from 'react';
import type {
  Group,
  NewUser,
  UpdateUser,
  User,
} from '../../../shared/api.types';
import AddUserModal from './AddUserModal';
import DeleteUserModal from './DeleteUserModal';
import UpdateUserModal from './UpdateUserModal';

interface UserTabModalsProps {
  groups: Group[];
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
  groups,
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
        groups={groups}
        visible={isAddModalVisible}
        onConfirm={handleSaveUser}
        onCancel={handleCancelAdd}
      />

      <UpdateUserModal
        groups={groups}
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
