import { RegionDto, NewRegionDto, UpdateRegionDto } from '@shared/types';
import AddRegionModal from './ui/AddRegionModal';
import DeleteRegionModal from './ui/DeleteRegionModal';
import UpdateRegionModal from './ui/UpdateRegionModal';
import {
  fetchRegions,
  fetchRegion,
  createRegion,
  updateRegion,
  deleteRegion,
} from './api/region.api';
import { errorMessages, unknownError } from './lib/error.messages';

export type Region = RegionDto;
export type NewRegion = NewRegionDto;
export type UpdateRegion = UpdateRegionDto;

export { errorMessages, unknownError };
export { fetchRegions, fetchRegion, createRegion, updateRegion, deleteRegion };
export { AddRegionModal, DeleteRegionModal, UpdateRegionModal };
