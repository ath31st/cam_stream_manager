import Joi from 'joi';
import { NewRegionDto, UpdateRegionDto } from '@shared/types';

export const newRegionSchema = Joi.object<NewRegionDto>({
  name: Joi.string().min(2).max(30).required(),
});

export const updateRegionSchema = Joi.object<UpdateRegionDto>({
  id: Joi.number().integer().required(),
  name: Joi.string().min(2).max(30).required(),
  isVisible: Joi.boolean().required(),
});
