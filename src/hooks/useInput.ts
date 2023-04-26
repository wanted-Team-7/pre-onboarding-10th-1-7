import { useState } from 'react';
import { UserInput } from '../types/user';

const useInput = (validator: (inputData: string) => boolean): UserInput => {
  const [inputData, setInputData] = useState('');
  const [isTouched, setIsTouched] = useState(false);

  const inputDataValid = validator(inputData);
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
  };
};
export default useInput;
