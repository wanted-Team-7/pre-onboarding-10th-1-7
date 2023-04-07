import { useState } from "react";
import { useNavigate } from "react-router-dom";
import classes from "./SignIn.module.css";
interface fetchDataType {
  email: string;
  password: string;
}
const SignIn: React.FC = () => {
  const [email, setEmail] = useState("");
  const [emailTouched, setEmailTouched] = useState(false);
  const [emailError, setEmailError] = useState("");

  const [password, setPassword] = useState("");
  const [passwordTouched, setPasswordTouched] = useState(false);
  const [passwordError, setPasswordError] = useState("");

  const emailIsValid = emailTouched && emailError === "";
  const passwordIsValid = passwordTouched && passwordError === "";
  const isValid = emailIsValid && passwordIsValid;
  const navigate = useNavigate();
  const emailChangeHandler = (
    event: React.ChangeEvent<HTMLInputElement>
  ): void => {
    const inputValue = event.target.value;

    setEmail(() => inputValue);
    if (inputValue.trim().includes("@")) {
      setEmail(() => inputValue.trim());
      setEmailError("");
    } else
      setEmailError("공백없이 @를 포함한 올바른 이메일 주소를 입력해주세요.");
  };
  const passwordChangeHandler = (
    event: React.ChangeEvent<HTMLInputElement>
  ): void => {
    const inputValue = event.target.value;
    setPassword(() => inputValue);
    if (inputValue.trim().length >= 8) {
      setPassword(() => inputValue.trim());
      setPasswordError("");
    } else setPasswordError("공백없이 8글자 이상의 비밀번호를 입력해주세요.");
  };
  const emailBlurHandler = () => {
    setEmailTouched(true);
  };
  const passwordBlurHandler = () => {
    setPasswordTouched(true);
  };
  const inputDataSubmitHandler = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    if (!isValid) return;
    const fetchData = async () => {
      try {
        const response = await fetch(
          "https://www.pre-onboarding-selection-task.shop/auth/signin",
          {
            method: "POST",
            headers: {
              "Content-Type": "application/json",
            },
            body: JSON.stringify({
              email,
              password,
            }),
          }
        );
        if (!response.ok) {
          const errorResponse = await response.json();
          throw new Error(errorResponse.message);
        }
        const responseData = await response.json();
        localStorage.setItem("accessToken", responseData.access_token);
        navigate("/");
      } catch (error) {
        console.error("Error", error);
      }
    };
    fetchData();
  };

  const signInBtn = (
    <button
      data-testid="signin-button"
      className={classes.btn}
      disabled={!isValid}
    >
      로그인
    </button>
  );

  return (
    <section className={classes.signin_frame}>
      <form onSubmit={inputDataSubmitHandler} className={classes.form}>
        <label htmlFor="text">Email address</label>
        <input
          type="text"
          value={email}
          data-testid="email-input"
          onChange={emailChangeHandler}
          onBlur={emailBlurHandler}
        />
        {emailTouched && emailError && (
          <div className={classes.errors}>{emailError}</div>
        )}
        <label htmlFor="text">Password</label>
        <input
          type="text"
          value={password}
          data-testid="password-input"
          onChange={passwordChangeHandler}
          onBlur={passwordBlurHandler}
        />
        {passwordTouched && passwordError && (
          <div className={classes.errors}>{passwordError}</div>
        )}
        {signInBtn}
      </form>
    </section>
  );
};
export default SignIn;
