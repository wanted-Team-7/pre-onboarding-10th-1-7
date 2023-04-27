import { useState } from 'react';
import { UserInput } from '../types/user';

const useAuthInput = (validator: (inputData: string) => [boolean, string | null]): UserInput => {
  const [inputData, setInputData] = useState('');
  const [isTouched, setIsTouched] = useState(false);

  const [inputDataValid, errorMessage] = validator(inputData);
  const inputInvalid = !inputDataValid && isTouched;

  const inputChangeHandler = (event: React.ChangeEvent<HTMLInputElement>): void => {
    setInputData(() => event.target.value);
  };

  const inputDataBlurHandler = (): void => {
    setIsTouched(true);
  };

  return {
    inputData,
    inputDataValid,
    inputInvalid,
    inputChangeHandler,
    inputDataBlurHandler,
    errorMessage,
  };
};
export default useAuthInput;
