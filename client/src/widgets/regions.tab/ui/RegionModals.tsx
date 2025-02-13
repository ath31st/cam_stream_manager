import React from 'react';
import {
  AddRegionModal,
  DeleteRegionModal,
  NewRegion,
  Region,
  UpdateRegion,
  UpdateRegionModal,
} from '../../../entities/region';
import { Group } from '../../../entities/group';

interface RegionModalsProps {
  groups: Group[];
  isAddModalVisible: boolean;
  isDeleteModalVisible: boolean;
  isUpdateModalVisible: boolean;
  updatingRegion: Region | null;
  deleteRegionId: number | null;
  onAdd: (newRegion: NewRegion) => void;
  onDelete: () => void;
  onUpdate: (updatedRegion: UpdateRegion) => void;
  onCloseAdd: () => void;
  onCloseDelete: () => void;
  onCloseUpdate: () => void;
}

const RegionModals: React.FC<RegionModalsProps> = ({
  groups,
  isAddModalVisible,
  isDeleteModalVisible,
  isUpdateModalVisible,
  updatingRegion,
  onAdd,
  onDelete,
  onUpdate,
  onCloseAdd,
  onCloseDelete,
  onCloseUpdate,
}) => (
  <>
    <AddRegionModal
      groups={groups}
      visible={isAddModalVisible}
      onConfirm={onAdd}
      onCancel={onCloseAdd}
    />

    <DeleteRegionModal
      visible={isDeleteModalVisible}
      onConfirm={onDelete}
      onCancel={onCloseDelete}
    />

    <UpdateRegionModal
      groups={groups}
      visible={isUpdateModalVisible}
      region={updatingRegion}
      onConfirm={onUpdate}
      onCancel={onCloseUpdate}
    />
  </>
);

export default RegionModals;
