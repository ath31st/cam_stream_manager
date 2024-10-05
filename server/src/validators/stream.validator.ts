import Joi from 'joi';
import { NewStreamDto, UpdateStreamDto } from '@shared/types';

export const newStreamSchema = Joi.object<NewStreamDto>({
  regionId: Joi.number().integer().required(),
  location: Joi.string().min(3).max(100).required(),
  streamUrl: Joi.string().uri().required(),
  comment: Joi.string().max(500).allow(null),
  responsiblePerson: Joi.string().max(100).allow(null),
  responsiblePhone: Joi.string()
    .pattern(/^[0-9]{10}$/)
    .allow(null),
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
  regionId: Joi.number().integer().optional(),
  location: Joi.string().min(3).max(100).optional(),
  isVisible: Joi.boolean().optional(),
  streamUrl: Joi.string().uri().optional(),
  comment: Joi.string().max(500).optional(),
});
