import { useAuth } from '@/contexts/AuthProvider'
import { useState, useEffect } from 'react'

export default function HomePage() {
  const { user, logout } = useAuth()
  const [isLogin, setIsLogin] = useState<boolean>(false)

  const handleLogout = () => {
    logout()
  }

  useEffect(() => {
    if (localStorage.getItem('accessToken')) {
      setIsLogin(true)
    } else {
      setIsLogin(false)
    }
  }, [user])

  return (
    <>
      <h2 className="p-10 text-center text-white">홈 화면입니다.</h2>
     
    </>
  )
}