import { AxiosError } from 'axios';
import { create } from 'zustand';
import type { NewPlaylist, Playlist, UpdatePlaylist } from '@/shared/api.types';
import { getPlaylistErrorMessage, unknownError } from '@/shared/errors';
import {
  createPlaylist,
  deletePlaylist,
  fetchPlaylist,
  fetchPlaylists,
  updatePlaylist,
} from '../api/playlist.api';

interface PlaylistState {
  playlists: Playlist[];
  selectedPlaylist: Playlist | null;
  loading: boolean;
  error: string | null;
  fetchAllPlaylists: (isVisible?: boolean) => Promise<void>;
  fetchPlaylistById: (id: number) => Promise<void>;
  addPlaylist: (playlist: NewPlaylist) => Promise<Playlist | null>;
  updatePlaylist: (id: number, playlist: UpdatePlaylist) => Promise<void>;
  removePlaylist: (id: number) => Promise<void>;
  handleError: (error: unknown) => void;
  clearError: () => void;
  resetStore: () => void;
}

export const usePlaylistStore = create<PlaylistState>((set) => ({
  playlists: [],
  selectedPlaylist: null,
  loading: false,
  error: null,

  handleError: (error: unknown) => {
    if (error instanceof AxiosError) {
      const statusCode = error.response?.status;
      const message = getPlaylistErrorMessage(statusCode as number);
      set({ error: message });
    } else {
      set({ error: unknownError });
    }
  },

  fetchAllPlaylists: async (isVisible?: boolean) => {
    set({ loading: true });
    try {
      const playlists = await fetchPlaylists(isVisible);
      set({ playlists, loading: false });
    } catch (error) {
      set({ loading: false });
      usePlaylistStore.getState().handleError(error);
    }
  },

  fetchPlaylistById: async (id: number) => {
    set({ loading: true });
    try {
      const playlist = await fetchPlaylist(id);
      set({ selectedPlaylist: playlist, loading: false });
    } catch (error) {
      set({ loading: false });
      usePlaylistStore.getState().handleError(error);
    }
  },

  addPlaylist: async (playlist: NewPlaylist): Promise<Playlist | null> => {
    try {
      const newPlaylist = await createPlaylist(playlist);
      set((state) => ({ playlists: [...state.playlists, newPlaylist] }));
      return newPlaylist;
    } catch (error) {
      usePlaylistStore.getState().handleError(error);
      return null;
    }
  },

  updatePlaylist: async (id: number, playlist: UpdatePlaylist) => {
    try {
      const updatedPlaylist = await updatePlaylist(id, playlist);
      set((state) => ({
        playlists: state.playlists.map((r) =>
          r.id === id ? updatedPlaylist : r,
        ),
      }));
    } catch (error) {
      usePlaylistStore.getState().handleError(error);
    }
  },

  removePlaylist: async (id: number) => {
    try {
      await deletePlaylist(id);
      set((state) => ({
        playlists: state.playlists.filter((r) => r.id !== id),
      }));
    } catch (error) {
      usePlaylistStore.getState().handleError(error);
    }
  },

  clearError: () => {
    set({ error: null });
  },

  resetStore: () => {
    set({
      playlists: [],
      selectedPlaylist: null,
      loading: false,
      error: null,
    });
  },
}));
