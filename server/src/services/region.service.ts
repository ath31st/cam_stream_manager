import { Region } from '@prisma/client';
import { RegionRepository } from '../repositories/region.repository';
import { NewRegionDto, RegionDto, UpdateRegionDto } from '@shared/types';
import { toRegionDto, toRegionDtos } from '../mappers/region.mapper';
import { Logger } from '../utils/logger';

export class RegionService {
  private regionRepository: RegionRepository;

  constructor(regionRepository: RegionRepository) {
    this.regionRepository = regionRepository;
  }

  getRegion = async (id: number): Promise<Region> => {
    try {
      return await this.regionRepository.findRegion(id);
    } catch (error) {
      Logger.error(`Error finding region with id ${id}:`, error);
      throw new Error('Region not found');
    }
  };

  getRegionDto = async (id: number): Promise<RegionDto> => {
    return this.getRegion(id).then(toRegionDto);
  };

  getAllRegions = async (): Promise<Region[]> => {
    try {
      return await this.regionRepository.findAllRegions();
    } catch (error) {
      Logger.error('Error getting regions:', error);
      throw new Error('Cannot get all regions');
    }
  };

  getAllRegionDtos = async (): Promise<RegionDto[]> => {
    return this.getAllRegions().then(toRegionDtos);
  };

  existsRegionByName = async (name: string): Promise<void> => {
    const regionExists = await this.regionRepository.existsRegionByName(name);
    if (regionExists) {
      throw new Error('Region already exists');
    }
  };

  createRegion = async (dto: NewRegionDto): Promise<RegionDto> => {
    try {
      await this.existsRegionByName(dto.name);

      return await this.regionRepository.createRegion(dto).then(toRegionDto);
    } catch (error) {
      Logger.error('Error creating region:', error);
      if (error instanceof Error) {
        throw new Error(error.message);
      }
      throw new Error('Could not create region');
    }
  };

  updateRegion = async (dto: UpdateRegionDto): Promise<RegionDto> => {
    try {
      const region = await this.getRegion(dto.id);
      const regionExists = await this.regionRepository.existsRegionByName(
        dto.name,
      );

      if (regionExists && region.name !== dto.name) {
        throw new Error('Region with this name already exists');
      }

      return await this.regionRepository.updateRegion(dto).then(toRegionDto);
    } catch (error) {
      Logger.error('Error updating region:', error);
      throw new Error('Could not update region');
    }
  };

  deleteRegion = async (regionId: number) => {
    try {
      await this.regionRepository.deleteRegion(regionId);
    } catch (error) {
      Logger.error('Error deleting region:', error);
      throw new Error('Could not delete region');
    }
  };
}
