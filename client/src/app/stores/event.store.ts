import { create } from 'zustand';

import {
  EventDto,
  fetchEvents,
  deleteEvent,
  Page,
  EventType,
  EventLevel,
} from '../../entities/event';
import { AxiosError } from 'axios';
import { getEventErrorMessage, unknownError } from '../../shared/errors';

interface EventState {
  events: EventDto[];
  selectedEvent: EventDto | null;
  loading: boolean;
  error: string | null;
  currentPage: number;
  pageSize: number;
  totalItems: number;
  totalPages: number;
  fetchEvents: (
    page?: number,
    pageSize?: number,
    filterByType?: EventType,
    filterByLevel?: EventLevel,
  ) => Promise<void>;
  removeEvent: (id: number) => Promise<void>;
  handleError: (error: unknown) => void;
  clearError: () => void;
}

export const useEventStore = create<EventState>((set) => ({
  events: [],
  selectedEvent: null,
  loading: false,
  error: null,
  currentPage: 1,
  pageSize: 5,
  totalItems: 0,
  totalPages: 0,
  fetchEvents: async (
    page?: number,
    pageSize?: number,
    filterByType?: EventType,
    filterByLevel?: EventLevel,
  ) => {
    set({ loading: true });
    try {
      const eventPage: Page<EventDto> = await fetchEvents(
        page,
        pageSize,
        filterByType,
        filterByLevel,
      );
      set({
        events: eventPage.items,
        totalItems: eventPage.totalItems,
        totalPages: eventPage.totalPages,
        currentPage: eventPage.currentPage,
        pageSize: eventPage.pageSize,
        loading: false,
      });
    } catch (error) {
      set({ loading: false });
      useEventStore.getState().handleError(error);
    }
  },
  removeEvent: async (id: number) => {
    try {
      await deleteEvent(id);
      useEventStore.getState().fetchEvents();
    } catch (error) {
      useEventStore.getState().handleError(error);
    }
  },

  handleError: (error: unknown) => {
    if (error instanceof AxiosError) {
      if (error.response) {
        const statusCode = error.response?.status;
        const message = getEventErrorMessage(statusCode as number);
        set({ error: message });
      }
    } else {
      set({ error: unknownError });
    }
  },

  clearError: () => {
    set({ error: null });
  },
}));
