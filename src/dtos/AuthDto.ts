export type OAuthProviders = "google" | "kakao";

export interface AuthTokens {
  accessToken: string;
}

export interface SignInForm {
  email: string;
  password: string;
}

export interface OAuthSignInForm {
  nickname: string;
  redirectUri?: string;
  token: string;
}
export interface OAuthSignUpForm {
  redirectUri?: string;
  token: string;
}
export interface OAuthApp {
  appKey: string;
  provider: OAuthProviders;
}

export interface SignUpForm {
  email: string;
  nickname: string;
  password: string;
  passwordConfirmation: string;
}

export interface SignInReturn {
  accessToken: string;
  user: {
    id: number;
    email: string;
    nickname: string;
    teamId: string;
    updatedAt: string;
    createdAt: string;
    image: string | null;
    description: "string";
  };
}
