import {prisma} from '@/lib/db'
import getPosts from '@/utils/server/get-posts'
import getSession from '@/utils/server/get-session'
import {NextRequest, NextResponse} from 'next/server'
interface NewPost {
  content: string
}

export async function POST(request: Request) {
  try {
    const body: NewPost = await request.json()
    const {content} = body

    const userInfo = await getSession()

    if (!userInfo?.user) {
      return NextResponse.json({error: 'Unauthorized'}, {status: 401})
    }

    await prisma.post.create({
      data: {
        content,
        authorId: userInfo.user.id,
      },
    })

    return NextResponse.json(
      {message: 'Post created successfully'},
      {status: 201},
    )
  } catch (error) {
    return NextResponse.json({error: 'Failed to create post'}, {status: 500})
  }
}

export async function GET(request: NextRequest) {
  const {searchParams} = new URL(request.url)
  const page = Number(searchParams.get('page')) || 1
  const pageSize = Number(searchParams.get('pageSize')) || 10

  const posts = await getPosts({page, pageSize})

  return NextResponse.json({
    items: posts,
    meta: {
      page,
      pageSize,
    },
  })
}
