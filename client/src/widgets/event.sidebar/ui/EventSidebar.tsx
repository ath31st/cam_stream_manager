import React, { useEffect } from 'react';
import { useEventStore } from '../../../app/stores/event.store';
import { errorNotification } from '../../../shared/notifications';
import { EventCardList } from '../../../entities/event';

const EventSidebar: React.FC = () => {
  const { error, clearError, fetchEvents, events } = useEventStore();
  const fetchProps = {
    page: 1,
    pageSize: 5,
  };

  useEffect(() => {
    fetchEvents(fetchProps.page, fetchProps.pageSize);
  }, [fetchEvents]);

  useEffect(() => {
    if (error) {
      errorNotification('Ошибка в работе с событиями', clearError, error);
    }
  }, [error, clearError]);

  return (
    <>
      <EventCardList events={events} />
    </>
  );
};

export default EventSidebar;
