import { AUTH_BASE_URL } from "./const";
import { UserInfo } from "../types/user";
import { setToken } from "../utils/token";

export const signin = async (signinData: UserInfo) => {
  try {
    const response = await fetch(`${AUTH_BASE_URL}/signin`, {
      method: "post",
      headers: {
        "Content-Type": "application/json",
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
    console.error("Error", error);
    return { success: false, error };
  }
};

export const signup = async (signupData: UserInfo) => {
  try {
    const response = await fetch(`${AUTH_BASE_URL}/signup`, {
      method: "post",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(signupData),
    });
    if (!response.ok) {
      const errorResponse = await response.json();
      throw new Error(errorResponse.message);
    }
    return { success: true };
  } catch (error) {
    console.error("Error", error);
    return { success: false, error };
  }
};
