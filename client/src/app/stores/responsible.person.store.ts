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
}

export const useResponsiblePersonStore = create<ResponsiblePersonState>(
  (set) => ({
    responsiblePersons: [],
    selectedPerson: null,
    loading: false,
    error: null,

    fetchResponsiblePersonById: async (id: number) => {
      set({ loading: true });
      try {
        const person = await fetchResponsiblePerson(id);
        set({ selectedPerson: person, loading: false });
      } catch (error: unknown) {
        if (error instanceof AxiosError) {
          const statusCode = error.response?.status;
          const message = getRpErrorMessage(statusCode as number);
          set({ error: message, loading: false });
        } else {
          set({ error: unknownError, loading: false });
        }
      }
    },

    fetchResponsiblePersons: async () => {
      try {
        const persons = await fetchResponsiblePersons();
        set({ responsiblePersons: persons });
      } catch (error: unknown) {
        if (error instanceof AxiosError) {
          const statusCode = error.response?.status;
          const message = getRpErrorMessage(statusCode as number);
          set({ error: message });
        } else {
          set({ error: unknownError });
        }
      }
    },

    fetchResponsiblePersonsByStream: async (streamId: number) => {
      try {
        const persons = await fetchResponsiblePersonsByStream(streamId);
        set({ responsiblePersons: persons });
      } catch (error: unknown) {
        if (error instanceof AxiosError) {
          const statusCode = error.response?.status;
          const message = getRpErrorMessage(statusCode as number);
          set({ error: message });
        } else {
          set({ error: unknownError });
        }
      }
    },

    addResponsiblePerson: async (person: NewResponsiblePerson) => {
      try {
        const newPerson = await createResponsiblePerson(person);
        set((state) => ({
          responsiblePersons: [...state.responsiblePersons, newPerson],
        }));
      } catch (error: unknown) {
        if (error instanceof AxiosError) {
          const statusCode = error.response?.status;
          const message = getRpErrorMessage(statusCode as number);
          set({ error: message });
        } else {
          set({ error: unknownError });
        }
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
        if (error instanceof AxiosError) {
          const statusCode = error.response?.status;
          const message = getRpErrorMessage(statusCode as number);
          set({ error: message });
        } else {
          set({ error: unknownError });
        }
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
        if (error instanceof AxiosError) {
          const statusCode = error.response?.status;
          const message = getRpErrorMessage(statusCode as number);
          set({ error: message });
        } else {
          set({ error: unknownError });
        }
      }
    },
  }),
);
