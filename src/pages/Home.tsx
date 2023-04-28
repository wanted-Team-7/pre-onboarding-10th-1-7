import PageContent from '../components/PageContent';
import { PATH_URL } from '../constants';
import classes from './Home.module.css';
import { Link } from 'react-router-dom';

const Home = () => {
  const title = '원티드 프리온보딩 프론트엔드 인턴십';

  return (
    <PageContent title={title}>
      <ul className={classes.button_frame}>
        <Link to={PATH_URL.TODO} className={classes.link}>
          할 일
        </Link>
        <Link to={PATH_URL.SIGNUP} className={classes.link}>
          회원가입
        </Link>
        <Link to={PATH_URL.SIGNIN} className={classes.link}>
          로그인
        </Link>
      </ul>
    </PageContent>
  );
};
export default Home;
