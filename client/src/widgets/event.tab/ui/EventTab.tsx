import { Pagination, Space } from 'antd';
import type React from 'react';
import { useEffect, useState } from 'react';
import { EventLevel, EventType, useEventStore } from '../../../entities/event';
import { DeleteEventModal } from '../../../features/event.management';
import {
  errorNotification,
  successNotification,
} from '../../../shared/notifications';
import {
  EventLevelSelect,
  EventTypeSelect,
  LargeLoader,
  TabContainer,
} from '../../../shared/ui';
import styles from './EventTab.module.css';
import EventTable from './EventTable';

const EventTab: React.FC = () => {
  const [isDeleteModalVisible, setIsDeleteModalVisible] = useState(false);
  const [deleteEventId, setDeleteEventId] = useState<number | null>(null);
  const [eventType, setEventType] = useState<EventType | undefined>(undefined);
  const [eventLevel, setEventLevel] = useState<EventLevel | undefined>(
    undefined,
  );

  const {
    events,
    removeEvent,
    error,
    clearError,
    fetchEvents,
    currentPage,
    pageSize,
    loading,
  } = useEventStore();

  useEffect(() => {
    if (error) {
      errorNotification('Ошибка в работе с событиями', clearError, error);
    }
  }, [error, clearError]);

  useEffect(() => {
    fetchEvents(currentPage, pageSize, eventType, eventLevel);
  }, [fetchEvents, currentPage, pageSize, eventType, eventLevel]);

  const showDeleteConfirm = (id: number) => {
    setDeleteEventId(id);
    setIsDeleteModalVisible(true);
  };

  const handleDelete = async () => {
    if (deleteEventId !== null) {
      await removeEvent(deleteEventId);
      if (useEventStore.getState().error === null) {
        successNotification('Событие удалено', 'Событие успешно удалено.');
      }
      setDeleteEventId(null);
      setIsDeleteModalVisible(false);
    }
  };

  const handlePageChange = (page: number) => {
    useEventStore.getState().fetchEvents(page, pageSize);
  };

  return (
    <TabContainer>
      {loading ? (
        <LargeLoader />
      ) : (
        <>
          <Space>
            <EventTypeSelect
              eventTypes={Object.values(EventType)}
              value={eventType}
              onChange={setEventType}
            />
            <EventLevelSelect
              eventLevels={Object.values(EventLevel)}
              value={eventLevel}
              onChange={setEventLevel}
            />
          </Space>

          <EventTable events={events} onDelete={showDeleteConfirm} />
          <div className={styles['pagination-container']}>
            <Pagination
              defaultCurrent={1}
              current={currentPage}
              pageSize={pageSize}
              total={useEventStore.getState().totalItems}
              onChange={handlePageChange}
              showSizeChanger={false}
            />
          </div>
        </>
      )}
      <DeleteEventModal
        visible={isDeleteModalVisible}
        onConfirm={handleDelete}
        onCancel={() => setIsDeleteModalVisible(false)}
      />
    </TabContainer>
  );
};

export default EventTab;
