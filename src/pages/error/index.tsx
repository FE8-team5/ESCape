import { useRouter } from 'next/router'
import PrimaryButton from '@/components/@shared/button/CustomButton'

export default function ErrorPage() {
  const router = useRouter()

  // 홈으로 이동하는 함수
  const handleClick = () => {
    router.push('/')
  }
  return (
    <div className="mt-[200px] max-w-[640px] text-white p-3 mx-auto">
      <div className="text-center mb-20">비정상적인 접근입니다.</div>
      <PrimaryButton style="primary" type="button" active={true} onClick={handleClick}>
        홈으로 가기
      </PrimaryButton>
    </div>
  )
}
