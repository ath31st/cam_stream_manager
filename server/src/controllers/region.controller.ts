import { Request, Response } from 'express';
import { RegionService } from '../services/region.service';
import { NewRegionDto, UpdateRegionDto } from '@shared/types';
import { toRegionDto, toRegionDtos } from '../mappers/region.mapper';

export class RegionController {
  private regionService: RegionService;

  constructor(regionService: RegionService) {
    this.regionService = regionService;
  }

  getRegion = async (req: Request, res: Response) => {
    try {
      const regionId = Number(req.params.id);
      const region = await this.regionService.getRegion(regionId);
      const regionDto = toRegionDto(region);
      res.status(200).json(regionDto);
    } catch (error) {
      if (error instanceof Error) {
        res
          .status(404)
          .json({ message: 'Region not found', error: error.message });
      } else {
        res.status(500).json({
          message: 'Failed to get region',
          error: 'Unknown error occurred',
        });
      }
    }
  };

  getAllRegions = async (req: Request, res: Response) => {
    try {
      const regions = await this.regionService.getAllRegions();
      const regionsDto = toRegionDtos(regions);
      res.status(200).json(regionsDto);
    } catch (error) {
      if (error instanceof Error) {
        res.status(404).json({
          message: 'Failed to retrieve regions',
          error: error.message,
        });
      } else {
        res.status(500).json({
          message: 'Failed to retrieve regions',
          error: 'Unknown error occurred',
        });
      }
    }
  };

  createRegion = async (req: Request, res: Response) => {
    try {
      const dto: NewRegionDto = req.body;
      await this.regionService.createRegion(dto);
      res.status(201).json({ message: 'Region created successfully' });
    } catch (error) {
      if (error instanceof Error) {
        res
          .status(400)
          .json({ message: 'Failed to create region', error: error.message });
      } else {
        res.status(500).json({
          message: 'Failed to create region',
          error: 'Unknown error occurred',
        });
      }
    }
  };

  updateRegion = async (req: Request, res: Response) => {
    try {
      const dto: UpdateRegionDto = { id: Number(req.params.id), ...req.body };
      await this.regionService.updateRegion(dto);
      res.status(200).json({ message: 'Region updated successfully' });
    } catch (error) {
      if (error instanceof Error) {
        res
          .status(400)
          .json({ message: 'Failed to update region', error: error.message });
      } else {
        res.status(500).json({
          message: 'Failed to update region',
          error: 'Unknown error occurred',
        });
      }
    }
  };

  deleteRegion = async (req: Request, res: Response) => {
    try {
      const regionId = Number(req.params.id);
      await this.regionService.deleteRegion(regionId);
      res.status(200).json({ message: 'Region deleted successfully' });
    } catch (error) {
      if (error instanceof Error) {
        res
          .status(400)
          .json({ message: 'Failed to delete region', error: error.message });
      } else {
        res.status(500).json({
          message: 'Failed to delete region',
          error: 'Unknown error occurred',
        });
      }
    }
  };
}
