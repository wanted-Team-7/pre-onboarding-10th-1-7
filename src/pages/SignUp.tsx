import { useState } from "react";
const SignUp = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [emailError, setEmailError] = useState(false);
  const [passwordError, setPasswordError] = useState(false);

  const inputEmailChangeHandler = (
    e: React.ChangeEvent<HTMLInputElement>
  ): void => {
    if (e.target.value.trim().includes("@")) {
      setEmail(() => e.target.value.trim());
    }
    return;
  };
  const inputPasswordChangeHandler = (
    event: React.ChangeEvent<HTMLInputElement>
  ): void => {
    if (event.target.value.trim().length >= 8) {
      setEmail(() => event.target.value.trim());
    }
    return;
  };
  const inputDataSubmitHandler = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
  };
  const isValid = emailError && passwordError;
  return (
    <form onSubmit={inputDataSubmitHandler}>
      <input
        type="text"
        data-testid="email-input"
        onChange={inputEmailChangeHandler}
      />
      <input
        type="text"
        data-testid="password-input"
        onChange={inputPasswordChangeHandler}
      />
      {isValid ? (
        <button data-testid="signin-button">회원가입</button>
      ) : (
        <button data-testid="signin-button" disabled>
          회원가입
        </button>
      )}
    </form>
  );
};
export default SignUp;
