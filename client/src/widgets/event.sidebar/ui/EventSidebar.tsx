import React, { useEffect } from 'react';
import { useEventStore } from '../../../app/stores/event.store';
import { errorNotification } from '../../../shared/notifications';
import { EventCardList } from '../../../entities/event';
import { fetchProps, POLLING_INTERVAL } from '../lib/event.sidebar.constants';

const EventSidebar: React.FC = () => {
  const { error, clearError, fetchEvents, events } = useEventStore();

  useEffect(() => {
    fetchEvents();

    const intervalId = setInterval(() => {
      fetchEvents(fetchProps.page, fetchProps.pageSize);
    }, POLLING_INTERVAL);

    return () => clearInterval(intervalId);
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
