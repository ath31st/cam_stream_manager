import { create } from 'zustand';
import {
  ResponsiblePerson,
  NewResponsiblePerson,
  UpdateResponsiblePerson,
} from '../../entities/responsible.person';
import {
  fetchResponsiblePerson,
  createResponsiblePerson,
  updateResponsiblePerson,
  deleteResponsiblePerson,
} from '../../entities/responsible.person/api/responsible.person.api';

interface ResponsiblePersonState {
  responsiblePersons: ResponsiblePerson[];
  selectedPerson: ResponsiblePerson | null;
  loading: boolean;
  error: string | null;
  fetchResponsiblePersonById: (id: number) => Promise<void>;
  addResponsiblePerson: (person: NewResponsiblePerson) => Promise<void>;
  editResponsiblePerson: (
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
        if (error instanceof Error) {
          set({ error: error.message, loading: false });
        } else {
          set({ error: 'Unknown error', loading: false });
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
        if (error instanceof Error) {
          set({ error: error.message });
        } else {
          set({ error: 'Unknown error' });
        }
      }
    },

    editResponsiblePerson: async (
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
        if (error instanceof Error) {
          set({ error: error.message });
        } else {
          set({ error: 'Unknown error' });
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
        if (error instanceof Error) {
          set({ error: error.message });
        } else {
          set({ error: 'Unknown error' });
        }
      }
    },
  }),
);