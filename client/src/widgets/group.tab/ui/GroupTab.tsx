import React, { useEffect, useState } from 'react';
import { Group, UpdateGroup } from '../../../shared/api.types';
import {
  errorNotification,
  successNotification,
} from '../../../shared/notifications';
import { useGroupStore } from '../../../entities/group';
import { WideButton, LargeLoader, TabContainer } from '../../../shared/ui';
import GroupsTable from './GroupsTable';
import GroupModals from './GroupModals';

const GroupsTab: React.FC = () => {
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

  const showDeleteConfirm = (id: number) => {
    setDeleteGroupId(id);
    setIsDeleteModalVisible(true);
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

  return (
    <TabContainer>
      <>
        <WideButton onClick={() => setIsAddModalVisible(true)}>
          Добавить группу
        </WideButton>

        {loading ? (
          <LargeLoader />
        ) : (
          <GroupsTable
            groups={groups}
            onEdit={showUpdateModal}
            onDelete={showDeleteConfirm}
          />
        )}

        <GroupModals
          isAddModalVisible={isAddModalVisible}
          isDeleteModalVisible={isDeleteModalVisible}
          isUpdateModalVisible={isUpdateModalVisible}
          updatingGroup={updatingGroup}
          deleteGroupId={deleteGroupId}
          onAdd={handleAddGroup}
          onDelete={handleDelete}
          onUpdate={handleUpdateGroup}
          onCloseAdd={() => setIsAddModalVisible(false)}
          onCloseDelete={() => {
            setDeleteGroupId(null);
            setIsDeleteModalVisible(false);
          }}
          onCloseUpdate={() => {
            setUpdatingGroup(null);
            setIsUpdateModalVisible(false);
          }}
        />
      </>
    </TabContainer>
  );
};

export default GroupsTab;
