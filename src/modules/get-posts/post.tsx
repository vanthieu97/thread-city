import Image from '@/components/image'
import {PostWithAuthor} from '@/types/post'

const Post = ({post}: {post: PostWithAuthor}) => {
  return (
    <div className='flex gap-3 px-6 py-3 border-b-[0.5px] border-gray-25 items-start'>
      <Image
        src={post.author.avatar}
        alt={post.author.name}
        width={36}
        height={36}
        className='rounded-full'
      />
      <div className='flex flex-col gap-1'>
        <p className='font-semibold'>{post.author.name}</p>
        <div dangerouslySetInnerHTML={{__html: post.content}} />
      </div>
    </div>
  )
}

export default Post
