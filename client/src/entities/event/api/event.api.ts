import axios from 'axios';
import type { EventDto, Page } from '../../../shared/api.types';
import type { EventLevel, EventType } from '../index';

const API_URL = `${import.meta.env.VITE_API_URL}/events`;

export const fetchEvents = async (
  page?: number,
  pageSize?: number,
  filterByType?: EventType,
  filterByLevel?: EventLevel,
): Promise<Page<EventDto>> => {
  const params = {
    page,
    pageSize,
    type: filterByType,
    level: filterByLevel,
  };
  const response = await axios.get<Page<EventDto>>(API_URL, { params });
  return response.data;
};

export const deleteEvent = async (id: number): Promise<void> => {
  await axios.delete(`${API_URL}/${id}`);
};
