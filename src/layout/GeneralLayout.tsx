import Header from "../components/Header";

interface GeneralLayoutProps {
  children: React.ReactNode;
  isAdminPage?: boolean;
}

const GeneralLayout: React.FC<GeneralLayoutProps> = ({
  children,
  isAdminPage,
}) => {
  return (
    <>
      <Header />
      {children}
    </>
  );
};
export default GeneralLayout;
