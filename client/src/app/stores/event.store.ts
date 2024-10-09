import { create } from 'zustand';

import { EventDto, fetchEvents, deleteEvent, Page } from '../../entities/event';
import { AxiosError } from 'axios';
import { getEventErrorMessage, unknownError } from '../../shared/errors';

interface EventState {
  events: EventDto[];
  selectedEvent: EventDto | null;
  loading: boolean;
  error: string | null;
  fetchEvents: () => Promise<void>;
  removeEvent: (id: number) => Promise<void>;
  handleError: (error: unknown) => void;
  clearError: () => void;
}

export const useEventStore = create<EventState>((set) => ({
  events: [],
  selectedEvent: null,
  loading: false,
  error: null,
  fetchEvents: async () => {
    set({ loading: true });
    try {
      const eventPage: Page<EventDto> = await fetchEvents();
      set({ events: eventPage.items, loading: false });
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
      const statusCode = error.response?.status;
      const message = getEventErrorMessage(statusCode as number);
      set({ error: message });
    } else {
      set({ error: unknownError });
    }
  },

  clearError: () => {
    set({ error: null });
  },
}));
