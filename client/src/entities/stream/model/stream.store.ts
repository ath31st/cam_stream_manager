import { create } from 'zustand';
import { Stream, NewStream, UpdateStream } from '../../../shared/api.types';
import {
  fetchStreams,
  fetchStream,
  createStream,
  updateStream,
  deleteStream,
  fetchStreamsByPlaylist,
} from '../api/stream.api';
import { AxiosError } from 'axios';
import { getStreamErrorMessage, unknownError } from '../../../shared/errors';

interface StreamState {
  streams: Stream[];
  selectedStream: Stream | null;
  loading: boolean;
  error: string | null;
  fetchAllStreams: () => Promise<void>;
  fetchStreamsByPlaylist: (playlistId: number) => Promise<void>;
  fetchStreamById: (id: number) => Promise<void>;
  addStream: (stream: NewStream) => Promise<void>;
  updateStream: (id: number, stream: UpdateStream) => Promise<void>;
  removeStream: (id: number) => Promise<void>;
  setSelectedStream: (stream: Stream) => void;
  handleError: (error: unknown) => void;
  clearError: () => void;
}

export const useStreamStore = create<StreamState>((set) => ({
  streams: [],
  selectedStream: null,
  loading: false,
  error: null,

  handleError: (error: unknown) => {
    if (error instanceof AxiosError) {
      const statusCode = error.response?.status;
      const message = getStreamErrorMessage(statusCode as number);
      set({ error: message });
    } else {
      set({ error: unknownError });
    }
  },

  fetchAllStreams: async () => {
    set({ loading: true });
    try {
      const streams = await fetchStreams();
      set({ streams, loading: false });
    } catch (error: unknown) {
      set({ loading: false });
      useStreamStore.getState().handleError(error);
    }
  },

  fetchStreamsByPlaylist: async (playlistId: number) => {
    set({ loading: true });
    try {
      const streams = await fetchStreamsByPlaylist(playlistId);
      set({ streams, loading: false });
    } catch (error: unknown) {
      set({ loading: false });
      useStreamStore.getState().handleError(error);
    }
  },

  fetchStreamById: async (id: number) => {
    set({ loading: true });
    try {
      const stream = await fetchStream(id);
      set({ selectedStream: stream, loading: false });
    } catch (error: unknown) {
      set({ loading: false });
      useStreamStore.getState().handleError(error);
    }
  },

  addStream: async (stream: NewStream) => {
    try {
      const createdStream = await createStream(stream);
      set((state) => ({ streams: [...state.streams, createdStream] }));
    } catch (error: unknown) {
      useStreamStore.getState().handleError(error);
    }
  },

  updateStream: async (id, stream) => {
    try {
      const updatedStream = await updateStream(id, stream);
      set((state) => ({
        streams: state.streams.map((s) => (s.id === id ? updatedStream : s)),
      }));
    } catch (error: unknown) {
      useStreamStore.getState().handleError(error);
    }
  },

  removeStream: async (id: number) => {
    try {
      await deleteStream(id);
      set((state) => ({
        streams: state.streams.filter((s) => s.id !== id),
      }));
    } catch (error: unknown) {
      useStreamStore.getState().handleError(error);
    }
  },

  setSelectedStream: (stream) => set({ selectedStream: stream }),

  clearError: () => set({ error: null }),
}));
