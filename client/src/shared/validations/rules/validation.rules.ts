import { FormInstance, Rule, RuleObject } from 'antd/es/form';
import {
  phoneErrorMessage,
  phonePattern,
  urlErrorMessage,
  urlPattern,
} from '../constants/validation.constants';

const getLengthRule = (min: number, max: number) => ({
  min,
  max,
  message: `Длина должна быть от ${min} до ${max} символов`,
});

export const streamNameValidationRules = [
  { required: true, message: 'Введите название потока' },
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

export const playlistNameValidationRules = [
  { required: true, message: 'Введите название плейлиста' },
  getLengthRule(2, 30),
];

export const groupNameValidationRules = [
  { required: true, message: 'Введите название группы' },
  getLengthRule(2, 30),
];

export const rpNameValidationRules = [
  { required: true, message: 'Введите ответственное лицо' },
  getLengthRule(2, 100),
];

export const optionalRpNameValidationRules = [
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

export const optionalPhoneValidationRules = [
  { required: false, message: 'Введите номер телефона' },
  {
    pattern: phonePattern,
    message: phoneErrorMessage,
  },
];

export const usernameValidationRules = [
  { required: true, message: 'Введите имя пользователя' },
  getLengthRule(2, 50),
];

export const emailValidationRules: Rule[] = [
  { required: false, message: 'Введите адрес электронной почты' },
  {
    type: 'email',
    message: 'Введите корректный адрес электронной почты',
  },
];

export const passwordValidationRules = [
  { required: true, message: 'Введите пароль' },
  getLengthRule(6, 100),
];

const passwordMatchRule = (form: FormInstance) => ({
  validator(_: RuleObject, value: string) {
    const password = form.getFieldValue('password');
    if (!value || value === password) {
      return Promise.resolve();
    }
    return Promise.reject(new Error('Пароли не совпадают'));
  },
});

export const confirmPasswordValidationRules = [
  { required: true, message: 'Подтвердите пароль' },
  passwordMatchRule,
];
