import { PropsWithChildren, useEffect, useState } from 'react'
import Header from './Header'
import { useRouter } from 'next/router'

export default function Layout({ children }: PropsWithChildren) {
  const { pathname } = useRouter()
  //엑세스 토큰이 있으면 내프로필, 없으면 로그인

  return <>{!pathname.includes('sign') ? <Header>{children}</Header> : <>{children}</>}</>
}
