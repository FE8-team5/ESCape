import React, { ComponentPropsWithoutRef, useState } from 'react'
import Image from 'next/image'
import closeIcon from '@icons/close_icon.svg'

interface ModalProps extends ComponentPropsWithoutRef<'div'> {
  onClick: () => void
}

export default function Modal({ children, onClick }: ModalProps) {
  return (
    <div
      className="fixed inset-0 z-50 flex h-full w-full items-center justify-center bg-black bg-opacity-50 backdrop-blur-sm"
      onClick={onClick}
    >
      <section
        className="relative max-h-[550px] w-[335px] overflow-auto rounded-xl bg-[#1b1b22] px-5 py-10 scrollbar-hide md:max-h-[600px] md:w-[500px] md:py-[60px] xl:max-h-[660px] xl:rounded-2xl"
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
