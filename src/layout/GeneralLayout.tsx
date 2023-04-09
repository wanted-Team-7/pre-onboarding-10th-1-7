import Header from "../components/Header";

interface GeneralLayoutProps {
  children: React.ReactNode;
}

const GeneralLayout: React.FC<GeneralLayoutProps> = ({ children }) => {
  return (
    <>
      <section>{children}</section>
    </>
  );
};
export default GeneralLayout;
