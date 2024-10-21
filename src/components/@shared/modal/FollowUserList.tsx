import React from 'react'
import FollowUser from './FollowUser'
import { FollowListTypes } from '@/dtos/UserDto';

interface FollowUserListProps {
  name: string;
  title: string;
  list?: FollowListTypes[];
  nextCursor?: number;
}

export default function FollowUserList({ name, title, list: userData, nextCursor }: FollowUserListProps) {
  return (
    <div>
      <h3 className='text-xl font-semibold leading-7 mb-5 md:mb-8 xl:text-2xl'>{name}님{title}하는 유저</h3>
      {userData && userData.length > 0 ? (
      <div className='flex flex-col content-center items-start gap-5'>
        {userData.map((user) => 
          <FollowUser key={user.id} data={user.follow} />)}
      </div>) : (
          <p>아직 없습니다</p>)}
    </div>
   
  )
}
