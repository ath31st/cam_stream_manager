import type {
  NewUserDto,
  UpdateUserDto,
  UpdateUserPasswordDto,
} from '@shared/types';
import Joi from 'joi';

export const newUserSchema = Joi.object<NewUserDto>({
  username: Joi.string().min(3).max(30).required(),
  password: Joi.string().min(4).required(),
  email: Joi.string().email().optional(),
  role: Joi.string().valid('USER', 'ADMIN').required(),
  groupIds: Joi.array().items(Joi.number().integer()).required(),
});

export const updateUserSchema = Joi.object<UpdateUserDto>({
  id: Joi.number().integer().required(),
  username: Joi.string().min(3).max(30).optional(),
  email: Joi.string().email().allow(null).optional(),
  role: Joi.string().valid('USER', 'ADMIN').required(),
  isLocked: Joi.boolean().required(),
  groupIds: Joi.array().items(Joi.number().integer()).required(),
});

export const updateUserPasswordSchema = Joi.object<UpdateUserPasswordDto>({
  id: Joi.number().integer().required(),
  oldPassword: Joi.string().min(4).required(),
  newPassword: Joi.string().min(4).required(),
});
