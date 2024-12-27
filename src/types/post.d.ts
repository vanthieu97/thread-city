import {Media, Post} from '@prisma/client'

interface PostSearchParams {
  page?: number
  limit?: number
}

interface PostWithAuthor extends Post {
  author: User
  media?: Media[]
}
