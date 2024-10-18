import { AxiosError } from "axios";
import { OAuthSignInForm, SignInReturn } from "@/dtos/AuthDto";
import { saveTokens } from "@/utils/authTokenStorage";
import axios from "../axiosInstance";

export default async function oAuthSignUp(
  nickname: string,
  redirectUri: string,
  token: string
) {
  const path = `auth/signUp/${provider}`;
  const formData: OAuthSignInForm = {
    nickname,
    redirectUri,
    token,
  };

  try {
    const response = await axios.post(path, formData);
    const result: SignInReturn = response.data;

    if (!result || !result.accessToken) {
      throw new Error("회원가입 실패: 유효하지 않은 응답입니다.");
    }

    saveTokens({ accessToken: result.accessToken });
    return result;
  } catch (error) {
    if (error instanceof AxiosError) {
      console.error("API 호출 중 오류 발생:", error.response);
      throw new Error("회원가입 중 문제가 발생했습니다.");
    } else {
      console.error(error);
      throw error;
    }
  }
}
