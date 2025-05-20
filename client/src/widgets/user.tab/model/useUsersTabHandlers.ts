import { useState, useEffect } from 'react';
import { useUserStore } from '../../../entities/user';
import { useGroupStore } from '../../../entities/group';
import type { NewUser, UpdateUser, User } from '../../../shared/api.types';
import {
  errorNotification,
  successNotification,
} from '../../../shared/notifications';

export const useUsersTabHandlers = () => {
  const [isAddModalVisible, setIsAddModalVisible] = useState(false);
  const [isDeleteModalVisible, setIsDeleteModalVisible] = useState(false);
  const [isUpdateModalVisible, setIsUpdateModalVisible] = useState(false);
  const [deleteUserId, setDeleteUserId] = useState<number | null>(null);
  const [updatingUser, setUpdatingUser] = useState<User | null>(null);
  const [searchTerm, setSearchTerm] = useState<string | undefined>();

  const { groups, fetchAllGroups } = useGroupStore();

  const {
    error,
    loading,
    fetchPageUsers,
    addUser,
    updateUser,
    removeUser,
    clearError,
    users,
    currentPage,
    pageSize,
    totalItems,
  } = useUserStore();

  useEffect(() => {
    fetchAllGroups();
  }, [fetchAllGroups]);

  useEffect(() => {
    if (error) {
      errorNotification('Ошибка в работе с пользователями', clearError, error);
    }
  }, [error, clearError]);

  useEffect(() => {
    fetchPageUsers(currentPage, pageSize, searchTerm);
  }, [fetchPageUsers, currentPage, pageSize, searchTerm]);

  const showAddUserModal = () => {
    setIsAddModalVisible(true);
  };

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

  const handleCancelAddUser = () => {
    setIsAddModalVisible(false);
  };

  const showDeleteModal = (id: number) => {
    setDeleteUserId(id);
    setIsDeleteModalVisible(true);
  };

  const handleDelete = async () => {
    if (deleteUserId !== null) {
      await removeUser(deleteUserId);
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

  const handleCancelDelete = () => {
    setIsDeleteModalVisible(false);
    setDeleteUserId(null);
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

  const handleCancelUpdate = () => {
    setUpdatingUser(null);
    setIsUpdateModalVisible(false);
  };

  const handleSearchChange = async (value: string) => {
    setSearchTerm(value);
    await fetchPageUsers(1, pageSize, value);
  };

  const handlePageChange = async (page: number, size: number) => {
    await fetchPageUsers(page, size, searchTerm);
  };

  return {
    modals: {
      isAddModalVisible,
      showAddUserModal,
      isDeleteModalVisible,
      showDeleteModal,
      isUpdateModalVisible,
      showUpdateModal,
    },
    selected: {
      updatingUser,
      deleteUserId,
    },
    search: {
      searchTerm,
      handleSearchChange,
    },
    actions: {
      handleAddUser,
      handleDelete,
      handleUpdateUser,
      handlePageChange,
      handleCancelDelete,
      handleCancelUpdate,
      handleCancelAddUser,
    },
    state: {
      users,
      groups,
      loading,
      currentPage,
      pageSize,
      totalItems,
    },
  };
};
