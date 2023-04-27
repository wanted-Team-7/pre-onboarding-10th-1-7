import { UserInfo } from '../types/user';
import { setToken } from '../utils/token';
import { BASE_URL, PATH_URL } from '../constants';

export const signin = async (signinData: UserInfo) => {
  try {
    const response = await fetch(`${BASE_URL}${PATH_URL.AUTH}${PATH_URL.SIGNIN}`, {
      method: 'post',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(signinData),
    });
    if (!response.ok) {
      const errorResponse = await response.json();
      throw new Error(errorResponse.message);
    }
    const responseData = await response.json();
    setToken(responseData.access_token);
    return { success: true };
  } catch (error) {
    console.error('Error', error);
    return { success: false, error };
  }
};

export const signup = async (signupData: UserInfo) => {
  try {
    const response = await fetch(`${BASE_URL}${PATH_URL.AUTH}${PATH_URL.SIGNIN}`, {
      method: 'post',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(signupData),
    });
    if (!response.ok) {
      const errorResponse = await response.json();
      throw new Error(errorResponse.message);
    }
    return { success: true };
  } catch (error) {
    console.error('Error', error);
    return { success: false, error };
  }
};
