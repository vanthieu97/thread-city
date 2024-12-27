import Image from '@/components/image'
import {PostWithAuthor} from '@/types/post'
import cn from '@/utils/cn'

const Post = ({post}: {post: PostWithAuthor}) => {
  const {author, content, media} = post
  const moreThanOneImage = media?.length && media.length > 1

  return (
    <div className='flex gap-3 px-6 py-3 border-b-[0.5px] border-gray-25 items-start'>
      <Image
        src={author.avatar}
        alt={author.username}
        width={36}
        height={36}
        className='rounded-full aspect-square'
      />
      <div>
        <p className='font-semibold'>{author.username}</p>
        <div dangerouslySetInnerHTML={{__html: content}} className='mt-[3px]' />
        {!!media?.length && (
          <div className='mt-2 flex gap-3 flex-wrap'>
            {media.map(({url, alt}, index) => (
              <div
                key={index}
                className={cn(
                  'shrink-0 relative rounded-md border border-gray-25 pointer-events-none select-none overflow-hidden',
                  moreThanOneImage && 'h-60',
                )}
              >
                <Image
                  src={url}
                  alt={alt || ''}
                  width={240}
                  height={240}
                  className='w-auto h-full'
                />
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  )
}

export default Post
