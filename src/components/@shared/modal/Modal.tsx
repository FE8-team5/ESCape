import React, { ComponentPropsWithoutRef } from 'react'
import Image from 'next/image'
import closeIcon from '@icons/close_icon.svg'

interface ModalProps extends ComponentPropsWithoutRef<'div'> {
  onClick: () => void,
  classNames: string
}

/** '닫기 버튼의 absolute를 위한 relative, 백그라운드 색상, 모달 모서리 둥글기, 모달 padding값'은 기본으로 적용됩니다.
 * 그 외의 스타일을 classNames라는 프롭스로 전달하면 됩니다. */

/** 닫기 버튼의 onClick 함수는 모달을 여는 컴포넌트에서 아래와 같은 모달 토글 함수를 전달하면 됩니다.
 * const [isModalOpen, setIsModalOpen] = useState(false)
 * const toggleModal = () => setIsModalOpen((prev) => !prev) */

export default function Modal({ children, onClick, classNames }: ModalProps) {
  return (
    <div
      className="fixed inset-0 z-50 flex h-full w-full items-center justify-center bg-black bg-opacity-50 backdrop-blur-sm"
      onClick={onClick}
    >
      <section
        className={`${classNames} relative bg-[#1b1b22] rounded-xl px-5 py-10 md:px-10 md:py-[60px] xl:rounded-2xl`}
        onClick={(e) => e.stopPropagation()}
      >
        <button className="absolute right-4 top-4 ml-auto md:right-5 md:top-5 md:w-9 xl:w-10" onClick={onClick}>
          <Image className="md:w-9 xl:w-10" src={closeIcon} alt="닫기 아이콘" width={24} height={24} />
        </button>
        {children}
      </section>
    </div>
  )
}