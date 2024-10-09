import React from 'react';
import { EventDto } from './../index';
import { Card } from 'antd';

const EventCard: React.FC<EventDto> = ({ type, level, info, createdAt }) => {
  return (
    <Card title={type} style={{ width: 250, height: 200 }}>
      <p>{level}</p>
      <p>{info}</p>
      <p>{new Date(createdAt).toLocaleString()}</p>
    </Card>
  );
};

export default EventCard;
