import React, { useEffect, useState } from 'react';
import { useEventStore } from '../../../app/stores/event.store';
import {
  errorNotification,
  successNotification,
} from '../../../shared/notifications';
import { DeleteEventModal } from '../../../entities/event';
import EventTable from './EventTable';
import TabContainer from '../../../shared/ui/containers/TabContainer';

const EventTab: React.FC = () => {
  const [isDeleteModalVisible, setIsDeleteModalVisible] = useState(false);
  const [deleteEventId, setDeleteEventId] = useState<number | null>(null);

  const { events, removeEvent, error, clearError, fetchEvents } =
    useEventStore();

  useEffect(() => {
    if (error) {
      errorNotification('Ошибка в работе с событиями', clearError, error);
    }
  }, [error, clearError]);

  useEffect(() => {
    fetchEvents();
  }, [fetchEvents]);

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

  return (
    <TabContainer>
      <EventTable events={events} onDelete={showDeleteConfirm} />

      <DeleteEventModal
        visible={isDeleteModalVisible}
        onConfirm={handleDelete}
        onCancel={() => setIsDeleteModalVisible(false)}
      ></DeleteEventModal>
    </TabContainer>
  );
};

export default EventTab;
