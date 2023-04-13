export interface UserInfo {
  email: string;
  password: string;
}

export interface UserInput {
  inputData: string;
  inputDataValid: boolean;
  inputInvalid: boolean;
  inputChangeHandler: (event: React.ChangeEvent<HTMLInputElement>) => void;
  inputDataBlurHandler: () => void;
}
