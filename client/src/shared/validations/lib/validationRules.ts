import {
  phoneErrorMessage,
  phonePattern,
  urlErrorMessage,
  urlPattern,
} from '../constants/validationConstants';

const getLengthRule = (min: number, max: number) => ({
  min,
  max,
  message: `Длина должна быть от ${min} до ${max} символов`,
});

export const streamLocationValidationRules = [
  { required: true, message: 'Введите местоположение потока' },
  getLengthRule(3, 100),
];

export const streamUrlValidationRules = [
  { required: true, message: 'Введите URL потока' },
  getLengthRule(1, 1000),
  {
    pattern: urlPattern,
    message: urlErrorMessage,
  },
];

export const streamCommentValidationRules = [
  { required: false, message: 'Комментарии (необязательно)' },
  getLengthRule(0, 500),
];

export const regionNameValidationRules = [
  { required: true, message: 'Введите название региона' },
  getLengthRule(2, 30),
];

export const rpNameValidationRules = [
  { required: true, message: 'Введите ответственное лицо' },
  getLengthRule(2, 100),
];

export const optioanalRpNameValidationRules = [
  { required: false, message: 'Введите ответственное лицо' },
  getLengthRule(2, 100),
];

export const phoneValidationRules = [
  { required: true, message: 'Введите номер телефона' },
  {
    pattern: phonePattern,
    message: phoneErrorMessage,
  },
];

export const optioanalPhoneValidationRules = [
  { required: false, message: 'Введите номер телефона' },
  {
    pattern: phonePattern,
    message: phoneErrorMessage,
  },
];
