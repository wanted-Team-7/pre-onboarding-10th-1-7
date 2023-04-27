const ERROR_MESSAGE = {
  EMAIL: '공백없이 @를 포함한 올바른 이메일 주소를 입력해주세요.',
  PASSWORD: '공백없이 8글자 이상의 비밀번호를 입력해주세요.',
};

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
