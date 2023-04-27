import { useNavigate } from 'react-router-dom';
import classes from './SignIn.module.css';
import { signin } from '../api/authApi';
import { validateEmail, validatePassword } from '../utils/validator';
import useAuthInput from '../hooks/useInput';

const SignIn: React.FC = () => {
  const navigate = useNavigate();
  const {
    inputData: email,
    inputDataValid: emailValid,
    inputInvalid: emailInputInvalid,
    inputChangeHandler: emailChangeHandler,
    inputDataBlurHandler: emailBlurHandler,
    errorMessage: emailErrorMessage,
  } = useAuthInput(validateEmail);

  const {
    inputData: password,
    inputDataValid: passwordValid,
    inputInvalid: passwordInputInvalid,
    inputChangeHandler: passwordChangeHandler,
    inputDataBlurHandler: passwordBlurHandler,
    errorMessage: passwordErrorMessage,
  } = useAuthInput(validatePassword);

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
        {emailInputInvalid && <div className={classes.errors}>{emailErrorMessage}</div>}
        <label htmlFor='password'>Password</label>
        <input
          type='text'
          id='password'
          value={password}
          data-testid='password-input'
          onChange={passwordChangeHandler}
          onBlur={passwordBlurHandler}
        />
        {passwordInputInvalid && <div className={classes.errors}>{passwordErrorMessage}</div>}
        {signInBtn}
      </form>
    </section>
  );
};
export default SignIn;
