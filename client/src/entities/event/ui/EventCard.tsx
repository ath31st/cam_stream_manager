import React from 'react';
import { EventDto } from './../index';

const EventCard: React.FC<EventDto> = ({
  type,
  level,
  info,
  createdAt,
}) => {
  return (
    <>
      <h3>{type}</h3>
      <p>{level}</p>
      <p>{info}</p>
      <p>{new Date(createdAt).toLocaleString()}</p>
    </>
  );
};

export default EventCard;
