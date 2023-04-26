import classes from './Header.module.css';
import { Link, useNavigate } from 'react-router-dom';
import { getToken, removeToken } from '../utils/token';

const Header = () => {
  const isToken = getToken();
  const navigate = useNavigate();

  const logoutHandler = () => {
    removeToken();
    alert('로그아웃 되었습니다.');
    navigate('/');
  };
  const headerContent = isToken ? (
    <ul>
      <Link to='/todo' className={classes.link}>
        할 일
      </Link>
      <div className={classes.link} onClick={logoutHandler}>
        로그아웃
      </div>
    </ul>
  ) : (
    <ul>
      <Link to='/todo' className={classes.link}>
        할 일
      </Link>
      <Link to='/signup' className={classes.link}>
        회원가입
      </Link>
      <Link to='/signin' className={classes.link}>
        로그인
      </Link>
    </ul>
  );

  return (
    <header className={classes.headers}>
      <div className={classes['header-content']}>
        <Link to='/' className={classes.logo}>
          Todos
        </Link>
        {headerContent}
      </div>
    </header>
  );
};
export default Header;
