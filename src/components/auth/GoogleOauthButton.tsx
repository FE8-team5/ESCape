import { useAuth } from '@/contexts/AuthProvider'
import Image from 'next/image'
import { MutableRefObject, useRef } from 'react'
import GoogleIcon from '../../../public/icons/icon_google.svg'
import { useRouter } from 'next/router'

const GOOGLE_CLIENT_ID = process.env.NEXT_PUBLIC_GOOGLE_CLIENT_ID
const REDIRECT_URI = `http://localhost:3000/oauth/google`

const APP_KEY = GOOGLE_CLIENT_ID
const PROVIDER = 'google'

export default function GoogleOauthButton() {
  const googleWrapperRef: MutableRefObject<HTMLButtonElement | null> = useRef(null)
  const { oAuthLogin } = useAuth()
  const router = useRouter()
  const handleGoogleWrapperClick = () => {
    const wrapperContent: HTMLButtonElement | undefined | null =
      googleWrapperRef.current?.querySelector('div[role=button]')
    if (!wrapperContent) return
    wrapperContent.click()
  }
  const handleGoogleClick = () => {
    const width = 480
    const height = 702
    const left = window.screenX + (window.innerWidth - width) / 2
    const top = window.screenY + (window.innerHeight - height) / 2

    const googleOauthUrl = `https://accounts.google.com/o/oauth2/v2/auth?client_id=${GOOGLE_CLIENT_ID}&redirect_uri=${encodeURIComponent(
      REDIRECT_URI,
    )}&response_type=token&scope=openid email profile`

    const googleWindow = window.open(
      googleOauthUrl,
      'Google로 로그인',
      `left=${left},top=${top},width=${width},height=${height}`,
    )

    if (!googleWindow) {
      alert('팝업을 열 수 없습니다. 팝업 차단이 설정되어 있는지 확인해 주세요.')
      return
    }

    const checkPopup = setInterval(async () => {
      try {
        if (googleWindow.closed) {
          clearInterval(checkPopup)
          return
        }

        const popupUrl = googleWindow.location.href
        console.log(popupUrl)
        if (popupUrl.includes('access_token')) {
          const token = new URL(popupUrl).hash.match(/access_token=([^&]*)/)?.[1]
          if (token) {
            googleWindow.close()
            clearInterval(checkPopup)
            const user = await oAuthLogin({ token }, 'google')
            if (!user) {
              router.push(`/oauth/signup/google?token=${token}`)
            }
          }
        }
      } catch (e) {
        // Same-origin policy로 인해 발생할 수 있는 에러 무시
      }
    }, 500)
  }

  return (
    <>
      <button
        type="button"
        title="구글 로그인"
        className="border-solid rounded-full border-brand-black-light"
        onClick={handleGoogleClick}
      >
        <Image width={56} src={GoogleIcon} alt="구글 로고" />
      </button>
      <button className="hidden" ref={googleWrapperRef} onClick={handleGoogleWrapperClick} type="button">
        This button is hidden.
        <div
          id="g_id_onload"
          className="hidden"
          data-client_id={GOOGLE_CLIENT_ID}
          data-context="signin"
          data-ux_mode="popup"
          data-auto_prompt="false"
          data-callback="handleCredentialResponse"
        />
        <div
          className="g_id_signin"
          data-type="standard"
          data-shape="pill"
          data-theme="outline"
          data-text="signin_with"
          data-size="large"
          data-logo_alignment="center"
        />
      </button>
    </>
  )
}
