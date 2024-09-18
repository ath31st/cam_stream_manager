import { create } from 'zustand';
import { Region, NewRegion, UpdateRegion } from '../../entities/region';
import {
  fetchRegions,
  fetchRegion,
  createRegion,
  updateRegion,
  deleteRegion,
} from '../../entities/region/api/region.api';

interface RegionState {
  regions: Region[];
  selectedRegion: Region | null;
  loading: boolean;
  error: string | null;
  fetchAllRegions: () => Promise<void>;
  fetchRegionById: (id: number) => Promise<void>;
  addRegion: (region: NewRegion) => Promise<void>;
  editRegion: (id: number, region: UpdateRegion) => Promise<void>;
  removeRegion: (id: number) => Promise<void>;
}

export const useRegionStore = create<RegionState>((set) => ({
  regions: [],
  selectedRegion: null,
  loading: false,
  error: null,

  fetchAllRegions: async () => {
    set({ loading: true });
    try {
      const regions = await fetchRegions();
      set({ regions, loading: false });
    } catch (error: unknown) {
      if (error instanceof Error) {
        set({ error: error.message, loading: false });
      } else {
        set({ error: 'Unknown error', loading: false });
      }
    }
  },

  fetchRegionById: async (id: number) => {
    set({ loading: true });
    try {
      const region = await fetchRegion(id);
      set({ selectedRegion: region, loading: false });
    } catch (error: unknown) {
      if (error instanceof Error) {
        set({ error: error.message, loading: false });
      } else {
        set({ error: 'Unknown error', loading: false });
      }
    }
  },

  addRegion: async (region: NewRegion) => {
    try {
      const newRegion = await createRegion(region);
      set((state) => ({ regions: [...state.regions, newRegion] }));
    } catch (error: unknown) {
      if (error instanceof Error) {
        set({ error: error.message });
      } else {
        set({ error: 'Unknown error' });
      }
    }
  },

  editRegion: async (id: number, region: UpdateRegion) => {
    try {
      const updatedRegion = await updateRegion(id, region);
      set((state) => ({
        regions: state.regions.map((r) => (r.id === id ? updatedRegion : r)),
      }));
    } catch (error: unknown) {
      if (error instanceof Error) {
        set({ error: error.message });
      } else {
        set({ error: 'Unknown error' });
      }
    }
  },

  removeRegion: async (id: number) => {
    try {
      await deleteRegion(id);
      set((state) => ({
        regions: state.regions.filter((r) => r.id !== id),
      }));
    } catch (error: unknown) {
      if (error instanceof Error) {
        set({ error: error.message, loading: false });
      } else {
        set({ error: 'Unknown error', loading: false });
      }
    }
  },
}));
