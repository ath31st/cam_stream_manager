import { Space } from 'antd';
import type React from 'react';
import {
  LargeLoader,
  PlaylistSelect,
  TabContainer,
  WideButton,
} from '../../../shared/ui';
import StreamModals from './StreamsModals';
import StreamsTable from './StreamsTable';
import useStreamTabHandlers from '../model/use.stream.tab.handlers';

const StreamsTab: React.FC = () => {
  const { state, actions, modals, setters } = useStreamTabHandlers();

  return (
    <TabContainer>
      <Space>
        <WideButton onClick={modals.showAddModal}>Добавить поток</WideButton>
        <PlaylistSelect
          playlists={state.playlists}
          onChange={setters.setSelectedPlaylistId}
        />
      </Space>

      {state.loading ? (
        <LargeLoader />
      ) : (
        <StreamsTable
          streams={state.filteredStreams}
          playlists={state.playlists}
          onEdit={modals.showUpdateModal}
          onDelete={modals.showDeleteModal}
        />
      )}

      <StreamModals
        isAddModalVisible={modals.isAddModalVisible}
        isUpdateModalVisible={modals.isUpdateModalVisible}
        isDeleteModalVisible={modals.isDeleteModalVisible}
        updatingStream={state.updatingStream}
        deleteStreamId={state.deleteStreamId}
        playlists={state.playlists}
        handleSaveStream={actions.handleAdd}
        handleSaveUpdate={actions.handleUpdate}
        handleCancelAdd={modals.closeAddModal}
        handleCancelUpdate={modals.closeUpdateModal}
        handleDelete={actions.handleDelete}
        handleCancelDelete={modals.closeDeleteModal}
      />
    </TabContainer>
  );
};

export default StreamsTab;
