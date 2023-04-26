import { useNavigate } from 'react-router-dom';
import classes from './SignIn.module.css';
import { signin } from '../api/authApi';
import { validateEmail, validatePassword } from '../utils/validator';
import useInput from '../hooks/useInput';

const SignIn: React.FC = () => {
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

    const { success, error } = await signin({ email, password });
    if (success) {
      alert('로그인에 성공하셨습니다.');
      navigate('/todo');
    } else {
      alert(error);
    }
  };

  const signInBtn = (
    <button
      type='button'
      data-testid='signin-button'
      className={classes.btn}
      disabled={!emailValid || !passwordValid}
    >
      로그인
    </button>
  );

  return (
    <section className={classes.signin_frame}>
      <h1>SignIn</h1>
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
        {signInBtn}
      </form>
    </section>
  );
};
export default SignIn;
