import React from 'react'
import Image from 'next/image'
import { FollowTypes } from '@/dtos/UserDto'

interface FollowUserProps {
  data: FollowTypes
}

export default function FollowUser({ data }: FollowUserProps) {
  const { image, nickname } = data
  return (
    <button className="flex content-start items-center gap-5">
      <Image className="xl:w-[52px]" src={image} alt="프로필 이미지" width={48} height={48} />
      <p className="text-base font-medium xl:text-lg">{nickname}</p>
    </button>
  )
}
