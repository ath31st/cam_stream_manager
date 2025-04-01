import type { NewPlaylistDto, UpdatePlaylistDto } from '@shared/types';
import Joi from 'joi';

export const newPlaylistSchema = Joi.object<NewPlaylistDto>({
  name: Joi.string().min(2).max(30).required(),
  groupIds: Joi.array().items(Joi.number().integer()).required(),
});

export const updatePlaylistSchema = Joi.object<UpdatePlaylistDto>({
  id: Joi.number().integer().required(),
  name: Joi.string().min(2).max(30).required(),
  isVisible: Joi.boolean().required(),
  groupIds: Joi.array().items(Joi.number().integer()).required(),
});
