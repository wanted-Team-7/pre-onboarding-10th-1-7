import { useNavigate } from "react-router-dom";
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
  useEffect(() => {
    if (withAuth && !isToken) {
      navigate("/signin");
    } else if (
      !withAuth &&
      isToken &&
      (children.type.name === "SignIn" || children.type.name === "SignUp")
    ) {
      navigate("/todo");
    }
  }, [isToken, withAuth, navigate]);

  return (
    <>
      <Header />
      <section>{children}</section>
    </>
  );
};
export default GeneralLayout;
