import { useLocation, useNavigate } from "react-router-dom";
import Header from "../components/Header";
import { getToken } from "../utils/token";
import { useEffect } from "react";

interface GeneralLayoutProps {
  children: React.ReactNode;
  withAuth?: boolean;
}

const GeneralLayout: React.FC<GeneralLayoutProps> = ({
  withAuth,
  children,
}: any) => {
  const isToken = getToken();
  const navigate = useNavigate();
  const location = useLocation();

  useEffect(() => {
    if (withAuth && !isToken) {
      navigate("/signin");
    } else if (
      (location.pathname === "/signin" || location.pathname === "/signup") &&
      isToken
    ) {
      navigate("/todo");
    }
  }, [isToken, withAuth, children.type.name, navigate]);

  return (
    <>
      <Header />
      <section>{children}</section>
    </>
  );
};
export default GeneralLayout;
