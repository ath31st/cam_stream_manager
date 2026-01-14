import type React from 'react';
import type {
  NewStream,
  Playlist,
  Stream,
  UpdateStream,
} from '../../../shared/api.types';
import AddStreamModal from './AddStreamModal';
import DeleteStreamModal from './DeleteStreamModal';
import UpdateStreamModal from './UpdateStreamModal';

interface StreamModalsProps {
  isAddModalVisible: boolean;
  isUpdateModalVisible: boolean;
  isDeleteModalVisible: boolean;
  updatingStream: Stream | null;
  deleteStreamId: number | null;
  playlists: Playlist[];
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
  playlists,
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
        playlists={playlists}
        onConfirm={handleSaveStream}
        onCancel={handleCancelAdd}
      />

      <UpdateStreamModal
        visible={isUpdateModalVisible}
        stream={updatingStream}
        playlists={playlists}
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
