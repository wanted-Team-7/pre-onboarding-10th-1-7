import { ERROR_MESSAGE } from '../constants';

export const validateEmail = (email: string): [boolean, string | null] => {
  const isValid = email.trim().includes('@');
  return [isValid, isValid ? null : ERROR_MESSAGE.EMAIL];
};

export const validatePassword = (password: string): [boolean, string | null] => {
  const isValid = password.trim().length >= 8;
  return [isValid, isValid ? null : ERROR_MESSAGE.PASSWORD];
};

export const isInputValid = (value: string | undefined | null) => {
  return !value || value.trim().length === 0;
};
