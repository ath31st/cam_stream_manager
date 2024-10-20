import { create } from 'zustand';
import {
  ResponsiblePerson,
  NewResponsiblePerson,
  UpdateResponsiblePerson,
} from '../../entities/responsible.person';
import {
  fetchResponsiblePerson,
  fetchResponsiblePersons,
  fetchResponsiblePersonsByStream,
  createResponsiblePerson,
  updateResponsiblePerson,
  deleteResponsiblePerson,
} from '../../entities/responsible.person';
import { AxiosError } from 'axios';
import { getRpErrorMessage, unknownError } from '../../shared/errors';

interface ResponsiblePersonState {
  responsiblePersons: ResponsiblePerson[];
  responsiblePersonsByStream: ResponsiblePerson[];
  selectedPerson: ResponsiblePerson | null;
  loading: boolean;
  error: string | null;
  fetchResponsiblePersonById: (id: number) => Promise<void>;
  fetchResponsiblePersons: () => Promise<void>;
  fetchResponsiblePersonsByStream: (streamId: number) => Promise<void>;
  addResponsiblePerson: (person: NewResponsiblePerson) => Promise<void>;
  updateResponsiblePerson: (
    id: number,
    person: UpdateResponsiblePerson,
  ) => Promise<void>;
  removeResponsiblePerson: (id: number) => Promise<void>;
  handleError: (error: unknown) => void;
  clearError: () => void;
}

export const useResponsiblePersonStore = create<ResponsiblePersonState>(
  (set) => ({
    responsiblePersons: [],
    responsiblePersonsByStream: [],
    selectedPerson: null,
    loading: false,
    error: null,

    handleError: (error: unknown) => {
      if (error instanceof AxiosError) {
        const statusCode = error.response?.status;
        const message = getRpErrorMessage(statusCode as number);
        set({ error: message });
      } else {
        set({ error: unknownError });
      }
    },

    fetchResponsiblePersonById: async (id: number) => {
      set({ loading: true });
      try {
        const person = await fetchResponsiblePerson(id);
        set({ selectedPerson: person, loading: false });
      } catch (error: unknown) {
        set({ loading: false });
        useResponsiblePersonStore.getState().handleError(error);
      }
    },

    fetchResponsiblePersons: async () => {
      set({ loading: true });
      try {
        const persons = await fetchResponsiblePersons();
        set({ responsiblePersons: persons, loading: false });
      } catch (error: unknown) {
        set({ loading: false });
        useResponsiblePersonStore.getState().handleError(error);
      }
    },

    fetchResponsiblePersonsByStream: async (streamId: number) => {
      try {
        const persons = await fetchResponsiblePersonsByStream(streamId);
        set({ responsiblePersonsByStream: persons });
      } catch (error: unknown) {
        useResponsiblePersonStore.getState().handleError(error);
      }
    },

    addResponsiblePerson: async (person: NewResponsiblePerson) => {
      try {
        const newPerson = await createResponsiblePerson(person);
        set((state) => ({
          responsiblePersons: [...state.responsiblePersons, newPerson],
        }));
      } catch (error: unknown) {
        useResponsiblePersonStore.getState().handleError(error);
      }
    },

    updateResponsiblePerson: async (
      id: number,
      person: UpdateResponsiblePerson,
    ) => {
      try {
        const updatedPerson = await updateResponsiblePerson(id, person);
        set((state) => ({
          responsiblePersons: state.responsiblePersons.map((p) =>
            p.id === id ? updatedPerson : p,
          ),
        }));
      } catch (error: unknown) {
        useResponsiblePersonStore.getState().handleError(error);
      }
    },

    removeResponsiblePerson: async (id: number) => {
      try {
        await deleteResponsiblePerson(id);
        set((state) => ({
          responsiblePersons: state.responsiblePersons.filter(
            (p) => p.id !== id,
          ),
        }));
      } catch (error: unknown) {
        useResponsiblePersonStore.getState().handleError(error);
      }
    },

    clearError: () => {
      set({ error: null });
    },
  }),
);
