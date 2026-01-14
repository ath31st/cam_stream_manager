import { AxiosError } from 'axios';
import { create } from 'zustand';
import type { EventDto, Page } from '@/shared/api.types';
import { getEventErrorMessage, unknownError } from '@/shared/errors';
import type { EventLevel, EventType } from '../';
import { deleteEvent, fetchEvents } from '../api/event.api';

interface EventState {
  events: EventDto[];
  sidebarEvents: EventDto[];
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
  fetchSidebarEvents: (page?: number, pageSize?: number) => Promise<void>;
  removeEvent: (id: number) => Promise<void>;
  handleError: (error: unknown) => void;
  clearError: () => void;
  resetStore: () => void;
}

export const useEventStore = create<EventState>((set) => ({
  events: [],
  sidebarEvents: [],
  selectedEvent: null,
  loading: false,
  error: null,
  currentPage: 1,
  pageSize: 7,
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

  fetchSidebarEvents: async (page?: number, pageSize?: number) => {
    set({ loading: true });
    try {
      const eventPage: Page<EventDto> = await fetchEvents(
        page,
        pageSize,
        undefined,
        undefined,
      );
      set({
        sidebarEvents: eventPage.items,
        loading: false,
      });
    } catch (error) {
      set({ loading: false });
      if (
        error instanceof AxiosError &&
        error.code !== 'ERR_CONNECTION_REFUSED'
      ) {
        useEventStore.getState().handleError(error);
      }
    }
  },

  removeEvent: async (id: number) => {
    try {
      await deleteEvent(id);
      const { currentPage, pageSize } = useEventStore.getState();
      useEventStore.getState().fetchEvents(currentPage, pageSize);
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

  resetStore: () => {
    set({
      events: [],
      sidebarEvents: [],
      selectedEvent: null,
      loading: false,
      error: null,
      currentPage: 1,
      pageSize: 7,
      totalItems: 0,
      totalPages: 0,
    });
  },
}));
