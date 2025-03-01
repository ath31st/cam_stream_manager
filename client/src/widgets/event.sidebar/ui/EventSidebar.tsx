import React, { useEffect, useState } from 'react';
import { useEventStore } from '../../../entities/event/model/event.store';
import { errorNotification } from '../../../shared/notifications';
import { EventCardList } from '../../../entities/event';
import { fetchProps, POLLING_INTERVAL } from '../lib/event.sidebar.constants';
import styles from './EventSidebar.module.css';
import MediumLoader from '../../../shared/ui/loaders/MediumLoader';

interface EventSidebarProps {
  isActiveTab: boolean;
}

const EventSidebar: React.FC<EventSidebarProps> = ({ isActiveTab }) => {
  const { error, clearError, fetchSidebarEvents, sidebarEvents } =
    useEventStore();
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    if (isActiveTab) {
      fetchSidebarEvents(fetchProps.page, fetchProps.pageSize).then(() => {
        setIsLoading(false);
      });

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
      {isLoading ? (
        <MediumLoader />
      ) : (
        <>
          <p className={styles['event-sidebar-header']}>
            {`${fetchProps.pageSize} последних события:`}
          </p>
          <EventCardList events={sidebarEvents} />
        </>
      )}
    </>
  );
};

export default EventSidebar;
