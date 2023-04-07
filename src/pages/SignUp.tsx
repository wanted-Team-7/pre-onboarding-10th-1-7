import { useState } from "react";
import classes from "./SignUp.module.css";
interface fetchDataType {
  email: string;
  password: string;
}
const SignUp: React.FC = () => {
  const [email, setEmail] = useState("");
  const [emailTouched, setEmailTouched] = useState(false);
  const [emailError, setEmailError] = useState("");

  const [password, setPassword] = useState("");
  const [passwordTouched, setPasswordTouched] = useState(false);
  const [passwordError, setPasswordError] = useState("");

  const emailIsValid = emailTouched && emailError === "";
  const passwordIsValid = passwordTouched && passwordError === "";
  const isValid = emailIsValid && passwordIsValid;

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
      console.log(email, password);
      try {
        const response = await fetch(
          "https://www.pre-onboarding-selection-task.shop/auth/signup",
          {
            method: "POST",
            // headers: {
            //   "Content-Type": "application/json",
            // },
            body: JSON.stringify({
              email: email,
              password: password,
            }),
          }
        );
        if (!response.ok) {
          throw new Error("데이터 송신 중 문제가 발생했습니다.");
        }
        const responseData = await response.json();
        console.log("데이터 전송 완료", responseData);
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
      disabled={!isValid}
    >
      회원가입
    </button>
  );

  return (
    <section className={classes.signup_frame}>
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
        {signUpBtn}
      </form>
    </section>
  );
};
export default SignUp;
