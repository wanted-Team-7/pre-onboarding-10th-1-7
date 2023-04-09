import classes from "./Header.module.css";
import { Link } from "react-router-dom";

const Header: React.FC = (props) => {
  return (
    <header className={classes.headers}>
      <div className={classes["header-content"]}>
        <Link to="/" className={classes.logo}>
          Todos
        </Link>
        <ul>
          <Link to="/todos" className={classes.link}>
            할 일{" "}
          </Link>
          <Link to="/signup" className={classes.link}>
            회원가입
          </Link>
          <Link to="/signin" className={classes.link}>
            로그인
          </Link>
        </ul>
      </div>
    </header>
  );
};
export default Header;
