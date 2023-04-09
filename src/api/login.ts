import { BASE_URL } from "./const";

export interface SigninRequest {
  email: string;
  password: string;
}
export const signin = async (args: SigninRequest) => {
  const signinRes = await fetch(`${BASE_URL}/auth/signin`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(args),
  });
  return signinRes.ok ? "success" : "fail";
};
