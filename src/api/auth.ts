import { BASE_URL } from "./const";
import { UserInfo } from "../types/user";

export const signin = async (args: UserInfo) => {
  const signinRes = await fetch(`${BASE_URL}/auth/signin`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({ ...args }),
  });
  return signinRes;
};

export const signup = async (args: UserInfo) => {
  const signupRes = await fetch(`${BASE_URL}/auth/signup`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({ ...args }),
  });
  return signupRes;
};
