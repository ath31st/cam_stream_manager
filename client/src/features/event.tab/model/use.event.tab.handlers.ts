import { useEffect, useState } from 'react';
import {
  useEventStore,
  type EventLevel,
  type EventType,
} from '@/entities/event';
import { errorNotification, successNotification } from '@/shared/notifications';

const useEventTabHandlers = (isActiveTab: boolean) => {
  const [isDeleteModalVisible, setIsDeleteModalVisible] = useState(false);
  const [deleteEventId, setDeleteEventId] = useState<number | null>(null);
  const [eventType, setEventType] = useState<EventType | undefined>();
  const [eventLevel, setEventLevel] = useState<EventLevel | undefined>();

  const {
    events,
    error,
    currentPage,
    pageSize,
    loading,
    totalItems,
    fetchEvents,
    clearError,
  } = useEventStore();

  useEffect(() => {
    if (error) {
      errorNotification('Ошибка в работе с событиями', clearError, error);
    }
  }, [error, clearError]);

  useEffect(() => {
    if (isActiveTab) {
      fetchEvents(currentPage, pageSize, eventType, eventLevel);
    }
  }, [isActiveTab, fetchEvents, currentPage, pageSize, eventType, eventLevel]);

  const showDeleteConfirm = (id: number) => {
    setDeleteEventId(id);
    setIsDeleteModalVisible(true);
  };

  const handleDelete = async () => {
    if (deleteEventId !== null) {
      await useEventStore.getState().removeEvent(deleteEventId);
      if (useEventStore.getState().error === null) {
        successNotification('Событие удалено', 'Событие успешно удалено.');
      }
      setDeleteEventId(null);
      setIsDeleteModalVisible(false);
    }
  };

  const handleCancelDelete = () => {
    setIsDeleteModalVisible(false);
    setDeleteEventId(null);
  };

  const handlePageChange = (page: number) => {
    fetchEvents(page, pageSize);
  };

  const handleTypeChange = (type: EventType | undefined) => {
    setEventType(type);
  };

  const handleLevelChange = (level: EventLevel | undefined) => {
    setEventLevel(level);
  };

  return {
    state: {
      events,
      loading,
      currentPage,
      pageSize,
      totalItems,
      eventType,
      eventLevel,
    },
    modals: {
      isDeleteModalVisible,
      showDeleteConfirm,
    },
    actions: {
      handleDelete,
      handleCancelDelete,
      handlePageChange,
      handleTypeChange,
      handleLevelChange,
    },
  };
};

export default useEventTabHandlers;
