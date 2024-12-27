'use server'

import {prisma} from '@/lib/db'
import {PostWithAuthor} from '@/types/post'

interface Props {
  page?: number
  pageSize?: number
}

const getPosts = async ({page, pageSize}: Props): Promise<PostWithAuthor[]> => {
  const posts = await prisma.post.findMany({
    skip: (page ?? 0) * (pageSize ?? 10),
    take: pageSize ?? 10,
    orderBy: {
      createdAt: 'desc',
    },
    include: {
      author: true,
      media: true,
    },
  })

  return posts
}

export default getPosts
