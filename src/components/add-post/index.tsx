'use client'

import Button from '@/components/button'
import Image from '@/components/image'
import RichTextarea, {RichTextareaRef} from '@/components/rich-text-area'
import {useLayoutContext} from '@/modules/layout-context'
import axios from '@/utils/axios'
import {useRef, useState, useTransition} from 'react'
import toast from '../toast'

const AddPost = () => {
  const [content, setContent] = useState('')
  const {userInfo} = useLayoutContext()
  const [isPending, startTransition] = useTransition()
  const contentRef = useRef<RichTextareaRef>(null)
  if (!userInfo) {
    return null
  }

  const onPost = () => {
    const content = contentRef.current?.getContent()
    startTransition(async () => {
      try {
        await axios.post('/api/post', {content})
        toast.success('Post created successfully')
        contentRef.current?.reset()
      } catch (error) {
        toast.error((error as ErrorResponse)?.data?.error || 'Failed to post')
      }
    })
  }

  return (
    <div className='px-6 py-4 flex gap-2.5 items-center border-b-[0.5px] border-gray-800'>
      <Image
        src={userInfo.avatar}
        alt='avatar'
        width={36}
        height={36}
        className='rounded-full'
      />
      <RichTextarea
        ref={contentRef}
        placeholder="What's new?"
        className='flex-1'
        value={content}
        onChange={setContent}
      />
      <Button
        variant='outline'
        onClick={onPost}
        disabled={isPending || !content}
        isLoading={isPending}
        loadingText='Posting...'
      >
        Post
      </Button>
    </div>
  )
}

export default AddPost
