import { Space } from 'antd';
import type React from 'react';
import { EventLevel, EventType } from '../../../entities/event';
import {
  CommonPaginationBar,
  EventLevelSelect,
  EventTypeSelect,
  LargeLoader,
  TabContainer,
} from '../../../shared/ui';
import EventTable from './EventTable';
import useEventTabHandlers from '../model/useEventTabHandlers';
import DeleteEventModal from './DeleteEventModal';

interface EventTabProps {
  isActiveTab: boolean;
}

const EventTab: React.FC<EventTabProps> = ({ isActiveTab }) => {
  const { state, modals, actions } = useEventTabHandlers(isActiveTab);

  return (
    <TabContainer>
      {state.loading ? (
        <LargeLoader />
      ) : (
        <>
          <Space>
            <EventTypeSelect
              eventTypes={Object.values(EventType)}
              value={state.eventType}
              onChange={actions.handleTypeChange}
            />
            <EventLevelSelect
              eventLevels={Object.values(EventLevel)}
              value={state.eventLevel}
              onChange={actions.handleLevelChange}
            />
          </Space>

          <EventTable
            events={state.events}
            onDelete={modals.showDeleteConfirm}
          />
          <CommonPaginationBar
            currentPage={state.currentPage}
            pageSize={state.pageSize}
            totalItems={state.totalItems}
            handlePageChange={actions.handlePageChange}
          />
        </>
      )}
      <DeleteEventModal
        visible={modals.isDeleteModalVisible}
        onConfirm={actions.handleDelete}
        onCancel={actions.handleCancelDelete}
      />
    </TabContainer>
  );
};

export default EventTab;
