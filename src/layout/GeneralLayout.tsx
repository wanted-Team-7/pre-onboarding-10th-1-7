import { redirect, useNavigate, useParams } from "react-router-dom";
import Header from "../components/Header";
import { getToken } from "../utils/token";
import { useEffect } from "react";
import Todos from "../pages/Todos";
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
  console.log(children.type.name);
  useEffect(() => {
    if (!isToken && children.type.name === "Todos") {
      navigate("/signin");
    } else if (
      isToken &&
      (children.type.name === "SignIn" || children.type.name === "Signup")
    ) {
      navigate("/todo");
    }
  }, [isToken, navigate]);

  return (
    <>
      <Header />
      <section>{children}</section>
    </>
  );
};
export default GeneralLayout;
