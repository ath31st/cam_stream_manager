import { RegionDto, NewRegionDto, UpdateRegionDto } from '@shared/types';
import AddRegionModal from './ui/AddRegionModal';
import DeleteRegionModal from './ui/DeleteRegionModal';

export type Region = RegionDto;
export type NewRegion = NewRegionDto;
export type UpdateRegion = UpdateRegionDto;

export { AddRegionModal, DeleteRegionModal };
