import { useLocation, useNavigate } from 'react-router-dom';
import Header from '../components/Header';
import { getToken } from '../utils/token';
import { useEffect } from 'react';
import { authRoutes } from '../router';
import { PATH_URL } from '../constants';

interface GeneralLayoutProps {
  children: React.ReactNode;
  withAuth?: boolean;
}

const GeneralLayout: React.FC<GeneralLayoutProps> = ({
  withAuth,
  children,
}: GeneralLayoutProps) => {
  const isToken = getToken();
  const navigate = useNavigate();
  const location = useLocation();

  useEffect(() => {
    if (withAuth && !isToken) {
      navigate(PATH_URL.SIGNIN);
    } else if (isToken && authRoutes.includes(location.pathname)) {
      navigate(PATH_URL.TODO);
    }
  }, [isToken, location.pathname, withAuth, navigate]);

  return (
    <>
      <Header />
      <section>{children}</section>
    </>
  );
};
export default GeneralLayout;
