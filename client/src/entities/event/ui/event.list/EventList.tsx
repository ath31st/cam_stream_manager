import React from 'react';
import EventItem from '../event.item/EventItem';
import styles from './EventList.module.css';
import { EventDto } from '../../index';

interface EventListProps {
  events: EventDto[];
}

const EventList: React.FC<EventListProps> = ({ events }) => {
  return (
    <div className={styles.eventList}>
      {events.map((event) => (
        <EventItem key={event.id} event={event} />
      ))}
    </div>
  );
};

export default EventList;
