'use client'

import Button from '@/components/button'
import Image from '@/components/image'
import Modal from '@/components/modal'
import toast from '@/components/toast'
import {useLayoutContext} from '@/modules/layout-context'
import axios from '@/utils/axios'
import {useEffect, useState, useTransition} from 'react'
import ProfileForm from './profile-form'
interface Props {
  profile: Profile
}

const UserProfile = ({profile}: Props) => {
  const {userInfo, setUserInfo} = useLayoutContext()
  const [userProfile, setUserProfile] = useState(
    userInfo?.username === profile.username ? (userInfo as Profile) : profile,
  )
  const {name, username, bio, avatar} = userProfile
  const [isOpen, setIsOpen] = useState(false)
  const [isPending, startTransition] = useTransition()

  useEffect(
    () => {
      if (userInfo?.username === profile.username) {
        setUserProfile(userInfo as Profile)
      }
    },
    // eslint-disable-next-line react-hooks/exhaustive-deps
    [userInfo],
  )

  const onClose = () => {
    setIsOpen(false)
  }

  const onOpen = () => {
    setIsOpen(true)
  }

  const onUpdateProfile = (data: Profile) => {
    startTransition(async () => {
      try {
        await axios.put('/api/auth/profile', data)
        setUserInfo(data)
        onClose()
      } catch (error) {
        toast.error('Failed to update profile')
      }
    })
  }

  return (
    <div className='flex flex-col gap-4'>
      <div className='px-6 pt-4 pb-2.5 flex flex-col gap-4'>
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
      <div className='px-6 py-4'>
        <Button
          variant='outline'
          fullWidth
          className='text-base'
          onClick={onOpen}
        >
          Edit profile
        </Button>
      </div>
      <Modal isOpen={isOpen} fullWidth maxWidth='lg' onClose={onClose}>
        <ProfileForm
          profile={userProfile}
          onSubmit={onUpdateProfile}
          isPending={isPending}
        />
      </Modal>
    </div>
  )
}

export default UserProfile
