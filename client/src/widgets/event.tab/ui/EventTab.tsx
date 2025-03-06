import React, { useEffect, useState } from 'react';
import { useEventStore } from '../../../entities/event';
import {
  errorNotification,
  successNotification,
} from '../../../shared/notifications';
import { DeleteEventModal } from '../../../features/event.management';
import EventTable from './EventTable';
import { TabContainer, LargeLoader } from '../../../shared/ui';
import { Pagination } from 'antd';
import styles from './EventTab.module.css';

const EventTab: React.FC = () => {
  const [isDeleteModalVisible, setIsDeleteModalVisible] = useState(false);
  const [deleteEventId, setDeleteEventId] = useState<number | null>(null);

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
    fetchEvents(currentPage, pageSize);
  }, [fetchEvents, currentPage, pageSize]);

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
