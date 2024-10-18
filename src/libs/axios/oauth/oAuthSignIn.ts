import { AxiosError } from "axios";
import { OAuthProviders, OAuthSignInForm, SignInReturn } from "@/dtos/AuthDto";
import { saveTokens } from "@/utils/authTokenStorage";
import axios from "../axiosInstance";

export default async function oAuthSignIn(
  formData: OAuthSignInForm,
  provider: OAuthProviders
) {
  const path = `auth/signIn/${provider}`;
  const res = await axios.post(path, formData).catch((e: AxiosError) => {
    console.error(e.response);
    return null;
  });

  const result: SignInReturn | null = res ? (res.data as SignInReturn) : null;
  if (!result) return result;

  const { accessToken } = result;
  saveTokens({ accessToken });
  return result;
}
