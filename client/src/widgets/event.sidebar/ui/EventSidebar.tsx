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
  const { error, clearError, fetchSidebarEvents, sidebarEvents } =
    useEventStore();

  useEffect(() => {
    if (isActiveTab) {
      fetchSidebarEvents(fetchProps.page, fetchProps.pageSize);

      const intervalId = setInterval(() => {
        fetchSidebarEvents(fetchProps.page, fetchProps.pageSize);
      }, POLLING_INTERVAL);

      return () => clearInterval(intervalId);
    }
  }, [fetchSidebarEvents, isActiveTab]);

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
      <EventCardList events={sidebarEvents} />
    </>
  );
};

export default EventSidebar;
