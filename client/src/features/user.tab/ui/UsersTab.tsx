import type React from 'react';
import {
  CommonPaginationBar,
  CommonSearchField,
  LargeLoader,
  TabContainer,
  WideButton,
} from '../../../shared/ui';
import UserTabModals from './UserTabModals';
import UsersTable from './UsersTable';
import { Space } from 'antd';
import { useUsersTabHandlers } from '../model/useUsersTabHandlers';

const UsersTab: React.FC = () => {
  const { modals, selected, search, actions, state } = useUsersTabHandlers();

  return (
    <TabContainer>
      <>
        <Space>
          <WideButton onClick={modals.showAddUserModal}>
            Добавить пользователя
          </WideButton>
          <CommonSearchField
            placeholder="Поиск по логину"
            searchTerm={search.searchTerm ?? ''}
            onSearchChange={search.handleSearchChange}
          />
        </Space>

        {state.loading ? (
          <LargeLoader />
        ) : (
          <>
            <UsersTable
              users={state.users}
              groups={state.groups}
              onEdit={modals.showUpdateModal}
              onDelete={modals.showDeleteModal}
            />
            <CommonPaginationBar
              currentPage={state.currentPage}
              pageSize={state.pageSize}
              totalItems={state.totalItems}
              handlePageChange={actions.handlePageChange}
            />
          </>
        )}

        <UserTabModals
          groups={state.groups}
          isAddModalVisible={modals.isAddModalVisible}
          isDeleteModalVisible={modals.isDeleteModalVisible}
          isUpdateModalVisible={modals.isUpdateModalVisible}
          updatingUser={selected.updatingUser}
          deleteUserId={selected.deleteUserId}
          handleSaveUser={actions.handleAddUser}
          handleDelete={actions.handleDelete}
          handleSaveUpdate={actions.handleUpdateUser}
          handleCancelAdd={actions.handleCancelAddUser}
          handleCancelDelete={actions.handleCancelDelete}
          handleCancelUpdate={actions.handleCancelUpdate}
        />
      </>
    </TabContainer>
  );
};

export default UsersTab;
