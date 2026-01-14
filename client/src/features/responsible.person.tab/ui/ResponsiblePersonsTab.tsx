import { Space } from 'antd';
import type React from 'react';
import {
  LargeLoader,
  StreamSelect,
  TabContainer,
  WideButton,
} from '../../../shared/ui';
import useRpTabHandlers from '../model/use.rp.tab.handlers';
import ResponsiblePersonModals from './ResponsiblePersonModals';
import ResponsiblePersonsTable from './ResponsiblePersonsTable';

const ResponsiblePersonsTab: React.FC = () => {
  const { actions, state, modals, setters } = useRpTabHandlers();

  return (
    <TabContainer>
      <Space>
        <WideButton onClick={modals.showAddModal}>
          Добавить ответственное лицо
        </WideButton>
        <StreamSelect
          streams={state.streams}
          onChange={setters.setSelectedStreamId}
        />
      </Space>

      {state.loading ? (
        <LargeLoader />
      ) : (
        <ResponsiblePersonsTable
          persons={state.filteredResponsiblePersons}
          streams={state.streams}
          onEdit={modals.showUpdateModal}
          onDelete={modals.showDeleteModal}
        />
      )}

      <ResponsiblePersonModals
        isAddVisible={modals.isAddModalVisible}
        isUpdateVisible={modals.isUpdateModalVisible}
        isDeleteVisible={modals.isDeleteModalVisible}
        selectedPerson={state.selectedPerson}
        streams={state.streams}
        onAdd={actions.handleAddPerson}
        onUpdate={actions.handleUpdatePerson}
        onDelete={actions.handleDeletePerson}
        onCloseAdd={modals.closeAddModal}
        onCloseUpdate={modals.closeUpdateModal}
        onCloseDelete={modals.closeDeleteModal}
      />
    </TabContainer>
  );
};

export default ResponsiblePersonsTab;
