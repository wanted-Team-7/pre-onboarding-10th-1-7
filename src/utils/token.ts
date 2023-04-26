export const setToken = (token: string) => {
  localStorage.setItem('access_token', token);
};

export const getToken = () => {
  const token = localStorage.getItem('access_token');
  if (!token) return null;

  return token;
};

export const removeToken = () => {
  localStorage.removeItem('access_token');
};
