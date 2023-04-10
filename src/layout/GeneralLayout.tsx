import { useNavigate } from "react-router-dom";
import Header from "../components/Header";
import { getToken } from "../utils/getToken";
interface GeneralLayoutProps {
  children: React.ReactNode;
}

const GeneralLayout: React.FC<GeneralLayoutProps> = ({ children }) => {
  const navigate = useNavigate();
  const isToken = getToken();
  return (
    <>
      <section>{children}</section>
    </>
  );
};
export default GeneralLayout;
