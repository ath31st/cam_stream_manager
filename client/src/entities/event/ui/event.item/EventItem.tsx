import React from 'react';
import styles from './EventItem.module.css';
import { EventDto } from '../../index';

interface EventItemProps {
  event: EventDto;
}

const EventItem: React.FC<EventItemProps> = ({ event }) => {
  return (
    <div className={styles.eventItem}>
      <div className={styles.eventHeader}>
        <span>{event.type}</span>
        <span>{event.level}</span>
      </div>
      <div className={styles.eventInfo}>{event.info}</div>
      <div className={styles.eventDate}>
        {new Date(event.createdAt).toLocaleString()}
      </div>
    </div>
  );
};

export default EventItem;
