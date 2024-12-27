'use client'

import Button from '@/components/button'
import Image from '@/components/image'
import {useLayoutContext} from '@/modules/layout-context'

const AddPost = () => {
  const {userInfo} = useLayoutContext()
  const {setShowPostModal} = useLayoutContext()
  if (!userInfo) {
    return null
  }

  const onClickAddPost = () => {
    setShowPostModal(true)
  }

  return (
    <div className='px-6 py-4 flex gap-2.5 items-center border-b-[0.5px] border-gray-25 cursor-pointer'>
      <Image
        src={userInfo.avatar}
        alt='avatar'
        width={36}
        height={36}
        className='rounded-full aspect-square'
      />
      <div className='flex-1' onClick={onClickAddPost}>
        <span className='text-gray-500'>What&apos;s new?</span>
      </div>
      <Button variant='outline' onClick={onClickAddPost}>
        Post
      </Button>
    </div>
  )
}

export default AddPost
