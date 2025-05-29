import type React from 'react';
import { MediumLoader } from '../../../shared/ui';
import styles from './EventSidebar.module.css';
import EventCardList from './EventCardList';
import useEventSidebarHandlers from '../model/use.event.sidebar.handlers';

interface EventSidebarProps {
  isActiveTab: boolean;
}

const EventSidebar: React.FC<EventSidebarProps> = ({ isActiveTab }) => {
  const { state } = useEventSidebarHandlers(isActiveTab);

  return (
    <>
      {state.isLoading ? (
        <MediumLoader />
      ) : (
        <>
          <p className={styles['event-sidebar-header']}>
            {`${state.pageSize} последних события:`}
          </p>
          <EventCardList events={state.sidebarEvents} />
        </>
      )}
    </>
  );
};

export default EventSidebar;
