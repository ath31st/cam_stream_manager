import { Space } from 'antd';
import type React from 'react';
import type { EventDto } from '@/shared/api.types';
import EventCard from './EventCard';

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
