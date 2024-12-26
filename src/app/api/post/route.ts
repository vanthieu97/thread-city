import {prisma} from '@/lib/db'
import getSession from '@/utils/server/get-session'
import {NextResponse} from 'next/server'
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
    console.error(error)
    return NextResponse.json({error: 'Failed to create post'}, {status: 500})
  }
}
