import Image from 'next/image'
import { ChangeEvent, FormEvent, PropsWithChildren, useEffect, useState } from 'react'
import Link from 'next/link'
import { useRouter } from 'next/router'

import iconHamburger from '@icons/icon_hamburger.svg'
import logoBig from '@images/logo_big_image.png'
import iconGlass from '@icons/icon_glass.svg'
import iconSignin from '@icons/icon_signin.svg'

export default function Header({ children }: PropsWithChildren) {
  const [isLogin, setIsLogin] = useState(false)
  const [searchInputValue, setSearchInputValue] = useState('')

  const router = useRouter()
  const handleSearchInput = (e: ChangeEvent<HTMLInputElement>) => {
    setSearchInputValue(e.target.value)
  }

  //헤더에서 검색을 할 경우 Product페이지로 쿼리스트링과 함께 이동합니다.
  const onSubmitSearchInput = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    if (!searchInputValue) {
      router.push('/product')
      return
    }
    router.push({ pathname: '/product', query: { keyword: searchInputValue } })
    setSearchInputValue('')
  }

  useEffect(() => {
    const accessToken = localStorage.getItem('accessToken')
    if (accessToken) {
      setIsLogin(true)
    } else {
      setIsLogin(false)
    }
  }, [])
  return (
    <>
      <div className="relative z-10">
        <div className="fixed flex h-[70px] w-full items-center justify-between border-b border-[#252530] bg-body-bg px-5 md:h-[80px] md:px-[30px] xl:h-[100px] xl:px-[120px]">
          <button className="relative h-[11.27px] w-[17px] md:hidden">
            <Image src={iconHamburger} alt="카테고리 보기" fill />
          </button>
          <div className="flex items-center gap-10">
            <Link href="/" className="relative h-[24px] w-[120px] md:h-[28px] md:w-[140px] xl:h-[34px] xl:w-[170px]">
              <Image src={logoBig} alt="로고" fill sizes="(max-width: 768px) 120px, (max-width: 1280px) 140px, 170px" />
            </Link>
            <Link href="/board" className="hidden md:block">
              자유게시판
            </Link>
          </div>
          <div className="hidden items-center gap-[30px] md:flex">
            <div className="flex h-[50px] w-[300px] items-center gap-1.5 rounded-[28px] bg-[#252530] px-6">
              <Image src={iconGlass} alt="테마검색" width={18.38} height={18.38} className="hidden md:block" />
              <form onSubmit={onSubmitSearchInput}>
                <input value={searchInputValue} onChange={handleSearchInput} placeholder="테마를 검색해 보세요" />
              </form>
            </div>
            {isLogin ? (
              <Link href="/mypage">내 프로필</Link>
            ) : (
              <>
                <Link href="/signin">로그인</Link>
                <Link href="/signup">회원가입</Link>
              </>
            )}
          </div>
          <div className="flex items-center gap-5 md:hidden">
            <button className="relative h-[18.38px] w-[18.38px]">
              <Image src={iconGlass} alt="테마검색" fill />
            </button>
            {isLogin ? (
              <span>유저프로필</span>
            ) : (
              <Link href="/signin" className="relative h-[18.38px] w-[18.38px]">
                <Image src={iconSignin} alt="로그인" fill />
              </Link>
            )}
          </div>
        </div>
      </div>
      <div className="pt-[70px] md:pt-[80px] xl:pt-[100px]">{children}</div>
    </>
  )
}
