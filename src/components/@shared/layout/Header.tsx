import Image from 'next/image'
import { PropsWithChildren } from 'react'
import Link from 'next/link'
import iconHamburger from '@icons/icon_hamburger.svg'
import logoBig from '@images/logo.svg'
import iconGlass from '@icons/icon_glass.svg'
import defaultProfileImage from '@images/user_default.svg'
import { useRouter } from 'next/router'
import classNames from 'classnames'
import { useAuth } from '@/contexts/AuthProvider'

export default function Header({ children }: PropsWithChildren) {
  const { user, logout } = useAuth()
  const { pathname } = useRouter()

  const handleLogout = () => {
    logout()
  }

  const handleImageError = (e: React.SyntheticEvent<HTMLImageElement>) => {
    e.currentTarget.src = defaultProfileImage.src
  }

  const isSignPath = pathname.includes('sign')

  return (
    <>
      {!isSignPath && (
        <div className="relative">
          <div className="fixed flex h-[70px] w-full items-center justify-between border-b border-[#252530] bg-body-bg px-5 md:h-[80px] md:px-[30px] xl:h-[100px] xl:px-[120px]">
            <button className="relative h-[11.27px] w-[17px] md:hidden">
              <Image src={iconHamburger} alt="카테고리 보기" fill />
            </button>
            <div className="flex items-center gap-10">
              <Link href="/" className="relative h-[24px] w-[120px] md:h-[28px] md:w-[140px] xl:h-[34px] xl:w-[170px]">
                <Image src={logoBig} alt="로고" width={120} height={24} />
              </Link>
              <Link href="/board" className="hidden md:block">
                자유게시판
              </Link>
            </div>
            <div className="hidden items-center gap-[30px] md:flex">
              <div className="flex h-[50px] w-[300px] items-center gap-1.5 rounded-[28px] bg-[#252530] px-6">
                <Image src={iconGlass} alt="테마검색" width={18.38} height={18.38} className="hidden md:block" />
                <input placeholder="테마를 검색해 보세요" />
              </div>
              {user ? (
                <>
                  <Link href="/mypage" className="flex items-center gap-3">
                    <div className="relative h-[42px] w-[42px] rounded-full overflow-hidden bg-brand-black-light">
                      <Image
                        src={user.image || defaultProfileImage}
                        alt="프로필 이미지"
                        width={42}
                        height={42}
                        onError={handleImageError}
                      />
                    </div>
                    {user.nickname}
                  </Link>
                  <button type="button" className="text-white" onClick={handleLogout}>로그아웃</button>
                </>
              ) : (
                <>
                  <Link href="/signin">로그인</Link>
                  <Link href="/signup">회원가입</Link>
                </>
              )}
            </div>
            <button className="relative h-[18.38px] w-[18.38px] md:hidden">
              <Image src={iconGlass} alt="테마검색" fill />
            </button>
          </div>
        </div>
      )}
      <div className={classNames({ 'pt-[70px] md:pt-[80px] xl:pt-[100px]': !isSignPath })}>
        {children}
      </div>
    </>
  )
}
