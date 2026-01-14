import { useEffect, useState } from 'react';
import { useEventStore } from '@/entities/event';
import { errorNotification } from '@/shared/notifications';
import { fetchProps, POLLING_INTERVAL } from '../lib/event.sidebar.constants';

const useEventSidebarHandlers = (isActiveTab: boolean) => {
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

  return {
    state: {
      error,
      sidebarEvents,
      isLoading,
      pageSize: fetchProps.pageSize,
    },
  };
};

export default useEventSidebarHandlers;
