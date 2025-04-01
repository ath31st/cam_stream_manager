import type { NewGroupDto, UpdateGroupDto } from '@shared/types';
import Joi from 'joi';

export const newGroupSchema = Joi.object<NewGroupDto>({
  name: Joi.string().min(2).max(30).required(),
});

export const updateGroupSchema = Joi.object<UpdateGroupDto>({
  id: Joi.number().integer().required(),
  name: Joi.string().min(2).max(30).required(),
});
