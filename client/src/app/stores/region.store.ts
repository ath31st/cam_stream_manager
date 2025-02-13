import { create } from 'zustand';
import { Region, NewRegion, UpdateRegion } from '../../entities/region';
import {
  fetchRegions,
  fetchRegion,
  createRegion,
  updateRegion,
  deleteRegion,
} from '../../entities/region';
import { AxiosError } from 'axios';
import { getRegionErrorMessage, unknownError } from '../../shared/errors';

interface RegionState {
  regions: Region[];
  selectedRegion: Region | null;
  loading: boolean;
  error: string | null;
  fetchAllRegions: (isVisible?: boolean) => Promise<void>;
  fetchRegionById: (id: number) => Promise<void>;
  addRegion: (region: NewRegion) => Promise<Region | null>;
  updateRegion: (id: number, region: UpdateRegion) => Promise<void>;
  removeRegion: (id: number) => Promise<void>;
  handleError: (error: unknown) => void;
  clearError: () => void;
}

export const useRegionStore = create<RegionState>((set) => ({
  regions: [],
  selectedRegion: null,
  loading: false,
  error: null,

  handleError: (error: unknown) => {
    if (error instanceof AxiosError) {
      const statusCode = error.response?.status;
      const message = getRegionErrorMessage(statusCode as number);
      set({ error: message });
    } else {
      set({ error: unknownError });
    }
  },

  fetchAllRegions: async (isVisible?: boolean) => {
    set({ loading: true });
    try {
      const regions = await fetchRegions(isVisible);
      set({ regions, loading: false });
    } catch (error) {
      set({ loading: false });
      useRegionStore.getState().handleError(error);
    }
  },

  fetchRegionById: async (id: number) => {
    set({ loading: true });
    try {
      const region = await fetchRegion(id);
      set({ selectedRegion: region, loading: false });
    } catch (error) {
      set({ loading: false });
      useRegionStore.getState().handleError(error);
    }
  },

  addRegion: async (region: NewRegion): Promise<Region | null> => {
    try {
      const newRegion = await createRegion(region);
      set((state) => ({ regions: [...state.regions, newRegion] }));
      return newRegion;
    } catch (error) {
      useRegionStore.getState().handleError(error);
      return null;
    }
  },

  updateRegion: async (id: number, region: UpdateRegion) => {
    try {
      const updatedRegion = await updateRegion(id, region);
      set((state) => ({
        regions: state.regions.map((r) => (r.id === id ? updatedRegion : r)),
      }));
    } catch (error) {
      useRegionStore.getState().handleError(error);
    }
  },

  removeRegion: async (id: number) => {
    try {
      await deleteRegion(id);
      set((state) => ({
        regions: state.regions.filter((r) => r.id !== id),
      }));
    } catch (error) {
      useRegionStore.getState().handleError(error);
    }
  },

  clearError: () => {
    set({ error: null });
  },
}));
