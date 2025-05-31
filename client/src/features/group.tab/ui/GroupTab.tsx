import type React from 'react';
import { LargeLoader, TabContainer, WideButton } from '../../../shared/ui';
import GroupModals from './GroupModals';
import GroupsTable from './GroupsTable';
import useGroupTabHandlers from '../model/use.group.tab.handlers';

const GroupsTab: React.FC = () => {
  const { state, actions, modals } = useGroupTabHandlers();

  return (
    <TabContainer>
      <>
        <WideButton onClick={modals.showAddModal}>Добавить группу</WideButton>

        {state.loading ? (
          <LargeLoader />
        ) : (
          <GroupsTable
            groups={state.groups}
            onEdit={modals.showUpdateModal}
            onDelete={modals.showDeleteConfirmModal}
          />
        )}

        <GroupModals
          isAddModalVisible={modals.isAddModalVisible}
          isDeleteModalVisible={modals.isDeleteModalVisible}
          isUpdateModalVisible={modals.isUpdateModalVisible}
          updatingGroup={state.updatingGroup}
          deleteGroupId={state.deleteGroupId}
          onAdd={actions.handleAddGroup}
          onDelete={actions.handleDelete}
          onUpdate={actions.handleUpdateGroup}
          onCloseAdd={modals.closeAddModal}
          onCloseDelete={modals.closeDeleteModal}
          onCloseUpdate={modals.closeUpdateModal}
        />
      </>
    </TabContainer>
  );
};

export default GroupsTab;
