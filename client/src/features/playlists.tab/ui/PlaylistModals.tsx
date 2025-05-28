import type React from 'react';
import type {
  Group,
  NewPlaylist,
  Playlist,
  UpdatePlaylist,
} from '../../../shared/api.types';
import AddPlaylistModal from './AddPlaylistModal';
import DeletePlaylistModal from './DeletePlaylistModal';
import UpdatePlaylistModal from './UpdatePlaylistModal';

interface PlaylistModalsProps {
  groups: Group[];
  isAddModalVisible: boolean;
  isDeleteModalVisible: boolean;
  isUpdateModalVisible: boolean;
  updatingPlaylist: Playlist | null;
  deletePlaylistId: number | null;
  onAdd: (newPlaylist: NewPlaylist) => void;
  onDelete: () => void;
  onUpdate: (updatedPlaylist: UpdatePlaylist) => void;
  onCloseAdd: () => void;
  onCloseDelete: () => void;
  onCloseUpdate: () => void;
}

const PlaylistModals: React.FC<PlaylistModalsProps> = ({
  groups,
  isAddModalVisible,
  isDeleteModalVisible,
  isUpdateModalVisible,
  updatingPlaylist,
  onAdd,
  onDelete,
  onUpdate,
  onCloseAdd,
  onCloseDelete,
  onCloseUpdate,
}) => (
  <>
    <AddPlaylistModal
      groups={groups}
      visible={isAddModalVisible}
      onConfirm={onAdd}
      onCancel={onCloseAdd}
    />

    <DeletePlaylistModal
      visible={isDeleteModalVisible}
      onConfirm={onDelete}
      onCancel={onCloseDelete}
    />

    <UpdatePlaylistModal
      groups={groups}
      visible={isUpdateModalVisible}
      playlist={updatingPlaylist}
      onConfirm={onUpdate}
      onCancel={onCloseUpdate}
    />
  </>
);

export default PlaylistModals;
