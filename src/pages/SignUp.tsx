import { useState } from "react";
import { useNavigate } from "react-router-dom";
import classes from "./SignUp.module.css";
import { signup } from "../api/authApi";

const SignUp: React.FC = () => {
  const [email, setEmail] = useState("");
  const [emailTouched, setEmailTouched] = useState(false);

  const [password, setPassword] = useState("");
  const [passwordTouched, setPasswordTouched] = useState(false);

  const emailValid = email.trim().includes("@") !== false;
  const emailInputInvalid = !emailValid && emailTouched;

  const passwordValid = password.trim().length >= 8;
  const passwordInputInvalid = !passwordValid && passwordTouched;

  const navigate = useNavigate();
  const emailChangeHandler = (
    event: React.ChangeEvent<HTMLInputElement>
  ): void => {
    setEmail(() => event.target.value);
  };
  const passwordChangeHandler = (
    event: React.ChangeEvent<HTMLInputElement>
  ): void => {
    setPassword(() => event.target.value);
  };
  const emailBlurHandler = () => {
    setEmailTouched(true);
  };
  const passwordBlurHandler = () => {
    setPasswordTouched(true);
  };
  const inputDataSubmitHandler = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    setEmailTouched(true);

    if (!emailValid || !passwordValid) return;

    const fetchData = async () => {
      try {
        const response = await signup({ email, password });
        if (!response.ok) {
          const errorResponse = await response.json();
          throw new Error(errorResponse.message);
        }
        alert("회원 가입을 축하드립니다.");
        navigate("/signin");
      } catch (error) {
        console.error("Error", error);
      }
    };
    fetchData();
  };

  const signUpBtn = (
    <button
      data-testid="signup-button"
      className={classes.btn}
      disabled={!emailValid || !passwordValid}
    >
      회원가입
    </button>
  );

  return (
    <section className={classes.signup_frame}>
      <h1>SignUp</h1>
      <form onSubmit={inputDataSubmitHandler} className={classes.form}>
        <label htmlFor="email">Email address</label>
        <input
          type="text"
          id="email"
          value={email}
          data-testid="email-input"
          onChange={emailChangeHandler}
          onBlur={emailBlurHandler}
        />
        {emailInputInvalid && (
          <div className={classes.errors}>
            "공백없이 @를 포함한 올바른 이메일 주소를 입력해주세요."
          </div>
        )}
        <label htmlFor="password">Password</label>
        <input
          type="text"
          id="password"
          value={password}
          data-testid="password-input"
          onChange={passwordChangeHandler}
          onBlur={passwordBlurHandler}
        />
        {passwordInputInvalid && (
          <div className={classes.errors}>
            "공백없이 8글자 이상의 비밀번호를 입력해주세요."
          </div>
        )}
        {signUpBtn}
      </form>
    </section>
  );
};
export default SignUp;
