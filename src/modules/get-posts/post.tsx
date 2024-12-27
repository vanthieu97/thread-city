import Image from '@/components/image'
import {PostWithAuthor} from '@/types/post'

const Post = ({post}: {post: PostWithAuthor}) => {
  const {author, content, media} = post
  return (
    <div className='flex gap-3 px-6 py-3 border-b-[0.5px] border-gray-25 items-start'>
      <Image
        src={author.avatar}
        alt={author.username}
        width={36}
        height={36}
        className='rounded-full aspect-square'
      />
      <div className='flex flex-col gap-[3px]'>
        <p className='font-semibold'>{author.username}</p>
        <div dangerouslySetInnerHTML={{__html: content}} />
        {!!media?.length && (
          <div className='mt-1 flex gap-1'>
            {media.map(({url, alt}, index) => (
              <div
                key={index}
                className='shrink-0 relative rounded-md border border-gray-25 pointer-events-none select-none'
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
