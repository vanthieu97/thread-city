import React from 'react'
import Post from './post'
import {PostWithAuthor} from '@/types/post'

interface Props {
  initialPosts: PostWithAuthor[]
}

const GetPosts = ({initialPosts}: Props) => {
  return (
    <div className='flex flex-col gap-3'>
      {initialPosts.map((post) => (
        <Post key={post.id} post={post} />
      ))}
    </div>
  )
}

export default GetPosts
