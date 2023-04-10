export const getToken = () => {
  const token = localStorage.getItem("acess_token");
  if (!token) return null;

  return token;
};
