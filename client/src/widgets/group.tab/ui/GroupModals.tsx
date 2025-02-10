import React from 'react';
import {
  AddGroupModal,
  DeleteGroupModal,
  Group,
  UpdateGroup,
  UpdateGroupModal,
} from '../../../entities/group';

interface GroupModalsProps {
  isAddModalVisible: boolean;
  isDeleteModalVisible: boolean;
  isUpdateModalVisible: boolean;
  updatingGroup: Group | null;
  deleteGroupId: number | null;
  onAdd: (name: string) => void;
  onDelete: () => void;
  onUpdate: (updatedGroup: UpdateGroup) => void;
  onCloseAdd: () => void;
  onCloseDelete: () => void;
  onCloseUpdate: () => void;
}

const GroupModals: React.FC<GroupModalsProps> = ({
  isAddModalVisible,
  isDeleteModalVisible,
  isUpdateModalVisible,
  updatingGroup,
  onAdd,
  onDelete,
  onUpdate,
  onCloseAdd,
  onCloseDelete,
  onCloseUpdate,
}) => (
  <>
    <AddGroupModal
      visible={isAddModalVisible}
      onConfirm={onAdd}
      onCancel={onCloseAdd}
    />

    <DeleteGroupModal
      visible={isDeleteModalVisible}
      onConfirm={onDelete}
      onCancel={onCloseDelete}
    />

    <UpdateGroupModal
      visible={isUpdateModalVisible}
      group={updatingGroup}
      onConfirm={onUpdate}
      onCancel={onCloseUpdate}
    />
  </>
);

export default GroupModals;
