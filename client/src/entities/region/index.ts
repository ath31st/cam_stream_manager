import { RegionDto, NewRegionDto, UpdateRegionDto } from '@shared/types';
import AddRegionModal from './ui/AddRegionModal';
import DeleteRegionModal from './ui/DeleteRegionModal';
import UpdateRegionModal from './ui/UpdateRegionModal';
import RegionCard from './ui/RegionCard';
import {
  fetchRegions,
  fetchRegion,
  createRegion,
  updateRegion,
  deleteRegion,
} from './api/region.api';

export type Region = RegionDto;
export type NewRegion = NewRegionDto;
export type UpdateRegion = UpdateRegionDto;

export { fetchRegions, fetchRegion, createRegion, updateRegion, deleteRegion };
export { AddRegionModal, DeleteRegionModal, UpdateRegionModal, RegionCard };
