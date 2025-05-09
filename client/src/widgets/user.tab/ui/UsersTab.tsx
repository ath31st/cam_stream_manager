import type React from 'react';
import { useEffect, useState } from 'react';
import { useGroupStore } from '../../../entities/group';
import { useUserStore } from '../../../entities/user';
import type { NewUser, UpdateUser, User } from '../../../shared/api.types';
import {
  errorNotification,
  successNotification,
} from '../../../shared/notifications';
import { LargeLoader, TabContainer, WideButton } from '../../../shared/ui';
import UserTabModals from './UserTabModals';
import UsersTable from './UsersTable';

const UsersTab: React.FC = () => {
  const [isAddModalVisible, setIsAddModalVisible] = useState(false);
  const [isDeleteModalVisible, setIsDeleteModalVisible] = useState(false);
  const [isUpdateModalVisible, setIsUpdateModalVisible] = useState(false);
  const [deleteUserId, setDeleteUserId] = useState<number | null>(null);
  const [updatingUser, setUpdatingUser] = useState<User | null>(null);

  const { groups, fetchAllGroups } = useGroupStore();

  useEffect(() => {
    fetchAllGroups();
  }, [fetchAllGroups]);

  const {
    error,
    loading,
    fetchAllUsers,
    addUser,
    updateUser,
    removeUser,
    clearError,
    users,
  } = useUserStore();

  useEffect(() => {
    if (error) {
      errorNotification('Ошибка в работе с пользователями', clearError, error);
    }
  }, [error, clearError]);

  useEffect(() => {
    fetchAllUsers();
  }, [fetchAllUsers]);

  const handleAddUser = async (user: NewUser) => {
    await addUser(user);
    if (useUserStore.getState().error === null) {
      successNotification(
        'Пользователь добавлен',
        `Пользователь "${user.username}" успешно добавлен.`,
      );
      setIsAddModalVisible(false);
    }
  };

  const showDeleteConfirm = (id: number) => {
    setDeleteUserId(id);
    setIsDeleteModalVisible(true);
  };

  const handleDelete = async () => {
    if (deleteUserId !== null) {
      await removeUser(deleteUserId);
      await fetchAllUsers();
      if (useUserStore.getState().error === null) {
        successNotification(
          'Пользователь удален',
          'Пользователь успешно удален.',
        );
      }
      setDeleteUserId(null);
      setIsDeleteModalVisible(false);
    }
  };

  const showUpdateModal = (user: User) => {
    setUpdatingUser(user);
    setIsUpdateModalVisible(true);
  };

  const handleUpdateUser = async (updatedUser: UpdateUser) => {
    if (updatingUser) {
      await updateUser(updatingUser.id, updatedUser);
      if (useUserStore.getState().error === null) {
        successNotification(
          'Пользователь обновлен',
          `Пользователь "${updatedUser.username}" успешно обновлен.`,
        );
        setUpdatingUser(null);
        setIsUpdateModalVisible(false);
      }
    }
  };

  return (
    <TabContainer>
      <>
        <WideButton onClick={() => setIsAddModalVisible(true)}>
          Добавить пользователя
        </WideButton>

        {loading ? (
          <LargeLoader />
        ) : (
          <UsersTable
            users={users}
            groups={groups}
            onEdit={showUpdateModal}
            onDelete={showDeleteConfirm}
          />
        )}

        <UserTabModals
          groups={groups}
          isAddModalVisible={isAddModalVisible}
          isDeleteModalVisible={isDeleteModalVisible}
          isUpdateModalVisible={isUpdateModalVisible}
          updatingUser={updatingUser}
          deleteUserId={deleteUserId}
          handleSaveUser={handleAddUser}
          handleDelete={handleDelete}
          handleSaveUpdate={handleUpdateUser}
          handleCancelAdd={() => setIsAddModalVisible(false)}
          handleCancelDelete={() => {
            setDeleteUserId(null);
            setIsDeleteModalVisible(false);
          }}
          handleCancelUpdate={() => {
            setUpdatingUser(null);
            setIsUpdateModalVisible(false);
          }}
        />
      </>
    </TabContainer>
  );
};

export default UsersTab;
