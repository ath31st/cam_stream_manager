import { Region } from '@prisma/client';
import { RegionRepository } from '../repositories/region.repository';
import { NewRegionDto, UpdateRegionDto } from '../types/types';

export class RegionService {
  private regionRepository: RegionRepository;

  constructor(regionRepository: RegionRepository) {
    this.regionRepository = regionRepository;
  }

  getRegion = async (id: number): Promise<Region> => {
    try {
      return await this.regionRepository.findRegion(id);
    } catch (error) {
      console.error(`Error finding region with id ${id}:`, error);
      throw new Error('Region not found');
    }
  };

  getAllRegions = async (): Promise<Region[]> => {
    try {
      return await this.regionRepository.findAllRegions();
    } catch (error) {
      console.error('Error getting regions:', error);
      throw new Error('Cannot get all regions');
    }
  };

  createRegion = async (dto: NewRegionDto) => {
    try {
      await this.regionRepository.createRegion(dto);
    } catch (error) {
      console.error('Error creating region:', error);
      throw new Error('Could not create region');
    }
  };

  updateRegion = async (dto: UpdateRegionDto) => {
    try {
      await this.regionRepository.updateRegion(dto);
    } catch (error) {
      console.error('Error updating region:', error);
      throw new Error('Could not update region');
    }
  };

  deleteRegion = async (regionId: number) => {
    try {
      await this.regionRepository.deleteRegion(regionId);
    } catch (error) {
      console.error('Error deleting region:', error);
      throw new Error('Could not delete region');
    }
  };
}
