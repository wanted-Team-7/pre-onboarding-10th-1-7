import { getToken } from '../utils/token';

export const fetchClient = (url: string, options: RequestInit): Promise<Response> => {
  const accessToken = getToken();
  if (accessToken) {
    const newOptions = {
      ...options,
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${accessToken}`,
      },
    };
    return fetch(url, newOptions);
  }
  const newOptions = {
    ...options,
    headers: {
      'Content-Type': 'application/json',
    },
  };
  return fetch(url, newOptions);
};
