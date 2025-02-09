import Joi from 'joi';
import { NewGroupDto, UpdateGroupDto } from '@shared/types';

export const newGroupSchema = Joi.object<NewGroupDto>({
  name: Joi.string().min(2).max(30).required(),
});

export const updateGroupSchema = Joi.object<UpdateGroupDto>({
  id: Joi.number().integer().required(),
  name: Joi.string().min(2).max(30).required(),
});
