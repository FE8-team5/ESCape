import { useAuth } from '@/contexts/AuthProvider'
import Image from 'next/image'
import { useEffect } from 'react'
import { useRouter } from 'next/router'
import KakaoIcon from '../../../public/icons/icon_kakao.svg'

export default function KakaoOauthButton() {
  const { oAuthLogin } = useAuth()
  const router = useRouter()

  const redirectUri = `http://localhost:3000/oauth/kakao`
  const kakaoOauthUrl = `https://kauth.kakao.com/oauth/authorize?response_type=code&client_id=${process.env.NEXT_PUBLIC_KAKAO_REST_API_KEY}&redirect_uri=${redirectUri}`

  const handleKakaoClick = () => {
    const width = 480
    const height = 702
    const left = window.screenX + (window.innerWidth - width) / 2
    const top = window.screenY + (window.innerHeight - height) / 2

    const kakaoWindow = window.open(
      kakaoOauthUrl,
      'Kakao로 로그인',
      `left=${left},top=${top},width=${width},height=${height}`,
    )

    if (!kakaoWindow) {
      alert('팝업을 열 수 없습니다. 팝업 차단이 설정되어 있는지 확인해 주세요.')
      return
    }
  }

  const handleSubmit = async (token: string) => {
    const oAuthRes = await oAuthLogin({ redirectUri, token }, 'KAKAO')
    if (!oAuthRes) {
      router.push(`/oauth/kakao`)
    }
  }

  const handleAuthCode = () => {
    const token = localStorage.getItem('authCode')
    console.log('토큰:', token)
    if (!token) return
    handleSubmit(token)
  }

  useEffect(() => {
    window.addEventListener('storage', handleAuthCode)

    return () => {
      window.removeEventListener('storage', handleAuthCode)
    }
  }, [])

  return (
    <>
      <button
        type="button"
        title="카카오 로그인"
        className="border-solid rounded-full border-brand-black-light"
        onClick={handleKakaoClick}
      >
        <Image width={56} src={KakaoIcon} alt="카카오 로고" />
      </button>
    </>
  )
}
