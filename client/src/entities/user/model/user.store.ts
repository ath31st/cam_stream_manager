import { create } from 'zustand';
import { AxiosError } from 'axios';
import { getStreamErrorMessage, unknownError } from '../../../shared/errors';
import {
  NewUser,
  UpdateUser,
  UpdateUserPassword,
  User,
} from '../../../shared/types';
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
  fetchAllUsers: () => Promise<void>;
  fetchUserById: (id: number) => Promise<void>;
  addUser: (user: NewUser) => Promise<void>;
  updateUser: (id: number, user: UpdateUser) => Promise<void>;
  changeUserPassword: (updateUserPassword: UpdateUserPassword) => Promise<void>;
  removeUser: (id: number) => Promise<void>;
  handleError: (error: unknown) => void;
  clearError: () => void;
}

export const useUserStore = create<UserState>((set) => ({
  users: [],
  selectedUser: null,
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

  clearError: () => set({ error: null }),

  fetchAllUsers: async () => {
    set({ loading: true });
    try {
      const users = await fetchUsers();
      set({ users, loading: false });
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
      set((state) => ({
        users: state.users.filter((u) => u.id !== id),
      }));
    } catch (error: unknown) {
      useUserStore.getState().handleError(error);
    }
  },
}));
