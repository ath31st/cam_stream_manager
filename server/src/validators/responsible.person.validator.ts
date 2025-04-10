import type {
  NewResponsiblePersonDto,
  UpdateResponsiblePersonDto,
} from '@shared/types';
import Joi from 'joi';
import { PHONE_NUMBER_PATTERN } from '../utils/constants/string.constants';

export const newResponsiblePersonSchema = Joi.object<NewResponsiblePersonDto>({
  name: Joi.string().max(100).required(),
  phone: Joi.string().pattern(PHONE_NUMBER_PATTERN).required(),
  streamId: Joi.number().integer().required(),
});

export const updateResponsiblePersonSchema =
  Joi.object<UpdateResponsiblePersonDto>({
    id: Joi.number().integer().required(),
    name: Joi.string().max(100).required(),
    phone: Joi.string().pattern(PHONE_NUMBER_PATTERN).required(),
  });
