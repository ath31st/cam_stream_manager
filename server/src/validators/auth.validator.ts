import { LoginDto } from '@shared/types';
import Joi from 'joi';

export const loginSchema = Joi.object<LoginDto>({
  username: Joi.string().min(3).max(30).required(),
  password: Joi.string().min(4).required(),
});
