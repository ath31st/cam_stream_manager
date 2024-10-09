import axios from 'axios';
import { Event, Page, EventType, EventLevel } from '../index';

const API_URL = process.env.REACT_APP_API_URL + '/events';

export const fetchEvents = async (
  page?: number,
  pageSize?: number,
  filterByType?: EventType,
  filterByLevel?: EventLevel,
): Promise<Page<Event>> => {
  const params = {
    page,
    pageSize,
    type: filterByType,
    level: filterByLevel,
  };
  const response = await axios.get<Page<Event>>(API_URL, { params });
  return response.data;
};

export const deleteEvent = async (id: number): Promise<void> => {
  await axios.delete(`${API_URL}/${id}`);
};
