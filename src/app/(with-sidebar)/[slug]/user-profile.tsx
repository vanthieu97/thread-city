import Image from '@/components/image'
import React from 'react'

interface Props {
  profile: Profile
}

const UserProfile = ({profile}: Props) => {
  const {name, username, bio, avatar} = profile

  return (
    <div className='p-6 flex flex-col gap-4'>
      <div className='flex justify-between items-center'>
        <div>
          <h1 className='text-2xl font-bold'>{name || username}</h1>
          <span className='pt-0.5'>{username}</span>
        </div>
        <div>
          <Image
            src={avatar}
            alt={username}
            width={84}
            height={84}
            className='rounded-full'
          />
        </div>
      </div>
      <span>{bio || 'No bio yet'}</span>
    </div>
  )
}

export default UserProfile
