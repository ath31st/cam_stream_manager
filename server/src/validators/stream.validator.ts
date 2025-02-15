import Joi from 'joi';
import { NewStreamDto, UpdateStreamDto } from '@shared/types';
import { PHONE_NUMBER_PATTERN } from '../utils/constants/string.constants';

export const newStreamSchema = Joi.object<NewStreamDto>({
  playlistId: Joi.number().integer().required(),
  name: Joi.string().min(3).max(100).required(),
  streamUrl: Joi.string().uri().required(),
  comment: Joi.string().max(500).allow(null),
  responsiblePerson: Joi.string().max(100).allow(null),
  responsiblePhone: Joi.string().pattern(PHONE_NUMBER_PATTERN).allow(null),
}).custom((value, helpers) => {
  const { responsiblePerson, responsiblePhone } = value;

  const isPersonFilled =
    responsiblePerson !== null &&
    responsiblePerson !== undefined &&
    responsiblePerson !== '';
  const isPhoneFilled =
    responsiblePhone !== null &&
    responsiblePhone !== undefined &&
    responsiblePhone !== '';

  if (isPersonFilled !== isPhoneFilled) {
    return helpers.error('any.only', {
      message:
        'Both responsiblePerson and responsiblePhone must be filled or both must be null.',
    });
  }

  return value;
});

export const updateStreamSchema = Joi.object<UpdateStreamDto>({
  id: Joi.number().integer().required(),
  playlistId: Joi.number().integer().required(),
  name: Joi.string().min(3).max(100).required(),
  isVisible: Joi.boolean().required(),
  streamUrl: Joi.string().uri().required(),
  comment: Joi.string().max(500).allow(null).required(),
});
