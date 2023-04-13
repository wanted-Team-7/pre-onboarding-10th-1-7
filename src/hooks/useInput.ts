import { useState } from "react";

const useInput = (validator: (inputData: string) => boolean) => {
  const [inputData, setInputData] = useState("");
  const [isTouched, setIsTouched] = useState(false);

  const inputDataValid = validator(inputData);
  const inputInvalid = !inputDataValid && isTouched;

  const inputChangeHandler = (
    event: React.ChangeEvent<HTMLInputElement>
  ): void => {
    setInputData(() => event.target.value);
  };

  const inputDataBlurHandler = () => {
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
