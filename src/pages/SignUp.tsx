import { useNavigate } from 'react-router-dom';
import classes from './SignUp.module.css';
import { signup } from '../api/authApi';
import { validateEmail, validatePassword } from '../utils/validator';
import useInput from '../hooks/useInput';

const SignUp = () => {
  const navigate = useNavigate();
  const {
    inputData: email,
    inputDataValid: emailValid,
    inputInvalid: emailInputInvalid,
    inputChangeHandler: emailChangeHandler,
    inputDataBlurHandler: emailBlurHandler,
  } = useInput(validateEmail);

  const {
    inputData: password,
    inputDataValid: passwordValid,
    inputInvalid: passwordInputInvalid,
    inputChangeHandler: passwordChangeHandler,
    inputDataBlurHandler: passwordBlurHandler,
  } = useInput(validatePassword);

  const inputDataSubmitHandler = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    if (!emailValid || !passwordValid) return;

    const { success, error } = await signup({ email, password });
    if (success) {
      alert('회원 가입을 축하드립니다.');
      navigate('/signin');
    } else {
      alert(error);
    }
  };

  const signUpBtn = (
    <button
      type='button'
      data-testid='signup-button'
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
        <label htmlFor='email'>Email address</label>
        <input
          type='text'
          id='email'
          value={email}
          data-testid='email-input'
          onChange={emailChangeHandler}
          onBlur={emailBlurHandler}
        />
        {emailInputInvalid && (
          <div className={classes.errors}>
            공백없이 @를 포함한 올바른 이메일 주소를 입력해주세요.
          </div>
        )}
        <label htmlFor='password'>Password</label>
        <input
          type='text'
          id='password'
          value={password}
          data-testid='password-input'
          onChange={passwordChangeHandler}
          onBlur={passwordBlurHandler}
        />
        {passwordInputInvalid && (
          <div className={classes.errors}>공백없이 8글자 이상의 비밀번호를 입력해주세요.</div>
        )}
        {signUpBtn}
      </form>
    </section>
  );
};
export default SignUp;
