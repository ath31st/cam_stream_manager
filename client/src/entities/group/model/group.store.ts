import { Group, NewGroup, UpdateGroup } from '../';
import { AxiosError } from 'axios';
import { getGroupErrorMessage, unknownError } from '../../../shared/errors';
import { create } from 'zustand';
import {
  createGroup,
  deleteGroup,
  fetchGroup,
  fetchGroups,
  updateGroup,
} from '../api/group.api';

interface GroupState {
  groups: Group[];
  selectedGroup: Group | null;
  loading: boolean;
  error: string | null;
  fetchAllGroups: () => Promise<void>;
  fetchGroupById: (id: number) => Promise<void>;
  addGroup: (group: NewGroup) => Promise<void>;
  updateGroup: (id: number, group: UpdateGroup) => Promise<void>;
  removeGroup: (id: number) => Promise<void>;
  handleError: (error: unknown) => void;
  clearError: () => void;
}

export const useGroupStore = create<GroupState>((set) => ({
  groups: [],
  selectedGroup: null,
  loading: false,
  error: null,

  handleError: (error: unknown) => {
    if (error instanceof AxiosError) {
      const statusCode = error.response?.status;
      const message = getGroupErrorMessage(statusCode as number);
      set({ error: message });
    } else {
      set({ error: unknownError });
    }
  },

  clearError: () => {
    set({ error: null });
  },

  fetchAllGroups: async () => {
    set({ loading: true });
    try {
      const groups = await fetchGroups();
      set({ groups, loading: false });
    } catch (error) {
      set({ loading: false });
      useGroupStore.getState().handleError(error);
    }
  },

  fetchGroupById: async (id: number) => {
    set({ loading: true });
    try {
      const group = await fetchGroup(id);
      set({ selectedGroup: group, loading: false });
    } catch (error) {
      set({ loading: false });
      useGroupStore.getState().handleError(error);
    }
  },

  addGroup: async (group: NewGroup) => {
    set({ loading: true });
    try {
      const newGroup = await createGroup(group);
      set((state) => ({
        groups: [...state.groups, newGroup],
        loading: false,
      }));
    } catch (error) {
      set({ loading: false });
      useGroupStore.getState().handleError(error);
    }
  },

  updateGroup: async (id: number, group: UpdateGroup) => {
    set({ loading: true });
    try {
      const updatedGroup = await updateGroup(id, group);
      set((state) => ({
        groups: state.groups.map((g) => (g.id === id ? updatedGroup : g)),
        loading: false,
      }));
    } catch (error) {
      set({ loading: false });
      useGroupStore.getState().handleError(error);
    }
  },

  removeGroup: async (id: number) => {
    set({ loading: true });
    try {
      await deleteGroup(id);
      set((state) => ({
        groups: state.groups.filter((g) => g.id !== id),
        loading: false,
      }));
    } catch (error) {
      set({ loading: false });
      useGroupStore.getState().handleError(error);
    }
  },
}));
