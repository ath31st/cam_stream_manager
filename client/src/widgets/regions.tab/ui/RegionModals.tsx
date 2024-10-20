import React from 'react';
import {
  AddRegionModal,
  DeleteRegionModal,
  Region,
  UpdateRegion,
  UpdateRegionModal,
} from '../../../entities/region';

interface RegionModalsProps {
  isAddModalVisible: boolean;
  isDeleteModalVisible: boolean;
  isUpdateModalVisible: boolean;
  updatingRegion: Region | null;
  deleteRegionId: number | null;
  onAdd: (name: string) => void;
  onDelete: () => void;
  onUpdate: (updatedRegion: UpdateRegion) => void;
  onCloseAdd: () => void;
  onCloseDelete: () => void;
  onCloseUpdate: () => void;
}

const RegionModals: React.FC<RegionModalsProps> = ({
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
      visible={isAddModalVisible}
      onOk={onAdd}
      onCancel={onCloseAdd}
    />

    <DeleteRegionModal
      visible={isDeleteModalVisible}
      onConfirm={onDelete}
      onCancel={onCloseDelete}
    />

    <UpdateRegionModal
      visible={isUpdateModalVisible}
      region={updatingRegion}
      onOk={onUpdate}
      onCancel={onCloseUpdate}
    />
  </>
);

export default RegionModals;
