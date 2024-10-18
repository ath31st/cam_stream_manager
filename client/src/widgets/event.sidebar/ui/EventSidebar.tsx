import React, { useEffect } from 'react';
import { useEventStore } from '../../../app/stores/event.store';
import { errorNotification } from '../../../shared/notifications';
import { EventCardList } from '../../../entities/event';
import { fetchProps, POLLING_INTERVAL } from '../lib/event.sidebar.constants';
import styles from './EventSidebar.module.css';

interface EventSidebarProps {
  isActiveTab: boolean;
}

const EventSidebar: React.FC<EventSidebarProps> = ({ isActiveTab }) => {
  const { error, clearError, fetchEvents, events } = useEventStore();

  useEffect(() => {
    if (isActiveTab) {
      fetchEvents(fetchProps.page, fetchProps.pageSize);

      const intervalId = setInterval(() => {
        fetchEvents(fetchProps.page, fetchProps.pageSize);
      }, POLLING_INTERVAL);

      return () => clearInterval(intervalId);
    }
  }, [fetchEvents, isActiveTab]);

  useEffect(() => {
    if (error) {
      errorNotification('Ошибка в работе с событиями', clearError, error);
    }
  }, [error, clearError]);

  return (
    <>
      <p
        className={styles['event-sidebar-header']}
      >{`${fetchProps.pageSize} последних события:`}</p>
      <EventCardList events={events} />
    </>
  );
};

export default EventSidebar;
