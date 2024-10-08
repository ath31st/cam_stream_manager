// components/StreamModals.tsx
import React from 'react';
import {
  AddStreamModal,
  UpdateStreamModal,
  DeleteStreamModal,
  NewStream,
  Stream,
  UpdateStream,
} from '../../../entities/stream';
import { Region } from '../../../entities/region';

interface StreamModalsProps {
  isAddModalVisible: boolean;
  isUpdateModalVisible: boolean;
  isDeleteModalVisible: boolean;
  updatingStream: Stream | null;
  deleteStreamId: number | null;
  regions: Region[];
  handleSaveStream: (value: NewStream) => void;
  handleSaveUpdate: (value: UpdateStream) => void;
  handleCancelAdd: () => void;
  handleCancelUpdate: () => void;
  handleDelete: () => void;
  handleCancelDelete: () => void;
}

const StreamModals: React.FC<StreamModalsProps> = ({
  isAddModalVisible,
  isUpdateModalVisible,
  isDeleteModalVisible,
  updatingStream,
  regions,
  handleSaveStream,
  handleSaveUpdate,
  handleCancelAdd,
  handleCancelUpdate,
  handleDelete,
  handleCancelDelete,
}) => {
  return (
    <>
      <AddStreamModal
        visible={isAddModalVisible}
        regions={regions}
        onConfirm={handleSaveStream}
        onCancel={handleCancelAdd}
      />

      <UpdateStreamModal
        visible={isUpdateModalVisible}
        stream={updatingStream}
        regions={regions}
        onConfirm={handleSaveUpdate}
        onCancel={handleCancelUpdate}
      />

      <DeleteStreamModal
        visible={isDeleteModalVisible}
        onConfirm={handleDelete}
        onCancel={handleCancelDelete}
      />
    </>
  );
};

export default StreamModals;
