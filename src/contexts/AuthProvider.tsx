import { signIn } from '@/libs/axios/auth/auth'
import oAuthSignIn from '@/libs/axios/oauth/oAuthSignIn'
import OAuthApps from '@/libs/axios/oauth/oAuthApps'
import { OAuthProviders, OAuthSignInForm, SignInForm, SignInReturn, oauthAppsReturn } from '@/dtos/AuthDto'
import { CommonUserTypes } from '@/dtos/UserDto'
import { removeTokens } from '@/utils/authTokenStorage'
import { useRouter } from 'next/router'
import getUser from '@/libs/axios/user/getUser'
import { createContext, ReactNode, useContext, useEffect, useMemo, useState } from 'react'

interface AuthValues {
  user: CommonUserTypes | null
  isPending: boolean
  login: (formData: SignInForm) => Promise<boolean>
  logout: () => void
  oAuthLogin: (formData: OAuthSignInForm, provider: OAuthProviders) => Promise<SignInReturn | null>
  oAuthSignUp: (appKey: string, provider: OAuthProviders) => Promise<oauthAppsReturn | null>
}

type UserValue = CommonUserTypes | null

const INITIAL_CONTEXT_VALUES: AuthValues = {
  user: null,
  isPending: true,
  login: () => Promise.reject(),
  logout: () => {},
  oAuthLogin: () => Promise.reject(),
  oAuthSignUp: () => Promise.reject(),
}

const AuthContext = createContext<AuthValues>(INITIAL_CONTEXT_VALUES)

export function AuthProvider({ children }: { children: ReactNode }) {
  const [authState, setAuthState] = useState<{
    user: UserValue
    isPending: boolean
  }>({
    user: null,
    isPending: true,
  })

  const handleAuthChange = (key: string, value: UserValue | boolean) => {
    setAuthState((prev) => ({
      ...prev,
      [key]: value,
    }))
  }

  const getMe = async () => {
    handleAuthChange('isPending', true)
    let nextUser: UserValue
    try {
      nextUser = await getUser()
    } catch {
      return
    }

    setAuthState({
      user: nextUser,
      isPending: false,
    })
  }

  const login = async (formData: SignInForm) => {
    const isSignInSuccess = await signIn(formData)
    if (!isSignInSuccess) {
      alert('로그인에 실패했습니다. 이메일과 비밀번호를 확인해주세요.')
      return false
    }
    return true
  }

  const oAuthSignUp = async (appKey: string, provider: string) => {
    await OAuthApps(appKey, provider)
  }

  const oAuthLogin = async (formData: OAuthSignInForm, provider: OAuthProviders) => {
    const user = await oAuthSignIn(formData, provider)
    if (!user) return user
    await getMe()
    return user
  }

  const logout = () => {
    handleAuthChange('user', null)
    removeTokens()
    alert('로그아웃이 되었습니다.')
  }

  useEffect(() => {
    if (localStorage.getItem('accessToken')) {
      getMe()
      return
    } else {
      setAuthState({
        user: null,
        isPending: false,
      })
    }
  }, [])

  const providerValueProp = useMemo(
    () => ({
      user: authState.user,
      isPending: authState.isPending,
      login,
      logout,
      oAuthLogin,
      oAuthSignUp,
    }),
    [authState.user, authState.isPending],
  )

  return <AuthContext.Provider value={providerValueProp}>{children}</AuthContext.Provider>
}

export function useAuth(required?: boolean) {
  const context = useContext(AuthContext)
  if (!context) throw new Error('useAuth는 반드시 AuthProvider 노드 안에서 사용돼야 합니다.')

  const router = useRouter()
  useEffect(() => {
    if (required && !context.user && !context.isPending) {
      alert('로그인이 필요한 페이지입니다.')
      router.push('/signin')
    }
  }, [required, context.user, context.isPending])

  return context
}
