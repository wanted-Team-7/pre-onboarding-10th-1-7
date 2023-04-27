export const validateEmail = (email: string) => {
  return email.trim().includes('@');
};

export const validatePassword = (password: string) => {
  return password.trim().length >= 8;
};

export const isInputValid = (value: string | undefined | null) => {
  return !value || value.trim().length === 0;
};
