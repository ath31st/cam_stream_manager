import { create } from 'zustand';
import { Stream, NewStream, UpdateStream } from '../../entities/stream';
import {
  fetchStreams,
  fetchStream,
  createStream,
  updateStream,
  deleteStream,
  fetchStreamsByRegion,
} from '../../entities/stream/api/stream.api';

interface StreamState {
  streams: Stream[];
  selectedStream: Stream | null;
  loading: boolean;
  error: string | null;
  fetchAllStreams: () => Promise<void>;
  fetchStreamsByRegion: (regionId: number) => Promise<void>;
  fetchStreamById: (id: number) => Promise<void>;
  addStream: (stream: NewStream) => Promise<void>;
  updateStream: (id: number, stream: UpdateStream) => Promise<void>;
  removeStream: (id: number) => Promise<void>;
  setSelectedStream: (stream: Stream) => void;
}

export const useStreamStore = create<StreamState>((set) => ({
  streams: [],
  selectedStream: null,
  loading: false,
  error: null,

  fetchAllStreams: async () => {
    set({ loading: true });
    try {
      const streams = await fetchStreams();
      set({ streams, loading: false });
    } catch (error: unknown) {
      if (error instanceof Error) {
        set({ error: error.message, loading: false });
      } else {
        set({ error: 'Unknown error', loading: false });
      }
    }
  },

  fetchStreamsByRegion: async (regionId: number) => {
    set({ loading: true });
    try {
      const streams = await fetchStreamsByRegion(regionId);
      set({ streams, loading: false });
    } catch (error: unknown) {
      if (error instanceof Error) {
        set({ error: error.message, loading: false });
      } else {
        set({ error: 'Unknown error', loading: false });
      }
    }
  },

  fetchStreamById: async (id: number) => {
    set({ loading: true });
    try {
      const stream = await fetchStream(id);
      set({ selectedStream: stream, loading: false });
    } catch (error: unknown) {
      if (error instanceof Error) {
        set({ error: error.message, loading: false });
      } else {
        set({ error: 'Unknown error', loading: false });
      }
    }
  },

  addStream: async (stream: NewStream) => {
    try {
      const createdStream = await createStream(stream);
      set((state) => ({ streams: [...state.streams, createdStream] }));
    } catch (error: unknown) {
      if (error instanceof Error) {
        set({ error: error.message });
      } else {
        set({ error: 'Unknown error' });
      }
    }
  },

  updateStream: async (id, stream) => {
    try {
      const updatedStream = await updateStream(id, stream);
      set((state) => ({
        streams: state.streams.map((s) => (s.id === id ? updatedStream : s)),
      }));
    } catch (error: unknown) {
      if (error instanceof Error) {
        set({ error: error.message });
      } else {
        set({ error: 'Unknown error' });
      }
    }
  },

  removeStream: async (id: number) => {
    try {
      await deleteStream(id);
      set((state) => ({
        streams: state.streams.filter((s) => s.id !== id),
      }));
    } catch (error: unknown) {
      if (error instanceof Error) {
        set({ error: error.message });
      } else {
        set({ error: 'Unknown error' });
      }
    }
  },

  setSelectedStream: (stream) => set({ selectedStream: stream }),
}));
