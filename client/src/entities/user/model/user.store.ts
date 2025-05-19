import { AxiosError } from 'axios';
import { create } from 'zustand';
import type {
  NewUser,
  Page,
  UpdateUser,
  UpdateUserPassword,
  User,
} from '../../../shared/api.types';
import { getStreamErrorMessage, unknownError } from '../../../shared/errors';
import {
  createUser,
  deleteUser,
  fetchUser,
  fetchUsers,
  updateUser,
  updateUserPassword,
} from '../api/user.api';

interface UserState {
  users: User[];
  loading: boolean;
  error: string | null;
  selectedUser: User | null;
  currentPage: number;
  pageSize: number;
  totalItems: number;
  totalPages: number;
  fetchPageUsers: (
    pageNumber?: number,
    pageSize?: number,
    searchTerm?: string,
  ) => Promise<void>;
  fetchUserById: (id: number) => Promise<void>;
  addUser: (user: NewUser) => Promise<void>;
  updateUser: (id: number, user: UpdateUser) => Promise<void>;
  changeUserPassword: (updateUserPassword: UpdateUserPassword) => Promise<void>;
  removeUser: (id: number) => Promise<void>;
  handleError: (error: unknown) => void;
  clearError: () => void;
  resetStore: () => void;
}

export const useUserStore = create<UserState>((set) => ({
  users: [],
  selectedUser: null,
  loading: false,
  error: null,
  currentPage: 1,
  pageSize: 5,
  totalItems: 0,
  totalPages: 0,

  handleError: (error: unknown) => {
    if (error instanceof AxiosError) {
      const statusCode = error.response?.status;
      const message = getStreamErrorMessage(statusCode as number);
      set({ error: message });
    } else {
      set({ error: unknownError });
    }
  },

  clearError: () => set({ error: null }),

  fetchPageUsers: async (
    pageNumber?: number,
    pageSize?: number,
    searchTerm?: string,
  ) => {
    set({ loading: true });
    try {
      const pageUsers: Page<User> = await fetchUsers(
        pageNumber,
        pageSize,
        searchTerm,
      );

      set({
        users: pageUsers.items,
        totalItems: pageUsers.totalItems,
        totalPages: pageUsers.totalPages,
        currentPage: pageUsers.currentPage,
        pageSize: pageUsers.pageSize,
        loading: false,
      });
    } catch (error: unknown) {
      set({ loading: false });
      useUserStore.getState().handleError(error);
    }
  },

  fetchUserById: async (id: number) => {
    set({ loading: true });
    try {
      const user = await fetchUser(id);
      set({ selectedUser: user, loading: false });
    } catch (error: unknown) {
      set({ loading: false });
      useUserStore.getState().handleError(error);
    }
  },

  addUser: async (user: NewUser) => {
    try {
      const createdUser = await createUser(user);
      set((state) => ({ users: [...state.users, createdUser] }));
    } catch (error: unknown) {
      useUserStore.getState().handleError(error);
    }
  },

  updateUser: async (id, user) => {
    try {
      const updatedUser = await updateUser(user);
      set((state) => ({
        users: state.users.map((u) => (u.id === id ? updatedUser : u)),
      }));
    } catch (error: unknown) {
      useUserStore.getState().handleError(error);
    }
  },

  changeUserPassword: async (updatedUserPassword) => {
    try {
      await updateUserPassword(updatedUserPassword);
    } catch (error: unknown) {
      useUserStore.getState().handleError(error);
    }
  },

  removeUser: async (id: number) => {
    try {
      await deleteUser(id);
      const { currentPage, pageSize } = useUserStore.getState();
      useUserStore.getState().fetchPageUsers(currentPage, pageSize);
    } catch (error: unknown) {
      useUserStore.getState().handleError(error);
    }
  },

  resetStore: () => {
    set({
      users: [],
      selectedUser: null,
      loading: false,
      error: null,
      currentPage: 1,
      pageSize: 5,
      totalItems: 0,
      totalPages: 0,
    });
  },
}));
