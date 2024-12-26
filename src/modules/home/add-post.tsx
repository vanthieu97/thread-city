'use client'

import Button from '@/components/button'
import Image from '@/components/image'
import RichTextarea from '@/components/rich-text-area'
import {useLayoutContext} from '../layout-context'

const AddPost = () => {
  const {userInfo} = useLayoutContext()

  if (!userInfo) {
    return null
  }

  return (
    <div className='p-6 pb-4 flex gap-2.5 items-center border-b-[0.5px] border-gray-800'>
      <Image
        src={userInfo.avatar}
        alt='avatar'
        width={36}
        height={36}
        className='rounded-full'
      />
      <RichTextarea placeholder="What's new?" className='flex-1' />
      <Button variant='outline'>Post</Button>
    </div>
  )
}

export default AddPost
