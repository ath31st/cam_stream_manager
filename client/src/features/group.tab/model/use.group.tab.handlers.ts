import { useEffect, useState } from 'react';
import { useGroupStore } from '@/entities/group';
import type { Group, UpdateGroup } from '@/shared/api.types';
import { errorNotification, successNotification } from '@/shared/notifications';

const useGroupTabHandlers = () => {
  const [isAddModalVisible, setIsAddModalVisible] = useState(false);
  const [isDeleteModalVisible, setIsDeleteModalVisible] = useState(false);
  const [isUpdateModalVisible, setIsUpdateModalVisible] = useState(false);
  const [deleteGroupId, setDeleteGroupId] = useState<number | null>(null);
  const [updatingGroup, setUpdatingGroup] = useState<Group | null>(null);

  const {
    groups,
    error,
    clearError,
    fetchAllGroups,
    loading,
    addGroup,
    updateGroup,
    removeGroup,
  } = useGroupStore();

  useEffect(() => {
    if (error) {
      errorNotification('Ошибка в работе с группами', clearError, error);
    }
  }, [error, clearError]);

  useEffect(() => {
    fetchAllGroups();
  }, [fetchAllGroups]);

  const showAddModal = () => {
    setIsAddModalVisible(true);
  };

  const closeAddModal = () => {
    setIsAddModalVisible(false);
  };

  const handleAddGroup = async (name: string) => {
    await addGroup({ name });
    if (useGroupStore.getState().error === null) {
      successNotification(
        'Группа добавлена',
        `Группа "${name}" успешно добавлена.`,
      );
      setIsAddModalVisible(false);
    }
  };

  const showDeleteConfirmModal = (id: number) => {
    setDeleteGroupId(id);
    setIsDeleteModalVisible(true);
  };

  const closeDeleteModal = () => {
    setDeleteGroupId(null);
    setIsDeleteModalVisible(false);
  };

  const handleDelete = async () => {
    if (deleteGroupId !== null) {
      await removeGroup(deleteGroupId);
      if (useGroupStore.getState().error === null) {
        successNotification('Группа удалена', 'Группа успешно удалена.');
      }
      setDeleteGroupId(null);
      setIsDeleteModalVisible(false);
    }
  };

  const showUpdateModal = (group: Group) => {
    setUpdatingGroup(group);
    setIsUpdateModalVisible(true);
  };

  const closeUpdateModal = () => {
    setUpdatingGroup(null);
    setIsUpdateModalVisible(false);
  };

  const handleUpdateGroup = async (updatedGroup: UpdateGroup) => {
    if (updatingGroup) {
      await updateGroup(updatingGroup.id, updatedGroup);
      if (useGroupStore.getState().error === null) {
        successNotification(
          'Группа обновлена',
          `Группа "${updatedGroup.name}" успешно обновлена.`,
        );
        setUpdatingGroup(null);
        setIsUpdateModalVisible(false);
      }
    }
  };

  return {
    modals: {
      showAddModal,
      closeAddModal,
      isAddModalVisible,
      isDeleteModalVisible,
      showDeleteConfirmModal,
      closeDeleteModal,
      isUpdateModalVisible,
      closeUpdateModal,
      showUpdateModal,
    },
    actions: {
      handleAddGroup,
      handleUpdateGroup,
      handleDelete,
    },
    state: {
      deleteGroupId,
      updatingGroup,
      groups,
      loading,
    },
  };
};

export default useGroupTabHandlers;
