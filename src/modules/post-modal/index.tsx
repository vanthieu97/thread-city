'use client'

import Button from '@/components/button'
import {Cross, File, Gif} from '@/components/icons'
import Image from '@/components/image'
import Modal from '@/components/modal'
import RichTextarea, {RichTextareaRef} from '@/components/rich-text-area'
import {useEffect, useRef, useState, useTransition} from 'react'
import {useLayoutContext} from '../layout-context'
import axios from '@/utils/axios'
import toast from '@/components/toast'
import {useRouter} from 'next/navigation'
const iconClasses =
  'text-gray-500 active:scale-90 transition-transform duration-300 cursor-pointer'

const PostModal = () => {
  const router = useRouter()
  const inputFileRef = useRef<HTMLInputElement>(null)
  const [content, setContent] = useState('')
  const contentRef = useRef<RichTextareaRef>(null)
  const {showPostModal, setShowPostModal, userInfo} = useLayoutContext()
  const [imagePreviews, setImagePreviews] = useState<
    {alt: string; url: string; type: 'IMAGE'}[]
  >([])
  const [isPending, startTransition] = useTransition()

  useEffect(() => {
    if (!showPostModal) {
      contentRef.current?.reset()
      setContent('')
      setImagePreviews([])
    }
  }, [showPostModal])

  if (!userInfo) {
    return null
  }

  const onClose = () => {
    setShowPostModal(false)
  }

  const onFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const newFiles = e.target.files
    if (!newFiles) {
      return
    }

    for (const file of newFiles) {
      const reader = new FileReader()
      reader.readAsDataURL(file)
      reader.onload = () => {
        const base64 = reader.result as string
        setImagePreviews((prev) => [
          ...prev,
          {
            alt: file.name,
            url: base64,
            type: 'IMAGE',
          },
        ])
      }
    }
  }

  const onPost = () => {
    const content = contentRef.current?.getContent()
    startTransition(async () => {
      try {
        await axios.post('/api/posts', {content, media: imagePreviews})
        toast.success('Post created successfully')
        setShowPostModal(false)
        // TODO: refresh posts instead of router.refresh()
        router.refresh()
      } catch (error) {
        toast.error((error as ErrorResponse)?.data?.error || 'Failed to post')
      }
    })
  }

  const onClickAddFiles = () => {
    inputFileRef.current?.click()
  }

  const onImageWrapperMouseDown = (e: React.MouseEvent<HTMLDivElement>) => {
    const ele = e.currentTarget
    const startX = e.pageX - ele.offsetLeft
    const scrollLeft = ele.scrollLeft

    const onMouseMove = (e: MouseEvent) => {
      const x = e.pageX - ele.offsetLeft
      const walk = (x - startX) * 1
      ele.scrollLeft = scrollLeft - walk
    }

    const onMouseUp = () => {
      document.removeEventListener('mousemove', onMouseMove)
      document.removeEventListener('mouseup', onMouseUp)
    }

    document.addEventListener('mousemove', onMouseMove)
    document.addEventListener('mouseup', onMouseUp)
  }

  return (
    <Modal isOpen={showPostModal} onClose={onClose} fullWidth maxWidth='2xl'>
      <div className='rounded-xl overflow-hidden'>
        <div className='h-14 px-6 flex items-center justify-between [&>*]:flex-1 border-b-[0.5px] border-gray-25'>
          <span
            className='text-gray-50 text-xl cursor-pointer'
            onClick={onClose}
          >
            Cancel
          </span>
          <h4 className='text-gray-50 text-lg font-bold text-center'>
            New thread
          </h4>
          <span></span>
        </div>
        <div className='px-6 pt-4 pb-1.5 flex gap-3 items-start'>
          <Image
            src={userInfo.avatar}
            alt='avatar'
            width={36}
            height={36}
            className='rounded-full aspect-square'
          />
          <div className='flex-1 overflow-hidden'>
            <p className='font-semibold'>{userInfo.username}</p>
            <RichTextarea
              ref={contentRef}
              placeholder="What's new?"
              className='flex-auto min-h-[21px]'
              value={content}
              onChange={setContent}
            />
            {!!imagePreviews.length && (
              <div
                className='mt-3 flex gap-3 overflow-x-auto scrollbar-hide cursor-grab active:cursor-grabbing'
                onMouseDown={onImageWrapperMouseDown}
              >
                {imagePreviews.map(({alt, url}, index) => (
                  <div
                    key={index}
                    className='shrink-0 h-60 relative rounded-md border border-gray-25 pointer-events-none select-none'
                  >
                    <Image
                      src={url}
                      alt={alt}
                      width={240}
                      height={240}
                      className='w-auto h-full'
                    />
                    <div
                      className='absolute top-2.5 right-2.5 w-6 h-6 rounded-full bg-black/60 flex items-center justify-center cursor-pointer pointer-events-auto'
                      onClick={() => {
                        setImagePreviews((prev) =>
                          prev.filter((_, i) => i !== index),
                        )
                      }}
                    >
                      <Cross
                        width={12}
                        height={12}
                        className='stroke-white stroke-[3px]'
                      />
                    </div>
                  </div>
                ))}
              </div>
            )}
            <div className='mt-3 flex gap-3 relative'>
              <File
                width={20}
                height={20}
                className={iconClasses}
                onClick={onClickAddFiles}
              />
              <input
                ref={inputFileRef}
                type='file'
                className='absolute opacity-0 top-0 left-0 w-0 h-0'
                accept='image/*'
                multiple
                onChange={onFileChange}
              />
              <Gif width={20} height={20} className={iconClasses} />
            </div>
          </div>
        </div>
        <div className='p-6 text-right'>
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
      </div>
    </Modal>
  )
}

export default PostModal
