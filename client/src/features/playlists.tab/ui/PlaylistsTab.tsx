import type React from 'react';
import { LargeLoader, TabContainer, WideButton } from '../../../shared/ui';
import usePlaylistTabHandlers from '../model/use.playlist.tab.handlers';
import PlaylistModals from './PlaylistModals';
import PlaylistsTable from './PlaylistsTable';

const PlaylistsTab: React.FC = () => {
  const { state, actions, modals } = usePlaylistTabHandlers();

  return (
    <TabContainer>
      <>
        <WideButton onClick={modals.showAddModal}>Добавить плейлист</WideButton>

        {state.loading ? (
          <LargeLoader />
        ) : (
          <PlaylistsTable
            groups={state.groups}
            playlists={state.playlists}
            onEdit={modals.showUpdateModal}
            onDelete={modals.showDeleteConfirm}
          />
        )}

        <PlaylistModals
          groups={state.groups}
          isAddModalVisible={modals.isAddModalVisible}
          isDeleteModalVisible={modals.isDeleteModalVisible}
          isUpdateModalVisible={modals.isUpdateModalVisible}
          updatingPlaylist={state.updatingPlaylist}
          deletePlaylistId={state.deletePlaylistId}
          onAdd={actions.handleAddPlaylist}
          onDelete={actions.handleDelete}
          onUpdate={actions.handleUpdatePlaylist}
          onCloseAdd={modals.closeAddModal}
          onCloseDelete={modals.closeDeleteModal}
          onCloseUpdate={modals.closeUpdateModal}
        />
      </>
    </TabContainer>
  );
};

export default PlaylistsTab;
