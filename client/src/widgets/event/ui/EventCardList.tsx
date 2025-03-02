import React from 'react';
import { EventDto } from '../../../shared/types';
import EventCard from './EventCard';
import { Space } from 'antd';

interface EventCardListProps {
  events: EventDto[];
}

const EventCardList: React.FC<EventCardListProps> = ({ events }) => {
  return (
    <Space direction="vertical" size={5}>
      {events.map((event) => (
        <EventCard key={event.id} {...event} />
      ))}
    </Space>
  );
};

export default EventCardList;
