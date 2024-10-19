import React, { useEffect, useState } from 'react';
import { useEventStore } from '../../../app/stores/event.store';
import {
  errorNotification,
  successNotification,
} from '../../../shared/notifications';
import { DeleteEventModal } from '../../../entities/event';
import EventTable from './EventTable';
import TabContainer from '../../../shared/ui/containers/TabContainer';
import { Pagination } from 'antd';

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
      <EventTable events={events} onDelete={showDeleteConfirm} />
      <Pagination
        defaultCurrent={1}
        current={currentPage}
        pageSize={pageSize}
        total={useEventStore.getState().totalItems}
        onChange={handlePageChange}
        showSizeChanger={false}
      />
      <DeleteEventModal
        visible={isDeleteModalVisible}
        onConfirm={handleDelete}
        onCancel={() => setIsDeleteModalVisible(false)}
      />
    </TabContainer>
  );
};

export default EventTab;
